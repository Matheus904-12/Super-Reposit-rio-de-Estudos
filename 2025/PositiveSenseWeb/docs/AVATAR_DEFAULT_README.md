# ⚠️ IMPORTANTE: Avatar Padrão

## Instruções

O sistema de perfil requer uma imagem padrão de avatar em:
`img/default-avatar.png`

### Como criar/adicionar:

**Opção 1 - Usar uma imagem existente:**

1. Renomeie qualquer imagem PNG do diretório `img/` para `default-avatar.png`
2. Ou crie uma cópia: `copy img\p.png img\default-avatar.png`

**Opção 2 - Baixar um avatar genérico:**

1. Acesse: https://ui-avatars.com/api/?name=User&size=400&background=5b8fc4&color=fff
2. Salve como `img/default-avatar.png`

**Opção 3 - Criar no PowerShell (temporário):**

```powershell
# Copia uma imagem existente como avatar padrão
Copy-Item "img\p.png" "img\default-avatar.png"
```

### Especificações recomendadas:

-   **Formato:** PNG (com transparência)
-   **Tamanho:** 400x400px (quadrado)
-   **Cor:** Neutro/azul claro (tema do site)
-   **Conteúdo:** Ícone de usuário genérico ou silhueta

### Alternativa temporária:

Se não tiver a imagem, edite os seguintes arquivos para usar uma imagem existente:

1. `components/header.php` - linha com `$usuario_foto`
2. `perfil.php` - linha com `foto_perfil`
3. `processar_avatar.php` - linha com `default-avatar.png`

Substitua `img/default-avatar.png` por `img/p.png` (ou outra imagem do projeto).
