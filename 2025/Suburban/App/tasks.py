"""
Tarefas automatizadas para atualização de dados em tempo real
"""
from celery import Celery
from django.conf import settings
from datetime import datetime, timedelta
import random
from apps.models import Trem, Linha, Estacao, CondiciaoClimatica, NotificacaoUsuario
from cptm_tracker.services.cptm_api import cptm_service
from cptm_tracker.weather.weather_api import clima_service
from cptm_tracker.notifications.push import notificacao_service
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

# Configuração do Celery
app = Celery('cptm_tracker')
app.config_from_object('django.conf:settings', namespace='CELERY')

channel_layer = get_channel_layer()

@app.task
def atualizar_posicoes_trens():
    """Atualiza posições dos trens em tempo real"""
    try:
        linhas = Linha.objects.filter(ativa=True)
        
        for linha in linhas:
            # Simular posições dos trens
            trens_simulados = cptm_service.simular_posicao_trens(linha.numero)
            
            for trem_data in trens_simulados:
                trem, created = Trem.objects.get_or_create(
                    identificador=trem_data['identificador'],
                    defaults={
                        'linha': linha,
                        'status': trem_data['status'],
                        'lotacao': trem_data['lotacao'],
                        'velocidade': trem_data['velocidade'],
                        'direcao': trem_data['direcao'],
                        'latitude_atual': trem_data['latitude'],
                        'longitude_atual': trem_data['longitude'],
                    }
                )
                
                if not created:
                    # Atualizar posição existente
                    trem.status = trem_data['status']
                    trem.lotacao = trem_data['lotacao']
                    trem.velocidade = trem_data['velocidade']
                    trem.latitude_atual = trem_data['latitude']
                    trem.longitude_atual = trem_data['longitude']
                    
                    # Atualizar estação atual se mudou
                    if trem_data.get('estacao_atual'):
                        try:
                            estacao_atual = Estacao.objects.get(nome=trem_data['estacao_atual'])
                            trem.estacao_atual = estacao_atual
                        except Estacao.DoesNotExist:
                            pass
                    
                    # Atualizar próxima estação
                    if trem_data.get('proxima_estacao'):
                        try:
                            proxima_estacao = Estacao.objects.get(nome=trem_data['proxima_estacao'])
                            trem.proxima_estacao = proxima_estacao
                            
                            # Calcular previsão de chegada
                            if trem.velocidade > 0:
                                # Estimativa simples baseada na velocidade
                                minutos_chegada = random.randint(2, 8)
                                trem.previsao_chegada = datetime.now() + timedelta(minutes=minutos_chegada)
                        except Estacao.DoesNotExist:
                            pass
                    
                    trem.save()
                
                # Enviar atualização via WebSocket
                if channel_layer:
                    async_to_sync(channel_layer.group_send)(
                        "trens_real_time",
                        {
                            'type': 'trem_update',
                            'data': {
                                'id': trem.id,
                                'identificador': trem.identificador,
                                'latitude': trem.latitude_atual,
                                'longitude': trem.longitude_atual,
                                'status': trem.status,
                                'lotacao': trem.lotacao,
                                'velocidade': trem.velocidade,
                                'linha': linha.numero
                            }
                        }
                    )
        
        print(f"Posições dos trens atualizadas: {datetime.now()}")
        return True
        
    except Exception as e:
        print(f"Erro ao atualizar posições dos trens: {e}")
        return False

@app.task
def verificar_chegadas_trens():
    """Verifica chegadas iminentes e envia notificações"""
    try:
        # Buscar trens com previsão de chegada nos próximos 5 minutos
        agora = datetime.now()
        limite_notificacao = agora + timedelta(minutes=5)
        
        trens_chegando = Trem.objects.filter(
            previsao_chegada__gte=agora,
            previsao_chegada__lte=limite_notificacao,
            proxima_estacao__isnull=False
        ).select_related('linha', 'proxima_estacao')
        
        for trem in trens_chegando:
            minutos_chegada = int((trem.previsao_chegada - agora).total_seconds() / 60)
            
            # Buscar usuários interessados nesta estação
            usuarios_interessados = set()
            
            # Usuários com estação nos favoritos
            preferencias = trem.proxima_estacao.preferenciasUsuario_set.filter(
                notificar_chegada=True
            )
            for pref in preferencias:
                usuarios_interessados.add(pref.usuario)
            
            # Enviar notificações
            for usuario in usuarios_interessados:
                notificacao_service.enviar_notificacao_chegada(
                    usuario, trem, trem.proxima_estacao, minutos_chegada
                )
        
        print(f"Verificação de chegadas concluída: {len(trens_chegando)} trens")
        return True
        
    except Exception as e:
        print(f"Erro ao verificar chegadas: {e}")
        return False

@app.task
def atualizar_condicoes_climaticas():
    """Atualiza condições climáticas para as principais estações"""
    try:
        # Selecionar algumas estações principais para monitoramento climático
        estacoes_principais = Estacao.objects.filter(
            nome__in=['Luz', 'Sé', 'Brás', 'Osasco', 'Santo André', 'Mogi das Cruzes']
        )
        
        for estacao in estacoes_principais:
            # Obter dados climáticos
            clima_data = clima_service.obter_clima_atual(
                estacao.latitude, 
                estacao.longitude
            )
            
            if clima_data:
                # Mapear condição para modelo
                condicao_mapping = {
                    'clear': 'ensolarado',
                    'clouds': 'nublado', 
                    'rain': 'chuvoso',
                    'drizzle': 'chuvoso',
                    'thunderstorm': 'tempestade',
                    'mist': 'nevoa',
                    'fog': 'nevoa'
                }
                
                condicao = condicao_mapping.get(clima_data['condicao'], 'nublado')
                
                # Verificar impactos na operação
                impactos = clima_service.verificar_impacto_operacao(clima_data)
                impacto_operacao = len(impactos) > 0
                
                # Criar ou atualizar condição climática
                condicao_climatica, created = CondiciaoClimatica.objects.update_or_create(
                    estacao=estacao,
                    defaults={
                        'condicao': condicao,
                        'temperatura': clima_data['temperatura'],
                        'umidade': clima_data['umidade'],
                        'vento': clima_data.get('vento_velocidade', 0),
                        'impacto_operacao': impacto_operacao
                    }
                )
                
                # Se há impacto significativo, notificar usuários
                if impacto_operacao and impactos:
                    notificacao_service.enviar_notificacao_clima(clima_data, impactos)
        
        print(f"Condições climáticas atualizadas: {datetime.now()}")
        return True
        
    except Exception as e:
        print(f"Erro ao atualizar condições climáticas: {e}")
        return False

@app.task
def simular_eventos_operacionais():
    """Simula eventos operacionais como atrasos e problemas"""
    try:
        # 20% de chance de gerar um evento
        if random.random() < 0.2:
            evento_tipo = random.choice(['atraso', 'manutencao', 'superlotacao'])
            
            if evento_tipo == 'atraso':
                # Simular atraso em uma linha
                linha = Linha.objects.order_by('?').first()
                estacao = linha.estacoes.order_by('?').first()
                motivos = [
                    'Problemas na via',
                    'Sinalização defeituosa', 
                    'Interdição de passagem de nível',
                    'Passageiro enfermo',
                    'Verificação de segurança'
                ]
                motivo = random.choice(motivos)
                
                # Notificar usuários da linha
                from django.contrib.auth.models import User
                usuarios = User.objects.filter(
                    preferencias__linhas_favoritas=linha,
                    preferencias__notificar_atraso=True
                )
                
                for usuario in usuarios:
                    notificacao_service.enviar_notificacao_atraso(
                        usuario, linha, estacao, motivo
                    )
                
                print(f"Evento de atraso simulado na {linha.nome}")
            
            elif evento_tipo == 'superlotacao':
                # Marcar alguns trens como superlotados
                trens_para_lotacao = Trem.objects.filter(
                    status='operacional'
                ).order_by('?')[:random.randint(2, 5)]
                
                for trem in trens_para_lotacao:
                    if random.random() < 0.3:  # 30% chance
                        trem.lotacao = 'superlotado'
                        trem.save()
        
        return True
        
    except Exception as e:
        print(f"Erro ao simular eventos: {e}")
        return False

@app.task
def limpar_dados_antigos():
    """Remove dados antigos para manter performance"""
    try:
        # Remover notificações antigas (mais de 30 dias)
        data_limite = datetime.now() - timedelta(days=30)
        NotificacaoUsuario.objects.filter(
            criada_em__lt=data_limite
        ).delete()
        
        # Limpar condições climáticas antigas (mais de 7 dias)
        data_limite_clima = datetime.now() - timedelta(days=7)
        CondiciaoClimatica.objects.filter(
            atualizada_em__lt=data_limite_clima
        ).delete()
        
        print(f"Limpeza de dados concluída: {datetime.now()}")
        return True
        
    except Exception as e:
        print(f"Erro na limpeza de dados: {e}")
        return False

# Configuração das tarefas periódicas
from celery.schedules import crontab

app.conf.beat_schedule = {
    'atualizar-posicoes-trens': {
        'task': 'tasks.atualizar_posicoes_trens',
        'schedule': 30.0,  # A cada 30 segundos
    },
    'verificar-chegadas': {
        'task': 'tasks.verificar_chegadas_trens', 
        'schedule': 60.0,  # A cada minuto
    },
    'atualizar-clima': {
        'task': 'tasks.atualizar_condicoes_climaticas',
        'schedule': crontab(minute='*/15'),  # A cada 15 minutos
    },
    'simular-eventos': {
        'task': 'tasks.simular_eventos_operacionais',
        'schedule': crontab(minute='*/5'),  # A cada 5 minutos
    },
    'limpar-dados': {
        'task': 'tasks.limpar_dados_antigos',
        'schedule': crontab(hour=2, minute=0),  # Diariamente às 2h
    },
}

app.conf.timezone = 'America/Sao_Paulo'