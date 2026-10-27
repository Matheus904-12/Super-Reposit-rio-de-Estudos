# 🎬 Golden Movie Studio

> **Iluminando seu caminho no mundo do cinema!**

[![End-to-end tests](https://github.com/Matheus904-12/gms-test/actions/workflows/test.yml/badge.svg)](https://github.com/Matheus904-12/gms-test/actions/workflows/test.yml) ![License](https://img.shields.io/badge/License-ISC-blue) ![Cypress](https://img.shields.io/badge/Tests-Cypress-17202A?logo=cypress) ![Status](https://img.shields.io/badge/Status-Ativo-green)

Uma aplicação web moderna para descoberta de filmes, que oferece recomendações personalizadas, busca avançada e cadastro de usuários. Desenvolvida com foco na experiência do usuário e testes automatizados.

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Testes](#-testes)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API Externa](#-api-externa)
- [Deploy](#-deploy)
- [CI/CD](#-cicd)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

## ✨ Funcionalidades

### 🎯 Principais Features

- **🎬 Recomendações Automáticas**: Exibe filmes populares na página inicial
- **🔍 Busca Inteligente**: Sistema de pesquisa usando a API do OMDb
- **👤 Cadastro de Usuários**: Sistema completo de registro com validações
- **📱 Design Responsivo**: Interface adaptável para diferentes dispositivos
- **🎨 Interface Moderna**: Design elegante com tema cinematográfico

### 🎭 User Stories Implementadas

- **US-001**: Buscar filme por nome
- **US-012**: Cadastro de usuário com validação
- **US-015**: Visualizar recomendações de filmes

## � Tecnologias

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização e layout responsivo
- **JavaScript (ES6+)** - Lógica da aplicação
- **OMDb API** - Base de dados de filmes

### Testes e DevOps
- **Cypress 15.3.0** - Testes end-to-end automatizados
- **GitHub Actions** - CI/CD Pipeline
- **HTTP-Server** - Servidor local para desenvolvimento
- **Wait-on** - Sincronização de processos

### APIs Integradas
- **OMDb API** - Para busca e informações de filmes
- **AWS Lambda** - Backend para cadastro de usuários (produção)

## 🚀 Instalação

### Pré-requisitos
- Node.js (versão 14 ou superior)
- NPM ou Yarn
- Git

### Passos de Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/Matheus904-12/gms-test.git
cd gms-test
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm start
```

4. **Acesse a aplicação**
```
http://localhost:8080
```

## 🎯 Como Usar

### 🏠 Página Inicial
- Visualize recomendações automáticas de filmes populares
- Navegue pelas sugestões do dia

### 🔍 Buscar Filmes
1. Digite o nome do filme no campo de busca
2. Clique em "Buscar" ou pressione Enter
3. Visualize os resultados com poster, título e ano
4. Use "Limpar Busca" para nova pesquisa

### 👤 Cadastro de Usuário
1. Preencha os campos obrigatórios:
   - Nome*
   - Sobrenome*
   - Email*
   - Senha*
   - Telefone (opcional)
2. Clique em "Cadastrar"
3. Receba confirmação de cadastro

## 📁 Estrutura do Projeto

```
gms-test/
├── 📁 .github/workflows/
│   └── test.yml                 # GitHub Actions CI/CD
├── 📁 cypress/
│   ├── 📁 e2e/
│   │   └── spec.cy.js          # Testes E2E principais
│   ├── 📁 screenshots/         # Screenshots automáticos
│   ├── 📁 videos/              # Vídeos dos testes
│   └── 📁 support/             # Arquivos de suporte
├── 📁 public/                  # Aplicação web
│   ├── index.html              # Página principal
│   ├── script.js               # JavaScript principal
│   ├── styles.css              # Estilos CSS
│   └── 📁 img/
│       └── logo.svg            # Logo da aplicação
├── cypress.config.js           # Configuração do Cypress
├── package.json               # Dependências e scripts
└── README.md                  # Este arquivo
```

## 🧪 Testes

Este projeto utiliza **Cypress** para testes end-to-end automatizados.

### Executar Testes

**Modo Interativo (recomendado para desenvolvimento):**
```bash
npx cypress open
```

**Modo Headless (para CI/CD):**
```bash
npm test
# ou
npx cypress run --browser chrome
```

### Cobertura de Testes

#### ✅ Cenários Testados

**Cadastro de Usuário (US-012)**
- ✅ Cadastro com sucesso (campos obrigatórios)
- ✅ Validação de email duplicado
- ✅ Validação de campos obrigatórios

**Busca de Filmes (US-001)**
- ✅ Busca com resultados válidos
- ✅ Busca sem resultados (filme não encontrado)
- ✅ Validação de campo vazio

**Recomendações (US-015)**
- ✅ Carregamento automático das recomendações
- ✅ Interação com filmes recomendados

### 📊 Relatórios de Teste
- Screenshots automáticos em `cypress/screenshots/`
- Vídeos dos testes em `cypress/videos/`
- Relatórios detalhados no terminal

## 🌐 API Externa

### OMDb API Integration

O projeto integra com a **OMDb API** (Open Movie Database) para:
- Buscar informações de filmes
- Obter posters e metadados
- Carregar recomendações

**Endpoints utilizados:**
```javascript
// Busca por título específico
https://www.omdbapi.com/?t=${movieTitle}&apikey=${API_KEY}

// Busca por termo
https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}
```

## 🚀 Deploy

### Ambientes

**Desenvolvimento:**
```bash
npm start  # http://localhost:8080
```

**Produção:**
- **Frontend**: Netlify - https://golden-movie-studio.netlify.app/
- **Backend**: AWS Lambda - Endpoint para cadastro de usuários

### Configuração Automática de Ambiente

O projeto detecta automaticamente o ambiente:
```javascript
const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const API_BASE_URL = isProduction 
    ? 'https://wyni6895be.execute-api.us-east-1.amazonaws.com' 
    : 'http://127.0.0.1:8080';
```

## 🔄 CI/CD

### GitHub Actions Workflow
O pipeline automatizado executa:

1. **🔧 Setup** - Node.js com cache npm
2. **📦 Instalação** - `npm ci` para dependências
3. **🚀 Servidor** - Inicia `http-server` em background
4. **⏳ Aguardar** - `wait-on` até servidor responder
5. **🧪 Testes** - Executa todos os testes Cypress
6. **📸 Artifacts** - Upload de screenshots e vídeos

### Triggers
- ✅ **Push** para qualquer branch
- ✅ **Pull Request** para main
- ✅ **Manual** via GitHub UI

### Proteção do Branch Principal

Para garantir a qualidade do código:
1. Acesse **Settings** → **Branches** no GitHub
2. Adicione regra para `main` com:
   - ✅ Require status checks (cypress-run)
   - ✅ Require pull request reviews
   - ✅ Restrict force pushes

## 🤝 Contribuição

### Como Contribuir

1. **Fork** o projeto
2. **Crie** uma branch para sua feature:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. **Commit** suas mudanças:
   ```bash
   git commit -m 'feat: adiciona nova funcionalidade'
   ```
4. **Push** para a branch:
   ```bash
   git push origin feature/nova-funcionalidade
   ```
5. **Abra** um Pull Request

### 📝 Padrões de Commit

Utilizamos conventional commits:
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `test:` - Testes
- `style:` - Formatação
- `refactor:` - Refatoração

### 🐛 Reportar Issues

Para reportar bugs ou sugerir melhorias:
1. Verifique se o issue já existe
2. Crie um novo issue com:
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado
   - Screenshots (se aplicável)

## � Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm start

# Executar testes
npm test

# Instalar dependências
npm install

# Abrir Cypress interativo
npx cypress open

# Executar testes em modo headless
npx cypress run
```

## 🐛 Troubleshooting

### Problemas Comuns

**❌ Erro: `cy.visit() failed trying to load http://127.0.0.1:8080`**
```bash
# Solução: Verificar se o servidor está rodando
npm start
# Em outro terminal:
npx cypress run
```

**❌ Timeout nos testes de recomendações**
```bash
# Verificar conectividade com API OMDB
curl "https://www.omdbapi.com/?t=Matrix&apikey=SUA_CHAVE"
```

**❌ Screenshots não gerados**
```bash
# Verificar configuração no cypress.config.js
screenshotOnRunFailure: true
screenshotsFolder: 'cypress/screenshots'
```

## 📈 Métricas de Qualidade

- ✅ **100% dos testes** passando
- ✅ **6 cenários** cobertos
- ✅ **Tempo médio** < 30s
- ✅ **0 flaky tests** - Estabilidade garantida

## 📞 Suporte

- **Issues**: [GitHub Issues](https://github.com/Matheus904-12/gms-test/issues)
- **Documentação**: Este README
- **Testes**: Documentados em `cypress/e2e/spec.cy.js`

## 📈 Roadmap

### 🎯 Próximas Funcionalidades
- [ ] Sistema de favoritos
- [ ] Avaliações de filmes
- [ ] Filtros avançados de busca
- [ ] Sistema de recomendações por gênero
- [ ] Modo escuro/claro
- [ ] PWA (Progressive Web App)

### 🔧 Melhorias Técnicas
- [ ] Testes unitários com Jest
- [ ] Otimização de performance
- [ ] Acessibilidade (WCAG 2.1)
- [ ] Internacionalização (i18n)

## � Licença

Este projeto está licenciado sob a **ISC License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

## �👥 Autor

**Matheus Lucindo**
- GitHub: [@Matheus904-12](https://github.com/Matheus904-12)
- Email: matheuslucindo904@gmail.com

---

<div align="center">

**Desenvolvido com ❤️ para amantes do cinema**

[⬆ Voltar ao topo](#-golden-movie-studio)

⭐ **Se este projeto foi útil, considere dar uma estrela!** ⭐

</div>