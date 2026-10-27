# 📂 Estrutura do Projeto - PositiveSense

```
tcc/
│
├── 📁 config/                      # Configurações
│   └── site-config.php             # Config centralizada ✨ NOVO
│
├── 📁 components/                  # Componentes reutilizáveis
│   ├── header.php                  # Cabeçalho (✨ documentado)
│   └── footer.php                  # Rodapé (✨ documentado)
│
├── 📁 css/                         # Estilos
│   ├── styles.css                  # CSS principal (1948 linhas)
│   ├── utilities.css               # Classes utilitárias ✨ NOVO
│   ├── jogo-memoria.css            # Estilos jogo da memória
│   └── jogo-emocoes.css            # Estilos jogo de emoções
│
├── 📁 js/                          # Scripts
│   ├── main.js                     # Script principal (✨ documentado)
│   ├── jogo-memoria.js             # Lógica jogo memória (✨ documentado)
│   └── jogo-emocoes.js             # Lógica jogo emoções (✨ documentado)
│
├── 📁 img/                         # Imagens
│   ├── logo.png                    # Logo oficial ✅ ATUALIZADO
│   ├── mascote.png                 # Mascote do projeto
│   ├── p.png                       # Imagem da equipe
│   ├── apoio.png                   # Ícones e ilustrações
│   ├── diagnostico.png
│   ├── educacao.png
│   ├── mercado.png
│   ├── preconceito.png
│   └── ...
│
├── 📁 docs/                        # Documentação ✨ NOVO
│   ├── DEVELOPER.md                # Guia do desenvolvedor
│   └── STYLE_GUIDE.md              # Guia de estilo visual
│
├── 📁 .vscode/                     # Configurações VS Code
│   └── tasks.json                  # Tasks do projeto
│
│
├── 📄 PÁGINAS PRINCIPAIS           # 14 páginas PHP
│   ├── index.php                   # Entry point (✨ documentado)
│   ├── inicial.php                 # Home page
│   ├── sobre.php                   # Página sobre
│   ├── trabalho.php                # Nosso trabalho
│   ├── login.php                   # Login/Cadastro
│   ├── jogo.php                    # Menu de jogos
│   ├── iot.php                     # IoT/Sensor
│   └── ideia.php                   # Origem da ideia
│
├── 📄 JOGOS                        # Páginas de jogos
│   ├── jogo-memoria.php            # Jogo da memória
│   ├── jogo-emocoes.php            # Jogo das emoções
│   ├── cacapalavras.php            # Caça-palavras
│   ├── fruitninja.php              # Fruit ninja
│   ├── jogodasequencia.php         # Jogo da sequência
│   ├── jogodavelha.php             # Jogo da velha
│   └── quebracabeca.php            # Quebra-cabeça
│
├── 📄 CONFIGURAÇÃO
│   ├── partials.php                # Funções compartilhadas (✨ documentado)
│   ├── .editorconfig               # Config formatação ✨ NOVO
│   ├── .gitignore                  # Arquivos ignorados
│   ├── .gitattributes              # Atributos Git
│   └── .htaccess                   # Config Apache
│
└── 📄 DOCUMENTAÇÃO
    ├── README.md                   # Documentação principal ✅ ATUALIZADO
    ├── CHANGELOG.md                # Histórico de mudanças ✨ NOVO
    ├── CONTRIBUTING.md             # Guia de contribuição ✨ NOVO
    ├── QUICK_START.md              # Início rápido
    ├── COMANDOS_UTEIS.md           # Comandos úteis
    ├── HOSPEDAGEM.md               # Guia de hospedagem
    ├── STATUS_DEPLOY.md            # Status do deploy
    ├── SOLUCAO_HTACCESS.md         # Soluções .htaccess
    └── TROUBLESHOOTING_HTACCESS.md # Troubleshooting
```

## 📊 Estatísticas

### Arquivos por Tipo

-   **PHP:** 15 páginas + 3 componentes = 18 arquivos
-   **CSS:** 4 arquivos (~2700 linhas)
-   **JavaScript:** 3 arquivos (~1200 linhas)
-   **Imagens:** 10+ arquivos
-   **Documentação:** 9 arquivos

### Novos Arquivos Criados

1. ✨ `config/site-config.php` - Configuração centralizada
2. ✨ `css/utilities.css` - Classes utilitárias CSS
3. ✨ `docs/DEVELOPER.md` - Guia do desenvolvedor
4. ✨ `docs/STYLE_GUIDE.md` - Guia de estilo
5. ✨ `.editorconfig` - Configuração de formatação
6. ✨ `CHANGELOG.md` - Histórico de versões
7. ✨ `CONTRIBUTING.md` - Guia de contribuição

### Arquivos Atualizados

1. ✅ `components/header.php` - Logo + documentação
2. ✅ `components/footer.php` - Logo + documentação
3. ✅ `partials.php` - Documentação
4. ✅ `index.php` - Documentação
5. ✅ `js/main.js` - Cabeçalho padronizado
6. ✅ `js/jogo-memoria.js` - Documentação completa
7. ✅ `js/jogo-emocoes.js` - Documentação completa
8. ✅ Todas as 14 páginas - Link do Spotify atualizado

## 🎯 Organização por Função

### 🔧 Configuração e Setup

```
config/site-config.php          # Todas as configurações
.editorconfig                   # Formatação de código
.gitignore                      # Arquivos ignorados
```

### 🎨 Frontend

```
css/styles.css                  # Estilos principais
css/utilities.css               # Classes utilitárias
js/main.js                      # Interatividade global
components/                     # Componentes reutilizáveis
```

### 🎮 Jogos

```
jogo-memoria.php                # Página
js/jogo-memoria.js              # Lógica
css/jogo-memoria.css            # Estilos

jogo-emocoes.php
js/jogo-emocoes.js
css/jogo-emocoes.css

... outros jogos
```

### 📚 Documentação

```
README.md                       # Visão geral
docs/DEVELOPER.md               # Para desenvolvedores
docs/STYLE_GUIDE.md             # Design system
CHANGELOG.md                    # Histórico
CONTRIBUTING.md                 # Como contribuir
```

## 🔍 Convenções de Nomenclatura

### Arquivos

-   **Páginas:** `kebab-case.php` (ex: `jogo-memoria.php`)
-   **Componentes:** `kebab-case.php` (ex: `header.php`)
-   **CSS:** `kebab-case.css` (ex: `jogo-memoria.css`)
-   **JS:** `kebab-case.js` (ex: `jogo-emocoes.js`)
-   **Docs:** `UPPER_SNAKE_CASE.md` (ex: `DEVELOPER.md`)

### Código

-   **PHP Functions:** `snake_case()`
-   **PHP Classes:** `PascalCase`
-   **JS Functions:** `camelCase()`
-   **JS Classes:** `PascalCase`
-   **CSS Classes:** `kebab-case`
-   **CSS IDs:** `camelCase`
-   **CSS Variables:** `--kebab-case`

## 📝 Padrão de Cabeçalhos

### PHP

```php
<?php
/**
 * ========================================
 * POSITIVESENSE - [NOME]
 * ========================================
 *
 * Descrição
 *
 * @author PositiveSense Team
 * @version 1.0
 * @date 2025
 */
```

### JavaScript

```javascript
/**
 * ========================================
 * POSITIVESENSE - [NOME]
 * ========================================
 *
 * Descrição
 *
 * @author PositiveSense Team
 * @version 1.0
 * @date 2025
 */
```

### CSS

```css
/* ==========================================
   POSITIVESENSE - [NOME]
   ==========================================

   Descrição

   @version 1.0
   @date 2025
   ========================================== */
```

## ✅ Checklist de Organização

-   [x] Estrutura de pastas lógica e organizada
-   [x] Configuração centralizada criada
-   [x] Todos os arquivos com cabeçalhos padronizados
-   [x] CSS organizado com seções claras
-   [x] JavaScript documentado com JSDoc
-   [x] PHP documentado com PHPDoc
-   [x] Documentação completa e atualizada
-   [x] Guias para desenvolvedores criados
-   [x] Changelog implementado
-   [x] Guia de contribuição criado
-   [x] .editorconfig para consistência
-   [x] Classes utilitárias CSS separadas
-   [x] Nenhum erro de sintaxe
-   [x] Links atualizados (Spotify, logo)
-   [x] Responsividade 100%

## 🚀 Próximos Passos

1. **Backend**

    - Implementar autenticação real
    - Criar banco de dados
    - API REST para jogos

2. **Features**

    - Mais jogos educativos
    - Sistema de conquistas
    - Painel administrativo

3. **Mobile**
    - App React Native
    - Integração com sensor IoT

---

**Status:** ✅ Projeto 100% organizado e documentado
**Versão:** 1.0.0
**Data:** 31 de outubro de 2025
