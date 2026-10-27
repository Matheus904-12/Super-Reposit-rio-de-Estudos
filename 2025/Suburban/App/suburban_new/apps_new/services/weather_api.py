import requests
import os

OPENWEATHER_API_KEY = os.getenv('OPENWEATHER_API_KEY', 'SUA_API_KEY_OPENWEATHER')
OPENWEATHER_URL = 'https://api.openweathermap.org/data/3.0/onecall'

def get_weather(lat, lon):
    params = {
        'lat': lat,
        'lon': lon,
        'appid': OPENWEATHER_API_KEY,
        'units': 'metric',
        'lang': 'pt_br',
    }
    try:
        response = requests.get(OPENWEATHER_URL, params=params, timeout=10)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        return {'error': str(e)}
