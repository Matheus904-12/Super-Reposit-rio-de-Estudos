# 👤 Sistema de Perfil de Usuário - PositiveSense

## 📋 Visão Geral

Sistema completo de gerenciamento de perfil de usuário com:

-   ✅ Visualização de dados pessoais
-   ✅ Edição de nome e email
-   ✅ Alteração de senha segura
-   ✅ Upload de foto de perfil
-   ✅ Informações da conta
-   ✅ Exclusão de conta

## 📁 Arquivos do Sistema

### Páginas Principais

-   **`perfil.php`** - Página principal do perfil com 3 abas (Dados, Segurança, Informações)
-   **`bem-vindo.php`** - Tela de boas-vindas após login/cadastro

### Processadores Backend

-   **`processar_perfil.php`** - Atualiza nome e email
-   **`processar_senha.php`** - Altera senha do usuário
-   **`processar_avatar.php`** - Upload e redimensionamento de foto
-   **`processar_exclusao.php`** - Exclusão permanente da conta

### Componentes

-   **`components/header.php`** - Header com menu de usuário e avatar

### Diretórios

-   **`uploads/avatars/`** - Armazena fotos de perfil dos usuários
-   **`img/default-avatar.png`** - Avatar padrão para novos usuários

## 🎨 Funcionalidades

### 1️⃣ Aba "Meus Dados"

**Campos editáveis:**

-   Nome completo
-   Email

**Campos somente leitura:**

-   Tipo de usuário (aluno/professor/responsavel/admin)
-   Status da conta (ativo/inativo)

**Validações:**

-   Nome obrigatório
-   Email válido e único
-   Verifica duplicação de email

### 2️⃣ Aba "Segurança"

**Alteração de senha:**

-   Senha atual (verificação)
-   Nova senha (mínimo 6 caracteres)
-   Confirmação de senha
-   Toggle para visualizar senhas

**Segurança:**

-   Verifica senha atual com `password_verify()`
-   Hash com `password_hash(PASSWORD_DEFAULT)`
-   Validação de correspondência

### 3️⃣ Aba "Informações"

**Dados exibidos:**

-   ID do usuário
-   Email
-   Tipo de conta
-   Status (ativo/inativo com indicador visual)
-   Data de cadastro
-   Último acesso

**Zona de Perigo:**

-   Botão de exclusão de conta
-   Dupla confirmação
-   Exclusão em cascata (sessões + logs + usuário)

### 4️⃣ Upload de Foto

**Características:**

-   Click no ícone de câmera sobre o avatar
-   Preview instantâneo
-   Upload via AJAX
-   Validações de tipo e tamanho

**Validações:**

-   Formatos: JPG, JPEG, PNG, GIF, WEBP
-   Tamanho máximo: 5MB
-   Validação de MIME type
-   Redimensionamento automático para 400x400px

**Processamento:**

-   Gera nome único: `avatar_{id}_{timestamp}.{ext}`
-   Deleta foto antiga automaticamente
-   Mantém proporção ao redimensionar
-   Preserva transparência (PNG/GIF)

## 🔐 Segurança

### Validações Backend

```php
✅ Verificação de sessão em todas as páginas
✅ Validação de método POST
✅ Sanitização de inputs
✅ Prepared statements (PDO)
✅ Password hashing (bcrypt)
✅ Validação de MIME type em uploads
✅ Proteção contra directory traversal
```

### Proteção de Uploads

-   `.htaccess` bloqueia execução de PHP
-   Apenas imagens permitidas
-   Nomes únicos impedem sobrescrita
-   Validação dupla (extensão + MIME)

### Transações Database

-   Exclusão de conta usa transação
-   Rollback em caso de erro
-   Limpeza completa de dados

## 📱 Interface

### Design Responsivo

-   Mobile-first
-   Flexbox e Grid CSS
-   Breakpoint em 768px
-   Touch-friendly

### Elementos Visuais

-   **Cores:** Azul claro suave (tema do site)
-   **Ícones:** Font Awesome 6.4.0
-   **Animações:** fadeIn, slideDown, bounce
-   **Feedback:** Alertas coloridos (sucesso/erro)

### Componentes

```css
.profile-avatar
    →
    Avatar
    circular
    120px
    .user-menu-btn
    →
    Botão
    no
    header
    com
    avatar
    35px
    .tabs
    →
    Navegação
    entre
    abas
    .form-group
    →
    Inputs
    estilizados
    .alert
    →
    Mensagens
    de
    feedback
    .info-card
    →
    Cards
    de
    informação;
```

## 🔄 Fluxo de Uso

### Primeiro Acesso

1. Usuário faz cadastro → `processar_registro.php`
2. Auto-login criado
3. Redirect → `bem-vindo.php?novo=1`
4. Mensagem de boas-vindas personalizada
5. Botões: "Explorar Jogos" ou "Ver Meu Perfil"

### Login Subsequente

1. Usuário faz login → `processar_login.php`
2. Redirect → `bem-vindo.php`
3. Mensagem "Bem-vindo de volta"
4. Header mostra avatar e nome

### Acessando Perfil

1. Click no avatar no header
2. Dropdown com opções:
    - Meu Perfil → `perfil.php`
    - Jogos → `inicial.php`
    - Sair → `logout.php`

### Editando Dados

1. Aba "Meus Dados"
2. Altera nome/email
3. Click "Salvar Alterações"
4. AJAX envia para `processar_perfil.php`
5. Atualiza sessão e interface

### Alterando Senha

1. Aba "Segurança"
2. Preenche senha atual + nova + confirmação
3. Click "Alterar Senha"
4. AJAX envia para `processar_senha.php`
5. Valida e atualiza hash

### Upload de Foto

1. Click no ícone de câmera
2. Seleciona imagem (máx 5MB)
3. Preview imediato
4. Upload automático via `processar_avatar.php`
5. Redimensiona para 400x400px
6. Atualiza avatar em toda interface

## 🗄️ Banco de Dados

### Campos Utilizados

```sql
usuarios:
  - id (INT PRIMARY KEY)
  - nome (VARCHAR 100)
  - email (VARCHAR 100 UNIQUE)
  - senha (VARCHAR 255 - hash bcrypt)
  - tipo_usuario (ENUM: aluno, professor, responsavel, admin)
  - status (ENUM: ativo, inativo)
  - foto_perfil (VARCHAR 255)
  - data_cadastro (DATETIME)
  - ultimo_acesso (DATETIME)
```

### Queries Importantes

```php
// Atualizar dados
UPDATE usuarios SET nome = ?, email = ? WHERE id = ?

// Atualizar senha
UPDATE usuarios SET senha = ? WHERE id = ?

// Atualizar foto
UPDATE usuarios SET foto_perfil = ? WHERE id = ?

// Exclusão em cascata
DELETE FROM sessoes WHERE usuario_id = ?
DELETE FROM logs_acesso WHERE usuario_id = ?
DELETE FROM usuarios WHERE id = ?
```

## 🧪 Testes

### Testar Perfil

1. Inicie o servidor: `php -S localhost:8000`
2. Acesse: `http://localhost:8000/login.php`
3. Faça login ou cadastro
4. Será redirecionado para tela de boas-vindas
5. Click em "Ver Meu Perfil"

### Testar Upload

1. No perfil, click no ícone de câmera
2. Selecione uma imagem
3. Verifique preview instantâneo
4. Confira se atualizou no header

### Testar Edição

1. Aba "Meus Dados"
2. Altere nome ou email
3. Salve e verifique feedback
4. Recarregue página - dados devem persistir

### Testar Senha

1. Aba "Segurança"
2. Digite senha atual
3. Crie nova senha
4. Confirme
5. Faça logout e login com nova senha

## 📊 Estatísticas

### Arquivos Criados/Modificados

-   8 arquivos PHP criados
-   1 componente atualizado (header.php)
-   2 diretórios criados
-   ~1000 linhas de código
-   500+ linhas de CSS

### Recursos

-   3 abas de navegação
-   12 campos de formulário
-   4 endpoints AJAX
-   8 validações de segurança
-   5 animações CSS

## 🚀 Próximos Passos (Melhorias Futuras)

### Funcionalidades Adicionais

-   [ ] Histórico de atividades
-   [ ] Preferências de notificação
-   [ ] Tema claro/escuro
-   [ ] Exportar dados (GDPR)
-   [ ] Autenticação em 2 fatores
-   [ ] Recuperação de senha por email
-   [ ] Crop de imagem antes do upload
-   [ ] Progresso de jogos/conquistas
-   [ ] Gamificação (badges, pontos)

### Otimizações

-   [ ] Cache de avatar
-   [ ] Lazy loading de imagens
-   [ ] Compressão WEBP automática
-   [ ] CDN para uploads
-   [ ] Rate limiting em uploads

## 🐛 Solução de Problemas

### Erro: "Sessão expirada"

-   Verifique se `session_start()` está no topo de cada arquivo
-   Confira configurações de sessão no `php.ini`

### Upload não funciona

-   Verifique permissões: `uploads/avatars/` deve ter permissão 0755
-   Confirme que `upload_max_filesize` e `post_max_size` no `php.ini` são >= 5MB
-   Extensão GD deve estar ativa para redimensionamento

### Foto não aparece

-   Verifique se o caminho em `foto_perfil` no banco está correto
-   Confirme que o arquivo existe em `uploads/avatars/`
-   Check console do navegador para erros 404

### Senha não altera

-   Verifique se senha atual está correta
-   Confirme que nova senha tem 6+ caracteres
-   Check se as senhas coincidem

## 📞 Suporte

Para dúvidas ou problemas:

-   Email: positivesense@gmail.com
-   Documentação: Ver arquivos README no projeto

---

**PositiveSense** - Tornando a educação mais inclusiva 💙
