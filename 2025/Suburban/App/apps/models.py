from django.db import models
from django.contrib.auth.models import User
from datetime import datetime, timedelta
import uuid

class Linha(models.Model):
    CORES_CHOICES = [
        ('#2E8B57', 'Esmeralda'),  # Linha 9
        ('#FFD700', 'Diamante'),   # Linha 8
        ('#FF6347', 'Rubi'),       # Linha 7
        ('#4169E1', 'Safira'),     # Linha 11
        ('#DC143C', 'Coral'),      # Linha 12
        ('#9932CC', 'Turquesa'),   # Linha 10
        ('#000080', 'Azul'),       # Linha 1
        ('#FF4500', 'Laranja'),    # Linha 6
    ]
    
    nome = models.CharField(max_length=100, unique=True)
    numero = models.CharField(max_length=10, unique=True)
    cor = models.CharField(max_length=20, choices=CORES_CHOICES)
    codigo = models.CharField(max_length=10, unique=True)
    ativa = models.BooleanField(default=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Linha'
        verbose_name_plural = 'Linhas'
        ordering = ['numero']

    def __str__(self):
        return f"Linha {self.numero} - {self.nome}"

class Estacao(models.Model):
    nome = models.CharField(max_length=100)
    linha = models.ForeignKey(Linha, on_delete=models.CASCADE, related_name='estacoes')
    latitude = models.FloatField()
    longitude = models.FloatField()
    codigo = models.CharField(max_length=10, unique=True)
    ordem = models.PositiveIntegerField()  # Ordem na linha
    tem_elevador = models.BooleanField(default=False)
    tem_escada_rolante = models.BooleanField(default=False)
    acessivel = models.BooleanField(default=False)
    baldeacao = models.ManyToManyField('self', blank=True, symmetrical=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Estação'
        verbose_name_plural = 'Estações'
        ordering = ['linha', 'ordem']
        unique_together = [['linha', 'ordem']]

    def __str__(self):
        return f"{self.nome} (Linha {self.linha.numero})"

class Trem(models.Model):
    STATUS_CHOICES = [
        ('operacional', 'Operacional'),
        ('em_manutencao', 'Em Manutenção'),
        ('fora_de_servico', 'Fora de Serviço'),
        ('atrasado', 'Atrasado'),
    ]
    
    LOTACAO_CHOICES = [
        ('baixa', 'Baixa (0-30%)'),
        ('media', 'Média (30-60%)'),
        ('alta', 'Alta (60-85%)'),
        ('superlotado', 'Superlotado (85%+)'),
    ]

    identificador = models.CharField(max_length=50, unique=True)
    linha = models.ForeignKey(Linha, on_delete=models.CASCADE, related_name='trens')
    lotacao = models.CharField(max_length=20, choices=LOTACAO_CHOICES, default='baixa')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='operacional')
    velocidade = models.FloatField(default=0.0)  # km/h
    direcao = models.CharField(max_length=100, blank=True)  # Terminal de destino
    ultima_atualizacao = models.DateTimeField(auto_now=True)
    estacao_atual = models.ForeignKey(Estacao, on_delete=models.SET_NULL, null=True, blank=True)
    proxima_estacao = models.ForeignKey(Estacao, on_delete=models.SET_NULL, null=True, blank=True, related_name='trens_chegando')
    latitude_atual = models.FloatField(null=True, blank=True)
    longitude_atual = models.FloatField(null=True, blank=True)
    previsao_chegada = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = 'Trem'
        verbose_name_plural = 'Trens'
        ordering = ['linha', 'identificador']

    def __str__(self):
        return f"Trem {self.identificador} - {self.linha.nome}"

class HistoricoTrem(models.Model):
    trem = models.ForeignKey(Trem, on_delete=models.CASCADE, related_name='historico')
    estacao = models.ForeignKey(Estacao, on_delete=models.CASCADE)
    chegada = models.DateTimeField()
    partida = models.DateTimeField(null=True, blank=True)
    atrasado = models.BooleanField(default=False)
    tempo_parada = models.DurationField(null=True, blank=True)

    class Meta:
        verbose_name = 'Histórico do Trem'
        verbose_name_plural = 'Históricos dos Trens'
        ordering = ['-chegada']

class NotificacaoUsuario(models.Model):
    TIPO_CHOICES = [
        ('chegada', 'Chegada de Trem'),
        ('atraso', 'Atraso'),
        ('manutencao', 'Manutenção'),
        ('clima', 'Condição Climática'),
        ('baldeacao', 'Baldeação'),
        ('emergencia', 'Emergência'),
    ]

    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notificacoes')
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    titulo = models.CharField(max_length=200)
    mensagem = models.TextField()
    estacao = models.ForeignKey(Estacao, on_delete=models.SET_NULL, null=True, blank=True)
    linha = models.ForeignKey(Linha, on_delete=models.SET_NULL, null=True, blank=True)
    lida = models.BooleanField(default=False)
    enviada = models.BooleanField(default=False)
    criada_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Notificação'
        verbose_name_plural = 'Notificações'
        ordering = ['-criada_em']

class PreferenciasUsuario(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='preferencias')
    estacoes_favoritas = models.ManyToManyField(Estacao, blank=True)
    linhas_favoritas = models.ManyToManyField(Linha, blank=True)
    notificar_chegada = models.BooleanField(default=True)
    notificar_atraso = models.BooleanField(default=True)
    notificar_manutencao = models.BooleanField(default=True)
    notificar_clima = models.BooleanField(default=False)
    token_dispositivo = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name = 'Preferência do Usuário'
        verbose_name_plural = 'Preferências dos Usuários'

class CondiciaoClimatica(models.Model):
    CONDICOES_CHOICES = [
        ('ensolarado', 'Ensolarado'),
        ('nublado', 'Nublado'),
        ('chuvoso', 'Chuvoso'),
        ('tempestade', 'Tempestade'),
        ('nevoa', 'Névoa'),
    ]

    estacao = models.ForeignKey(Estacao, on_delete=models.CASCADE, related_name='condicoes_clima')
    condicao = models.CharField(max_length=20, choices=CONDICOES_CHOICES)
    temperatura = models.FloatField()  # Celsius
    umidade = models.FloatField()  # Porcentagem
    vento = models.FloatField(default=0.0)  # km/h
    impacto_operacao = models.BooleanField(default=False)
    atualizada_em = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Condição Climática'
        verbose_name_plural = 'Condições Climáticas'
        ordering = ['-atualizada_em']

class Manutencao(models.Model):
    TIPO_CHOICES = [
        ('preventiva', 'Preventiva'),
        ('corretiva', 'Corretiva'),
        ('emergencial', 'Emergencial'),
    ]

    STATUS_CHOICES = [
        ('programada', 'Programada'),
        ('em_andamento', 'Em Andamento'),
        ('concluida', 'Concluída'),
        ('cancelada', 'Cancelada'),
    ]

    linha = models.ForeignKey(Linha, on_delete=models.CASCADE, related_name='manutencoes')
    estacao_inicio = models.ForeignKey(Estacao, on_delete=models.CASCADE, related_name='manutencoes_inicio')
    estacao_fim = models.ForeignKey(Estacao, on_delete=models.CASCADE, related_name='manutencoes_fim')
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='programada')
    descricao = models.TextField()
    inicio_programado = models.DateTimeField()
    fim_programado = models.DateTimeField()
    inicio_real = models.DateTimeField(null=True, blank=True)
    fim_real = models.DateTimeField(null=True, blank=True)
    impacto_operacao = models.BooleanField(default=True)
    criada_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Manutenção'
        verbose_name_plural = 'Manutenções'
        ordering = ['-inicio_programado']

class Rota(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rotas')
    nome = models.CharField(max_length=100)
    estacao_origem = models.ForeignKey(Estacao, on_delete=models.CASCADE, related_name='rotas_origem')
    estacao_destino = models.ForeignKey(Estacao, on_delete=models.CASCADE, related_name='rotas_destino')
    ativa = models.BooleanField(default=True)
    criada_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Rota'
        verbose_name_plural = 'Rotas'
        unique_together = [['usuario', 'nome']]
