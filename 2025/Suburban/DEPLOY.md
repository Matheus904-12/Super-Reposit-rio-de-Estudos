# 🚆 CPTM Tracker - Deploy Guide

## 🚀 Opções de Deploy Gratuito

### 1. 🎯 Render (Recomendado)
- **100% Gratuito** com 750 horas/mês
- **Auto-deploy** do GitHub
- **SSL gratuito**
- **URL personalizada**

#### Deploy no Render:
1. Acesse [render.com](https://render.com)
2. Conecte seu repositório GitHub
3. Escolha "Web Service"
4. Configure:
   - **Build Command**: `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput && python manage.py popular_dados`
   - **Start Command**: `python manage.py runserver 0.0.0.0:$PORT`
   - **Environment**: Python 3.11
5. Adicione variáveis de ambiente:
   - `DEBUG=False`
   - `DJANGO_SETTINGS_MODULE=cptm_tracker.settings`
6. Deploy automático!

### 2. 🚂 Railway
- **500 horas gratuitas/mês**
- **Deploy automático**
- **Banco PostgreSQL gratuito**

#### Deploy no Railway:
1. Acesse [railway.app](https://railway.app)
2. "Deploy from GitHub repo"
3. Selecione o repositório
4. Railway detecta automaticamente Django
5. Deploy automático usando `railway.json` e `nixpacks.toml`

### 3. 🌐 Outras Opções
- **Heroku**: Plano gratuito limitado
- **Vercel**: Para aplicações estáticas
- **Fly.io**: 2 máquinas gratuitas

## 🛠️ Arquivos de Configuração

- ✅ `render.yaml` - Configuração Render
- ✅ `Procfile` - Comandos de início
- ✅ `railway.json` - Configuração Railway  
- ✅ `nixpacks.toml` - Build configuration
- ✅ `requirements.txt` - Dependências Python
- ✅ `.gitignore` - Arquivos ignorados
- ✅ `settings.py` - Configurações de produção

## 🔧 Configurações de Produção

### Otimizações Implementadas:
- ✅ **WhiteNoise** para arquivos estáticos
- ✅ **DEBUG=False** em produção
- ✅ **ALLOWED_HOSTS** configurado
- ✅ **Cache em banco** (sem Redis)
- ✅ **Channels In-Memory** (sem Redis)
- ✅ **Logs estruturados**
- ✅ **Compressão de estáticos**

### Variáveis de Ambiente:
```bash
DEBUG=False
DJANGO_SETTINGS_MODULE=cptm_tracker.settings
SECRET_KEY=seu_secret_key_aqui
ALLOWED_HOSTS=.onrender.com,localhost
```

## 📱 Funcionalidades

- 🗺️ **Mapa interativo** com Leaflet/OpenStreetMap
- 🚆 **Simulação de trens** em tempo real
- 🌡️ **Dados climáticos** atualizados
- 📍 **Coordenadas oficiais** CPTM
- 🎨 **Interface moderna** e responsiva
- ⚡ **Performance otimizada**

## 🚀 Deploy Automático

1. **Fork** este repositório
2. **Conecte** no Render ou Railway
3. **Configure** variáveis de ambiente
4. **Deploy** automático!

## 🔗 URLs de Deploy

Após o deploy, sua aplicação estará disponível em:
- Render: `https://seu-app.onrender.com`
- Railway: `https://seu-app.railway.app`

## 💡 Dicas

- **Primeira inicialização** pode demorar 1-2 minutos
- **Sleep mode** após 15min de inatividade (planos gratuitos)
- **Auto-deploy** a cada push no repositório
- **Logs disponíveis** no painel da plataforma

## 🆘 Suporte

Em caso de problemas:
1. Verificar logs da plataforma
2. Confirmar variáveis de ambiente
3. Testar localmente primeiro
4. Verificar `ALLOWED_HOSTS`

---

🚆 **CPTM Tracker** - Sistema de Rastreamento em Tempo Real