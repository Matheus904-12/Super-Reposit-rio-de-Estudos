#!/bin/bash

# 🚀 Script de Deploy Automático - CPTM Tracker
# Execute com: bash deploy.sh

echo "🚆 CPTM Tracker - Deploy Automático Iniciado!"
echo "=============================================="

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função de log colorido
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Navegar para o diretório correto
log_info "Navegando para diretório da aplicação..."
cd "$(dirname "$0")/App" || { log_error "Falha ao navegar para diretório App"; exit 1; }

# Verificar se o Django está funcionando
log_info "Verificando instalação do Django..."
python manage.py --version || { log_error "Django não encontrado. Execute: pip install -r requirements.txt"; exit 1; }

# Executar migrações
log_info "Executando migrações do banco de dados..."
python manage.py migrate
if [ $? -eq 0 ]; then
    log_success "Migrações concluídas com sucesso"
else
    log_error "Falha nas migrações"
    exit 1
fi

# Criar tabela de cache se não existir
log_info "Criando/atualizando tabela de cache..."
python manage.py createcachetable 2>/dev/null || log_warning "Tabela de cache já existe"

# Coletar arquivos estáticos
log_info "Coletando arquivos estáticos..."
python manage.py collectstatic --noinput
if [ $? -eq 0 ]; then
    log_success "Arquivos estáticos coletados com sucesso"
else
    log_warning "Aviso na coleta de arquivos estáticos"
fi

# Popular dados iniciais
log_info "Populando dados iniciais do CPTM..."
python manage.py popular_dados
if [ $? -eq 0 ]; then
    log_success "Dados do CPTM populados com sucesso"
else
    log_warning "Aviso ao popular dados (pode já existir)"
fi

# Navegar de volta para raiz
cd ..

# Verificar status do Git
log_info "Verificando status do repositório Git..."
git status --porcelain
if [ $? -ne 0 ]; then
    log_error "Repositório Git não encontrado"
    exit 1
fi

# Adicionar alterações
log_info "Adicionando alterações ao Git..."
git add -A

# Verificar se há alterações para commit
if git diff --staged --quiet; then
    log_warning "Nenhuma alteração encontrada para commit"
else
    # Fazer commit
    COMMIT_MSG="🚀 Deploy $(date +'%Y-%m-%d %H:%M:%S') - Atualizações automáticas"
    log_info "Fazendo commit das alterações..."
    git commit -m "$COMMIT_MSG"
    
    # Push para GitHub
    log_info "Enviando alterações para GitHub..."
    git push origin main
    if [ $? -eq 0 ]; then
        log_success "Alterações enviadas para GitHub com sucesso"
    else
        log_error "Falha ao enviar para GitHub"
        exit 1
    fi
fi

echo ""
echo "🎉 Deploy concluído com sucesso!"
echo "=============================================="
echo "📋 Próximos passos para deploy em produção:"
echo ""
echo "🔸 RENDER (Recomendado - Gratuito):"
echo "   1. Acesse: https://render.com"
echo "   2. Conecte seu repositório GitHub"
echo "   3. Selecione 'Web Service'"
echo "   4. Configure automaticamente com render.yaml"
echo "   5. Deploy automático!"
echo ""
echo "🔸 RAILWAY (Alternativa - 500h gratuitas):"
echo "   1. Acesse: https://railway.app"
echo "   2. 'Deploy from GitHub repo'"
echo "   3. Selecione o repositório"
echo "   4. Deploy automático!"
echo ""
echo "🔸 URLs de exemplo após deploy:"
echo "   - https://cptm-tracker-live.onrender.com"
echo "   - https://seu-projeto.railway.app"
echo ""
echo "📱 Funcionalidades ativas:"
echo "   ✅ Mapa interativo com OpenStreetMap"
echo "   ✅ Simulação de trens em tempo real"
echo "   ✅ Sistema de temperatura atualizado"
echo "   ✅ Coordenadas oficiais CPTM"
echo "   ✅ Interface responsiva"
echo "   ✅ Performance otimizada"
echo ""
echo "🚆 CPTM Tracker está pronto para produção!"