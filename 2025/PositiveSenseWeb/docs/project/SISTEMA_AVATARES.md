# 🎨 Sistema de Avatares - PositiveSense

## 📋 Visão Geral

Sistema completo de seleção de avatares com opções predefinidas e upload customizado.

## 🎨 Avatares Disponíveis

### Avatares Predefinidos (SVG)

Localizados em: `img/avatars/`

1. **avatar-vazio.svg** - Avatar padrão (azul claro)
2. **avatar-1.svg** - Rosa/Pink
3. **avatar-2.svg** - Azul
4. **avatar-3.svg** - Laranja
5. **avatar-4.svg** - Verde
6. **avatar-5.svg** - Roxo
7. **avatar-6.svg** - Amarelo/Dourado

Todos os avatares são:

-   ✅ Formato SVG (escalável)
-   ✅ 400x400px
-   ✅ Design minimalista com rosto sorridente
-   ✅ Cores suaves e acessíveis

## 🎯 Funcionalidades

### 1. Avatar Padrão

-   Novos usuários recebem automaticamente `avatar-vazio.svg`
-   Aparece no header sem nome (só ícone)

### 2. Galeria de Seleção

-   Localizada na aba "Meus Dados" do perfil
-   Grid responsivo com todos os avatares
-   Click para selecionar
-   Indicador visual (✓) no avatar ativo
-   Atualização instantânea no header

### 3. Upload Customizado

-   Botão "Ou fazer upload da sua foto"
-   Aceita: JPG, PNG, GIF, WEBP
-   Máximo: 5MB
-   Redimensionamento automático para 400x400px
-   Remove seleção de avatares predefinidos

### 4. Header

-   Mostra apenas o avatar (45x45px)
-   Sem texto do nome
-   Borda azul indicando interação
-   Hover: scale e mudança de cor
-   Click: dropdown com menu

## 📁 Arquivos Criados/Modificados

### Novos Arquivos

1. **`img/avatars/avatar-vazio.svg`** - Avatar padrão
2. **`img/avatars/avatar-1.svg`** até **avatar-6.svg** - Avatares coloridos
3. **`processar_avatar_predefinido.php`** - Processador de seleção

### Arquivos Modificados

1. **`components/header.php`**

    - Avatar padrão mudado para `avatar-vazio.svg`
    - Removido nome do usuário (só avatar + chevron)
    - Adicionado botão "Entrar" quando não logado

2. **`perfil.php`**

    - Adicionada galeria de avatares
    - CSS da galeria (grid responsivo)
    - JavaScript `selecionarAvatar()`
    - Upload customizado separado

3. **`processar_registro.php`**

    - Foto padrão mudada para `avatar-vazio.svg`

4. **`css/styles.css`**
    - `.user-avatar` aumentado para 45px
    - `.user-name` oculto com `display: none`
    - `.btn-login` estilizado para não logados
    - Hover effects melhorados

## 🔄 Fluxo de Uso

### Seleção de Avatar Predefinido

1. Usuário acessa perfil.php
2. Vê galeria com 7 opções
3. Click em um avatar
4. AJAX → `processar_avatar_predefinido.php`
5. Atualiza banco `usuarios.foto_perfil`
6. Atualiza `$_SESSION['usuario_foto']`
7. Atualiza preview e header em tempo real
8. Mostra alerta de sucesso

### Upload de Foto Customizada

1. Click em "Ou fazer upload da sua foto"
2. Seleciona imagem do computador
3. Validação (tipo + tamanho)
4. Preview instantâneo
5. AJAX → `processar_avatar.php`
6. Redimensiona para 400x400px
7. Salva em `uploads/avatars/`
8. Atualiza banco e sessão
9. Remove ✓ dos avatares predefinidos
10. Mostra alerta de sucesso

## 🎨 Design

### Galeria de Avatares

```css
.avatar-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1rem;
}

.avatar-option {
    aspect-ratio: 1;
    border-radius: 50%;
    border: 3px solid transparent;
    cursor: pointer;
    transition: all 0.3s ease;
}

.avatar-option.active {
    border-color: var(--primary);
    box-shadow: 0 0 0 4px rgba(91, 143, 196, 0.2);
}

.avatar-check {
    position: absolute;
    top: 5px;
    right: 5px;
    background: var(--primary);
    animation: checkPulse 0.3s ease;
}
```

### Header Avatar

```css
.user-avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 2px solid var(--primary);
}

.user-menu-btn:hover {
    transform: scale(1.05);
}
```

## 🔐 Segurança

### Validações Backend

```php
✅ Lista whitelist de avatares permitidos
✅ Validação de caminho (in_array)
✅ Sessão ativa verificada
✅ Prepared statements no UPDATE
✅ Upload: MIME type + tamanho + extensão
```

### JavaScript

```javascript
✅ Validação de tipo (startsWith('image/'))
✅ Validação de tamanho (5MB max)
✅ Feedback visual imediato
✅ Error handling com try-catch
✅ Atualização de múltiplos elementos DOM
```

## 📱 Responsividade

### Desktop

-   Grid de 7 colunas (auto-fill)
-   Avatares ~100-120px cada
-   Hover effects visíveis

### Mobile (< 768px)

-   Grid ajusta automaticamente
-   Mínimo 100px por avatar
-   Touch-friendly (bordas maiores)
-   Galeria scroll horizontal se necessário

## 🧪 Como Testar

1. **Inicie o servidor:**

    ```powershell
    C:\xampp\php\php.exe -S localhost:8000
    ```

2. **Faça login:**

    - Acesse `http://localhost:8000/login.php`
    - Entre com uma conta

3. **Veja o header:**

    - Deve mostrar só o avatar (sem nome)
    - Click no avatar abre dropdown

4. **Teste seleção:**

    - Vá para perfil (click no avatar → Meu Perfil)
    - Veja galeria de 7 avatares
    - Click em qualquer um
    - Veja ✓ aparecer
    - Confira atualização no header

5. **Teste upload:**
    - Click em "Ou fazer upload"
    - Selecione uma imagem
    - Veja preview
    - Confira se ✓ sumiu dos predefinidos

## 🎯 Vantagens

### SVG vs PNG/JPG

✅ Tamanho minúsculo (~1KB cada)
✅ Escala perfeita (sem pixelização)
✅ Rápido carregamento
✅ Fácil personalização de cores

### UX

✅ Seleção visual intuitiva
✅ Feedback instantâneo
✅ Sem recarregamento de página
✅ Indicador claro do ativo
✅ Animações suaves

### Performance

✅ AJAX (não recarrega página)
✅ Cache de imagens
✅ Atualização seletiva do DOM
✅ SVG leve

## 📝 Adicionar Novos Avatares

1. **Criar SVG:**

    - Formato 400x400px
    - Círculo de fundo
    - Rosto simples
    - Cores da paleta do site

2. **Salvar:**

    - `img/avatars/avatar-X.svg`

3. **Adicionar ao código:**

    ```php
    // Em perfil.php
    $avatares = [
        // ... avatares existentes
        'img/avatars/avatar-7.svg', // Novo
    ];

    // Em processar_avatar_predefinido.php
    $avatares_permitidos = [
        // ... existentes
        'img/avatars/avatar-7.svg', // Novo
    ];
    ```

## 🐛 Troubleshooting

### Avatar não aparece

-   Verifique se o arquivo SVG existe
-   Confira caminho no banco: `SELECT foto_perfil FROM usuarios`
-   Check permissões da pasta `img/avatars/`

### Seleção não funciona

-   Abra console do navegador (F12)
-   Veja erros AJAX
-   Verifique se `processar_avatar_predefinido.php` existe
-   Confirme que usuário está logado (sessão ativa)

### Upload falha

-   Check tamanho da imagem (<5MB)
-   Verifique permissões de `uploads/avatars/` (0755)
-   Confirme extensão GD no PHP
-   Veja logs de erro do PHP

---

**Status:** ✅ SISTEMA COMPLETO E FUNCIONAL
**Avatares:** 7 predefinidos + upload customizado
**UX:** Intuitivo com feedback visual instantâneo
