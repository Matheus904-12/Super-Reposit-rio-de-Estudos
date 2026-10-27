"""
Configuração de Deploy para CPTM Tracker
Suporte a múltiplos serviços de hosting gratuito
"""

import os
import subprocess
import json
from pathlib import Path

class DeployManager:
    def __init__(self):
        self.project_root = Path(__file__).parent
        self.config = {
            'app_name': 'cptm-tracker',
            'port': 8000,
            'host': '0.0.0.0',
            'debug': False
        }
    
    def setup_ngrok(self):
        """
        Configurar ngrok para domínio temporário gratuito
        """
        print("🚀 Configurando ngrok para acesso público...")
        
        # Verificar se ngrok está instalado
        try:
            subprocess.run(['ngrok', '--version'], check=True, capture_output=True)
            print("✅ ngrok encontrado!")
        except (subprocess.CalledProcessError, FileNotFoundError):
            print("❌ ngrok não encontrado. Instalando...")
            self.install_ngrok()
        
        # Criar arquivo de configuração do ngrok
        ngrok_config = {
            "version": "2",
            "tunnels": {
                "cptm-tracker": {
                    "proto": "http",
                    "addr": f"127.0.0.1:{self.config['port']}",
                    "bind_tls": True,
                    "inspect": False,
                    "subdomain": "cptm-tracker"  # Tentativa de subdomínio personalizado
                }
            }
        }
        
        config_path = self.project_root / 'ngrok.yml'
        with open(config_path, 'w') as f:
            import yaml
            yaml.dump(ngrok_config, f)
        
        print(f"📝 Configuração ngrok criada em: {config_path}")
        return config_path
    
    def install_ngrok(self):
        """
        Instalar ngrok automaticamente
        """
        print("📦 Instalando ngrok...")
        
        # Para Windows
        if os.name == 'nt':
            install_cmd = [
                'powershell', '-Command',
                'Invoke-WebRequest -Uri "https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-windows-amd64.zip" -OutFile "ngrok.zip"; '
                'Expand-Archive -Path "ngrok.zip" -DestinationPath "."; '
                'Remove-Item "ngrok.zip"'
            ]
        else:
            # Para Linux/Mac
            install_cmd = [
                'curl', '-s', 'https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip',
                '-o', 'ngrok.zip', '&&',
                'unzip', 'ngrok.zip', '&&',
                'rm', 'ngrok.zip'
            ]
        
        try:
            subprocess.run(install_cmd, check=True, cwd=self.project_root)
            print("✅ ngrok instalado com sucesso!")
        except subprocess.CalledProcessError:
            print("❌ Erro ao instalar ngrok. Instale manualmente: https://ngrok.com/download")
    
    def setup_railway(self):
        """
        Configurar Railway para deploy gratuito
        """
        print("🚂 Configurando Railway deploy...")
        
        # Criar Procfile para Railway
        procfile_content = f"web: python manage.py runserver 0.0.0.0:$PORT"
        procfile_path = self.project_root / 'Procfile'
        
        with open(procfile_path, 'w') as f:
            f.write(procfile_content)
        
        # Criar railway.json
        railway_config = {
            "build": {
                "builder": "NIXPACKS"
            },
            "deploy": {
                "restartPolicyType": "ON_FAILURE",
                "restartPolicyMaxRetries": 10
            }
        }
        
        railway_path = self.project_root / 'railway.json'
        with open(railway_path, 'w') as f:
            json.dump(railway_config, f, indent=2)
        
        # Criar nixpacks.toml para configuração específica
        nixpacks_content = """
[start]
cmd = 'python manage.py migrate && python manage.py collectstatic --noinput && python manage.py runserver 0.0.0.0:$PORT'

[variables]
NIXPACKS_PYTHON_VERSION = '3.11'
"""
        
        nixpacks_path = self.project_root / 'nixpacks.toml'
        with open(nixpacks_path, 'w') as f:
            f.write(nixpacks_content)
        
        print("✅ Arquivos Railway criados!")
        print("🔗 Para deploy: https://railway.app")
        print("📝 Conecte seu repositório GitHub ao Railway")
        
        return {
            'procfile': procfile_path,
            'config': railway_path,
            'nixpacks': nixpacks_path
        }
    
    def setup_render(self):
        """
        Configurar Render para deploy gratuito
        """
        print("🎨 Configurando Render deploy...")
        
        # Criar render.yaml
        render_config = {
            "services": [
                {
                    "type": "web",
                    "name": "cptm-tracker",
                    "env": "python",
                    "buildCommand": "pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput",
                    "startCommand": "python manage.py runserver 0.0.0.0:$PORT",
                    "plan": "free",
                    "envVars": [
                        {
                            "key": "DJANGO_SETTINGS_MODULE",
                            "value": "cptm_tracker.settings"
                        },
                        {
                            "key": "DEBUG",
                            "value": "False"
                        }
                    ]
                }
            ]
        }
        
        render_path = self.project_root / 'render.yaml'
        with open(render_path, 'w') as f:
            import yaml
            yaml.dump(render_config, f)
        
        print("✅ Arquivo render.yaml criado!")
        print("🔗 Para deploy: https://render.com")
        
        return render_path
    
    def setup_local_tunnel(self):
        """
        Configurar túnel local usando localtunnel
        """
        print("🌐 Configurando Local Tunnel...")
        
        # Instalar localtunnel via npm se disponível
        try:
            subprocess.run(['npm', 'install', '-g', 'localtunnel'], check=True)
            print("✅ LocalTunnel instalado!")
        except (subprocess.CalledProcessError, FileNotFoundError):
            print("❌ npm não encontrado. LocalTunnel requer Node.js")
        
        # Criar script de start
        start_script = f"""
#!/bin/bash
echo "🚀 Iniciando CPTM Tracker..."
python manage.py runserver {self.config['host']}:{self.config['port']} &
SERVER_PID=$!

echo "⏳ Aguardando servidor iniciar..."
sleep 5

echo "🌐 Criando túnel público..."
lt --port {self.config['port']} --subdomain cptm-tracker

echo "🛑 Parando servidor..."
kill $SERVER_PID
"""
        
        script_path = self.project_root / 'start_public.sh'
        with open(script_path, 'w') as f:
            f.write(start_script)
        
        # Tornar executável (Linux/Mac)
        if os.name != 'nt':
            os.chmod(script_path, 0o755)
        
        print(f"📝 Script criado: {script_path}")
        return script_path
    
    def create_docker_config(self):
        """
        Criar configuração Docker para deploy
        """
        print("🐳 Criando configuração Docker...")
        
        # Dockerfile
        dockerfile_content = """FROM python:3.11-slim

WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \\
    gcc \\
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código
COPY . .

# Coletar arquivos estáticos
RUN python manage.py collectstatic --noinput

# Expor porta
EXPOSE 8000

# Comando de start
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
"""
        
        dockerfile_path = self.project_root / 'Dockerfile'
        with open(dockerfile_path, 'w') as f:
            f.write(dockerfile_content)
        
        # Docker Compose
        compose_content = """version: '3.8'

services:
  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DEBUG=False
      - DJANGO_SETTINGS_MODULE=cptm_tracker.settings
    volumes:
      - .:/app
    command: python manage.py runserver 0.0.0.0:8000
"""
        
        compose_path = self.project_root / 'docker-compose.yml'
        with open(compose_path, 'w') as f:
            f.write(compose_content)
        
        print("✅ Arquivos Docker criados!")
        return {
            'dockerfile': dockerfile_path,
            'compose': compose_path
        }
    
    def update_settings_for_production(self):
        """
        Atualizar settings.py para produção
        """
        print("⚙️ Atualizando configurações para produção...")
        
        settings_addition = """

# ========== CONFIGURAÇÕES DE PRODUÇÃO ==========
import os

# Hosts permitidos para deploy
ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost',
    '*.ngrok.io',
    '*.ngrok-free.app',
    '*.railway.app',
    '*.onrender.com',
    '*.herokuapp.com',
    '*.vercel.app',
    '*.netlify.app',
    'cptm-tracker.loca.lt'
]

# CORS para API
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Arquivos estáticos
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Middleware para arquivos estáticos
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Para servir arquivos estáticos
] + MIDDLEWARE

# Configurações de segurança para produção
if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True

# Database para produção (pode usar SQLite mesmo)
if os.environ.get('DATABASE_URL'):
    import dj_database_url
    DATABASES['default'] = dj_database_url.parse(os.environ.get('DATABASE_URL'))

# Logging para produção
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
        },
    },
}
"""
        
        settings_path = self.project_root / 'cptm_tracker' / 'settings.py'
        with open(settings_path, 'a', encoding='utf-8') as f:
            f.write(settings_addition)
        
        print("✅ Configurações de produção adicionadas!")
        return settings_path
    
    def create_requirements_prod(self):
        """
        Criar requirements.txt com dependências de produção
        """
        print("📦 Criando requirements para produção...")
        
        prod_requirements = """Django==5.2.6
djangorestframework==3.14.0
django-cors-headers==4.3.1
whitenoise==6.6.0
requests==2.31.0
channels==4.0.0
channels-redis==4.1.0
dj-database-url==2.1.0
gunicorn==21.2.0
psycopg2-binary==2.9.7
"""
        
        req_path = self.project_root / 'requirements_prod.txt'
        with open(req_path, 'w') as f:
            f.write(prod_requirements)
        
        print(f"✅ Requirements de produção criado: {req_path}")
        return req_path
    
    def deploy_instructions(self):
        """
        Mostrar instruções de deploy
        """
        print("\n" + "="*60)
        print("🚀 INSTRUÇÕES DE DEPLOY - CPTM TRACKER")
        print("="*60)
        
        print("\n📍 OPÇÃO 1 - NGROK (Rápido e fácil):")
        print("1. Execute: python deploy_config.py ngrok")
        print("2. Acesse o link ngrok gerado")
        
        print("\n🚂 OPÇÃO 2 - RAILWAY (Gratuito permanente):")
        print("1. Crie conta em https://railway.app")
        print("2. Conecte seu repositório GitHub")
        print("3. Deploy automático!")
        
        print("\n🎨 OPÇÃO 3 - RENDER (Gratuito permanente):")
        print("1. Crie conta em https://render.com")
        print("2. Conecte repositório GitHub")
        print("3. Use render.yaml criado")
        
        print("\n🌐 OPÇÃO 4 - LOCAL TUNNEL:")
        print("1. Execute: npm install -g localtunnel")
        print("2. Execute: ./start_public.sh")
        
        print("\n🐳 OPÇÃO 5 - DOCKER:")
        print("1. Execute: docker-compose up")
        print("2. Acesse: http://localhost:8000")
        
        print("\n✅ Todos os arquivos de configuração foram criados!")
        print("📁 Verifique os arquivos no diretório do projeto")

def main():
    """
    Função principal para setup de deploy
    """
    import sys
    
    deploy = DeployManager()
    
    if len(sys.argv) > 1:
        option = sys.argv[1].lower()
        
        if option == 'ngrok':
            deploy.setup_ngrok()
        elif option == 'railway':
            deploy.setup_railway()
        elif option == 'render':
            deploy.setup_render()
        elif option == 'tunnel':
            deploy.setup_local_tunnel()
        elif option == 'docker':
            deploy.create_docker_config()
        elif option == 'all':
            print("🔧 Configurando todas as opções de deploy...")
            deploy.setup_ngrok()
            deploy.setup_railway()
            deploy.setup_render()
            deploy.setup_local_tunnel()
            deploy.create_docker_config()
            deploy.update_settings_for_production()
            deploy.create_requirements_prod()
        else:
            print("❌ Opção inválida. Use: ngrok, railway, render, tunnel, docker, ou all")
    else:
        # Configurar tudo por padrão
        deploy.setup_ngrok()
        deploy.setup_railway()
        deploy.setup_render()
        deploy.setup_local_tunnel()
        deploy.create_docker_config()
        deploy.update_settings_for_production()
        deploy.create_requirements_prod()
    
    deploy.deploy_instructions()

if __name__ == '__main__':
    main()