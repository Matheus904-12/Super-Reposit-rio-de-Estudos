# 🤖 Chatbot Assistente TEA - PositiveSense

## 📋 Visão Geral

Chatbot assistente virtual fixado no canto da tela para tirar dúvidas sobre TEA (Transtorno do Espectro Autista) e autismo.

## ✨ Funcionalidades

### 🎯 Principais Recursos

-   ✅ **Botão flutuante** fixo no canto inferior direito
-   ✅ **Interface moderna** com animações suaves
-   ✅ **Respostas inteligentes** sobre TEA e autismo
-   ✅ **Sugestões rápidas** de perguntas frequentes
-   ✅ **Totalmente responsivo** (mobile e desktop)
-   ✅ **Base de conhecimento** pré-definida
-   ✅ **Sistema de IA** expansível

### 💬 Tópicos que o Chatbot Responde

-   O que é TEA?
-   Sinais e sintomas do autismo
-   Como ajudar pessoas com TEA
-   Atividades recomendadas
-   Tratamentos e terapias
-   Educação inclusiva
-   Apoio à família
-   Diagnóstico
-   E muito mais!

## 🎨 Interface

### Botão Flutuante

-   Ícone de chat quando fechado
-   Ícone de X quando aberto
-   Badge com "?" para chamar atenção
-   Animação de hover

### Janela do Chat

-   **Header**: Avatar 🧠, nome "Assistente TEA", status online
-   **Mensagens**: Área scrollável com histórico
-   **Sugestões Rápidas**: 4 botões com perguntas comuns
-   **Input**: Campo de texto + botão enviar

## 🎯 Como Usar

### Para Usuários

1. Clique no botão flutuante no canto da tela
2. Escolha uma sugestão rápida OU digite sua pergunta
3. Pressione Enter ou clique no botão enviar
4. Receba a resposta instantaneamente

### Exemplos de Perguntas

-   "O que é TEA?"
-   "Quais são os sinais do autismo?"
-   "Como ajudar uma criança com TEA?"
-   "Quais atividades são recomendadas?"
-   "Como funciona o diagnóstico?"

## 📁 Arquivos do Sistema

### 1. **css/chatbot.css**

Estilos completos do chatbot:

-   Layout flutuante
-   Animações
-   Design responsivo
-   Cores e tipografia

### 2. **js/chatbot.js**

Lógica principal do chatbot:

-   Gerenciamento de interface
-   Envio/recebimento de mensagens
-   Respostas pré-definidas
-   Integração com API

### 3. **chatbot_api.php**

Backend para processamento:

-   Recebe perguntas
-   Processa com base de conhecimento
-   Retorna respostas em JSON
-   Log de perguntas

### 4. **partials.php** (atualizado)

Inclui chatbot em todas as páginas:

```php
echo '<link rel="stylesheet" href="css/chatbot.css">';
echo '<script src="js/chatbot.js"></script>';
```

## 🔧 Arquitetura

### Fluxo de Funcionamento

```
1. Usuário digita pergunta
   ↓
2. JavaScript captura input
   ↓
3. Verifica respostas pré-definidas (local)
   ↓
4. Se não encontrar → envia para API
   ↓
5. chatbot_api.php processa
   ↓
6. Retorna resposta JSON
   ↓
7. JavaScript exibe mensagem
```

### Base de Conhecimento (JavaScript)

```javascript
- "O que é TEA?" → Definição completa
- "Sinais" → Lista de sintomas
- "Como ajudar" → Dicas práticas
- "Atividades" → Sugestões de jogos
- "Jogos" → Informações sobre PositiveSense
- "Diagnóstico" → Processo e profissionais
```

### Base de Conhecimento (PHP)

```php
- TEA → Definição e características
- Sintomas → Lista detalhada
- Causas → Fatores genéticos/ambientais
- Tratamento → Terapias e intervenções
- Escola → Educação inclusiva
- Família → Apoio aos familiares
- Comunicação → Formas alternativas
- Adultos → Vida adulta com TEA
```

## 🎨 Personalização

### Cores

```css
--primary: #5b8fc4 (Azul principal)
--bg-gradient: linear-gradient(135deg, #5b8fc4, #4a7ab3)
--status-online: #4ade80 (Verde)
--error: #FF6B6B (Vermelho)
```

### Animações

-   `slideIn`: Entrada de mensagens
-   `pulse-badge`: Pulsação do badge
-   `pulse-dot`: Status online
-   `typing`: Indicador de digitação
-   `float`: Hover no botão

### Avatar

-   Bot: 🧠 (cérebro)
-   Usuário: 👤 (pessoa)

## 📱 Responsividade

### Desktop (>768px)

-   Janela: 380px × 550px
-   Botão: 70px × 70px
-   Posição: 30px do canto

### Mobile (≤768px)

-   Janela: 100vw - 40px
-   Altura: 100vh - 150px
-   Botão: 60px × 60px
-   Posição: 20px do canto

## 🚀 Expansão Futura

### Integração com APIs de IA

Você pode integrar com:

-   **OpenAI GPT** (requer API key)
-   **Google Gemini** (gratuito com limites)
-   **Anthropic Claude**
-   **Hugging Face**

Exemplo de integração:

```php
// Em chatbot_api.php
$apiKey = 'sua-chave-aqui';
$response = callOpenAI($question, $apiKey);
```

### Melhorias Possíveis

-   [ ] Histórico de conversas salvo
-   [ ] Sistema de feedback (👍/👎)
-   [ ] Modo voz (speech-to-text)
-   [ ] Idiomas adicionais
-   [ ] Sugestões contextuais
-   [ ] Integração com banco de dados
-   [ ] Analytics de perguntas frequentes

## 🔐 Segurança

### Implementado

-   ✅ Sanitização de entrada
-   ✅ JSON encoding/decoding seguro
-   ✅ Log de perguntas
-   ✅ Sem armazenamento de dados pessoais

### Recomendações

-   Implementar rate limiting
-   Validar tamanho máximo de mensagem
-   Filtro de conteúdo ofensivo
-   HTTPS em produção

## 📊 Logs

As perguntas são registradas em:

```
logs/chatbot_questions.log
```

Formato:

```
[2025-10-31 14:30:00] Pergunta: O que é TEA? | Resposta: O Transtorno do...
```

## 🎯 Status

### ✅ Implementado

-   Interface completa
-   Sistema de mensagens
-   Respostas pré-definidas
-   Sugestões rápidas
-   Design responsivo
-   API backend
-   Integração automática

### 🔄 Em Desenvolvimento

-   Integração com IA externa
-   Analytics avançado
-   Sistema de feedback

## 🧪 Como Testar

1. Acesse qualquer página do site
2. Veja o botão azul no canto inferior direito
3. Clique para abrir o chat
4. Teste as sugestões rápidas
5. Digite perguntas personalizadas
6. Observe as respostas

## 📞 Exemplos de Diálogos

### Exemplo 1

**Usuário**: O que é TEA?
**Bot**: O TEA (Transtorno do Espectro Autista) é uma condição neurológica que afeta o desenvolvimento e a forma como uma pessoa se comunica e interage com outras pessoas...

### Exemplo 2

**Usuário**: Como posso ajudar?
**Bot**: Para ajudar uma pessoa com TEA:
• Seja paciente e compreensivo
• Mantenha uma rotina consistente
• Use comunicação clara e direta...

## 🎨 Capturas de Tela

### Botão Fechado

```
┌──────┐
│  💬  │  ← Botão com badge "?"
└──────┘
```

### Janela Aberta

```
┌─────────────────────────┐
│ 🧠 Assistente TEA      │
│ Tire suas dúvidas      │
├─────────────────────────┤
│                         │
│ [Mensagens do chat]     │
│                         │
├─────────────────────────┤
│ [Sugestões rápidas]     │
├─────────────────────────┤
│ Digite sua pergunta... 📤│
└─────────────────────────┘
```

---

**Desenvolvido com ❤️ pela equipe PositiveSense**
_Ajudando a esclarecer dúvidas sobre TEA com tecnologia e empatia_
