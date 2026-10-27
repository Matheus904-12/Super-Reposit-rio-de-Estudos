# 📚 Documentação para Desenvolvedores - PositiveSense

## 📁 Estrutura de Arquivos Atualizada

```
tcc/
├── 📁 config/                    # Configurações
│   └── site-config.php           # Configurações centralizadas
│
├── 📁 components/                # Componentes reutilizáveis
│   ├── header.php                # Cabeçalho do site
│   └── footer.php                # Rodapé do site
│
├── 📁 css/                       # Estilos
│   ├── styles.css                # CSS principal (design system)
│   ├── jogo-memoria.css          # Estilos do jogo da memória
│   └── jogo-emocoes.css          # Estilos do jogo de emoções
│
├── 📁 js/                        # Scripts
│   ├── main.js                   # Script principal
│   ├── jogo-memoria.js           # Lógica do jogo da memória
│   └── jogo-emocoes.js           # Lógica do jogo de emoções
│
├── 📁 img/                       # Imagens
│   ├── logo.png                  # Logo do projeto
│   ├── mascote.png               # Mascote
│   └── ...                       # Outras imagens
│
├── 📁 docs/                      # Documentação
│   └── DEVELOPER.md              # Este arquivo
│
├── 📄 index.php                  # Página inicial (entry point)
├── 📄 inicial.php                # Home page
├── 📄 sobre.php                  # Página sobre
├── 📄 trabalho.php               # Página nosso trabalho
├── 📄 login.php                  # Login/Cadastro
├── 📄 jogo.php                   # Menu de jogos
├── 📄 jogo-memoria.php           # Jogo da memória
├── 📄 jogo-emocoes.php           # Jogo de emoções
├── 📄 partials.php               # Funções compartilhadas
│
└── 📄 .editorconfig              # Configuração do editor
```

## 🎨 Padrões de Código

### PHP

#### Nomenclatura

-   **Arquivos:** `kebab-case.php` (ex: `jogo-memoria.php`)
-   **Funções:** `snake_case` (ex: `render_header()`)
-   **Classes:** `PascalCase` (ex: `MemoryGame`)
-   **Variáveis:** `snake_case` (ex: `$nav_items`)

#### Estrutura de Arquivo PHP

```php
<?php
/**
 * ========================================
 * POSITIVESENSE - [NOME DO COMPONENTE]
 * ========================================
 *
 * Descrição breve do arquivo
 *
 * @author PositiveSense Team
 * @version 1.0
 * @date 2025
 */

// Previne acesso direto (opcional)
if (!defined('POSITIVESENSE')) {
    define('POSITIVESENSE', true);
}

// Código aqui
?>
```

#### Boas Práticas

-   ✅ Sempre use `htmlspecialchars()` para output de variáveis
-   ✅ Use `require_once` ao invés de `require`
-   ✅ Verifique existência de funções com `!function_exists()`
-   ✅ Documente funções com PHPDoc

### CSS

#### Nomenclatura

-   **Classes:** `kebab-case` (ex: `.hero-container`)
-   **IDs:** `camelCase` (ex: `#menuToggle`)
-   **Variáveis CSS:** `--kebab-case` (ex: `--primary-color`)

#### Estrutura CSS

```css
/* ==========================================
   NOME DA SEÇÃO
   ========================================== */

.component-name {
    /* Layout */
    display: flex;
    position: relative;

    /* Box Model */
    width: 100%;
    padding: var(--spacing-md);
    margin: 0 auto;

    /* Visual */
    background: var(--bg-primary);
    border-radius: var(--radius-md);

    /* Typography */
    font-size: 1rem;
    color: var(--text-primary);

    /* Transitions */
    transition: var(--transition);
}
```

#### Ordem de Propriedades

1. Display e Posicionamento
2. Box Model (width, height, padding, margin)
3. Backgrounds e Borders
4. Tipografia
5. Animações e Transições

### JavaScript

#### Nomenclatura

-   **Variáveis/Funções:** `camelCase` (ex: `startGame()`)
-   **Classes:** `PascalCase` (ex: `EmotionGame`)
-   **Constantes:** `UPPER_SNAKE_CASE` (ex: `MAX_CARDS`)

#### Estrutura de Classe JS

```javascript
/**
 * Nome da Classe
 * Descrição do que faz
 */
class GameName {
    /**
     * Construtor
     * Inicializa o jogo
     */
    constructor() {
        // Propriedades
        this.score = 0;
        this.level = 1;

        // Inicializa
        this.init();
    }

    /**
     * Inicializa o jogo
     * @returns {void}
     */
    init() {
        // Código de inicialização
    }
}

// Instancia ao carregar
document.addEventListener("DOMContentLoaded", () => {
    new GameName();
});
```

## 🔧 Configuração Centralizada

### Usando `config/site-config.php`

```php
<?php
// Carrega as configurações
require_once __DIR__ . '/config/site-config.php';

// Obtém informações do site
$site_config = get_site_config();
$nav_items = get_nav_items();
$social_media = get_social_media();
$footer_links = get_footer_links();
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <title><?php echo $site_config['title']; ?></title>
    <meta name="description" content="<?php echo $site_config['description']; ?>">
</head>
```

## 🎯 Como Criar Uma Nova Página

### 1. Crie o arquivo PHP

```php
<?php
/**
 * ========================================
 * POSITIVESENSE - NOME DA PÁGINA
 * ========================================
 */

// Carrega configurações
require_once __DIR__ . '/config/site-config.php';

// Dados específicos da página
$page_title = 'Título da Página';
$page_content = [
    // seus dados aqui
];

// Carrega componentes
require_once __DIR__ . '/partials.php';
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo get_site_config()['name']; ?> - <?php echo $page_title; ?></title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <?php render_header(get_nav_items()); ?>

    <!-- Seu conteúdo aqui -->
    <main>
        <h1><?php echo $page_title; ?></h1>
    </main>

    <?php render_footer(get_footer_links(), get_social_media(), get_site_config()['year']); ?>
</body>
</html>
```

### 2. Adicione ao menu de navegação

Edite `config/site-config.php`:

```php
$GLOBALS['nav_items'] = [
    ['url' => 'index.php', 'label' => 'Início'],
    ['url' => 'sobre.php', 'label' => 'Sobre'],
    ['url' => 'trabalho.php', 'label' => 'Nosso trabalho'],
    ['url' => 'nova-pagina.php', 'label' => 'Nova Página'], // ← ADICIONE AQUI
    ['url' => 'login.php', 'label' => 'Conta']
];
```

## 🎨 Sistema de Design

### Variáveis CSS Disponíveis

```css
/* Cores */
--primary: #5b8fc4; /* Azul principal */
--primary-dark: #4a7aab; /* Azul escuro */
--primary-light: #7ba5d4; /* Azul claro */

/* Backgrounds */
--bg-primary: #ffffff; /* Branco */
--bg-secondary: #f8f9fa; /* Cinza claro */
--bg-accent: #e8eef7; /* Azul claro */

/* Texto */
--text-primary: #2c3e50; /* Texto principal */
--text-secondary: #546e7a; /* Texto secundário */
--text-muted: #78909c; /* Texto suave */

/* Espaçamento */
--spacing-xs: 0.5rem; /* 8px */
--spacing-sm: 1rem; /* 16px */
--spacing-md: 1.5rem; /* 24px */
--spacing-lg: 3rem; /* 48px */
--spacing-xl: 5rem; /* 80px */

/* Border Radius */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 20px;
--radius-xl: 30px;
--radius-full: 9999px;

/* Sombras */
--shadow-sm: 0 2px 6px rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 6px 20px rgba(0, 0, 0, 0.1);
```

### Classes Utilitárias

```html
<!-- Container -->
<div class="container">
    <!-- Limita largura a 1200px e centraliza -->
</div>

<!-- Botões -->
<button class="btn-primary">Primário</button>
<button class="btn-secondary">Secundário</button>

<!-- Cards -->
<div class="card">
    <h3>Título</h3>
    <p>Conteúdo</p>
</div>

<!-- Grid Responsivo -->
<div class="cards-container">
    <!-- Auto-ajusta colunas -->
</div>
```

## 📱 Breakpoints Responsivos

```css
/* Desktop: Padrão (> 968px) */
.elemento {
    grid-template-columns: repeat(3, 1fr);
}

/* Tablet: 640px - 968px */
@media (max-width: 968px) {
    .elemento {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Mobile: < 640px */
@media (max-width: 640px) {
    .elemento {
        grid-template-columns: 1fr;
    }
}
```

## 🎮 Como Criar Um Novo Jogo

### 1. Crie os arquivos

```
css/jogo-novo.css     # Estilos
js/jogo-novo.js       # Lógica
jogo-novo.php         # Página
```

### 2. Estrutura da Página PHP

```php
<?php
require_once __DIR__ . '/config/site-config.php';
require_once __DIR__ . '/partials.php';
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo get_site_config()['name']; ?> - Novo Jogo</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/jogo-novo.css">
</head>
<body>
    <?php render_header(get_nav_items()); ?>

    <main class="game-main">
        <div class="game-header">
            <h1>Nome do Jogo</h1>
        </div>

        <div id="gameContainer">
            <!-- Conteúdo do jogo -->
        </div>
    </main>

    <?php render_footer(get_footer_links(), get_social_media(), get_site_config()['year']); ?>

    <script src="js/jogo-novo.js"></script>
</body>
</html>
```

### 3. Estrutura do JavaScript

```javascript
class NovoJogo {
    constructor() {
        this.score = 0;
        this.init();
    }

    init() {
        this.setupGame();
        this.setupEventListeners();
    }

    setupGame() {
        // Inicializa o jogo
    }

    setupEventListeners() {
        // Eventos do usuário
    }

    saveProgress() {
        localStorage.setItem(
            "novoJogo",
            JSON.stringify({
                score: this.score,
            })
        );
    }

    loadProgress() {
        const saved = localStorage.getItem("novoJogo");
        if (saved) {
            const data = JSON.parse(saved);
            this.score = data.score;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new NovoJogo();
});
```

### 4. Adicione ao Menu de Jogos

Edite `jogo.php` para adicionar o botão do novo jogo.

## 🔍 Debugging

### PHP

```php
// Modo desenvolvimento
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Debug de variável
echo '<pre>';
var_dump($variavel);
echo '</pre>';
```

### JavaScript

```javascript
// Console
console.log("Debug:", variavel);
console.table(array);
console.error("Erro:", erro);

// Breakpoints
debugger; // Pausa execução
```

### CSS

```css
/* Visualizar bordas */
* {
    outline: 1px solid red !important;
}
```

## 📦 LocalStorage (Persistência)

### Salvar Dados

```javascript
// Objeto
localStorage.setItem("chave", JSON.stringify(objeto));

// String
localStorage.setItem("nome", "valor");
```

### Carregar Dados

```javascript
// Objeto
const dados = JSON.parse(localStorage.getItem("chave"));

// String
const valor = localStorage.getItem("nome");
```

### Limpar Dados

```javascript
// Específico
localStorage.removeItem("chave");

// Tudo
localStorage.clear();
```

## 🚀 Performance

### Otimizações Aplicadas

✅ **CSS:**

-   Variáveis CSS para reutilização
-   Animations com `transform` (GPU accelerated)
-   Media queries mobile-first

✅ **JavaScript:**

-   Event delegation
-   Debouncing em scroll events
-   LocalStorage para cache

✅ **Imagens:**

-   Lazy loading com Intersection Observer
-   Imagens otimizadas
-   API externa (Picsum) para jogos

## 🛠️ Ferramentas Recomendadas

### VS Code Extensions

-   **PHP Server** - Servidor local com hot reload
-   **PHP Intelephense** - Autocompletar PHP
-   **ESLint** - Linting JavaScript
-   **Prettier** - Formatação de código
-   **Live Server** - Servidor HTML/CSS/JS

### Browser DevTools

-   **Elements** - Inspecionar HTML/CSS
-   **Console** - Debug JavaScript
-   **Network** - Análise de requests
-   **Application** - LocalStorage
-   **Lighthouse** - Performance audit

## 📝 Checklist para Nova Feature

-   [ ] Criar branch: `git checkout -b feature/nome`
-   [ ] Desenvolver feature
-   [ ] Testar em todos os breakpoints (mobile, tablet, desktop)
-   [ ] Validar acessibilidade (ARIA, keyboard navigation)
-   [ ] Documentar código (comentários)
-   [ ] Testar cross-browser (Chrome, Firefox, Edge)
-   [ ] Commit: `git commit -m "feat: descrição"`
-   [ ] Merge para main

## 🐛 Reportar Bugs

### Template de Issue

```markdown
## Descrição

[Descrição clara do bug]

## Passos para Reproduzir

1. Vá para...
2. Clique em...
3. Veja o erro

## Comportamento Esperado

[O que deveria acontecer]

## Comportamento Atual

[O que acontece]

## Screenshots

[Se aplicável]

## Ambiente

-   OS: Windows 10
-   Browser: Chrome 120
-   Versão: 1.0
```

---

**Última atualização:** Outubro 2025
**Mantenedores:** PositiveSense Team
