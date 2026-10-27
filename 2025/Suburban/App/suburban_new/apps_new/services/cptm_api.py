import requests

# Direto dos Trens API (exemplo de endpoint público)
DIRETO_TRENS_URL = 'https://diretodostrens.com.br/api/v1/lines_status'

def get_cptm_status():
    try:
        response = requests.get(DIRETO_TRENS_URL, timeout=10)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        return {'error': str(e)}
