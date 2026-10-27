# 📚 Documentação Completa - PositiveSense

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Páginas do Site](#páginas-do-site)
5. [Componentes](#componentes)
6. [Sistema de Jogos](#sistema-de-jogos)
7. [Sistema de Autenticação](#sistema-de-autenticação)
8. [Chatbot com IA](#chatbot-com-ia)
9. [Banco de Dados](#banco-de-dados)
10. [Acessibilidade](#acessibilidade)
11. [Configuração e Instalação](#configuração-e-instalação)

---

## 🎯 Visão Geral

**PositiveSense** é uma plataforma educativa interativa focada em auxiliar crianças e adolescentes com Transtorno do Espectro Autista (TEA). O site oferece jogos educativos, recursos de aprendizagem, conteúdo em LIBRAS e um chatbot assistente com inteligência artificial.

### Objetivo Principal

Proporcionar um ambiente seguro, acessível e educativo para o desenvolvimento cognitivo e social de pessoas com TEA.

### Público-Alvo

-   Crianças e adolescentes com TEA
-   Pais e responsáveis
-   Educadores e terapeutas

---

## 📁 Estrutura do Projeto

```
PositiveSense/
├── api/                          # APIs e endpoints
│   └── ai_game_info.php         # API de informações dos jogos
├── components/                   # Componentes reutilizáveis
│   ├── accessibility-panel.php  # Painel de acessibilidade
│   ├── footer.php              # Rodapé do site
│   ├── header.php              # Cabeçalho/navegação
│   └── loading-screen.php      # Tela de carregamento
├── config/                      # Configurações
│   ├── database.php            # Conexão com BD
│   ├── google_oauth.php        # OAuth Google
│   ├── session.php             # Gerenciamento de sessão
│   ├── site-config.php         # Configurações gerais
│   └── site-data.php           # Dados estruturados
├── css/                         # Estilos
│   ├── accessibility.css       # Estilos de acessibilidade
│   ├── chatbot.css            # Estilos do chatbot
│   ├── jogo-memoria.css       # Estilos jogo da memória
│   ├── loading.css            # Estilos de loading
│   ├── styles.css             # Estilos principais
│   └── utilities.css          # Classes utilitárias
├── data/                        # Dados JSON
│   └── ai_knowledge_autismo.json # Base de conhecimento IA
├── database/                    # Scripts de banco de dados
│   ├── migrations_oauth.sql    # Migrations OAuth
│   ├── positivesense.sql      # Schema completo
│   └── README_BD.md           # Documentação BD
├── docs/                        # Documentação
│   └── project/                # Docs do projeto
├── img/                         # Imagens
│   ├── avatars/                # Avatares predefinidos
│   └── games/                  # Imagens dos jogos
├── js/                          # JavaScript
│   ├── accessibility.js        # Recursos de acessibilidade
│   ├── chatbot.js             # Lógica do chatbot
│   ├── jogo-memoria.js        # Lógica jogo da memória
│   ├── libras.js              # Interpretador LIBRAS
│   ├── loading.js             # Loading screen
│   └── main.js                # JavaScript principal
├── lib/                         # Bibliotecas
│   └── ai_knowledge.php        # Processamento IA
├── uploads/                     # Uploads de usuários
│   └── avatars/                # Avatares customizados
└── *.php                        # Páginas PHP
```

---

## 🛠️ Tecnologias Utilizadas

### Frontend

-   **HTML5**: Estruturação semântica
-   **CSS3**: Estilização e animações
    -   Flexbox e Grid Layout
    -   Custom Properties (variáveis CSS)
    -   Media Queries para responsividade
-   **JavaScript ES6+**: Interatividade
    -   Async/Await
    -   Fetch API
    -   LocalStorage
    -   Classes e módulos

### Backend

-   **PHP 8.x**: Lógica do servidor
    -   Sessões
    -   Upload de arquivos
    -   Processamento de formulários
-   **MySQL**: Banco de dados relacional

### APIs e Serviços

-   **Google OAuth 2.0**: Autenticação
-   **VLibras**: Interpretação em LIBRAS
-   **Font Awesome**: Ícones

### Padrões e Arquitetura

-   **MVC Simplificado**: Separação de responsabilidades
-   **Componentização**: Reutilização de código
-   **RESTful**: Endpoints de API

---

## 📄 Páginas do Site

### 1. **index.php** (Landing Page)

-   Página inicial de apresentação
-   Call-to-action para login/registro
-   Apresentação dos recursos

### 2. **inicial.php** (Home Autenticada)

-   Dashboard principal
-   Acesso rápido aos recursos
-   Notícias e atualizações

### 3. **sobre.php**

-   Informações sobre o projeto
-   Missão e valores
-   Equipe

### 4. **trabalho.php**

-   Portfólio de trabalhos
-   Casos de sucesso
-   Metodologia

### 5. **videos.php**

-   Galeria de vídeos educativos
-   Tutoriais
-   Conteúdo didático

### 6. **artigos.php**

-   Blog/artigos educativos
-   Conteúdo sobre TEA
-   Dicas para pais e educadores

### 7. **jogo.php** (Hub de Jogos)

-   Listagem dos 6 jogos disponíveis
-   Cards com preview e descrição
-   Estatísticas de progresso

### 8. **login.php / registro.php**

-   Autenticação de usuários
-   Login tradicional
-   Login com Google OAuth
-   Registro de novos usuários

### 9. **perfil.php**

-   Dados do usuário
-   Upload de avatar
-   Galeria de avatares predefinidos
-   Edição de informações

---

## 🧩 Componentes

### Header (components/header.php)

```php
render_header($nav_items, $user_data = null)
```

-   Navegação responsiva
-   Menu hambúrguer mobile
-   Exibição de usuário logado
-   Integração com sistema de sessão

### Footer (components/footer.php)

```php
render_footer($footer_links, $social_media, $year)
```

-   Links organizados por seções
-   Redes sociais
-   Copyright dinâmico
-   Responsivo

### Painel de Acessibilidade (components/accessibility-panel.php)

```php
render_accessibility_panel()
```

**Recursos:**

-   🔤 Ajuste de tamanho de fonte
-   🎨 Alto contraste
-   📖 Modo de leitura
-   🖱️ Cursor ampliado
-   👁️ Guia de leitura
-   ⌨️ Navegação por teclado
-   🗣️ VLibras (LIBRAS)

### Loading Screen (components/loading-screen.php)

```php
render_loading_screen()
```

-   Animação de carregamento
-   GIF do mascote
-   Fade out automático

---

## 🎮 Sistema de Jogos

### Arquitetura dos Jogos

Todos os jogos seguem uma estrutura padronizada:

**Design Pattern:**

```
- Header comum
- Game container
- Stats (estatísticas)
- Game board (área do jogo)
- Controls (controles)
- Footer comum
```

**Características Comuns:**

-   ✅ Cores padronizadas (#5B8FC4)
-   ✅ Responsivo
-   ✅ Sistema de pontuação
-   ✅ LocalStorage para salvar progresso
-   ✅ Animações suaves
-   ✅ Feedback visual

### 1. Jogo da Memória (jogo-memoria.php)

**Descrição:** Encontre os pares de cartas iguais

**Recursos:**

-   Grid 4x4 (16 cartas, 8 pares)
-   Imagens da API Picsum Photos
-   Animação de flip 3D
-   Contador de movimentos e tempo
-   Sistema de recorde pessoal
-   Modal de vitória

**Arquivos:**

-   `jogo-memoria.php`
-   `css/jogo-memoria.css`
-   `js/jogo-memoria.js`

**Tecnologias:**

-   CSS Grid
-   Transform 3D
-   LocalStorage API
-   Fetch API

### 2. Jogo da Velha (jogodavelha.php)

**Descrição:** Clássico jogo do X vs O

**Recursos:**

-   Modo 2 jogadores
-   Modo contra IA (minimax)
-   Sistema de estatísticas
-   Detecção automática de vitória/empate
-   Animações de marcação

**Lógica IA:**

```javascript
// Algoritmo Minimax
- Avalia todas as jogadas possíveis
- Escolhe a melhor jogada
- Dificuldade ajustável
```

### 3. Jogo da Sequência (jogodasequencia.php)

**Descrição:** Memorize e reproduza sequências

**Recursos:**

-   Sequências crescentes
-   4 cores diferentes
-   Som por cor
-   Níveis progressivos
-   Feedback de erro

### 4. Caça-Palavras (cacapalavras.php)

**Descrição:** Encontre palavras no grid

**Recursos:**

-   Palavras temáticas sobre autismo
-   Busca em 8 direções
-   Dicas visuais
-   Contador de palavras encontradas
-   Tempo cronometrado

### 5. Fruit Ninja (fruitninja.php)

**Descrição:** Corte as frutas que aparecem

**Recursos:**

-   Frutas animadas
-   Sistema de combo
-   Pontuação crescente
-   Game over com bombas
-   Efeitos de corte

### 6. Quebra-Cabeça (quebracabeca.php)

**Descrição:** Monte a imagem do mascote

**Recursos:**

-   3 níveis de dificuldade (3x3, 4x4, 5x5)
-   Imagem customizada (puzzle-mascote.jpg.png)
-   Contador de movimentos
-   Cronômetro
-   Embaralhamento aleatório
-   Detecção automática de vitória

**Algoritmo:**

```javascript
// Sliding Puzzle
- Grid com 1 espaço vazio
- Movimento apenas para adjacentes
- Verificação de estado final
```

---

## 🔐 Sistema de Autenticação

### Fluxos de Autenticação

#### 1. Login Tradicional

```
login.php → processar_login.php → inicial.php
```

**Validações:**

-   Email válido
-   Senha com hash (password_hash)
-   Proteção contra SQL injection
-   Limite de tentativas

#### 2. Login com Google OAuth 2.0

```
login.php → google_auth.php → google_callback.php → inicial.php
```

**Fluxo OAuth:**

1. Usuário clica em "Login com Google"
2. Redirecionamento para Google
3. Autorização pelo usuário
4. Callback com código
5. Troca código por token
6. Obtenção de dados do usuário
7. Criação/login automático

**Arquivos:**

-   `config/google_oauth.php` - Configurações
-   `google_auth.php` - Início do fluxo
-   `google_callback.php` - Processamento do retorno

#### 3. Registro

```
registro.php → processar_registro.php → login.php
```

**Validações:**

-   Email único
-   Senha forte (mínimo 6 caracteres)
-   Confirmação de senha
-   Campos obrigatórios

### Gerenciamento de Sessão

**config/session.php:**

```php
// Funções disponíveis
session_start_custom()      // Inicia sessão segura
is_user_logged_in()        // Verifica login
require_login()            // Força login
get_user_data()           // Obtém dados do usuário
```

**Segurança:**

-   Session fixation protection
-   Regeneração de ID
-   HttpOnly cookies
-   Timeout automático

---

## 🤖 Chatbot com IA

### Arquitetura do Chatbot

**Componentes:**

1. **Frontend (js/chatbot.js)**

    - Interface do chat
    - Gerenciamento de mensagens
    - Comunicação com API

2. **Backend (chatbot_api.php)**

    - Processamento de perguntas
    - Integração com base de conhecimento
    - Geração de respostas

3. **Base de Conhecimento (data/ai_knowledge_autismo.json)**
    - Dados estruturados sobre TEA
    - Perguntas e respostas
    - Contextos e intenções

### Recursos do Chatbot

**Funcionalidades:**

-   💬 Conversação natural
-   📚 Conhecimento sobre autismo
-   🎮 Informações sobre jogos
-   🔍 Busca contextual
-   📱 Interface responsiva

**Tamanho da Janela:**

-   Desktop: 420x600px
-   Mobile: Fullscreen

**Tecnologias:**

-   JavaScript ES6 (Classes)
-   Fetch API
-   JSON para conhecimento
-   PHP para processamento

### Base de Conhecimento

**Estrutura do JSON:**

```json
{
  "intencoes": {
    "saudacao": {
      "padroes": ["olá", "oi", "bom dia"],
      "respostas": ["Olá! Como posso ajudar?"]
    },
    "sobre_autismo": {
      "padroes": ["o que é autismo", "autismo"],
      "respostas": ["O autismo é..."]
    }
  },
  "contextos": {
    "jogos": [...],
    "terapias": [...]
  }
}
```

---

## 💾 Banco de Dados

### Schema Principal

#### Tabela: usuarios

```sql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255),
    avatar VARCHAR(255),
    google_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Campos:**

-   `id`: Identificador único
-   `nome`: Nome completo
-   `email`: Email (único)
-   `senha`: Hash da senha (nullable para OAuth)
-   `avatar`: Caminho do avatar
-   `google_id`: ID do Google OAuth
-   `created_at/updated_at`: Timestamps

#### Índices

```sql
INDEX idx_email (email)
INDEX idx_google_id (google_id)
```

### Conexão com Banco de Dados

**config/database.php:**

```php
<?php
$host = 'localhost';
$dbname = 'positivesense';
$username = 'root';
$password = '';

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
} catch(PDOException $e) {
    die("Erro na conexão: " . $e->getMessage());
}
```

### Migrations

**Localização:** `database/migrations_oauth.sql`

**Como executar:**

1. Acesse phpMyAdmin
2. Selecione o banco `positivesense`
3. Importe o arquivo SQL
4. Execute as migrations

---

## ♿ Acessibilidade

### Recursos Implementados

#### 1. Painel de Acessibilidade

**Atalho:** Botão flutuante no canto inferior esquerdo

**Opções:**

-   🔤 **Tamanho de Fonte:** Aumentar/Diminuir/Resetar
-   🎨 **Alto Contraste:** Ativa cores de alto contraste
-   📖 **Modo Leitura:** Simplifica layout para leitura
-   🖱️ **Cursor Grande:** Aumenta tamanho do cursor
-   👁️ **Guia de Leitura:** Linha guia para leitura
-   ⌨️ **Navegação Teclado:** Ativa indicadores visuais
-   🗣️ **VLibras:** Tradução em LIBRAS

#### 2. ARIA Labels

Todos os elementos interativos possuem labels descritivos:

```html
<button aria-label="Aumentar tamanho da fonte">
    <nav aria-label="Navegação principal">
        <img alt="Descrição da imagem" />
    </nav>
</button>
```

#### 3. Navegação por Teclado

-   Tab para navegar
-   Enter para ativar
-   Escape para fechar modais
-   Setas para navegação em grids

#### 4. Contraste de Cores

-   Conformidade WCAG 2.1 AA
-   Ratio mínimo 4.5:1 para texto
-   Cores primárias: #5B8FC4 (azul acessível)

#### 5. Responsividade

-   Mobile First
-   Breakpoints: 480px, 768px, 968px, 1200px
-   Touch-friendly (min 44x44px para botões)

### API VLibras

**Integração:**

```html
<div vw class="enabled">
    <div vw-access-button class="active"></div>
    <div vw-plugin-wrapper>
        <div class="vw-plugin-top-wrapper"></div>
    </div>
</div>
<script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
<script>
    new window.VLibras.Widget("https://vlibras.gov.br/app");
</script>
```

---

## ⚙️ Configuração e Instalação

### Requisitos do Sistema

**Servidor:**

-   PHP 8.0 ou superior
-   MySQL 5.7 ou superior
-   Apache ou Nginx
-   Extensões PHP: PDO, mysqli, json, session

**Desenvolvimento:**

-   XAMPP 8.0+
-   Git
-   Editor de código (VS Code recomendado)

### Instalação Passo a Passo

#### 1. Clone o Repositório

```bash
cd c:\xampp\htdocs
git clone [URL_DO_REPOSITORIO] PositiveSense
```

#### 2. Configure o Banco de Dados

```bash
# Acesse phpMyAdmin (http://localhost/phpmyadmin)
# Crie o banco de dados
CREATE DATABASE positivesense CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Importe o schema
# Use o arquivo: database/positivesense.sql
```

#### 3. Configure as Credenciais

**config/database.php:**

```php
$host = 'localhost';
$dbname = 'positivesense';
$username = 'root';
$password = ''; // Sua senha do MySQL
```

**config/google_oauth.php:**

```php
$client_id = 'SEU_CLIENT_ID_GOOGLE';
$client_secret = 'SEU_CLIENT_SECRET_GOOGLE';
$redirect_uri = 'http://localhost:8000/google_callback.php';
```

#### 4. Configure as Permissões

```bash
# Windows (CMD como Administrador)
icacls "c:\xampp\htdocs\PositiveSense\uploads\avatars" /grant Users:(OI)(CI)F

# Linux/Mac
chmod -R 755 uploads/avatars
chown -R www-data:www-data uploads/avatars
```

#### 5. Inicie o Servidor

**Opção 1 - XAMPP:**

-   Abra o XAMPP Control Panel
-   Inicie Apache e MySQL
-   Acesse: http://localhost/PositiveSense

**Opção 2 - PHP Built-in Server:**

```bash
cd c:\xampp\htdocs\PositiveSense
php -S localhost:8000
```

-   Acesse: http://localhost:8000

#### 6. Configure o Google OAuth (Opcional)

1. Acesse: https://console.cloud.google.com
2. Crie um novo projeto
3. Ative a API Google+
4. Crie credenciais OAuth 2.0
5. Configure URLs autorizadas:
    - `http://localhost:8000`
    - `http://localhost:8000/google_callback.php`
6. Copie Client ID e Client Secret
7. Cole em `config/google_oauth.php`

### Verificação da Instalação

**Checklist:**

-   [ ] Página inicial carrega (index.php)
-   [ ] Login funciona
-   [ ] Registro funciona
-   [ ] Upload de avatar funciona
-   [ ] Jogos carregam
-   [ ] Chatbot responde
-   [ ] Painel de acessibilidade funciona
-   [ ] VLibras carrega

---

## 🎨 Identidade Visual

### Paleta de Cores

**Cores Principais:**

```css
--primary: #5b8fc4; /* Azul principal */
--primary-dark: #4a7ab3; /* Azul escuro */
--primary-light: #7ba5d4; /* Azul claro */
--secondary: #e8f4f8; /* Azul clarinho */
```

**Cores de Suporte:**

```css
--bg-primary: #ffffff; /* Fundo branco */
--bg-secondary: #f8f9fa; /* Cinza claro */
--text-primary: #2c3e50; /* Texto escuro */
--text-secondary: #6c757d; /* Texto secundário */
--success: #28a745; /* Verde sucesso */
--danger: #dc3545; /* Vermelho erro */
--warning: #ffc107; /* Amarelo aviso */
```

### Tipografia

**Fonte Principal:**

```css
font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
```

**Tamanhos:**

-   H1: 2.5rem (40px)
-   H2: 2rem (32px)
-   H3: 1.5rem (24px)
-   Body: 1rem (16px)
-   Small: 0.875rem (14px)

### Espaçamento

**Sistema de Espaçamento (8px base):**

```css
--spacing-xs: 0.5rem; /* 8px */
--spacing-sm: 1rem; /* 16px */
--spacing-md: 1.5rem; /* 24px */
--spacing-lg: 2rem; /* 32px */
--spacing-xl: 3rem; /* 48px */
```

### Bordas e Sombras

**Border Radius:**

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 20px;
--radius-full: 9999px;
```

**Box Shadows:**

```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.1);
```

---

## 📱 Responsividade

### Breakpoints

```css
/* Mobile First */
@media (min-width: 480px) {
    /* Small phones */
}
@media (min-width: 768px) {
    /* Tablets */
}
@media (min-width: 968px) {
    /* Small desktops */
}
@media (min-width: 1200px) {
    /* Large desktops */
}
```

### Grid System

**Desktop (> 968px):**

-   Jogos: 3 colunas (380px cada)
-   Conteúdo: Max-width 1200px

**Tablet (768-968px):**

-   Jogos: 2 colunas
-   Menu: Hambúrguer

**Mobile (< 768px):**

-   Jogos: 1 coluna
-   Stack vertical
-   Bottom navigation

---

## 🔒 Segurança

### Práticas Implementadas

1. **SQL Injection Protection:**

    - PDO com Prepared Statements
    - Parâmetros bindados
    - Escape de dados

2. **XSS Protection:**

    - htmlspecialchars() em outputs
    - Content Security Policy
    - Sanitização de inputs

3. **CSRF Protection:**

    - Tokens em formulários
    - Verificação de origem

4. **Password Security:**

    - Hash com password_hash()
    - Salt automático
    - Algoritmo bcrypt

5. **Session Security:**

    - Session regeneration
    - HttpOnly cookies
    - Secure flag (HTTPS)
    - Timeout automático

6. **File Upload Security:**
    - Validação de tipo
    - Limite de tamanho
    - Nome sanitizado
    - Pasta protegida

---

## 🧪 Testes

### Testes Manuais Recomendados

**Funcionalidades:**

-   [ ] Registro de usuário
-   [ ] Login tradicional
-   [ ] Login com Google
-   [ ] Upload de avatar
-   [ ] Edição de perfil
-   [ ] Exclusão de conta
-   [ ] Cada jogo individualmente
-   [ ] Chatbot
-   [ ] Painel de acessibilidade
-   [ ] VLibras

**Navegadores:**

-   [ ] Chrome
-   [ ] Firefox
-   [ ] Safari
-   [ ] Edge
-   [ ] Mobile browsers

**Dispositivos:**

-   [ ] Desktop
-   [ ] Tablet
-   [ ] Smartphone

---

## 📊 Performance

### Otimizações Implementadas

1. **CSS:**

    - Minificação recomendada
    - Carregamento assíncrono
    - Critical CSS inline

2. **JavaScript:**

    - Defer em scripts não críticos
    - Modules para code splitting
    - LocalStorage para cache

3. **Imagens:**

    - Formatos otimizados (SVG, WebP)
    - Lazy loading
    - Dimensões especificadas

4. **Database:**
    - Índices em colunas chave
    - Queries otimizadas
    - Connection pooling

---

## 🐛 Troubleshooting

### Problemas Comuns

**1. Erro de conexão com BD:**

```
Solução: Verificar credenciais em config/database.php
```

**2. Upload de avatar não funciona:**

```
Solução: Verificar permissões da pasta uploads/avatars
Windows: icacls uploads\avatars /grant Users:(OI)(CI)F
Linux: chmod 755 uploads/avatars
```

**3. Google OAuth não funciona:**

```
Solução:
- Verificar Client ID e Secret
- Conferir Redirect URI
- Verificar domínio autorizado no Google Console
```

**4. Sessão não persiste:**

```
Solução: Verificar configurações de session em php.ini
- session.cookie_secure = 0 (para desenvolvimento)
- session.cookie_httponly = 1
```

**5. Jogos não carregam:**

```
Solução:
- Abrir console do navegador (F12)
- Verificar erros JavaScript
- Limpar cache do navegador
```

---

## 📞 Suporte e Contato

### Canais de Comunicação

**Email:** positivesense@gmail.com

**WhatsApp:** (11) 99999-9999

**Redes Sociais:**

-   Instagram: @positivesense
-   Facebook: /positivesense
-   Twitter: @positivesense

### Reportar Bugs

Para reportar bugs, inclua:

1. Descrição detalhada
2. Passos para reproduzir
3. Screenshots se aplicável
4. Navegador e versão
5. Sistema operacional

---

## 📜 Licença

Este projeto está sob licença própria. Veja o arquivo LICENSE para mais detalhes.

---

## 👥 Créditos

**Desenvolvimento:** Equipe PositiveSense

**Tecnologias:**

-   PHP
-   MySQL
-   JavaScript
-   Font Awesome
-   Google OAuth
-   VLibras

**Inspiração:**
Desenvolvido com o objetivo de auxiliar pessoas com TEA e suas famílias.

---

## 🔄 Atualizações

### Versão Atual: 1.0.0

**Últimas Atualizações:**

-   ✅ Sistema de autenticação completo
-   ✅ 6 jogos educativos
-   ✅ Chatbot com IA
-   ✅ Painel de acessibilidade
-   ✅ Sistema de avatares
-   ✅ Integração VLibras
-   ✅ Design responsivo

**Próximas Funcionalidades:**

-   🔜 Sistema de conquistas
-   🔜 Ranking de jogadores
-   🔜 Modo escuro
-   🔜 Mais jogos educativos
-   🔜 Área de pais/responsáveis
-   🔜 Relatórios de progresso

---

**Documentação gerada em:** 07/11/2025
**Versão do documento:** 1.0.0

Para mais informações, consulte os arquivos em `/docs/` ou entre em contato com a equipe.
