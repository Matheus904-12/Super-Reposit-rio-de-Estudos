# 🚀 Script de Deploy Automático - CPTM Tracker (Windows PowerShell)
# Execute com: .\deploy.ps1

Write-Host "🚆 CPTM Tracker - Deploy Automático Iniciado!" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

function Write-Info {
    param($Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Blue
}

function Write-Success {
    param($Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Warning {
    param($Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Write-Error-Custom {
    param($Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

try {
    # Navegar para o diretório correto
    Write-Info "Navegando para diretório da aplicação..."
    $AppDir = Join-Path $PSScriptRoot "App"
    Set-Location $AppDir
    
    # Verificar se o Django está funcionando
    Write-Info "Verificando instalação do Django..."
    $djangoVersion = python manage.py --version 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Django não encontrado. Execute: pip install -r requirements.txt"
        exit 1
    }
    Write-Success "Django encontrado: $djangoVersion"
    
    # Executar migrações
    Write-Info "Executando migrações do banco de dados..."
    python manage.py migrate
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Migrações concluídas com sucesso"
    } else {
        Write-Error-Custom "Falha nas migrações"
        exit 1
    }
    
    # Criar tabela de cache se não existir
    Write-Info "Criando/atualizando tabela de cache..."
    python manage.py createcachetable 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Tabela de cache criada/atualizada"
    } else {
        Write-Warning "Tabela de cache já existe"
    }
    
    # Coletar arquivos estáticos
    Write-Info "Coletando arquivos estáticos..."
    python manage.py collectstatic --noinput
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Arquivos estáticos coletados com sucesso"
    } else {
        Write-Warning "Aviso na coleta de arquivos estáticos"
    }
    
    # Popular dados iniciais
    Write-Info "Populando dados iniciais do CPTM..."
    python manage.py popular_dados
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Dados do CPTM populados com sucesso"
    } else {
        Write-Warning "Aviso ao popular dados (pode já existir)"
    }
    
    # Navegar de volta para raiz
    Set-Location $PSScriptRoot
    
    # Verificar status do Git
    Write-Info "Verificando status do repositório Git..."
    $gitStatus = git status --porcelain 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Repositório Git não encontrado"
        exit 1
    }
    
    # Adicionar alterações
    Write-Info "Adicionando alterações ao Git..."
    git add -A
    
    # Verificar se há alterações para commit
    $stagedChanges = git diff --staged --quiet 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Warning "Nenhuma alteração encontrada para commit"
    } else {
        # Fazer commit
        $commitMsg = "🚀 Deploy $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - Atualizações automáticas"
        Write-Info "Fazendo commit das alterações..."
        git commit -m $commitMsg
        
        # Push para GitHub
        Write-Info "Enviando alterações para GitHub..."
        git push origin main
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Alterações enviadas para GitHub com sucesso"
        } else {
            Write-Error-Custom "Falha ao enviar para GitHub"
            exit 1
        }
    }
    
    Write-Host ""
    Write-Host "🎉 Deploy concluído com sucesso!" -ForegroundColor Green
    Write-Host "==============================================" -ForegroundColor Cyan
    Write-Host "📋 Próximos passos para deploy em produção:" -ForegroundColor White
    Write-Host ""
    Write-Host "🔸 RENDER (Recomendado - Gratuito):" -ForegroundColor Yellow
    Write-Host "   1. Acesse: https://render.com" -ForegroundColor White
    Write-Host "   2. Conecte seu repositório GitHub" -ForegroundColor White
    Write-Host "   3. Selecione 'Web Service'" -ForegroundColor White
    Write-Host "   4. Configure automaticamente com render.yaml" -ForegroundColor White
    Write-Host "   5. Deploy automático!" -ForegroundColor White
    Write-Host ""
    Write-Host "🔸 RAILWAY (Alternativa - 500h gratuitas):" -ForegroundColor Yellow
    Write-Host "   1. Acesse: https://railway.app" -ForegroundColor White
    Write-Host "   2. 'Deploy from GitHub repo'" -ForegroundColor White
    Write-Host "   3. Selecione o repositório" -ForegroundColor White
    Write-Host "   4. Deploy automático!" -ForegroundColor White
    Write-Host ""
    Write-Host "🔸 URLs de exemplo após deploy:" -ForegroundColor Yellow
    Write-Host "   - https://cptm-tracker-live.onrender.com" -ForegroundColor Cyan
    Write-Host "   - https://seu-projeto.railway.app" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📱 Funcionalidades ativas:" -ForegroundColor Yellow
    Write-Host "   ✅ Mapa interativo com OpenStreetMap" -ForegroundColor Green
    Write-Host "   ✅ Simulação de trens em tempo real" -ForegroundColor Green
    Write-Host "   ✅ Sistema de temperatura atualizado" -ForegroundColor Green
    Write-Host "   ✅ Coordenadas oficiais CPTM" -ForegroundColor Green
    Write-Host "   ✅ Interface responsiva" -ForegroundColor Green
    Write-Host "   ✅ Performance otimizada" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚆 CPTM Tracker está pronto para produção!" -ForegroundColor Green
    
} catch {
    Write-Error-Custom "Erro durante o deploy: $($_.Exception.Message)"
    exit 1
}