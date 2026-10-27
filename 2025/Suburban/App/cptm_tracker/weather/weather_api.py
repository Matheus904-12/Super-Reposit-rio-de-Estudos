"""
Integração com APIs de clima
"""
import requests
from django.conf import settings
from datetime import datetime
import random

class ClimaService:
    def __init__(self):
        self.openweather_api_key = getattr(settings, 'OPENWEATHER_API_KEY', None)
        
        # Coordenadas de São Paulo para consultas gerais
        self.sao_paulo_coords = {
            'lat': -23.5505,
            'lng': -46.6333
        }

    def obter_clima_atual(self, latitude=None, longitude=None):
        """Obtém condições climáticas atuais"""
        if not latitude or not longitude:
            latitude = self.sao_paulo_coords['lat']
            longitude = self.sao_paulo_coords['lng']
        
        if self.openweather_api_key:
            return self._obter_clima_openweather(latitude, longitude)
        else:
            return self._simular_clima()

    def _obter_clima_openweather(self, lat, lng):
        """Usa OpenWeatherMap API"""
        try:
            url = "http://api.openweathermap.org/data/2.5/weather"
            params = {
                'lat': lat,
                'lon': lng,
                'appid': self.openweather_api_key,
                'units': 'metric',
                'lang': 'pt_br'
            }
            
            response = requests.get(url, params=params, timeout=10)
            if response.status_code == 200:
                data = response.json()
                return {
                    'temperatura': data['main']['temp'],
                    'sensacao_termica': data['main']['feels_like'],
                    'umidade': data['main']['humidity'],
                    'pressao': data['main']['pressure'],
                    'vento_velocidade': data['wind']['speed'] * 3.6,  # Convert m/s to km/h
                    'vento_direcao': data['wind'].get('deg', 0),
                    'condicao': data['weather'][0]['main'].lower(),
                    'descricao': data['weather'][0]['description'],
                    'visibilidade': data.get('visibility', 10000) / 1000,  # Convert m to km
                    'chuva_1h': data.get('rain', {}).get('1h', 0),
                    'neve_1h': data.get('snow', {}).get('1h', 0),
                    'atualizado_em': datetime.now().isoformat(),
                    'fonte': 'OpenWeatherMap'
                }
        except Exception as e:
            print(f"Erro ao obter clima OpenWeather: {e}")
        
        return self._simular_clima()

    def _simular_clima(self):
        """Simula dados climáticos para demonstração"""
        condicoes = ['clear', 'clouds', 'rain', 'drizzle', 'thunderstorm', 'mist']
        condicao = random.choice(condicoes)
        
        # Temperatura típica de São Paulo
        temp = random.uniform(15, 30)
        
        return {
            'temperatura': round(temp, 1),
            'sensacao_termica': round(temp + random.uniform(-3, 3), 1),
            'umidade': random.randint(40, 90),
            'pressao': random.randint(1005, 1025),
            'vento_velocidade': round(random.uniform(0, 25), 1),
            'vento_direcao': random.randint(0, 360),
            'condicao': condicao,
            'descricao': self._traduzir_condicao(condicao),
            'visibilidade': round(random.uniform(5, 15), 1),
            'chuva_1h': random.uniform(0, 5) if condicao in ['rain', 'drizzle', 'thunderstorm'] else 0,
            'neve_1h': 0,  # Não neva em São Paulo
            'atualizado_em': datetime.now().isoformat(),
            'fonte': 'Simulação'
        }

    def _traduzir_condicao(self, condicao):
        """Traduz condições climáticas para português"""
        traducoes = {
            'clear': 'Céu limpo',
            'clouds': 'Nublado',
            'rain': 'Chuva',
            'drizzle': 'Garoa',
            'thunderstorm': 'Tempestade',
            'snow': 'Neve',
            'mist': 'Névoa',
            'fog': 'Neblina',
            'haze': 'Neblina'
        }
        return traducoes.get(condicao, condicao.title())

    def verificar_impacto_operacao(self, clima_data):
        """Verifica se as condições climáticas impactam a operação dos trens"""
        impactos = []
        
        # Chuva forte
        if clima_data['chuva_1h'] > 10:
            impactos.append({
                'tipo': 'chuva_forte',
                'severidade': 'alta',
                'descricao': 'Chuva forte pode causar alagamentos e atrasos',
                'recomendacao': 'Verifique condições das estações antes de viajar'
            })
        elif clima_data['chuva_1h'] > 5:
            impactos.append({
                'tipo': 'chuva_moderada',
                'severidade': 'media',
                'descricao': 'Chuva pode causar pequenos atrasos',
                'recomendacao': 'Leve guarda-chuva e considere tempo extra'
            })
        
        # Vento forte
        if clima_data['vento_velocidade'] > 50:
            impactos.append({
                'tipo': 'vento_forte',
                'severidade': 'alta',
                'descricao': 'Ventos fortes podem afetar operação',
                'recomendacao': 'Possíveis reduções de velocidade'
            })
        
        # Tempestade
        if clima_data['condicao'] == 'thunderstorm':
            impactos.append({
                'tipo': 'tempestade',
                'severidade': 'alta',
                'descricao': 'Tempestades podem interromper operação',
                'recomendacao': 'Evite viajar se possível'
            })
        
        # Baixa visibilidade
        if clima_data['visibilidade'] < 5:
            impactos.append({
                'tipo': 'baixa_visibilidade',
                'severidade': 'media',
                'descricao': 'Névoa/neblina pode reduzir velocidade',
                'recomendacao': 'Possíveis atrasos por redução de velocidade'
            })
        
        return impactos

# Instância global do serviço
clima_service = ClimaService()

# Função de compatibilidade
def buscar_clima(lat, lon):
    return clima_service.obter_clima_atual(lat, lon)
