import requests

NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search'

def geocode_address(address):
    params = {
        'q': address,
        'format': 'json',
        'addressdetails': 1,
        'limit': 1,
    }
    try:
        response = requests.get(NOMINATIM_URL, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        if data:
            return data[0]
        return None
    except Exception as e:
        return {'error': str(e)}
