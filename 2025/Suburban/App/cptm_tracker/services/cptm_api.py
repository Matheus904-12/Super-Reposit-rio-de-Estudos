
"""
Integração com APIs da CPTM e simulação de dados de trens em tempo real
"""
import requests
import random
from datetime import datetime, timedelta
from django.conf import settings
import json

# Como a CPTM não possui API pública oficial, vamos usar uma simulação baseada em dados reais
class CPTMAPIService:
    def __init__(self):
        # Dados das linhas da CPTM
        self.linhas_cptm = {
            '7': {'nome': 'Linha 7-Rubi', 'cor': '#FF6347', 'estacoes': [
                'Luz', 'Palmeiras-Barra Funda', 'Água Branca', 'Lapa', 'Piqueri',
                'Pirituba', 'Vila Clarice', 'Jaraguá', 'Perus', 'Caieiras',
                'Franco da Rocha', 'Baltazar Fidélis', 'Francisco Morato', 'Botujuru',
                'Campo Limpo Paulista', 'Várzea Paulista', 'Jundiaí'
            ]},
            '8': {'nome': 'Linha 8-Diamante', 'cor': '#FFD700', 'estacoes': [
                'Júlio Prestes', 'Palmeiras-Barra Funda', 'Lapa', 'Domingos de Moraes',
                'Imperatriz Leopoldina', 'Presidente Altino', 'Osasco', 'Quitaúna',
                'General Miguel Costa', 'Carapicuíba', 'Santa Terezinha', 'Antonio João',
                'Barueri', 'Jardim Belval', 'Jardim Silveira', 'Jandira', 'Sagrado Coração',
                'Engenheiro Cardoso', 'Itapevi', 'Santa Rita', 'Amador Bueno'
            ]},
            '9': {'nome': 'Linha 9-Esmeralda', 'cor': '#2E8B57', 'estacoes': [
                'Osasco', 'Presidente Altino', 'General Miguel Costa', 'Carapicuíba',
                'Amador Bueno', 'Jardim Silveira', 'Jandira', 'Sagrado Coração',
                'Engenheiro Cardoso', 'Itapevi', 'Santa Rita', 'Amador Bueno'
            ]},
            '10': {'nome': 'Linha 10-Turquesa', 'cor': '#9932CC', 'estacoes': [
                'Luz', 'Brás', 'Mooca', 'Ipiranga', 'Tamanduateí', 'São Caetano do Sul',
                'Utinga', 'Prefeito Saladino', 'Santo André', 'Capuava', 'Mauá',
                'Guapituba', 'Ribeirão Pires', 'Rio Grande da Serra'
            ]},
            '11': {'nome': 'Linha 11-Coral', 'cor': '#4169E1', 'estacoes': [
                'Luz', 'Brás', 'Corinthians-Itaquera', 'Dom Bosco', 'José Bonifácio',
                'Guaianases', 'Antonio Gianetti Neto', 'Ferraz de Vasconcelos',
                'Poá', 'Calmon Viana', 'Suzano', 'Jundiapeba', 'Braz Cubas',
                'Mogi das Cruzes', 'Estudantes'
            ]},
            '12': {'nome': 'Linha 12-Safira', 'cor': '#DC143C', 'estacoes': [
                'Brás', 'Tatuapé', 'Engenheiro Goulart', 'USP Leste', 'Comendador Ermelino',
                'São Miguel Paulista', 'Jardim Helena-Vila Mara', 'Itaim Paulista',
                'Jardim Romano', 'Engenheiro Manoel Feio', 'Itaquaquecetuba',
                'Aracaré', 'Calmon Viana'
            ]},
            '13': {'nome': 'Linha 13-Jade', 'cor': '#00FF7F', 'estacoes': [
                'Engenheiro Goulart', 'Guarulhos-Cecap', 'Aeroporto-Guarulhos'
            ]}
        }

    def buscar_status_linhas(self):
        """Simula busca de status de todas as linhas"""
        status_linhas = []
        for numero, dados in self.linhas_cptm.items():
            status = random.choice(['Operação Normal', 'Operação Parcial', 'Velocidade Reduzida'])
            status_linhas.append({
                'linha': numero,
                'nome': dados['nome'],
                'status': status,
                'ultima_atualizacao': datetime.now().isoformat(),
                'cor': dados['cor']
            })
        return status_linhas

    def buscar_status_linha(self, linha):
        """Busca status específico de uma linha"""
        if linha in self.linhas_cptm:
            dados = self.linhas_cptm[linha]
            return {
                'linha': linha,
                'nome': dados['nome'],
                'status': random.choice(['Operação Normal', 'Operação Parcial', 'Velocidade Reduzida']),
                'cor': dados['cor'],
                'estacoes': dados['estacoes'],
                'trens_ativo': random.randint(8, 15),
                'intervalo_medio': f"{random.randint(3, 8)} minutos",
                'ultima_atualizacao': datetime.now().isoformat()
            }
        return None

    def simular_posicao_trens(self, linha):
        """Simula posições de trens em tempo real para uma linha"""
        if linha not in self.linhas_cptm:
            return []
        
        estacoes = self.linhas_cptm[linha]['estacoes']
        trens = []
        
        # Simula 8-12 trens por linha
        num_trens = random.randint(8, 12)
        
        for i in range(num_trens):
            estacao_atual = random.choice(estacoes)
            estacao_atual_idx = estacoes.index(estacao_atual)
            
            # Determina próxima estação
            if estacao_atual_idx < len(estacoes) - 1:
                proxima_estacao = estacoes[estacao_atual_idx + 1]
            else:
                proxima_estacao = estacoes[estacao_atual_idx - 1]
            
            trem = {
                'identificador': f"T{linha}{i+1:02d}",
                'linha': linha,
                'estacao_atual': estacao_atual,
                'proxima_estacao': proxima_estacao,
                'status': random.choice(['operacional', 'operacional', 'operacional', 'atrasado']),
                'lotacao': random.choice(['baixa', 'media', 'alta', 'superlotado']),
                'velocidade': random.randint(0, 80),
                'previsao_chegada': (datetime.now() + timedelta(minutes=random.randint(2, 8))).isoformat(),
                'direcao': random.choice([estacoes[0], estacoes[-1]]),
                'latitude': -23.5505 + random.uniform(-0.1, 0.1),
                'longitude': -46.6333 + random.uniform(-0.1, 0.1)
            }
            trens.append(trem)
        
        return trens

    def buscar_previsao_chegada(self, estacao, linha):
        """Simula previsão de chegada para uma estação específica"""
        previsoes = []
        
        # Simula 2-4 trens chegando
        for i in range(random.randint(2, 4)):
            minutos = random.randint(1, 15)
            previsoes.append({
                'trem_id': f"T{linha}{random.randint(1, 15):02d}",
                'estacao': estacao,
                'linha': linha,
                'previsao_minutos': minutos,
                'previsao_exata': (datetime.now() + timedelta(minutes=minutos)).isoformat(),
                'destino': random.choice(self.linhas_cptm[linha]['estacoes']),
                'lotacao': random.choice(['baixa', 'media', 'alta', 'superlotado']),
                'status': random.choice(['No horário', 'Atrasado 2 min', 'Velocidade reduzida'])
            })
        
        return sorted(previsoes, key=lambda x: x['previsao_minutos'])

    def buscar_alertas_manutencao(self):
        """Simula alertas de manutenção nas linhas"""
        alertas = []
        
        # 30% de chance de ter alertas
        if random.random() < 0.3:
            linha = random.choice(list(self.linhas_cptm.keys()))
            estacoes = self.linhas_cptm[linha]['estacoes']
            
            alerta = {
                'linha': linha,
                'tipo': random.choice(['Manutenção Programada', 'Manutenção Emergencial', 'Obras na Via']),
                'estacao_inicio': random.choice(estacoes),
                'estacao_fim': random.choice(estacoes),
                'inicio': (datetime.now() + timedelta(hours=random.randint(1, 24))).isoformat(),
                'fim': (datetime.now() + timedelta(hours=random.randint(25, 72))).isoformat(),
                'impacto': random.choice(['Operação Parcial', 'Paralisação Total', 'Velocidade Reduzida']),
                'descricao': f"Manutenção na via entre estações para melhoria do sistema."
            }
            alertas.append(alerta)
        
        return alertas

# Instância global do serviço
cptm_service = CPTMAPIService()

# Funções de compatibilidade com o código antigo
def buscar_status_linhas():
    return cptm_service.buscar_status_linhas()

def buscar_status_linha(linha):
    return cptm_service.buscar_status_linha(linha)

def buscar_detalhe_status(id_status):
    # Simulação de detalhamento
    return {
        'id': id_status,
        'detalhes': 'Operação normal em toda a linha.',
        'ultima_verificacao': datetime.now().isoformat()
    }
