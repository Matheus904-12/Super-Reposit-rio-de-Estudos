# CPTM Tracker

Este projeto é um aplicativo Django para rastreamento de trens da CPTM, integrando APIs da CPTM e Google Maps, com funcionalidades de previsão de chegada/saída, visualização em mapa, notificações push, informações de clima, lotação, manutenção e baldeação.

## Funcionalidades
- Rastreamento em tempo real dos trens
- Visualização das linhas e estações no Google Maps
- Notificações push sobre chegada/saída dos trens
- Informações de clima, lotação e manutenção
- Indicação de baldeação

## Como rodar
1. Instale as dependências com `pip install -r requirements.txt`
2. Execute as migrações: `python manage.py migrate`
3. Inicie o servidor: `python manage.py runserver`

## APIs utilizadas
- CPTM (documentação e endpoints serão pesquisados)
- Google Maps (API de mapas e geolocalização)
- OpenWeatherMap (para clima)

## Estrutura inicial
- Django
- Python 3.13+

## Observações
Este projeto está em desenvolvimento e será expandido conforme as integrações forem implementadas.
