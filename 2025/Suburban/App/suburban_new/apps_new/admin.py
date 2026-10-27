from django.contrib import admin
from .models import Linha, Estacao, Trem

admin.site.register(Linha)
admin.site.register(Estacao)
admin.site.register(Trem)
