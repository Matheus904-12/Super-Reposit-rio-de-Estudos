# 🚀 QUICK START - PositiveSense

## Início Rápido em 3 Passos

### Opção 1: Com Recarga Automática (✨ RECOMENDADO)

1. **Instale a extensão PHP Server**
   - Abra VS Code
   - Pressione `Ctrl+Shift+X`
   - Procure: "PHP Server"
   - Instale (autor: brapifra)

2. **Abra qualquer arquivo .php** (ex: inicial.php)

3. **Inicie o servidor:**
   - Pressione `Ctrl+F2`
   - OU clique direito → "PHP Server: Serve Project"
   - OU `Ctrl+Shift+P` → "PHP Server: Serve Project"

✅ **Pronto!** O navegador abre automaticamente e recarrega quando você salva!

---

### Opção 2: Via Terminal (Recarga Manual)

1. **Abra o terminal PowerShell:**
   ```powershell
   cd C:\app3\TCC-Helo-Ana
   ```

2. **Inicie o servidor:**
   ```powershell
   php -S localhost:8000
   ```

3. **Abra no navegador:**
   - http://localhost:8000

⚠️ Você precisa pressionar F5 no navegador após cada alteração.

---

## 🎯 Páginas Disponíveis

Após iniciar o servidor, acesse:

- **Página Inicial:** http://localhost:8000 ou http://localhost:8000/inicial.php
- **Sobre:** http://localhost:8000/sobre.php
- **Nosso Trabalho:** http://localhost:8000/trabalho.php
- **Jogos:** http://localhost:8000/jogo.php
- **Login:** http://localhost:8000/login.php

### Jogos:
- **Jogo da Memória:** http://localhost:8000/jogo-memoria.php
- **Jogo das Emoções:** http://localhost:8000/jogo-emocoes.php

---

## ⚙️ Atalhos Úteis do VS Code

| Ação | Atalho |
|------|--------|
| Iniciar PHP Server | `Ctrl+F2` |
| Command Palette | `Ctrl+Shift+P` |
| Abrir Extensions | `Ctrl+Shift+X` |
| Terminal | `Ctrl+'` (Ctrl+aspas) |
| Salvar | `Ctrl+S` |
| Salvar Todos | `Ctrl+K S` |
| Fechar Arquivo | `Ctrl+W` |
| Buscar em Arquivos | `Ctrl+Shift+F` |
| Ir para Arquivo | `Ctrl+P` |
| Formatar Documento | `Shift+Alt+F` |

---

## 🔥 Dicas de Desenvolvimento

### 1. Auto Save Ativado
O projeto já está configurado para salvar automaticamente após 1 segundo de inatividade.

### 2. Recarga Automática
Com PHP Server, a página recarrega sozinha quando você salva qualquer arquivo!

### 3. Console do Navegador
Pressione `F12` no navegador para ver erros e logs.

### 4. Editar CSS em Tempo Real
Altere `css/styles.css` e veja as mudanças instantaneamente!

### 5. Validação PHP
O VS Code valida PHP automaticamente. Erros aparecem sublinhados em vermelho.

---

## 🛠️ Comandos Úteis

### Verificar se PHP está instalado:
```powershell
php --version
```

### Verificar erros de sintaxe em um arquivo:
```powershell
php -l arquivo.php
```

### Iniciar em porta diferente:
```powershell
php -S localhost:3000
```

### Ver processos PHP rodando:
```powershell
Get-Process php
```

### Parar servidor PHP (se travou):
```powershell
Stop-Process -Name php -Force
```

---

## 📝 Estrutura de Desenvolvimento

```
Editando um arquivo:
1. Abra o arquivo (Ctrl+P → digite o nome)
2. Faça suas alterações
3. Salve (Ctrl+S)
4. Veja a mudança no navegador (automático com PHP Server!)

Adicionando novo CSS:
1. Abra css/styles.css
2. Adicione suas regras CSS
3. Salve
4. A página recarrega automaticamente

Adicionando novo JavaScript:
1. Adicione código em js/main.js (ou crie novo arquivo)
2. Salve
3. Recarga automática
4. Verifique o console (F12) para erros
```

---

## 🎨 Customizando Cores

Edite as variáveis CSS em `css/styles.css` (início do arquivo):

```css
:root {
    --primary: #4a90e2;      /* Cor principal */
    --secondary: #50c878;    /* Cor secundária */
    --accent: #ff6b6b;       /* Cor de destaque */
    /* ... */
}
```

Salve e veja a mudança instantaneamente!

---

## 🐛 Problemas Comuns

### ❌ "php não é reconhecido como comando"
**Solução:** Adicione PHP ao PATH do Windows ou instale PHP.

### ❌ Porta 8000 já está em uso
**Solução:** Use outra porta: `php -S localhost:3000`

### ❌ Extensão PHP Server não aparece
**Solução:** Certifique-se de instalar a extensão correta (autor: brapifra)

### ❌ Página não recarrega automaticamente
**Solução:** Certifique-se de usar PHP Server extension, não o servidor manual

---

## 📚 Mais Informações

Veja o **README.md** completo para documentação detalhada!

---

## ✅ Checklist Antes de Começar

- [ ] PHP instalado (versão 7.4+)
- [ ] VS Code instalado
- [ ] Extensão "PHP Server" instalada
- [ ] Pasta do projeto aberta no VS Code
- [ ] Pronto para desenvolver! 🎉

---

**Happy Coding! 💻✨**
