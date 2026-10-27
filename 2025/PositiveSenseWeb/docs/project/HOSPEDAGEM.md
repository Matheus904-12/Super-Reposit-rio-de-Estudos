# 🌐 Guia de Hospedagem Gratuita - PositiveSense

## 🎯 Opções de Hospedagem Gratuita para PHP

### ✨ Opção 1: InfinityFree (RECOMENDADO para PHP)
**Melhor para projetos PHP simples sem banco de dados**

#### Características:
- ✅ **100% Gratuito** - Sem custos ocultos
- ✅ **PHP 8.x** suportado
- ✅ **MySQL** incluído (se precisar no futuro)
- ✅ **Domínio grátis** (.infinityfreeapp.com)
- ✅ **Sem anúncios forçados**
- ✅ **FTP/File Manager** incluído
- ✅ **SSL grátis** (HTTPS)

#### Como Hospedar:

1. **Acesse:** https://www.infinityfree.com/
2. **Crie uma conta** (gratuita)
3. **Crie um novo site:**
   - Escolha um subdomínio (ex: positivesense.infinityfreeapp.com)
   - Ou conecte seu próprio domínio
4. **Acesse o File Manager ou FTP:**
   - No painel, vá em "File Manager"
   - Navegue até a pasta `htdocs/`
5. **Faça upload dos arquivos:**
   - Upload dos arquivos PHP
   - Upload das pastas (css, js, img, components)
6. **Acesse seu site:**
   - http://seusite.infinityfreeapp.com

#### Limitações:
- Hits diários limitados (50.000/dia - mais que suficiente)
- Sem suporte a aplicações pesadas

---

### ✨ Opção 2: 000webhost (Alternativa Popular)
**Bom para projetos pequenos a médios**

#### Características:
- ✅ **Gratuito** permanentemente
- ✅ **PHP 8.x**
- ✅ **MySQL** incluído
- ✅ **1GB disco** e **10GB banda**
- ✅ **Builder visual** (opcional)
- ⚠️ Mostra pequeno banner de propaganda

#### Como Hospedar:

1. **Acesse:** https://www.000webhost.com/
2. **Crie conta gratuita**
3. **Crie novo website**
4. **Use File Manager:**
   - Upload para pasta `public_html/`
5. **Configure .htaccess** (se necessário):
   ```apache
   DirectoryIndex index.php inicial.php
   ```

---

### ✨ Opção 3: Vercel (Melhor para Sites Estáticos)
**Ideal se converter para HTML estático**

#### Características:
- ✅ **Deploy automático** via Git
- ✅ **HTTPS automático**
- ✅ **Performance excelente**
- ⚠️ **Não suporta PHP diretamente**

#### Como usar (requer conversão):
1. Converta PHP para HTML estático (ou use API routes)
2. Commit no GitHub
3. Conecte GitHub ao Vercel
4. Deploy automático!

**Não recomendado para este projeto** (requer muitas mudanças)

---

### ✨ Opção 4: Hostinger Grátis
**Boa opção com recursos completos**

#### Características:
- ✅ PHP 8.x
- ✅ MySQL
- ✅ 300MB espaço
- ✅ 3GB banda mensal
- ⚠️ Banner de propaganda

---

## 🚀 Recomendação Final

Para o **PositiveSense**, recomendo:

### 🏆 **InfinityFree**
**Por quê?**
- ✅ Totalmente gratuito
- ✅ Sem anúncios intrusivos
- ✅ Suporte completo a PHP
- ✅ Fácil de usar
- ✅ SSL grátis
- ✅ Domínio personalizado possível

---

## 📤 Passo a Passo Detalhado - InfinityFree

### 1️⃣ Criar Conta

1. Vá para: https://www.infinityfree.com/
2. Clique em **"Sign Up"**
3. Preencha:
   - Email
   - Senha
   - Captcha
4. Confirme email

### 2️⃣ Criar Site

1. No painel, clique **"Create Account"**
2. Escolha um subdomínio:
   ```
   positivesense (será: positivesense.infinityfreeapp.com)
   ```
3. Aguarde 2-5 minutos para ativação

### 3️⃣ Acessar File Manager

1. No painel do seu site, clique **"File Manager"**
2. Navegue até: `htdocs/`
3. **Delete** o arquivo `index.html` padrão

### 4️⃣ Upload dos Arquivos

**Opção A - Via File Manager (Recomendado):**

1. No File Manager, clique **"Upload"**
2. Faça upload de:
   ```
   ✅ Todos os arquivos .php (inicial.php, sobre.php, etc.)
   ✅ index.php
   ✅ partials.php
   ```
3. Clique **"New Folder"** e crie:
   ```
   📁 components
   📁 css
   📁 js
   📁 img
   ```
4. Entre em cada pasta e faça upload dos respectivos arquivos

**Opção B - Via FTP:**

1. Use um cliente FTP (FileZilla)
2. Credenciais estão no painel InfinityFree
3. Conecte e faça upload da pasta inteira

### 5️⃣ Configurar (Se Necessário)

Crie um arquivo `.htaccess` em `htdocs/`:

```apache
# Página inicial padrão
DirectoryIndex index.php inicial.php

# Habilitar PHP 8
AddHandler application/x-httpd-php81 .php

# Segurança
Options -Indexes

# Compressão
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

### 6️⃣ Testar

1. Acesse: `http://seusite.infinityfreeapp.com`
2. Teste todas as páginas:
   - Início
   - Sobre
   - Nosso Trabalho
   - Jogos
   - Login

### 7️⃣ Ativar SSL (HTTPS)

1. No painel InfinityFree
2. Vá em **"SSL Certificate"**
3. Clique **"Install SSL"**
4. Aguarde 10-20 minutos
5. Site estará disponível em `https://`

---

## 🔐 Domínio Personalizado (Opcional)

### Usar domínio próprio (.com, .com.br, etc.):

1. **Compre um domínio:**
   - Registro.br (R$40/ano para .br)
   - Namecheap (~$10/ano para .com)
   - Hostinger (~R$15/ano)

2. **Configure DNS:**
   No seu provedor de domínio, aponte para:
   ```
   Tipo: A
   Nome: @
   Valor: (IP fornecido pelo InfinityFree)

   Tipo: CNAME
   Nome: www
   Valor: seusite.infinityfreeapp.com
   ```

3. **Adicione no InfinityFree:**
   - Painel → "Parked Domains"
   - Adicione seu domínio
   - Aguarde propagação (até 48h)

---

## ⚡ Alternativa Rápida: GitHub Pages + PHP Conversor

Se quiser algo mais simples (mas limitado):

1. **Converta PHP para HTML** manualmente
2. **Hospede no GitHub Pages** (gratuito, rápido, HTTPS)
3. **Sem backend** - apenas frontend estático

**Vantagens:**
- ✅ Deploy automático via Git
- ✅ HTTPS gratuito
- ✅ Performance excelente
- ✅ Domínio personalizado grátis

**Desvantagens:**
- ❌ Sem PHP (apenas HTML/CSS/JS)
- ❌ Sem backend/processamento

---

## 📊 Comparação Rápida

| Provedor | PHP | MySQL | SSL | Anúncios | Recomendado |
|----------|-----|-------|-----|----------|-------------|
| **InfinityFree** | ✅ | ✅ | ✅ | Não | ⭐⭐⭐⭐⭐ |
| 000webhost | ✅ | ✅ | ✅ | Pequeno banner | ⭐⭐⭐⭐ |
| Hostinger Free | ✅ | ✅ | ✅ | Banner | ⭐⭐⭐ |
| GitHub Pages | ❌ | ❌ | ✅ | Não | ⭐⭐⭐ (só HTML) |

---

## 🆘 Solução de Problemas

### ❌ Site não abre
- Aguarde 5-10 minutos após criação
- Limpe cache do navegador
- Tente modo anônimo

### ❌ Erro 404 nas páginas
- Verifique se todos os arquivos foram enviados
- Confira nomes dos arquivos (case-sensitive)
- Verifique o .htaccess

### ❌ CSS/JS não carregam
- Verifique se as pastas foram criadas
- Confirme caminhos nos arquivos PHP
- Limpe cache

### ❌ Imagens não aparecem
- Certifique-se de enviar a pasta `img/`
- Verifique nomes dos arquivos
- Use File Manager para confirmar upload

---

## 💡 Dicas Importantes

1. ✅ **Sempre faça backup** antes de fazer upload
2. ✅ **Teste localmente** antes de hospedar
3. ✅ **Use SSL** (HTTPS) sempre que possível
4. ✅ **Mantenha arquivos organizados**
5. ✅ **Monitore uso de recursos**

---

## 🎓 Tutorial em Vídeo

Procure no YouTube:
- "Como hospedar site PHP grátis InfinityFree"
- "InfinityFree tutorial português"
- "Deploy PHP gratuito"

---

## 📞 Suporte

- **InfinityFree Forum:** https://forum.infinityfree.com/
- **Documentação:** https://docs.infinityfree.com/

---

**Boa hospedagem! 🚀**
