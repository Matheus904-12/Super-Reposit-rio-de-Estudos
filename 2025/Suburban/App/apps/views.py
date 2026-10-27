from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.conf import settings
from .models import Linha, Estacao, Trem, NotificacaoUsuario, PreferenciasUsuario, CondiciaoClimatica, Manutencao
from cptm_tracker.services.cptm_api import cptm_service
from cptm_tracker.services.google_maps import maps_service  
from cptm_tracker.weather.weather_api import clima_service
from cptm_tracker.notifications.push import notificacao_service
import json
from datetime import datetime, timedelta

def mapa(request):
    """Página principal do mapa com trens em tempo real"""
    linhas = Linha.objects.prefetch_related('estacoes', 'trens').all()
    estacoes = Estacao.objects.all()
    trens = Trem.objects.select_related('linha', 'estacao_atual').all()
    
    # Preparar dados das estações para o mapa
    estacoes_data = []
    for estacao in estacoes:
        estacoes_data.append({
            'id': estacao.id,
            'nome': estacao.nome,
            'latitude': estacao.latitude,
            'longitude': estacao.longitude,
            'linha': estacao.linha.numero,
            'linha_nome': estacao.linha.nome,
            'linha_cor': estacao.linha.cor,
            'acessivel': estacao.acessivel,
            'tem_elevador': estacao.tem_elevador,
            'tem_escada_rolante': estacao.tem_escada_rolante
        })
    
    # Preparar dados dos trens para o mapa
    trens_data = []
    for trem in trens:
        trens_data.append({
            'id': trem.id,
            'identificador': trem.identificador,
            'linha': trem.linha.numero,
            'linha_nome': trem.linha.nome,
            'linha_cor': trem.linha.cor,
            'latitude': trem.latitude_atual or (trem.estacao_atual.latitude if trem.estacao_atual else -23.5505),
            'longitude': trem.longitude_atual or (trem.estacao_atual.longitude if trem.estacao_atual else -46.6333),
            'status': trem.status,
            'lotacao': trem.lotacao,
            'velocidade': trem.velocidade,
            'direcao': trem.direcao,
            'estacao_atual': trem.estacao_atual.nome if trem.estacao_atual else 'Em trânsito',
            'proxima_estacao': trem.proxima_estacao.nome if trem.proxima_estacao else 'Indisponível',
            'previsao_chegada': trem.previsao_chegada.isoformat() if trem.previsao_chegada else None
        })
    
    # Buscar condições climáticas
    clima_atual = clima_service.obter_clima_atual()
    
    # Verificar manutenções ativas
    manutencoes_ativas = Manutencao.objects.filter(
        status='em_andamento',
        inicio_real__lte=datetime.now(),
        fim_programado__gte=datetime.now()
    ).select_related('linha', 'estacao_inicio', 'estacao_fim')
    
    context = {
        'linhas': linhas,
        'estacoes_json': json.dumps(estacoes_data),
        'trens_json': json.dumps(trens_data),
        'clima_json': json.dumps(clima_atual),
        'manutencoes_ativas': manutencoes_ativas,
        'google_maps_api_key': settings.GOOGLE_MAPS_API_KEY,
        'total_estacoes': estacoes.count(),
        'total_trens': trens.count(),
        'trens_operacionais': trens.filter(status='operacional').count(),
    }
    
    return render(request, 'mapa.html', context)

def api_trens(request):
    """API REST para dados dos trens em tempo real"""
    trens = Trem.objects.select_related('linha', 'estacao_atual', 'proxima_estacao').all()
    
    data = []
    for trem in trens:
        data.append({
            'id': trem.id,
            'identificador': trem.identificador,
            'linha': {
                'numero': trem.linha.numero,
                'nome': trem.linha.nome,
                'cor': trem.linha.cor
            },
            'lotacao': trem.lotacao,
            'status': trem.status,
            'velocidade': trem.velocidade,
            'direcao': trem.direcao,
            'ultima_atualizacao': trem.ultima_atualizacao.isoformat(),
            'estacao_atual': {
                'nome': trem.estacao_atual.nome,
                'latitude': trem.estacao_atual.latitude,
                'longitude': trem.estacao_atual.longitude
            } if trem.estacao_atual else None,
            'proxima_estacao': {
                'nome': trem.proxima_estacao.nome,
                'latitude': trem.proxima_estacao.latitude,
                'longitude': trem.proxima_estacao.longitude
            } if trem.proxima_estacao else None,
            'posicao_atual': {
                'latitude': trem.latitude_atual,
                'longitude': trem.longitude_atual
            } if trem.latitude_atual and trem.longitude_atual else None,
            'previsao_chegada': trem.previsao_chegada.isoformat() if trem.previsao_chegada else None
        })
    
    return JsonResponse({'trens': data, 'total': len(data), 'timestamp': datetime.now().isoformat()})

def api_status_linha(request, linha_numero):
    """API para status específico de uma linha"""
    try:
        linha = get_object_or_404(Linha, numero=linha_numero)
        
        # Buscar trens da linha
        trens = Trem.objects.filter(linha=linha).select_related('estacao_atual', 'proxima_estacao')
        
        # Buscar estações da linha
        estacoes = Estacao.objects.filter(linha=linha).order_by('ordem')
        
        # Buscar manutenções ativas
        manutencoes = Manutencao.objects.filter(
            linha=linha,
            status='em_andamento'
        ).select_related('estacao_inicio', 'estacao_fim')
        
        # Calcular estatísticas
        trens_operacionais = trens.filter(status='operacional').count()
        trens_atrasados = trens.filter(status='atrasado').count()
        
        data = {
            'linha': {
                'numero': linha.numero,
                'nome': linha.nome,
                'cor': linha.cor,
                'ativa': linha.ativa
            },
            'estatisticas': {
                'total_trens': trens.count(),
                'trens_operacionais': trens_operacionais,
                'trens_atrasados': trens_atrasados,
                'total_estacoes': estacoes.count(),
                'manutencoes_ativas': manutencoes.count()
            },
            'trens': [
                {
                    'identificador': trem.identificador,
                    'status': trem.status,
                    'lotacao': trem.lotacao,
                    'velocidade': trem.velocidade,
                    'estacao_atual': trem.estacao_atual.nome if trem.estacao_atual else None,
                    'proxima_estacao': trem.proxima_estacao.nome if trem.proxima_estacao else None,
                    'previsao_chegada': trem.previsao_chegada.isoformat() if trem.previsao_chegada else None
                }
                for trem in trens
            ],
            'estacoes': [
                {
                    'nome': estacao.nome,
                    'ordem': estacao.ordem,
                    'latitude': estacao.latitude,
                    'longitude': estacao.longitude,
                    'acessivel': estacao.acessivel
                }
                for estacao in estacoes
            ],
            'manutencoes': [
                {
                    'tipo': manutencao.tipo,
                    'descricao': manutencao.descricao,
                    'estacao_inicio': manutencao.estacao_inicio.nome,
                    'estacao_fim': manutencao.estacao_fim.nome,
                    'inicio_programado': manutencao.inicio_programado.isoformat(),
                    'fim_programado': manutencao.fim_programado.isoformat()
                }
                for manutencao in manutencoes
            ],
            'timestamp': datetime.now().isoformat()
        }
        
        return JsonResponse(data)
        
    except Exception as e:
        return JsonResponse({'erro': str(e)}, status=400)

def api_previsao_estacao(request, estacao_id):
    """API para previsão de chegada em uma estação específica"""
    try:
        estacao = get_object_or_404(Estacao, id=estacao_id)
        
        # Buscar trens que têm esta estação como próxima parada
        trens_chegando = Trem.objects.filter(
            proxima_estacao=estacao,
            status='operacional'
        ).select_related('linha').order_by('previsao_chegada')
        
        previsoes = []
        for trem in trens_chegando:
            if trem.previsao_chegada:
                minutos_chegada = int((trem.previsao_chegada - datetime.now()).total_seconds() / 60)
                if minutos_chegada >= 0:  # Apenas previsões futuras
                    previsoes.append({
                        'trem_identificador': trem.identificador,
                        'linha': {
                            'numero': trem.linha.numero,
                            'nome': trem.linha.nome,
                            'cor': trem.linha.cor
                        },
                        'minutos_chegada': minutos_chegada,
                        'previsao_exata': trem.previsao_chegada.isoformat(),
                        'lotacao': trem.lotacao,
                        'direcao': trem.direcao
                    })
        
        data = {
            'estacao': {
                'id': estacao.id,
                'nome': estacao.nome,
                'linha': estacao.linha.nome,
                'acessivel': estacao.acessivel
            },
            'previsoes': previsoes[:5],  # Máximo 5 próximos trens
            'timestamp': datetime.now().isoformat()
        }
        
        return JsonResponse(data)
        
    except Exception as e:
        return JsonResponse({'erro': str(e)}, status=400)

def api_clima(request):
    """API para condições climáticas atuais"""
    try:
        # Coordenadas opcionais via parâmetros
        lat = request.GET.get('lat')
        lng = request.GET.get('lng')
        
        if lat and lng:
            clima_data = clima_service.obter_clima_atual(float(lat), float(lng))
        else:
            clima_data = clima_service.obter_clima_atual()
        
        # Verificar impactos na operação
        impactos = clima_service.verificar_impacto_operacao(clima_data)
        
        return JsonResponse({
            'clima': clima_data,
            'impactos_operacao': impactos,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return JsonResponse({'erro': str(e)}, status=400)

@login_required
def api_notificacoes(request):
    """API para notificações do usuário"""
    if request.method == 'GET':
        apenas_nao_lidas = request.GET.get('nao_lidas', 'false').lower() == 'true'
        notificacoes = notificacao_service.obter_notificacoes_usuario(
            request.user, apenas_nao_lidas
        )
        
        data = [
            {
                'id': notif.id,
                'tipo': notif.tipo,
                'titulo': notif.titulo,
                'mensagem': notif.mensagem,
                'lida': notif.lida,
                'criada_em': notif.criada_em.isoformat(),
                'estacao': notif.estacao.nome if notif.estacao else None,
                'linha': notif.linha.nome if notif.linha else None
            }
            for notif in notificacoes
        ]
        
        return JsonResponse({'notificacoes': data})
    
    elif request.method == 'POST':
        # Marcar notificação como lida
        try:
            data = json.loads(request.body)
            notificacao_id = data.get('notificacao_id')
            
            success = notificacao_service.marcar_como_lida(notificacao_id, request.user)
            
            return JsonResponse({'sucesso': success})
        except Exception as e:
            return JsonResponse({'erro': str(e)}, status=400)

def api_rota(request):
    """API para calcular rotas entre estações"""
    try:
        origem = request.GET.get('origem')
        destino = request.GET.get('destino')
        
        if not origem or not destino:
            return JsonResponse({'erro': 'Origem e destino são obrigatórios'}, status=400)
        
        # Buscar estações
        try:
            estacao_origem = Estacao.objects.get(nome=origem)
            estacao_destino = Estacao.objects.get(nome=destino)
        except Estacao.DoesNotExist:
            return JsonResponse({'erro': 'Estação não encontrada'}, status=404)
        
        # Calcular rota
        rota = maps_service.calcular_rota_entre_estacoes(origem, destino)
        
        # Verificar se precisa de baldeação
        precisa_baldeacao = estacao_origem.linha != estacao_destino.linha
        estacoes_baldeacao = []
        
        if precisa_baldeacao:
            # Encontrar estações de baldeação
            estacoes_baldeacao = Estacao.objects.filter(
                baldeacao__linha=estacao_destino.linha,
                linha=estacao_origem.linha
            ).distinct()
        
        data = {
            'origem': {
                'nome': estacao_origem.nome,
                'linha': estacao_origem.linha.nome,
                'latitude': estacao_origem.latitude,
                'longitude': estacao_origem.longitude
            },
            'destino': {
                'nome': estacao_destino.nome,
                'linha': estacao_destino.linha.nome,
                'latitude': estacao_destino.latitude,
                'longitude': estacao_destino.longitude
            },
            'rota': rota,
            'precisa_baldeacao': precisa_baldeacao,
            'estacoes_baldeacao': [
                {
                    'nome': est.nome,
                    'linha_origem': est.linha.nome,
                    'linhas_baldeacao': [bal.linha.nome for bal in est.baldeacao.all()]
                }
                for est in estacoes_baldeacao
            ],
            'timestamp': datetime.now().isoformat()
        }
        
        return JsonResponse(data)
        
    except Exception as e:
        return JsonResponse({'erro': str(e)}, status=400)

def dashboard(request):
    """Dashboard administrativo"""
    # Estatísticas gerais
    total_linhas = Linha.objects.count()
    total_estacoes = Estacao.objects.count()
    total_trens = Trem.objects.count()
    trens_operacionais = Trem.objects.filter(status='operacional').count()
    
    # Notificações recentes
    notificacoes_recentes = NotificacaoUsuario.objects.select_related('usuario', 'linha', 'estacao').order_by('-criada_em')[:10]
    
    # Manutenções ativas
    manutencoes_ativas = Manutencao.objects.filter(status='em_andamento').select_related('linha', 'estacao_inicio', 'estacao_fim')
    
    context = {
        'estatisticas': {
            'total_linhas': total_linhas,
            'total_estacoes': total_estacoes,
            'total_trens': total_trens,
            'trens_operacionais': trens_operacionais,
            'taxa_operacao': round((trens_operacionais / total_trens * 100) if total_trens > 0 else 0, 1)
        },
        'notificacoes_recentes': notificacoes_recentes,
        'manutencoes_ativas': manutencoes_ativas,
    }
    
    return render(request, 'dashboard.html', context)

def api_estacoes(request):
    """API REST para listar todas as estações"""
    estacoes = Estacao.objects.select_related('linha').all().order_by('linha__numero', 'ordem')
    
    data = []
    for estacao in estacoes:
        data.append({
            'id': estacao.id,
            'nome': estacao.nome,
            'codigo': estacao.codigo,
            'latitude': estacao.latitude,
            'longitude': estacao.longitude,
            'ordem': estacao.ordem,
            'tem_elevador': estacao.tem_elevador,
            'tem_escada_rolante': estacao.tem_escada_rolante,
            'acessivel': estacao.acessivel,
            'linha': {
                'numero': estacao.linha.numero,
                'nome': estacao.linha.nome,
                'cor': estacao.linha.cor
            }
        })
    
    return JsonResponse({'estacoes': data, 'total': len(data), 'timestamp': datetime.now().isoformat()})
