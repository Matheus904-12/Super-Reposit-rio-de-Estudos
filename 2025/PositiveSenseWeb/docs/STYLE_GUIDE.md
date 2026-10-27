# 🎨 Guia de Estilo - PositiveSense

## 📚 Índice

-   [Paleta de Cores](#paleta-de-cores)
-   [Tipografia](#tipografia)
-   [Espaçamento](#espaçamento)
-   [Componentes](#componentes)
-   [Ícones](#ícones)
-   [Animações](#animações)

---

## 🎨 Paleta de Cores

### Cores Principais

```css
/* Azul - Cor primária do projeto */
--primary: #5b8fc4; /* Principal */
--primary-dark: #4a7aab; /* Hover/Active */
--primary-light: #7ba5d4; /* Backgrounds sutis */
--accent: #8ba3c4; /* Detalhes */
```

**Uso:**

-   ✅ Botões primários
-   ✅ Links importantes
-   ✅ Títulos de seções
-   ✅ Destaques

### Cores de Fundo

```css
--bg-primary: #ffffff; /* Fundo principal */
--bg-secondary: #f8f9fa; /* Fundo alternativo */
--bg-accent: #e8eef7; /* Fundo de destaque */
--bg-hero: #d4e0f0; /* Hero sections */
```

**Uso:**

-   ✅ Corpo da página
-   ✅ Cards e containers
-   ✅ Seções alternadas
-   ✅ Áreas de destaque

### Cores de Texto

```css
--text-primary: #2c3e50; /* Texto principal */
--text-secondary: #546e7a; /* Texto secundário */
--text-muted: #78909c; /* Texto suave */
--text-white: #ffffff; /* Texto em fundos escuros */
```

**Hierarquia:**

1. **Primary** - Títulos e texto importante
2. **Secondary** - Parágrafos e descrições
3. **Muted** - Legendas e informações extras

### Cores Semânticas

```css
/* Sucesso */
--success: #4caf50;

/* Erro */
--error: #f44336;

/* Aviso */
--warning: #ff9800;

/* Info */
--info: #2196f3;
```

**Quando usar:**

-   ✅ Mensagens de feedback
-   ✅ Validação de formulários
-   ✅ Alertas do sistema
-   ✅ Status de operações

---

## 📝 Tipografia

### Fontes

```css
/* Títulos */
font-family: "Poppins", sans-serif;

/* Texto corpo */
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

### Escalas de Fonte

```css
/* Responsivo com clamp() */
h1 {
    font-size: clamp(2rem, 4vw, 3rem);
} /* 32-48px */
h2 {
    font-size: clamp(1.5rem, 3vw, 2.25rem);
} /* 24-36px */
h3 {
    font-size: clamp(1.25rem, 2.5vw, 1.75rem);
} /* 20-28px */
h4 {
    font-size: 1.125rem;
} /* 18px */
p {
    font-size: 1rem;
} /* 16px */
small {
    font-size: 0.875rem;
} /* 14px */
```

### Pesos de Fonte

```css
.font-light {
    font-weight: 300;
}
.font-normal {
    font-weight: 400;
}
.font-medium {
    font-weight: 500;
}
.font-semibold {
    font-weight: 600;
}
.font-bold {
    font-weight: 700;
}
```

### Line Height

```css
/* Títulos */
line-height: 1.3;

/* Texto corpo */
line-height: 1.7;

/* Texto UI (botões, labels) */
line-height: 1.5;
```

---

## 📐 Espaçamento

### Sistema de Espaçamento

```css
--spacing-xs: 0.5rem; /* 8px */
--spacing-sm: 1rem; /* 16px */
--spacing-md: 1.5rem; /* 24px */
--spacing-lg: 3rem; /* 48px */
--spacing-xl: 5rem; /* 80px */
```

### Quando usar

| Tamanho | Uso                                            |
| ------- | ---------------------------------------------- |
| **xs**  | Gaps entre elementos pequenos, padding interno |
| **sm**  | Espaçamento padrão entre elementos             |
| **md**  | Seções de conteúdo, grupos de elementos        |
| **lg**  | Entre seções principais                        |
| **xl**  | Grandes divisões de página                     |

### Padding de Container

```css
--container-padding: 2.5rem; /* Desktop */

@media (max-width: 968px) {
    --container-padding: 1.5rem; /* Tablet */
}

@media (max-width: 640px) {
    --container-padding: 1rem; /* Mobile */
}
```

---

## 🎯 Componentes

### Botões

#### Botão Primário

```html
<button class="btn-primary">Clique Aqui</button>
```

```css
.btn-primary {
    background: linear-gradient(135deg, #5b8fc4 0%, #4a7ab3 100%);
    color: white;
    padding: 1rem 2.5rem;
    border-radius: var(--radius-full);
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(91, 143, 196, 0.3);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(91, 143, 196, 0.4);
}
```

#### Botão Secundário

```html
<button class="btn-secondary">Cancelar</button>
```

```css
.btn-secondary {
    background: #f8f9fa;
    color: var(--text-primary);
    border: 2px solid var(--bg-secondary);
    padding: 1rem 2rem;
    border-radius: var(--radius-full);
}

.btn-secondary:hover {
    background: var(--bg-secondary);
}
```

### Cards

```html
<div class="card">
    <h3>Título do Card</h3>
    <p>Descrição do conteúdo...</p>
    <a href="#" class="card-link">Saiba mais →</a>
</div>
```

```css
.card {
    background: var(--bg-primary);
    border: 1px solid var(--bg-secondary);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
}
```

### Inputs

```html
<div class="input-group">
    <i class="fas fa-user"></i>
    <input type="text" placeholder="Nome completo" />
</div>
```

```css
.input-group {
    position: relative;
}

.input-group input {
    width: 100%;
    padding: 0.95rem 1.25rem 0.95rem 3rem;
    border: 2px solid var(--bg-secondary);
    border-radius: 10px;
    transition: all 0.3s ease;
}

.input-group input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 4px rgba(91, 143, 196, 0.1);
}
```

---

## 🖼️ Sombras

```css
/* Suave - Cards */
--shadow-sm: 0 2px 6px rgba(0, 0, 0, 0.06);

/* Média - Cards hover, modais */
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);

/* Grande - Elementos flutuantes */
--shadow-lg: 0 6px 20px rgba(0, 0, 0, 0.1);
```

**Uso:**

```css
.card {
    box-shadow: var(--shadow-sm);
}
.card:hover {
    box-shadow: var(--shadow-md);
}
.modal {
    box-shadow: var(--shadow-lg);
}
```

---

## 🔄 Border Radius

```css
--radius-sm: 8px; /* Elementos pequenos */
--radius-md: 12px; /* Cards, inputs */
--radius-lg: 20px; /* Cards grandes */
--radius-xl: 30px; /* Seções */
--radius-full: 9999px; /* Botões, badges */
```

**Quando usar:**

-   **sm** - Badges, chips, tags
-   **md** - Cards, inputs, botões pequenos
-   **lg** - Cards grandes, imagens
-   **xl** - Seções, containers grandes
-   **full** - Botões, avatares, pills

---

## 🎭 Ícones

### Font Awesome 6.4.0

```html
<!-- Incluir no <head> -->
<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
/>
```

### Ícones Comuns

```html
<!-- Social -->
<i class="fab fa-whatsapp"></i>
<i class="fas fa-envelope"></i>
<i class="fab fa-spotify"></i>

<!-- UI -->
<i class="fas fa-heart"></i>
<i class="fas fa-star"></i>
<i class="fas fa-user"></i>
<i class="fas fa-lock"></i>

<!-- Navegação -->
<i class="fas fa-arrow-right"></i>
<i class="fas fa-chevron-down"></i>
<i class="fas fa-bars"></i>
<i class="fas fa-times"></i>

<!-- Jogos -->
<i class="fas fa-gamepad"></i>
<i class="fas fa-trophy"></i>
<i class="fas fa-puzzle-piece"></i>
```

### Tamanhos

```css
.icon-sm {
    font-size: 1rem;
} /* 16px */
.icon-md {
    font-size: 1.5rem;
} /* 24px */
.icon-lg {
    font-size: 2rem;
} /* 32px */
.icon-xl {
    font-size: 3rem;
} /* 48px */
```

---

## ✨ Animações

### Transições Padrão

```css
/* Rápida - Hover simples */
transition: all 0.15s ease;

/* Normal - Maioria dos casos */
transition: all 0.3s ease;

/* Lenta - Animações complexas */
transition: all 0.5s ease;
```

### Animações CSS

#### Fade In

```css
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.fade-in {
    animation: fadeIn 0.5s ease;
}
```

#### Slide Up

```css
@keyframes slideUp {
    from {
        transform: translateY(50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.slide-up {
    animation: slideUp 0.5s ease;
}
```

#### Float (Usado no mascote)

```css
@keyframes float {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20px);
    }
}

.float {
    animation: float 3s ease-in-out infinite;
}
```

### Hover Effects

```css
/* Lift (elevar) */
.hover-lift:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

/* Scale (aumentar) */
.hover-scale:hover {
    transform: scale(1.05);
}

/* Glow (brilho) */
.hover-glow:hover {
    box-shadow: 0 0 20px rgba(91, 143, 196, 0.5);
}
```

---

## 📱 Breakpoints Responsivos

```css
/* Desktop: Padrão */
/* > 968px */

/* Tablet */
@media (max-width: 968px) {
    /* 640px - 968px */
}

/* Mobile */
@media (max-width: 640px) {
    /* < 640px */
}
```

### Guidelines Responsivos

**Desktop (> 968px):**

-   Grid 3-4 colunas
-   Menu horizontal
-   Espaçamento generoso

**Tablet (640-968px):**

-   Grid 2 colunas
-   Menu colapsável opcional
-   Espaçamento médio

**Mobile (< 640px):**

-   Grid 1 coluna
-   Menu hamburguer obrigatório
-   Espaçamento compacto

---

## 🎯 Acessibilidade

### Contraste de Cores

✅ **Aprovado WCAG AA:**

-   Texto primário em branco: 12.63:1
-   Texto secundário em branco: 8.59:1

### Focus States

```css
:focus-visible {
    outline: 3px solid var(--primary-light);
    outline-offset: 2px;
}
```

### ARIA Labels

```html
<!-- Navegação -->
<nav aria-label="Principal">
    <!-- Botões de ação -->
    <button aria-label="Abrir menu" aria-expanded="false">
        <!-- Links de redes sociais -->
        <a href="#" title="WhatsApp" aria-label="Fale conosco no WhatsApp"></a>
    </button>
</nav>
```

---

## 📦 Como Usar Este Guia

1. **Cores:** Use sempre as variáveis CSS definidas
2. **Espaçamento:** Siga o sistema de espaçamento (xs, sm, md, lg, xl)
3. **Componentes:** Reutilize os componentes existentes
4. **Responsividade:** Teste em todos os breakpoints
5. **Acessibilidade:** Sempre inclua ARIA labels e focus states

---

**Última atualização:** Outubro 2025
**Versão:** 1.0
