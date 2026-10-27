import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import User
from .models import Trem, NotificacaoUsuario, PreferenciasUsuario

class TremConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("trens_real_time", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("trens_real_time", self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_type = text_data_json.get('type')
        
        if message_type == 'subscribe_linha':
            linha_id = text_data_json.get('linha_id')
            await self.channel_layer.group_add(f"linha_{linha_id}", self.channel_name)
        elif message_type == 'unsubscribe_linha':
            linha_id = text_data_json.get('linha_id')
            await self.channel_layer.group_discard(f"linha_{linha_id}", self.channel_name)

    async def trem_update(self, event):
        await self.send(text_data=json.dumps({
            'type': 'trem_update',
            'data': event['data']
        }))

    async def linha_update(self, event):
        await self.send(text_data=json.dumps({
            'type': 'linha_update',
            'data': event['data']
        }))

class NotificacaoConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        if self.user.is_authenticated:
            await self.channel_layer.group_add(f"user_{self.user.id}", self.channel_name)
            await self.accept()
        else:
            await self.close()

    async def disconnect(self, close_code):
        if self.user.is_authenticated:
            await self.channel_layer.group_discard(f"user_{self.user.id}", self.channel_name)

    async def notificacao_chegada(self, event):
        await self.send(text_data=json.dumps({
            'type': 'notificacao',
            'data': event['data']
        }))

    async def notificacao_atraso(self, event):
        await self.send(text_data=json.dumps({
            'type': 'notificacao_atraso',
            'data': event['data']
        }))