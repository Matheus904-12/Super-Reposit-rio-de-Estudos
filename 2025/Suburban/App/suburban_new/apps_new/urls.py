from django.urls import path
from . import views

urlpatterns = [
    path('mapa/', views.mapa, name='mapa'),
    path('api/trens/', views.api_trens, name='api_trens'),
]
