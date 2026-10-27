"""
Sistema de notificações push e alerts
"""
import json
import requests
from django.conf import settings
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.contrib.auth.models import User
from apps.models import NotificacaoUsuario, PreferenciasUsuario, Trem, Estacao
from datetime import datetime, timedelta

class NotificacaoService:
    def __init__(self):
        self.channel_layer = get_channel_layer()
        self.onesignal_app_id = getattr(settings, 'ONESIGNAL_APP_ID', None)
        self.onesignal_api_key = getattr(settings, 'ONESIGNAL_API_KEY', None)

    def enviar_notificacao_chegada(self, usuario, trem, estacao, minutos_chegada):
        """Envia notificação de chegada de trem"""
        try:
            # Cria notificação no banco
            notificacao = NotificacaoUsuario.objects.create(
                usuario=usuario,
                tipo='chegada',
                titulo=f'Trem chegando na {estacao.nome}',
                mensagem=f'O trem {trem.identificador} da {trem.linha.nome} chegará na estação {estacao.nome} em {minutos_chegada} minutos.',
                estacao=estacao,
                linha=trem.linha
            )

            # Envia via WebSocket
            self._enviar_websocket(usuario.id, {
                'tipo': 'chegada',
                'titulo': notificacao.titulo,
                'mensagem': notificacao.mensagem,
                'trem_id': trem.identificador,
                'estacao': estacao.nome,
                'linha': trem.linha.nome,
                'minutos': minutos_chegada,
                'timestamp': datetime.now().isoformat()
            })

            # Envia push notification se habilitado
            self._enviar_push_notification(usuario, notificacao.titulo, notificacao.mensagem)

            # Marca como enviada
            notificacao.enviada = True
            notificacao.save()

            return True
        except Exception as e:
            print(f"Erro ao enviar notificação de chegada: {e}")
            return False

    def enviar_notificacao_atraso(self, usuario, linha, estacao, motivo):
        """Envia notificação de atraso"""
        try:
            notificacao = NotificacaoUsuario.objects.create(
                usuario=usuario,
                tipo='atraso',
                titulo=f'Atraso na {linha.nome}',
                mensagem=f'Há atrasos na {linha.nome} próximo à estação {estacao.nome}. Motivo: {motivo}',
                estacao=estacao,
                linha=linha
            )

            self._enviar_websocket(usuario.id, {
                'tipo': 'atraso',
                'titulo': notificacao.titulo,
                'mensagem': notificacao.mensagem,
                'linha': linha.nome,
                'estacao': estacao.nome,
                'motivo': motivo,
                'timestamp': datetime.now().isoformat()
            })

            self._enviar_push_notification(usuario, notificacao.titulo, notificacao.mensagem)

            notificacao.enviada = True
            notificacao.save()
            return True
        except Exception as e:
            print(f"Erro ao enviar notificação de atraso: {e}")
            return False

    def _enviar_websocket(self, usuario_id, data):
        """Envia notificação via WebSocket"""
        if self.channel_layer:
            async_to_sync(self.channel_layer.group_send)(
                f"user_{usuario_id}",
                {
                    'type': 'notificacao_chegada',
                    'data': data
                }
            )

    def _enviar_push_notification(self, usuario, titulo, mensagem):
        """Envia notificação push via OneSignal"""
        try:
            if not self.onesignal_app_id or not self.onesignal_api_key:
                return False

            # Verifica se usuário tem token de dispositivo
            if hasattr(usuario, 'preferencias') and usuario.preferencias.token_dispositivo:
                url = 'https://onesignal.com/api/v1/notifications'
                payload = {
                    'app_id': self.onesignal_app_id,
                    'include_external_user_ids': [str(usuario.id)],
                    'headings': {'pt': titulo},
                    'contents': {'pt': mensagem},
                    'data': {
                        'tipo': 'cptm_notification',
                        'usuario_id': usuario.id
                    }
                }
                headers = {
                    'Authorization': f'Basic {self.onesignal_api_key}',
                    'Content-Type': 'application/json'
                }
                
                response = requests.post(url, json=payload, headers=headers, timeout=10)
                return response.status_code == 200
        except Exception as e:
            print(f"Erro ao enviar push notification: {e}")
        
        return False

    def marcar_como_lida(self, notificacao_id, usuario):
        """Marca notificação como lida"""
        try:
            notificacao = NotificacaoUsuario.objects.get(
                id=notificacao_id, 
                usuario=usuario
            )
            notificacao.lida = True
            notificacao.save()
            return True
        except NotificacaoUsuario.DoesNotExist:
            return False

    def obter_notificacoes_usuario(self, usuario, apenas_nao_lidas=False):
        """Obtém notificações do usuário"""
        queryset = NotificacaoUsuario.objects.filter(usuario=usuario)
        
        if apenas_nao_lidas:
            queryset = queryset.filter(lida=False)
        
        return queryset.order_by('-criada_em')[:50]  # Últimas 50

# Instância global do serviço
notificacao_service = NotificacaoService()

# Função de compatibilidade
def enviar_notificacao(usuario, mensagem):
    return notificacao_service._enviar_push_notification(usuario, "CPTM Tracker", mensagem)
