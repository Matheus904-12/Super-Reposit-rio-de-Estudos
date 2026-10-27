# 🚆 CPTM Tracker - Guia de Execução Rápida

## ⚡ Executar o Sistema (5 passos)

### 1. **Instalar Dependências**
```bash
cd "c:\app3\Suburban\App"
pip install -r requirements.txt
```

### 2. **Configurar Banco de Dados**
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py popular_dados
```

### 3. **Iniciar o Servidor**
```bash
python manage.py runserver 0.0.0.0:8000
```

### 4. **Acessar o Sistema**
Abra o navegador em: http://localhost:8000

### 5. **Pronto! ✅**
O sistema está funcionando com:
- ✅ 70 trens simulados em tempo real
- ✅ 68 estações da CPTM
- ✅ 7 linhas operacionais
- ✅ Mapa interativo Google Maps
- ✅ Notificações em tempo real
- ✅ Monitoramento climático
- ✅ Interface responsiva

## 🔧 Solução de Problemas

### **Erro de dependências:**
```bash
pip install --upgrade pip
pip install django channels channels-redis celery redis requests
```

### **Erro de migrações:**
```bash
python manage.py makemigrations apps
python manage.py makemigrations
python manage.py migrate
```

### **Sistema não carrega:**
- Verifique se está na pasta correta: `c:\app3\Suburban\App`
- Confirme que o Python 3.13 está instalado
- Teste se o servidor está rodando: `python manage.py check`

## 📱 Como Usar

1. **Mapa**: Veja trens em tempo real
2. **Estações**: Clique para ver chegadas
3. **Linhas**: Use o menu lateral para filtrar
4. **Notificações**: Clique no sino para configurar
5. **Tema**: Botão para alternar claro/escuro

## 📊 Funcionalidades Ativas

### **Em Tempo Real:**
- Posições GPS dos trens atualizadas a cada 30s
- Chegadas previstas com precisão de minutos
- Status operacional (normal/atrasado/manutenção)
- Níveis de lotação (baixa/média/alta/lotado)

### **Notificações:**
- Chegada de trens favoritos
- Alertas de atraso
- Avisos de manutenção
- Condições climáticas

### **Mapas:**
- Google Maps integrado
- Marcadores das 68 estações
- Posições dos 70 trens
- Rotas das 7 linhas da CPTM
- Zoom automático por linha

### **APIs Disponíveis:**
- `/api/trens/` - Lista de trens
- `/api/linha/{numero}/` - Status por linha
- `/api/estacao/{id}/previsao/` - Previsões de estação
- `/api/clima/` - Condições do tempo
- `/api/rota/` - Calcular rotas

## 🎯 Sistema 100% Operacional

**Status Atual:**
- ✅ Servidor Django rodando
- ✅ Banco de dados populado
- ✅ Simulação de trens ativa
- ✅ WebSockets funcionando
- ✅ APIs respondendo
- ✅ Interface carregando
- ✅ Mapas renderizando
- ✅ Notificações ativas

**Para acessar:** http://localhost:8000

---

*Sistema revolucionário de rastreamento da CPTM desenvolvido com Django + Google Maps*