# 🤝 Guia de Contribuição - PositiveSense

Obrigado por considerar contribuir com o PositiveSense! Este documento fornece diretrizes para contribuir com o projeto.

---

## 📋 Índice

1. [Código de Conduta](#código-de-conduta)
2. [Como Contribuir](#como-contribuir)
3. [Padrões de Código](#padrões-de-código)
4. [Processo de Pull Request](#processo-de-pull-request)
5. [Reportar Bugs](#reportar-bugs)
6. [Sugerir Melhorias](#sugerir-melhorias)

---

## 🤝 Código de Conduta

### Nossa Promessa

Estamos comprometidos em manter um ambiente respeitoso, inclusivo e acolhedor para todos.

### Comportamentos Esperados

-   ✅ Usar linguagem acolhedora e inclusiva
-   ✅ Respeitar diferentes pontos de vista
-   ✅ Aceitar críticas construtivas graciosamente
-   ✅ Focar no que é melhor para a comunidade
-   ✅ Mostrar empatia com outros membros

### Comportamentos Inaceitáveis

-   ❌ Linguagem ou imagens sexualizadas
-   ❌ Comentários insultuosos/depreciativos
-   ❌ Assédio público ou privado
-   ❌ Publicar informações privadas de terceiros
-   ❌ Conduta não profissional

---

## 🚀 Como Contribuir

### 1. Encontre algo para trabalhar

-   Verifique as [Issues](../../issues) abertas
-   Procure por labels: `good first issue`, `help wanted`, `bug`
-   Ou sugira uma nova funcionalidade

### 2. Configure o ambiente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/positivesense.git

# Entre na pasta
cd positivesense

# Crie uma branch para sua feature
git checkout -b feature/minha-feature
```

### 3. Faça suas alterações

-   Siga os [Padrões de Código](#padrões-de-código)
-   Teste suas alterações
-   Documente o código
-   Adicione comentários quando necessário

### 4. Commit suas mudanças

```bash
# Adicione os arquivos
git add .

# Commit com mensagem descritiva
git commit -m "feat: adiciona nova funcionalidade X"
```

### 5. Push e crie Pull Request

```bash
# Push para o GitHub
git push origin feature/minha-feature

# Crie um Pull Request no GitHub
```

---

## 📝 Padrões de Código

### PHP

#### Nomenclatura

```php
// Arquivos: kebab-case
jogo-memoria.php

// Funções: snake_case
function render_header($items) { }

// Classes: PascalCase
class MemoryGame { }

// Variáveis: snake_case
$nav_items = [];
```

#### Estrutura de Arquivo

```php
<?php
/**
 * Cabeçalho com descrição
 * @author Nome
 * @version 1.0
 */

// Código aqui
?>
```

#### Boas Práticas

-   ✅ Use `htmlspecialchars()` para output
-   ✅ Use `require_once` ao invés de `require`
-   ✅ Sempre feche tags PHP `?>`
-   ✅ Indentação: 4 espaços
-   ✅ Sem trailing whitespace

### JavaScript

#### Nomenclatura

```javascript
// Variáveis/Funções: camelCase
const userName = "João";
function startGame() {}

// Classes: PascalCase
class EmotionGame {}

// Constantes: UPPER_SNAKE_CASE
const MAX_ATTEMPTS = 3;
```

#### Estrutura

```javascript
/**
 * Descrição da função
 * @param {string} param - Descrição
 * @returns {void}
 */
function myFunction(param) {
    // Código
}
```

#### Boas Práticas

-   ✅ Use `const` e `let`, evite `var`
-   ✅ Prefira arrow functions quando apropriado
-   ✅ Sempre use ponto e vírgula
-   ✅ Indentação: 2 espaços
-   ✅ Use aspas simples `'string'`

### CSS

#### Nomenclatura

```css
/* Classes: kebab-case */
.hero-container {
}

/* IDs: camelCase */
#menuToggle {
}

/* Variáveis CSS: --kebab-case */
--primary-color: #5b8fc4;
```

#### Ordem de Propriedades

```css
.elemento {
    /* 1. Display e Posicionamento */
    display: flex;
    position: relative;

    /* 2. Box Model */
    width: 100%;
    padding: 1rem;
    margin: 0 auto;

    /* 3. Visual */
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;

    /* 4. Tipografia */
    font-size: 1rem;
    color: #333;

    /* 5. Animações */
    transition: all 0.3s ease;
}
```

#### Boas Práticas

-   ✅ Use variáveis CSS quando possível
-   ✅ Mobile-first approach
-   ✅ Organize com comentários de seção
-   ✅ Indentação: 4 espaços
-   ✅ Um seletor por linha

### HTML

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Título</title>
    </head>
    <body>
        <!-- Conteúdo -->
    </body>
</html>
```

#### Boas Práticas

-   ✅ Use HTML5 semântico
-   ✅ Sempre inclua `alt` em imagens
-   ✅ Use ARIA labels para acessibilidade
-   ✅ Indentação: 2 espaços
-   ✅ Lowercase para tags e atributos

---

## 🔄 Processo de Pull Request

### Antes de Submeter

-   [ ] Testou em múltiplos navegadores (Chrome, Firefox, Edge)
-   [ ] Testou em diferentes tamanhos de tela (mobile, tablet, desktop)
-   [ ] Código segue os padrões do projeto
-   [ ] Adicionou comentários em código complexo
-   [ ] Atualizou documentação se necessário
-   [ ] Não há erros de console
-   [ ] Validou sintaxe PHP/JS

### Template de Pull Request

```markdown
## Descrição

Breve descrição das mudanças

## Tipo de Mudança

-   [ ] 🐛 Bug fix
-   [ ] ✨ Nova funcionalidade
-   [ ] 🔧 Melhoria
-   [ ] 📝 Documentação
-   [ ] 🎨 Estilo/UI

## Como Testar

1. Vá para...
2. Clique em...
3. Veja...

## Screenshots

(Se aplicável)

## Checklist

-   [ ] Código segue padrões do projeto
-   [ ] Testado em múltiplos dispositivos
-   [ ] Sem erros de console
-   [ ] Documentação atualizada
```

### Revisão

1. **Automática:**

    - Validação de sintaxe
    - Testes automatizados (se houver)

2. **Manual:**

    - Code review por mantenedor
    - Teste funcional
    - Verificação de qualidade

3. **Aprovação:**
    - Pelo menos 1 aprovação necessária
    - CI/CD passando (se configurado)

---

## 🐛 Reportar Bugs

### Antes de Reportar

1. **Verifique se já existe:** Procure em [Issues](../../issues)
2. **Reproduza o bug:** Certifique-se que é consistente
3. **Colete informações:** Versão, navegador, OS

### Template de Bug Report

```markdown
## 🐛 Descrição do Bug

Descrição clara e concisa do bug

## 🔄 Como Reproduzir

Passos para reproduzir:

1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

## ✅ Comportamento Esperado

O que deveria acontecer

## ❌ Comportamento Atual

O que acontece

## 📷 Screenshots

Se aplicável, adicione screenshots

## 🖥️ Ambiente

-   OS: [ex: Windows 10]
-   Browser: [ex: Chrome 120]
-   Versão: [ex: 1.0.0]

## 📝 Informações Adicionais

Qualquer outra informação relevante
```

---

## 💡 Sugerir Melhorias

### Template de Feature Request

```markdown
## 🚀 Feature Request

### Problema

Descreva o problema que esta feature resolveria

### Solução Proposta

Como você imagina que funcione

### Alternativas Consideradas

Outras soluções que você pensou

### Contexto Adicional

Screenshots, mockups, referências
```

---

## 📚 Recursos Úteis

### Documentação

-   [README.md](../README.md) - Visão geral do projeto
-   [DEVELOPER.md](docs/DEVELOPER.md) - Guia do desenvolvedor
-   [STYLE_GUIDE.md](docs/STYLE_GUIDE.md) - Guia de estilo

### Ferramentas

-   [PHP Documentation](https://www.php.net/manual/pt_BR/)
-   [MDN Web Docs](https://developer.mozilla.org/pt-BR/)
-   [Can I Use](https://caniuse.com/)

### Comunidade

-   Issues: Para discussões técnicas
-   Pull Requests: Para revisão de código

---

## 🎯 Prioridades do Projeto

### Alta Prioridade

-   🔒 Segurança
-   ♿ Acessibilidade
-   🐛 Bugs críticos
-   📱 Responsividade

### Média Prioridade

-   ✨ Novas funcionalidades
-   🎨 Melhorias de UI/UX
-   ⚡ Performance

### Baixa Prioridade

-   📝 Documentação
-   🧹 Refatoração
-   🎨 Ajustes visuais menores

---

## ✅ Commit Messages

### Formato

```
<tipo>(<escopo>): <assunto>

<corpo opcional>

<rodapé opcional>
```

### Tipos

-   `feat`: Nova funcionalidade
-   `fix`: Correção de bug
-   `docs`: Documentação
-   `style`: Formatação, ponto e vírgula, etc
-   `refactor`: Refatoração de código
-   `test`: Adicionar testes
-   `chore`: Manutenção

### Exemplos

```bash
feat(jogo): adiciona jogo de quebra-cabeça

fix(header): corrige menu mobile não fechando

docs(readme): atualiza instruções de instalação

style(css): ajusta espaçamento dos cards

refactor(js): simplifica lógica do jogo da memória
```

---

## 🙏 Agradecimentos

Obrigado por contribuir com o PositiveSense! Juntos estamos construindo uma plataforma mais inclusiva e acessível.

---

**Dúvidas?** Abra uma [Issue](../../issues/new) ou entre em contato!

**Última atualização:** Outubro 2025
