# 🐾 Risco - Amigo Virtual

<div align="center">
  <img src="./assets/icon.png" alt="Risco - Amigo Virtual" width="150" />
</div>

<br />

<div align="center">
  <a href="https://matheus904-12.github.io/PositiveSensePage/">
    <img src="https://img.shields.io/badge/Landing_Page-Visite-764ba2?style=for-the-badge" />
  </a>
</div>

---

## 🎯 Acesse o App

Este repositório hospeda a **landing page** do aplicativo **Risco - Amigo Virtual**, um companheiro de apoio emocional desenvolvido como parte do projeto **PositiveSense**.

### 📱 Android APK

Baixe e instale diretamente no seu dispositivo Android:

**[📥 Download APK Android](https://expo.dev/accounts/heloisamachado/projects/risco-amigo-virtual/builds/1ba0fd4f-788c-4fd3-af77-5c3dfd38a806)**

> Após baixar, habilite "Instalar apps de fontes desconhecidas" nas configurações do Android.

### 🍎 iPhone / iOS Web App

Acesse no navegador Safari e adicione à tela inicial como PWA:

**[🔗 Abrir Web App para iOS](https://startling-faloodeh-6a94da.netlify.app/)**

**Como adicionar à tela inicial:**
1. Abra o link acima no **Safari**
2. Toque no botão de **Compartilhar** (quadrado com seta)
3. Role e selecione **"Adicionar à Tela de Início"**
4. O ícone do Risco aparecerá como um app nativo!

### 🌐 Site Oficial

Conheça mais sobre o projeto PositiveSense:

**[🌍 Visite o Site](https://positive-sense-web.vercel.app/)**

---

## 📱 Sobre o Aplicativo

**Risco - Amigo Virtual** é um aplicativo de apoio emocional focado em auxiliar pessoas com **TEA (Transtorno do Espectro Autista)** através de interações suaves, atividades calmantes e suporte emocional personalizado.

O app apresenta o **Risco**, um mascote amigável e acolhedor que reage ao humor do usuário, oferece mensagens motivacionais e proporciona atividades relaxantes para momentos de ansiedade ou sobrecarga sensorial.

### ✨ Funcionalidades Principais

- 🎭 **Reconhecimento de Humor**: Indique como está se sentindo e o Risco reage adequadamente
- 💬 **Mensagens Motivacionais**: Frases de apoio personalizadas
- 🫁 **Respiração Guiada**: Exercícios sincronizados com animações
- 🌈 **Cores Relaxantes**: Transições suaves para acalmar
- ✨ **Toque Mágico**: Interação tátil com efeitos visuais
- 🆘 **Modo SOS Calma**: Técnicas de relaxamento em momentos críticos
- 🎨 **Personalização**: Customize o Risco
- 💾 **Perfil Pessoal**: Histórico de humor e preferências

---

## 🚀 Sobre este Repositório

Este repositório contém a **landing page** do aplicativo, hospedada via **Netlify**. A página serve como ponto de acesso principal para download e informações sobre o app.

### 📂 Estrutura

```
PositiveSensePage/
├── index.html           # Landing page principal
├── netlify.toml         # Configuração do Netlify
├── assets/              # Recursos visuais
│   ├── icon.png         # Ícone do app
│   └── favicon.png      # Favicon do site
├── .gitignore
├── LICENSE              # Licença MIT
└── README.md            # Este arquivo
```

---

## 🌐 Hospedagem

A landing page está hospedada no **Netlify** e pode ser acessada através do GitHub Pages:

**[🔗 Acesse a Landing Page](https://matheus904-12.github.io/PositiveSensePage/landing-page/)**

---

## 🤝 Contribuindo

Este projeto faz parte do **PositiveSense**, uma iniciativa de inclusão e apoio emocional. Contribuições são bem-vindas!

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Equipe PositiveSense

Desenvolvido com 💜 pela equipe PositiveSense

- 🌐 **Site**: [positive-sense-web.vercel.app](https://positive-sense-web.vercel.app/)
- 📱 **App Web iOS**: [startling-faloodeh-6a94da.netlify.app](https://startling-faloodeh-6a94da.netlify.app/)
- 📥 **APK Android**: [expo.dev/accounts/heloisamachado](https://expo.dev/accounts/heloisamachado/projects/risco-amigo-virtual/builds/1ba0fd4f-788c-4fd3-af77-5c3dfd38a806)

---

## 🆘 Suporte

Encontrou algum problema ou tem alguma dúvida?

- Visite nosso [site oficial](https://positive-sense-web.vercel.app/)
- Entre em contato através da landing page

---

<div align="center">
  <p><strong>Risco - Amigo Virtual</strong></p>
  <p>Um projeto para tornar o mundo mais inclusivo e acolhedor 🌟</p>
</div>
npm start
# ou
yarn start
```

Isso abrirá o Expo Dev Tools no seu navegador. A partir daí você pode:

- Pressionar `a` para abrir no emulador Android
- Pressionar `i` para abrir no simulador iOS (macOS apenas)
- Escanear o QR Code com o app **Expo Go** no seu celular

---

## 📦 Gerar APK para Distribuição

### Opção 1: Build Local (EAS Build - Recomendado)

1. **Instalar EAS CLI**:
```bash
npm install -g eas-cli
```

2. **Login no Expo**:
```bash
eas login
```

3. **Configurar o projeto**:
```bash
eas build:configure
```

4. **Criar o build APK**:
```bash
eas build --platform android --profile production
```

O processo levará alguns minutos. Ao final, você receberá um link para baixar o APK.

### Opção 2: Export para APK Local

Para desenvolvimento e testes locais:

```bash
# Exportar o app
npx expo export --platform android

# Instalar no dispositivo via ADB
adb install -r android-build.apk
```

### Opção 3: Build Standalone (Classic Build)

```bash
expo build:android
```

Escolha:
- **APK** para instalação direta
- **AAB** para publicar na Google Play Store

---

## 📂 Estrutura do Projeto

```
PositiveSense-App/
├── App.tsx                      # Ponto de entrada principal
├── app.json                     # Configurações do Expo
├── package.json                 # Dependências
├── tsconfig.json               # Configurações TypeScript
├── babel.config.js             # Configurações Babel
│
├── src/
│   ├── components/              # Componentes reutilizáveis
│   │   ├── CiscoAvatar.tsx     # Mascote animado
│   │   ├── Button.tsx          # Botão customizado
│   │   └── MoodSelector.tsx    # Seletor de humor
│   │
│   ├── screens/                 # Telas do aplicativo
│   │   ├── WelcomeScreen.tsx   # Tela de boas-vindas
│   │   ├── MoodCheckScreen.tsx # Verificação de humor
│   │   ├── HomeScreen.tsx      # Tela principal
│   │   ├── ActivitiesScreen.tsx# Atividades calmantes
│   │   ├── ProfileScreen.tsx   # Personalização
│   │   └── SOSCalmScreen.tsx   # Modo emergência
│   │
│   ├── navigation/              # Navegação
│   │   └── AppNavigator.tsx    # Configuração de rotas
│   │
│   ├── constants/               # Constantes e configurações
│   │   ├── theme.ts            # Cores e estilos
│   │   └── messages.ts         # Mensagens do Cisco
│   │
│   ├── utils/                   # Utilitários
│   │   └── storage.ts          # AsyncStorage helper
│   │
│   └── types/                   # Tipos TypeScript
│       └── index.ts            # Definições de tipos
│
└── assets/                      # Imagens e recursos
    ├── icon.png
    ├── splash.png
    └── adaptive-icon.png
```

---

## 🎨 Paleta de Cores

O app utiliza cores suaves e acessíveis para evitar sobrecarga sensorial:

- **Azul Claro** (#8FD4FF) - Cor primária
- **Lilás Suave** (#C9A8FF) - Cor secundária
- **Verde Menta** (#A7F3CE) - Cor de destaque
- **Amarelo Claro** (#FFE082) - Felicidade
- **Rosa Suave** (#FFB3BA) - Alerta suave

---

## 🧩 Componentes Principais

### CiscoAvatar
Mascote animado que muda expressões e cores baseado no humor do usuário.

### MoodSelector
Interface para o usuário selecionar seu estado emocional atual.

### Atividades Calmantes
- **Respiração Guiada**: Animação sincronizada para exercícios respiratórios
- **Cores Relaxantes**: Gradientes suaves que mudam automaticamente
- **Toque Mágico**: Efeitos visuais interativos ao tocar na tela

---

## 🔧 Tecnologias Utilizadas

- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **React Navigation** - Navegação entre telas
- **Expo Linear Gradient** - Gradientes suaves
- **Expo Haptics** - Feedback tátil
- **AsyncStorage** - Persistência de dados local
- **Reanimated** - Animações fluidas

---

## 📱 Screenshots

> **Nota**: Adicione capturas de tela do app aqui quando estiver executando

---

## 🤝 Contribuindo

Este projeto faz parte do **PositiveSense**, uma iniciativa de inclusão escolar. Contribuições são bem-vindas!

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença especificada no arquivo [LICENSE](LICENSE).

---

## 👥 Equipe PositiveSense

Desenvolvido com 💜 pela equipe PositiveSense

- 🌐 **Site**: [positive-sense-web.vercel.app](https://positive-sense-web.vercel.app/)
- 📧 **Contato**: positivesense@gmail.com
- 💻 **GitHub**: [heloisamachado155/PositiveSense](https://github.com/heloisamachado155/PositiveSense.git)

---

## 🆘 Suporte

Encontrou algum problema ou tem alguma dúvida? 

- Abra uma [issue no GitHub](https://github.com/heloisamachado155/PositiveSense-App/issues)
- Entre em contato pelo email: positivesense@gmail.com

---

<div align="center">
  <p><strong>Cisco - Amigo Virtual</strong></p>
  <p>Um projeto para tornar o mundo mais inclusivo e acolhedor 🌟</p>
</div>
