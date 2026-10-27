# 📐 Padronização de Componentes - PositiveSense

## ✅ Sistema Implementado

Todos os cabeçalhos e rodapés do site agora usam componentes padronizados centralizados.

## 📂 Arquivos do Sistema

### 1. **Componentes** (`components/`)

-   `header.php` - Componente do cabeçalho
-   `footer.php` - Componente do rodapé

### 2. **Configuração** (`config/`)

-   `site-data.php` - Dados centralizados (navegação, footer, redes sociais)
-   `session.php` - Gerenciamento de sessões
-   `site-config.php` - Configurações gerais do site

### 3. **Integração**

-   `partials.php` - Carrega todos os componentes e funções

## 🎯 Como Usar em Cada Página

### Estrutura Padrão

```php
<?php
// 1. Configurações da página
$site_config = get_site_config(
    'Título da Página - PositiveSense',
    'Descrição da página'
);

// 2. Dados padronizados (automáticos)
$nav_items = get_nav_items();
$footer_links = get_footer_sections();
$social_media = get_social_media();

// 3. Carregar sistema
require_once __DIR__ . '/partials.php';
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo htmlspecialchars($site_config['description']); ?>">
    <title><?php echo htmlspecialchars($site_config['title']); ?></title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <?php render_header($nav_items); ?>

    <!-- CONTEÚDO DA PÁGINA AQUI -->

    <?php render_footer($footer_links, $social_media, $site_config['year']); ?>
</body>
</html>
```

## 🔧 Funções Disponíveis

### `get_site_config($title, $description)`

Retorna configurações da página atual.

```php
$site_config = get_site_config(
    'Jogos - PositiveSense',
    'Jogos educativos para desenvolvimento'
);
// Retorna: ['title' => '...', 'description' => '...', 'year' => '2025']
```

### `get_nav_items()`

Retorna itens de navegação padrão.

```php
$nav_items = get_nav_items();
// Retorna: [
//     ['url' => 'inicial.php', 'label' => 'Início'],
//     ['url' => 'sobre.php', 'label' => 'Sobre'],
//     ...
// ]
```

### `get_footer_sections()`

Retorna seções do rodapé.

```php
$footer_links = get_footer_sections();
// Retorna: [
//     'Início' => [['label' => 'Home', 'url' => 'inicial.php']],
//     'Sobre nós' => [...],
//     ...
// ]
```

### `get_social_media()`

Retorna redes sociais.

```php
$social_media = get_social_media();
// Retorna: [
//     ['icon' => 'fab fa-whatsapp', 'url' => '...', 'title' => 'WhatsApp'],
//     ...
// ]
```

## 🎨 Recursos do Header

### ✓ Navegação Responsiva

-   Menu hambúrguer em dispositivos móveis
-   Links de navegação padronizados
-   Logo clicável

### ✓ Sistema de Usuário

-   Mostra foto do usuário quando logado
-   Menu dropdown com:
    -   Meu Perfil
    -   Jogos
    -   Sair
-   Botão "Entrar" quando não logado

### ✓ Acessibilidade

-   Atributos ARIA
-   Roles semânticos
-   Labels descritivos

## 🎨 Recursos do Footer

### ✓ Estrutura

-   Logo do site
-   Seções de links (Início, Sobre nós, Suporte)
-   Ícones de redes sociais
-   Copyright automático

### ✓ Funcionalidades

-   Links externos abrem em nova aba
-   Ícones Font Awesome
-   Links para WhatsApp, Email, Spotify
-   Ano atualizado automaticamente

## 📝 Vantagens da Padronização

✅ **Manutenção Fácil** - Altere uma vez, afeta todo o site
✅ **Consistência** - Mesmo design em todas as páginas
✅ **Código Limpo** - Menos repetição
✅ **Atualização Rápida** - Dados centralizados
✅ **Escalabilidade** - Fácil adicionar novas páginas

## 🔄 Para Atualizar Navegação ou Footer

### Mudar itens de navegação:

Edite `config/site-data.php` → função `get_nav_items()`

### Mudar seções do footer:

Edite `config/site-data.php` → função `get_footer_sections()`

### Mudar redes sociais:

Edite `config/site-data.php` → função `get_social_media()`

### Mudar design do header:

Edite `components/header.php`

### Mudar design do footer:

Edite `components/footer.php`

## 📊 Status Atual

✅ Sistema de componentes implementado
✅ Funções padronizadas criadas
✅ Dados centralizados em `site-data.php`
✅ Exemplo implementado em `inicial.php`
⏳ Demais páginas podem ser atualizadas gradualmente

## 🚀 Próximos Passos

1. Atualizar todas as páginas para usar `get_nav_items()` e `get_footer_sections()`
2. Remover arrays duplicados de cada arquivo PHP
3. Testar navegação em todas as páginas
4. Verificar responsividade

---

**Desenvolvido por:** PositiveSense Team
**Última atualização:** 2025
**Versão:** 1.0
