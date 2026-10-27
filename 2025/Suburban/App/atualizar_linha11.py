#!/usr/bin/env python
"""
Script para atualizar posições dos trens da Linha 11-Coral
"""
import os
import django
import random

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cptm_tracker.settings')
django.setup()

from apps.models import Linha, Estacao, Trem

def atualizar_posicoes_linha11():
    print("=== Atualizando posições dos trens da Linha 11-Coral ===")
    
    # Buscar linha 11
    linha11 = Linha.objects.get(numero='11')
    print(f"Linha: {linha11.nome} - Cor: {linha11.cor}")
    
    # Buscar estações da linha 11
    estacoes11 = list(Estacao.objects.filter(linha=linha11))
    print(f"Estações encontradas: {len(estacoes11)}")
    
    # Atualizar posições dos trens
    trens_linha11 = Trem.objects.filter(linha=linha11)
    print(f"Trens encontrados: {trens_linha11.count()}")
    
    for i, trem in enumerate(trens_linha11):
        # Escolher uma estação aleatória para simular posição próxima
        estacao_base = random.choice(estacoes11)
        
        # Adicionar pequena variação para simular movimento entre estações
        lat_offset = random.uniform(-0.003, 0.003)
        lon_offset = random.uniform(-0.003, 0.003)
        
        trem.latitude_atual = estacao_base.latitude + lat_offset
        trem.longitude_atual = estacao_base.longitude + lon_offset
        trem.velocidade = random.randint(20, 60)
        trem.status = random.choice(['operacional', 'operacional', 'operacional', 'atrasado'])
        trem.lotacao = random.choice(['baixa', 'media', 'alta'])
        trem.save()
        
        print(f"  {trem.identificador}: Lat {trem.latitude_atual:.6f}, Lon {trem.longitude_atual:.6f}, Vel: {trem.velocidade}km/h")
    
    print("=== Atualização concluída! ===")

if __name__ == "__main__":
    atualizar_posicoes_linha11()