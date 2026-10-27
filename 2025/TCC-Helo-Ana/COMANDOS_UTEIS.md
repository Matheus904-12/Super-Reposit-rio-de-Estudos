# 🔧 Comandos Úteis para Desenvolvimento - PositiveSense

## 🚀 Servidor PHP

### Iniciar servidor na porta 8000
```powershell
php -S localhost:8000
```

### Iniciar em outra porta
```powershell
php -S localhost:3000
```

### Iniciar e abrir navegador automaticamente
```powershell
php -S localhost:8000; Start-Process http://localhost:8000
```

---

## ✅ Validação PHP

### Validar sintaxe de um arquivo específico
```powershell
php -l login.php
```

### Validar todos os arquivos PHP do projeto
```powershell
Get-ChildItem -Path *.php -Recurse | Where-Object { $_.DirectoryName -notmatch '.history' } | ForEach-Object { php -l $_.FullName }
```

### Validar apenas páginas principais
```powershell
php -l inicial.php; php -l sobre.php; php -l trabalho.php; php -l login.php; php -l jogo.php
```

---

## 🔍 Informações do Sistema

### Ver versão do PHP
```powershell
php --version
```

### Ver informações completas do PHP
```powershell
php -i
```

### Ver módulos instalados
```powershell
php -m
```

---

## 🛑 Gerenciamento de Processos

### Ver processos PHP rodando
```powershell
Get-Process php
```

### Parar todos os servidores PHP
```powershell
Stop-Process -Name php -Force
```

### Parar processo específico por PID
```powershell
Stop-Process -Id 12345 -Force
```

### Ver qual processo está usando a porta 8000
```powershell
netstat -ano | findstr :8000
```

---

## 📊 Estatísticas do Projeto

### Contar arquivos PHP
```powershell
(Get-ChildItem -Path *.php -Recurse -Exclude 'partials.php' | Measure-Object).Count
```

### Contar linhas de código PHP
```powershell
(Get-Content *.php | Measure-Object -Line).Lines
```

### Contar linhas de CSS
```powershell
(Get-Content css/*.css | Measure-Object -Line).Lines
```

### Contar linhas de JavaScript
```powershell
(Get-Content js/*.js | Measure-Object -Line).Lines
```

### Estatísticas completas
```powershell
Write-Host "📊 Estatísticas do Projeto PositiveSense" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PHP files: $((Get-ChildItem -Path *.php -Recurse | Measure-Object).Count)" -ForegroundColor Green
Write-Host "CSS files: $((Get-ChildItem -Path css/*.css | Measure-Object).Count)" -ForegroundColor Green
Write-Host "JS files: $((Get-ChildItem -Path js/*.js | Measure-Object).Count)" -ForegroundColor Green
Write-Host "Images: $((Get-ChildItem -Path img/* | Measure-Object).Count)" -ForegroundColor Green
```

---

## 🧹 Limpeza

### Limpar arquivos temporários
```powershell
Remove-Item -Path ".history" -Recurse -Force -ErrorAction SilentlyContinue
```

### Limpar logs do PHP (se houver)
```powershell
Remove-Item -Path "*.log" -Force -ErrorAction SilentlyContinue
```

---

## 🌐 Navegador

### Abrir no navegador padrão
```powershell
Start-Process http://localhost:8000
```

### Abrir página específica
```powershell
Start-Process http://localhost:8000/inicial.php
```

### Abrir múltiplas páginas (teste)
```powershell
Start-Process http://localhost:8000/inicial.php
Start-Process http://localhost:8000/sobre.php
Start-Process http://localhost:8000/trabalho.php
Start-Process http://localhost:8000/login.php
```

---

## 📁 Navegação

### Ir para pasta do projeto
```powershell
cd C:\app3\TCC-Helo-Ana
```

### Listar arquivos PHP
```powershell
Get-ChildItem -Path *.php
```

### Listar estrutura do projeto
```powershell
tree /F
```

### Procurar arquivo por nome
```powershell
Get-ChildItem -Recurse -Filter "styles.css"
```

---

## 🔄 Git (se usar controle de versão)

### Ver status
```powershell
git status
```

### Adicionar todos os arquivos
```powershell
git add .
```

### Commit com mensagem
```powershell
git commit -m "Descrição das mudanças"
```

### Ver log
```powershell
git log --oneline
```

---

## 🐛 Debug

### Ver erros do PHP (se houver arquivo de log)
```powershell
Get-Content php_errors.log -Tail 20
```

### Executar arquivo PHP via CLI
```powershell
php inicial.php
```

### Testar conexão de rede
```powershell
Test-NetConnection -ComputerName localhost -Port 8000
```

---

## 📦 Backup Rápido

### Criar backup com data
```powershell
$date = Get-Date -Format "yyyy-MM-dd_HHmmss"
Compress-Archive -Path "C:\app3\TCC-Helo-Ana" -DestinationPath "C:\app3\TCC-Backup-$date.zip"
```

### Copiar projeto para outra pasta
```powershell
Copy-Item -Path "C:\app3\TCC-Helo-Ana" -Destination "C:\Backup\TCC-Helo-Ana" -Recurse
```

---

## 🎨 Dicas de Produtividade

### Abrir VS Code no projeto
```powershell
cd C:\app3\TCC-Helo-Ana
code .
```

### Abrir VS Code e iniciar servidor
```powershell
cd C:\app3\TCC-Helo-Ana; code .; php -S localhost:8000
```

### Criar alias para iniciar projeto rapidamente
```powershell
# Adicione isso ao seu perfil do PowerShell ($PROFILE)
function Start-TCC {
    cd C:\app3\TCC-Helo-Ana
    code .
    php -S localhost:8000
}
```

Depois use apenas:
```powershell
Start-TCC
```

---

## 📝 Notas Importantes

1. **Sempre execute comandos na pasta do projeto**
2. **Use `Ctrl+C` para parar o servidor PHP**
3. **Pressione `F5` no navegador se não usar recarga automática**
4. **Use `php -l` antes de testar para validar sintaxe**
5. **Mantenha backup do projeto regularmente**

---

## 🆘 Comandos de Emergência

### Se o servidor travar:
```powershell
Stop-Process -Name php -Force
php -S localhost:8000
```

### Se a porta estiver ocupada:
```powershell
# Descobrir qual processo usa a porta
netstat -ano | findstr :8000

# Matar o processo (substitua PID pelo número encontrado)
Stop-Process -Id PID -Force

# Ou use outra porta
php -S localhost:3000
```

### Se houver erro de permissão:
```powershell
# Execute PowerShell como Administrador
Start-Process powershell -Verb RunAs
```

---

**Salve este arquivo para consulta rápida!** 📌
