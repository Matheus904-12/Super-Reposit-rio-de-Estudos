from django.urls import path
from . import views

app_name = 'apps'

urlpatterns = [
    # Páginas principais
    path('', views.mapa, name='mapa'),
    path('mapa/', views.mapa, name='mapa_alt'),
    path('dashboard/', views.dashboard, name='dashboard'),
    
    # APIs REST
    path('api/trens/', views.api_trens, name='api_trens'),
    path('api/estacoes/', views.api_estacoes, name='api_estacoes'),
    path('api/linha/<str:linha_numero>/', views.api_status_linha, name='api_status_linha'),
    path('api/estacao/<int:estacao_id>/previsao/', views.api_previsao_estacao, name='api_previsao_estacao'),
    path('api/clima/', views.api_clima, name='api_clima'),
    path('api/notificacoes/', views.api_notificacoes, name='api_notificacoes'),
    path('api/rota/', views.api_rota, name='api_rota'),
]
