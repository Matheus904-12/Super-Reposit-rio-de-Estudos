#!/usr/bin/env python
"""
Script para simular movimento contínuo dos trens da Linha 11-Coral
"""
import os
import django
import random
import time
import math

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cptm_tracker.settings')
django.setup()

from apps.models import Linha, Estacao, Trem

def calcular_distancia(lat1, lon1, lat2, lon2):
    """Calcula distância entre dois pontos em coordenadas"""
    return math.sqrt((lat2 - lat1)**2 + (lon2 - lon1)**2)

def interpolar_posicao(estacao1, estacao2, progresso):
    """Interpola posição entre duas estações"""
    lat = estacao1.latitude + (estacao2.latitude - estacao1.latitude) * progresso
    lon = estacao1.longitude + (estacao2.longitude - estacao1.longitude) * progresso
    return lat, lon

def simular_movimento_trens():
    print("=== Iniciando simulação de movimento dos trens da Linha 11-Coral ===")
    
    # Buscar dados da linha 11
    linha11 = Linha.objects.get(numero='11')
    estacoes11 = list(Estacao.objects.filter(linha=linha11).order_by('id'))
    trens_linha11 = list(Trem.objects.filter(linha=linha11))
    
    print(f"Linha: {linha11.nome}")
    print(f"Estações: {len(estacoes11)}")
    print(f"Trens: {len(trens_linha11)}")
    
    # Atribuir estado inicial para cada trem
    for i, trem in enumerate(trens_linha11):
        trem.estado_simulacao = {
            'estacao_origem_idx': i % (len(estacoes11) - 1),
            'estacao_destino_idx': (i + 1) % len(estacoes11),
            'progresso': random.uniform(0, 1),
            'velocidade_simulada': random.uniform(0.002, 0.005),  # progressão por iteração
            'direcao': 1 if i % 2 == 0 else -1  # alternada
        }
    
    print("Simulando movimento... (Ctrl+C para parar)")
    
    try:
        iteracao = 0
        while True:
            for trem in trens_linha11:
                estado = trem.estado_simulacao
                
                # Atualizar progresso
                estado['progresso'] += estado['velocidade_simulada']
                
                # Se chegou ao destino, escolher próxima estação
                if estado['progresso'] >= 1.0:
                    estado['progresso'] = 0.0
                    estado['estacao_origem_idx'] = estado['estacao_destino_idx']
                    
                    # Próxima estação baseada na direção
                    proximo_idx = estado['estacao_origem_idx'] + estado['direcao']
                    
                    # Inverter direção se chegou ao fim da linha
                    if proximo_idx >= len(estacoes11):
                        estado['direcao'] = -1
                        proximo_idx = len(estacoes11) - 2
                    elif proximo_idx < 0:
                        estado['direcao'] = 1
                        proximo_idx = 1
                    
                    estado['estacao_destino_idx'] = proximo_idx
                    
                    # Variar velocidade ocasionalmente
                    if random.random() < 0.1:
                        estado['velocidade_simulada'] = random.uniform(0.002, 0.005)
                
                # Calcular posição atual interpolada
                estacao_origem = estacoes11[estado['estacao_origem_idx']]
                estacao_destino = estacoes11[estado['estacao_destino_idx']]
                
                lat, lon = interpolar_posicao(estacao_origem, estacao_destino, estado['progresso'])
                
                # Atualizar trem no banco de dados
                trem.latitude_atual = lat
                trem.longitude_atual = lon
                trem.velocidade = int(40 + estado['velocidade_simulada'] * 10000)  # Convert to km/h aprox
                
                # Simular diferentes status
                if random.random() < 0.05:  # 5% chance de mudança de status
                    trem.status = random.choice(['operacional', 'operacional', 'atrasado', 'operacional'])
                    trem.lotacao = random.choice(['baixa', 'media', 'alta', 'superlotado'])
                
                trem.save()
            
            iteracao += 1
            if iteracao % 10 == 0:
                print(f"Iteração {iteracao}: Trens em movimento...")
                for trem in trens_linha11:
                    estado = trem.estado_simulacao
                    origem = estacoes11[estado['estacao_origem_idx']].nome
                    destino = estacoes11[estado['estacao_destino_idx']].nome
                    print(f"  {trem.identificador}: {origem} → {destino} ({estado['progresso']:.1%})")
            
            time.sleep(2)  # Atualizar a cada 2 segundos
            
    except KeyboardInterrupt:
        print("\n=== Simulação interrompida pelo usuário ===")
    except Exception as e:
        print(f"\n=== Erro na simulação: {e} ===")

if __name__ == "__main__":
    simular_movimento_trens()