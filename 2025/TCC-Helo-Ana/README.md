# 🎓 PositiveSense - Plataforma de Inclusão Escolar

![PositiveSense](img/mascote.png)

## 📋 Sobre o Projeto

O **PositiveSense** é uma plataforma web desenvolvida para promover a inclusão escolar através de tecnologia assistiva. O projeto é voltado para estudantes com TEA (Transtorno do Espectro Autista) e oferece recursos educativos, jogos interativos e informações sobre o ecossistema de produtos PositiveSense.

### 🎯 Objetivos

- Criar ambientes mais acolhedores e inclusivos para estudantes com TEA
- Desenvolver ferramentas educativas interativas
- Informar sobre tecnologia assistiva (sensor de som)
- Promover consciência sobre inclusão escolar

## ✨ Funcionalidades

### 🏠 Páginas Principais

- **Início** (`inicial.php`) - Página principal com apresentação do projeto
- **Sobre** (`sobre.php`) - Informações detalhadas sobre o projeto e desafios
- **Nosso Trabalho** (`trabalho.php`) - Projetos desenvolvidos e anúncio do app mobile
- **Jogos** (`jogo.php`) - Menu de jogos educativos
- **Login/Cadastro** (`login.php`) - Autenticação de usuários

### 🎮 Jogos Interativos

#### 1. Jogo da Memória (`jogo-memoria.php`)
- 16 cartas (8 pares)
- Timer e contador de movimentos
- Salvamento automático de progresso
- Registro de melhor tempo
- Interface responsiva com animações

#### 2. Jogo das Emoções (`jogo-emocoes.php`)
- 8 emoções diferentes para reconhecimento
- Sistema de níveis progressivo
- Pontuação e combo
- High score salvo localmente
- Feedback visual e sonoro

---

## 🚀 Como Executar o Projeto

### ✨ Método 1: PHP Server Extension (RECOMENDADO - Recarga Automática!)

Este é o método mais prático para desenvolver, pois **recarrega automaticamente** quando você salva os arquivos.

#### 1️⃣ Instale a extensão PHP Server

1. Abra o **VS Code**
2. Pressione `Ctrl+Shift+X` para abrir Extensions
3. Procure por **"PHP Server"**
4. Instale a extensão do autor: **brapifra**

![PHP Server Extension](https://img.shields.io/badge/VS_Code-PHP_Server-blue)

#### 2️⃣ Use a extensão

**Opção A - Menu de contexto (Mais fácil!):**
1. Abra qualquer arquivo `.php` no VS Code (ex: `inicial.php`)
2. Clique com **botão direito** no editor
3. Selecione **"PHP Server: Serve Project"**
4. O navegador abrirá automaticamente! 🎉

**Opção B - Command Palette:**
1. Pressione `Ctrl+Shift+P`
2. Digite: **"PHP Server: Serve Project"**
3. Pressione Enter

**Opção C - Atalho de teclado:**
1. Com um arquivo PHP aberto, pressione: `Ctrl+F2`
2. O servidor iniciará automaticamente

#### 3️⃣ Edite e veja as mudanças em tempo real

- Faça alterações em qualquer arquivo (PHP, CSS, JS)
- Salve com `Ctrl+S`
- A página **recarrega automaticamente** no navegador! ✨
- Não precisa reiniciar nada!

#### Para parar o servidor:
- Pressione `Ctrl+Shift+P` → Digite "PHP Server: Stop Server"
- Ou simplesmente feche o VS Code

---

### Método 2: Servidor PHP Manual

Use este método se não quiser instalar extensões (mas você terá que recarregar manualmente o navegador).

#### Requisitos
- PHP 7.4 ou superior instalado no PATH

#### Passos

1. **Abra o terminal PowerShell no diretório do projeto:**
   ```powershell
   cd C:\app3\TCC-Helo-Ana
   ```

2. **Inicie o servidor PHP:**
   ```powershell
   php -S localhost:8000
   ```

3. **Acesse no navegador:**
   ```
   http://localhost:8000
   ```
   ou
   ```
   http://localhost:8000/inicial.php
   ```

4. **Para parar o servidor:**
   - Pressione `Ctrl+C` no terminal
   - Ou feche a janela do terminal

#### ⚠️ Importante:
- Você precisa **recarregar manualmente** o navegador (F5) após cada alteração
- Para mudar de porta: `php -S localhost:3000`

---

### Método 3: XAMPP/WAMP (Para Produção Local)

1. **Instale XAMPP ou WAMP**
2. **Copie a pasta do projeto para:**
   - XAMPP: `C:\xampp\htdocs\TCC-Helo-Ana`
   - WAMP: `C:\wamp64\www\TCC-Helo-Ana`
3. **Inicie o Apache no painel do XAMPP/WAMP**
4. **Acesse:** `http://localhost/TCC-Helo-Ana`

---

## 📁 Estrutura do Projeto

```
TCC-Helo-Ana/
├── 📄 index.php              # Redirecionamento para inicial.php
├── 📄 inicial.php            # Página principal
├── 📄 sobre.php              # Página sobre o projeto
├── 📄 trabalho.php           # Página nosso trabalho + anúncio do app
├── 📄 login.php              # Página de login/cadastro elegante
├── 📄 jogo.php               # Menu de jogos
├── 📄 jogo-memoria.php       # Jogo da memória interativo
├── 📄 jogo-emocoes.php       # Jogo das emoções
├── 📄 partials.php           # Wrappers de componentes
│
├── 📁 components/            # Componentes reutilizáveis
│   ├── header.php            # Cabeçalho com navegação
│   └── footer.php            # Rodapé com ícones Font Awesome
│
├── 📁 css/                   # Estilos
│   ├── styles.css            # Estilo principal (1800+ linhas)
│   ├── jogo-memoria.css      # Estilos do jogo da memória
│   └── jogo-emocoes.css      # Estilos do jogo das emoções
│
├── 📁 js/                    # Scripts
│   ├── main.js               # Script principal (menu, scroll)
│   ├── jogo-memoria.js       # Lógica do jogo da memória
│   └── jogo-emocoes.js       # Lógica do jogo das emoções
│
├── 📁 img/                   # Imagens e recursos
│   ├── download 2.png        # Logo PositiveSense
│   ├── mascote.png           # Mascote do projeto
│   └── ...                   # Outras imagens
│
└── 📄 README.md              # Este arquivo
```

## 🎨 Tecnologias Utilizadas

### Backend
- **PHP 8.x** - Renderização server-side
- Componentização com funções PHP reutilizáveis

### Frontend
- **HTML5** - Marcação semântica e acessível
- **CSS3** - Estilização moderna com:
  - CSS Custom Properties (variáveis CSS)
  - Flexbox e Grid Layout
  - Animações e transições suaves
  - Glassmorphism effects
  - Gradientes modernos
- **JavaScript (Vanilla)** - Interatividade sem frameworks:
  - Classes ES6
  - LocalStorage API para persistência
  - Fetch API para imagens (Picsum Photos)

### Bibliotecas Externas
- **Font Awesome 6.4.0** - Biblioteca de ícones
- **Picsum Photos API** - Imagens dinâmicas para jogos
- **Google Fonts** - Poppins e Inter

### Design System
- Mobile-first responsive design
- Breakpoints: 968px, 640px
- Paleta de cores: Roxo/Azul (#667eea, #764ba2)
- Tipografia escalável e legível

## 🎮 Detalhes dos Jogos

### Jogo da Memória
- **16 cartas** (8 pares) com imagens aleatórias
- **Timer** com contagem progressiva
- **Contador de movimentos** para desafio
- **Salvamento automático** via localStorage
- **Registro de melhor tempo** persistente
- **Animações 3D** nas cartas (flip effect)
- **Feedback visual** ao acertar/errar
- **Responsivo** - funciona em mobile e desktop

### Jogo das Emoções
- **8 emoções diferentes:** Feliz, Triste, Bravo, Surpreso, Assustado, Nojento, Envergonhado, Confuso
- **5 níveis de dificuldade** progressiva
- **Sistema de pontuação** com multiplicador
- **Combo system** para acertos consecutivos
- **High score** salvo em localStorage
- **Contador de acertos** por sessão
- **Feedback imediato** com animações
- **Interface intuitiva** e colorida

## 🔧 Personalização

### Variáveis CSS (Fácil de Customizar)

Edite o arquivo `css/styles.css` no início para alterar as cores do tema:

```css
:root {
    /* Cores Principais */
    --primary: #4a90e2;          /* Azul principal */
    --primary-dark: #357abd;     /* Azul escuro */
    --secondary: #50c878;        /* Verde */
    --accent: #ff6b6b;           /* Vermelho destaque */

    /* Texto */
    --text-primary: #2c3e50;     /* Texto principal */
    --text-secondary: #546e7a;   /* Texto secundário */
    --text-muted: #95a5a6;       /* Texto suave */

    /* Backgrounds */
    --bg-primary: #f8f9fa;       /* Fundo claro */
    --bg-secondary: #ffffff;     /* Fundo branco */
    --bg-accent: #e9ecef;        /* Fundo destaque */

    /* Espaçamentos */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 2rem;
    --spacing-xl: 4rem;

    /* Border Radius */
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 20px;

    /* Outros */
    --max-width: 1200px;
    --transition: all 0.3s ease;
}
```

## 📱 Responsividade

O site é **totalmente responsivo** e se adapta a todos os tamanhos de tela:

| Dispositivo | Largura | Layout |
|-------------|---------|--------|
| **Desktop** | > 968px | Grid completo, menu horizontal |
| **Tablet** | 640px - 968px | Grid 2 colunas, menu adaptado |
| **Mobile** | < 640px | Coluna única, menu hamburguer |

✅ Todas as páginas e jogos funcionam perfeitamente em mobile!

## 🔒 Observações de Segurança

> ⚠️ **Atenção:** Este é um projeto educacional/demonstrativo.
>
> Para uso em **produção real**, implemente:
>
> - ✅ Validação de formulários no backend (filter_var, htmlspecialchars)
> - ✅ Prepared statements para queries SQL (PDO/MySQLi)
> - ✅ Proteção CSRF (tokens)
> - ✅ Hash de senhas (password_hash/password_verify)
> - ✅ HTTPS obrigatório
> - ✅ Rate limiting para prevenir ataques
> - ✅ Sanitização de inputs
> - ✅ Content Security Policy (CSP)

## 🎯 Próximos Passos / Roadmap

- [ ] **Backend de Autenticação** - Sistema completo de login/registro
- [ ] **Banco de Dados** - MySQL para usuários e progresso
- [ ] **Mais Jogos** - Quiz, Quebra-cabeça, Colorir
- [ ] **Sistema de Conquistas** - Badges e recompensas
- [ ] **Dashboard de Progresso** - Acompanhamento de desempenho
- [ ] **Aplicativo Mobile** - React Native ou Flutter
- [ ] **Integração com Sensor** - API para sensor de som real
- [ ] **Painel Admin** - Gerenciamento de conteúdo
- [ ] **Testes Automatizados** - PHPUnit, Jest
- [ ] **Modo Escuro** - Toggle dark/light theme

## 👥 Equipe

**Projeto TCC - PositiveSense**

Desenvolvido com 💜 para promover **inclusão e educação acessível**.

---

## 🆘 Solução de Problemas

### ❌ O servidor não inicia

```powershell
# Verifique se o PHP está instalado
php --version

# Se não aparecer a versão, instale o PHP:
# Download: https://windows.php.net/download/

# Verifique se a porta 8000 está ocupada
netstat -ano | findstr :8000

# Se estiver ocupada, use outra porta
php -S localhost:3000
```

### ❌ Páginas não carregam corretamente

- ✅ Verifique se todos os arquivos estão na pasta correta
- ✅ Confirme que o servidor está rodando (veja mensagem no terminal)
- ✅ Limpe o cache do navegador (`Ctrl+Shift+Del`)
- ✅ Abra o console do navegador (`F12`) e verifique erros
- ✅ Tente acessar `http://localhost:8000/inicial.php` diretamente

### ❌ Jogos não salvam progresso

- ✅ Verifique se o localStorage está habilitado no navegador
- ✅ Não use modo anônimo/privado (localStorage é desabilitado)
- ✅ Limpe o localStorage se necessário:
  - Abra o console (`F12`)
  - Vá em: Application → Local Storage
  - Delete os itens antigos

### ❌ Imagens não aparecem

- ✅ Verifique se a pasta `img/` existe na raiz do projeto
- ✅ Confirme os nomes dos arquivos (case-sensitive em alguns sistemas)
- ✅ Os jogos usam a **Picsum Photos API** - verifique conexão com internet
- ✅ Verifique o console (`F12`) para erros 404

### ❌ PHP Server Extension não funciona

```powershell
# Verifique se o PHP está no PATH
php --version

# Se não funcionar, configure manualmente no VS Code:
# 1. File → Preferences → Settings
# 2. Pesquise: "php.executablePath"
# 3. Adicione o caminho completo: "C:\\php\\php.exe"
```

### ❌ Erro "Cannot modify header information"

- Esse erro ocorre se houver espaço/texto antes de `<?php`
- Verifique se não há BOM (Byte Order Mark) nos arquivos
- Use `UTF-8 without BOM` como encoding

### ❌ CSS não carrega ou está desatualizado

```powershell
# Limpe o cache do navegador (Hard Refresh)
Ctrl+Shift+R  # (Chrome/Edge)
Ctrl+F5       # (Firefox)

# Ou limpe completamente
Ctrl+Shift+Del → Marque "Cached images and files"
```

---

## 📞 Suporte e Contribuição

Para dúvidas ou problemas:

1. ✅ Verifique a seção **"Solução de Problemas"** acima
2. ✅ Revise a documentação do código (comentários inline nos arquivos)
3. ✅ Consulte a documentação oficial:
   - PHP Server: https://marketplace.visualstudio.com/items?itemName=brapifra.phpserver
   - PHP Manual: https://www.php.net/manual/pt_BR/
   - Font Awesome: https://fontawesome.com/docs

---

## 🚀 Quick Start (Copiar e Colar)

**Para iniciar rapidamente com recarga automática:**

```
1. Instale a extensão "PHP Server" no VS Code (Ctrl+Shift+X)
2. Abra qualquer arquivo .php
3. Pressione Ctrl+F2 ou botão direito → "PHP Server: Serve Project"
4. Pronto! Edite e salve para ver as mudanças automaticamente 🎉
```

**Ou via terminal (recarga manual):**
```powershell
cd C:\app3\TCC-Helo-Ana
php -S localhost:8000
# Acesse: http://localhost:8000
```

---

## 📚 Recursos Adicionais

- [Documentação PHP](https://www.php.net/manual/pt_BR/)
- [MDN Web Docs](https://developer.mozilla.org/pt-BR/)
- [CSS-Tricks](https://css-tricks.com/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [Can I Use](https://caniuse.com/) - Compatibilidade de recursos web

---

## 📊 Estatísticas do Projeto

- **Total de Páginas:** 8 páginas PHP
- **Linhas de CSS:** ~2500 linhas
- **Linhas de JavaScript:** ~1000 linhas
- **Componentes:** 2 (header, footer)
- **Jogos Interativos:** 2 completos
- **Totalmente Responsivo:** ✅
- **Acessibilidade:** ARIA labels implementados
- **Performance:** Otimizado para carregamento rápido

---

**Última atualização:** Outubro 2025
**Versão:** 1.0.0
**Status:** ✅ Projeto Completo e Funcional
