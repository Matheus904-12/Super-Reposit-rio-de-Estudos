# 🔧 Solução de Problemas - .htaccess

## ❌ Problema: .htaccess não está funcionando

### 🔍 Diagnóstico Rápido

Execute estes testes para identificar o problema:

---

## 1️⃣ Verificar se o .htaccess está sendo lido

### Teste 1: Arquivo existe no lugar certo?
```
✅ Deve estar em: htdocs/.htaccess
❌ NÃO pode estar em: htdocs/public/.htaccess
❌ NÃO pode estar em: .htaccess (raiz do FTP)
```

### Teste 2: Adicione um erro intencional
Adicione no início do .htaccess:
```apache
ErroroDePropósito
```

Se aparecer erro **500** ao acessar o site = ✅ .htaccess está sendo lido!
Se o site funcionar normalmente = ❌ .htaccess NÃO está sendo lido

**Lembre de remover a linha de erro depois!**

---

## 2️⃣ Problemas Comuns e Soluções

### 🚨 Erro 500 - Internal Server Error

#### Causa 1: Módulos não disponíveis
**Solução:** Use versão simplificada do .htaccess

Crie arquivo `.htaccess` APENAS com:
```apache
# Versão Mínima - InfinityFree/000webhost
DirectoryIndex index.php inicial.php
Options -Indexes

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>
```

#### Causa 2: Sintaxe incorreta
**Solução:** Valide online
- Acesse: http://www.htaccesscheck.com/
- Cole seu .htaccess
- Verifique erros

#### Causa 3: Encoding do arquivo
**Solução:** Salve como UTF-8 SEM BOM
```
VS Code:
1. Clique no "UTF-8" na barra inferior
2. Selecione "Save with Encoding"
3. Escolha "UTF-8"
```

---

### 🚨 Páginas PHP mostram código-fonte

#### Solução 1: Servidor não processa PHP
Adicione ao .htaccess:
```apache
AddHandler application/x-httpd-php .php
# OU
AddType application/x-httpd-php .php
# OU (InfinityFree)
AddHandler application/x-httpd-php81 .php
```

#### Solução 2: Extensão do arquivo errada
Verifique se os arquivos terminam com `.php` e não `.php.txt`

---

### 🚨 CSS/JS não carregam

#### Solução: Verificar permissões
```
Arquivos: 644
Pastas: 755
```

No File Manager:
1. Clique direito na pasta
2. "Change Permissions"
3. Defina: 755 para pastas, 644 para arquivos

---

### 🚨 DirectoryIndex não funciona

#### Problema: Página inicial não abre
**Solução A:** Renomeie `inicial.php` para `index.php`

**Solução B:** Use apenas:
```apache
DirectoryIndex index.php
```

**Solução C:** Crie arquivo `index.php` que redireciona:
```php
<?php
header('Location: inicial.php');
exit;
?>
```

---

## 3️⃣ Versões do .htaccess por Provedor

### 📌 InfinityFree

```apache
# .htaccess para InfinityFree
DirectoryIndex index.php inicial.php
Options -Indexes

# PHP 8.1
AddHandler application/x-httpd-php81 .php

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>

# Cache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### 📌 000webhost

```apache
# .htaccess para 000webhost
DirectoryIndex index.php inicial.php
Options -Indexes

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript
</IfModule>
```

### 📌 Hostinger Free

```apache
# .htaccess para Hostinger
DirectoryIndex index.php inicial.php
Options -Indexes
AddDefaultCharset UTF-8
```

---

## 4️⃣ Teste Passo a Passo

### ✅ Teste 1: .htaccess vazio
1. Renomeie .htaccess para .htaccess.bak
2. Crie novo .htaccess vazio
3. Site funciona? Vá para Teste 2

### ✅ Teste 2: Adicionar linha por linha
Adicione UMA linha por vez:
```apache
# Linha 1
DirectoryIndex index.php

# Salve e teste - funciona?
# Adicione próxima linha

Options -Indexes

# Salve e teste - funciona?
# Continue...
```

Quando der erro, você saberá qual linha é o problema.

---

## 5️⃣ Alternativas sem .htaccess

### Opção 1: Renomear arquivo
```
De: inicial.php
Para: index.php
```

### Opção 2: Criar index.php redirecionador
```php
<?php
// index.php
require_once 'inicial.php';
// OU
header('Location: inicial.php');
exit;
?>
```

### Opção 3: Configurar no painel do host
Alguns hosts permitem configurar página inicial no painel:
- InfinityFree: Painel → "General Settings"
- 000webhost: Settings → "General"

---

## 6️⃣ Comandos de Debug

### Verificar módulos Apache disponíveis
Crie arquivo `info.php`:
```php
<?php
phpinfo();
?>
```

Acesse: `http://seusite.com/info.php`
Procure por:
- `Loaded Modules`
- `mod_rewrite`
- `mod_deflate`
- `mod_expires`

**⚠️ DELETE info.php depois!** (segurança)

---

## 7️⃣ .htaccess Ultra Mínimo (Funciona em 99% dos casos)

Se nada funcionar, use esta versão MÍNIMA:

```apache
DirectoryIndex index.php
Options -Indexes
```

**Só isso!** Remova todo o resto.

---

## 8️⃣ Erros Específicos e Soluções

### Erro: "AddHandler not allowed"
**Solução:** Remova linhas com `AddHandler`

### Erro: "Options not allowed"
**Solução:** Remova linha `Options -Indexes`

### Erro: "mod_rewrite not supported"
**Solução:** Remova seção `<IfModule mod_rewrite.c>`

### Erro: "Invalid command 'RewriteEngine'"
**Solução:** Host não suporta mod_rewrite - remova regras de rewrite

---

## 9️⃣ Checklist Final

- [ ] Arquivo está em `htdocs/.htaccess`
- [ ] Nome exato: `.htaccess` (com ponto no início)
- [ ] Encoding: UTF-8 sem BOM
- [ ] Permissões: 644
- [ ] Sem espaços em branco antes de <?php nos arquivos PHP
- [ ] Testado versão mínima (DirectoryIndex + Options)
- [ ] Cache do navegador limpo (Ctrl+Shift+Del)

---

## 🆘 Se NADA Funcionar

### Solução Final: Não usar .htaccess

1. **Delete o .htaccess**
2. **Renomeie inicial.php para index.php**
3. **Atualize links nos outros arquivos:**

```php
// Em partials.php, header.php, etc.
// Troque todos os links:
'inicial.php' → 'index.php'
```

4. **Use index.php como página inicial**

---

## 📞 Suporte do Provedor

Se persistir o erro:

### InfinityFree
- Forum: https://forum.infinityfree.com/
- Ticket: Via painel

### 000webhost
- Chat: No painel
- Forum: https://www.000webhost.com/forum

### Hostinger
- Chat: 24/7
- Ticket: Via painel

---

## 💡 Dica Pro

Para evitar problemas, use a **versão mínima** do .htaccess:

```apache
# Super Simples - Funciona em 99% dos casos
DirectoryIndex index.php
Options -Indexes
AddDefaultCharset UTF-8
```

Adicione funcionalidades extras DEPOIS que o básico funcionar.

---

## 📝 Resumo Rápido

1. ✅ Use versão MÍNIMA primeiro
2. ✅ Teste uma linha por vez
3. ✅ Verifique encoding UTF-8
4. ✅ Confirme permissões (644)
5. ✅ Limpe cache do navegador
6. ✅ Se nada funcionar: renomeie inicial.php → index.php

---

**Última atualização:** 17 de outubro de 2025
