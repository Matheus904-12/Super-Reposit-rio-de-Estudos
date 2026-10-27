from django.db import models

class Linha(models.Model):
    nome = models.CharField(max_length=100, unique=True)
    cor = models.CharField(max_length=20)
    codigo = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.nome

class Estacao(models.Model):
    nome = models.CharField(max_length=100)
    linha = models.ForeignKey(Linha, on_delete=models.CASCADE, related_name='estacoes')
    latitude = models.FloatField()
    longitude = models.FloatField()
    codigo = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.nome

class Trem(models.Model):
    identificador = models.CharField(max_length=50, unique=True)
    linha = models.ForeignKey(Linha, on_delete=models.CASCADE, related_name='trens')
    lotacao = models.IntegerField()
    status = models.CharField(max_length=50)
    ultima_atualizacao = models.DateTimeField(auto_now=True)
    estacao_atual = models.ForeignKey(Estacao, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.identificador
