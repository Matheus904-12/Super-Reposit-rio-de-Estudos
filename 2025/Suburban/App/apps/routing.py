from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/trens/$', consumers.TremConsumer.as_asgi()),
    re_path(r'ws/notificacoes/$', consumers.NotificacaoConsumer.as_asgi()),
]