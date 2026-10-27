# 🤖 Sistema de IA - Chatbot PositiveSense

## 📋 Visão Geral

O chatbot PositiveSense é um assistente virtual especializado em **Transtorno do Espectro Autista (TEA)** e nos jogos educativos da plataforma. Ele foi desenvolvido para responder perguntas de professores, terapeutas, famílias e estudantes sobre autismo e como usar os jogos de forma eficaz.

---

## 🗂️ Arquitetura do Sistema

### **Componentes Principais**

1. **`chatbot_api.php`** - API de processamento de perguntas
2. **`data/ai_knowledge_autismo.json`** - Base de conhecimento estruturada
3. **`js/chatbot.js`** - Interface de usuário (frontend)
4. **`test_chatbot.html`** - Página de teste e demonstração

---

## 📚 Base de Conhecimento (`ai_knowledge_autismo.json`)

### **Estrutura do Arquivo JSON**

```json
{
    "autismo": {
        "descricao": "Definição do TEA",
        "caracteristicas": ["Lista de características"],
        "mitos": ["Mitos desmentidos"],
        "apoio": ["Terapias e suportes disponíveis"]
    },
    "beneficios_gerais_jogos": {
        "cognitivos": ["Benefícios cognitivos"],
        "socioemocionais": ["Benefícios emocionais"],
        "sensoriais": ["Benefícios sensoriais"]
    },
    "jogos": {
        "jogo-memoria": {
            "titulo": "Nome do jogo",
            "descricao": "Descrição curta",
            "nivel_dificuldade": "Fácil/Médio/Difícil",
            "habilidades_trabalhadas": ["Lista de habilidades"],
            "beneficios": ["Benefícios para TEA"],
            "adaptacoes_tea": ["Dicas de adaptação"],
            "quando_usar": "Orientações de uso",
            "cuidados": "Avisos importantes (opcional)"
        }
        // ... outros jogos
    },
    "dicas_uso_plataforma": {
        "professores": ["Dicas para educadores"],
        "terapeutas": ["Dicas para terapeutas"],
        "familias": ["Dicas para famílias"]
    },
    "sinais_alerta": ["Sinais que exigem atenção"]
}
```

### **Jogos Incluídos na Base**

| Jogo | Slug | Habilidades Principais |
|------|------|------------------------|
| Jogo da Memória | `jogo-memoria` | Memória visual, atenção sustentada |
| Jogo da Velha | `jogodavelha` | Raciocínio lógico, turnos sociais |
| Genius | `jogodasequencia` | Memória sequencial, padrões |
| Caça Palavras | `cacapalavras` | Vocabulário, atenção ao detalhe |
| Fruit Ninja | `fruitninja` | Coordenação motora, tempo de reação |
| Quebra-Cabeça | `quebracabeca` | Percepção espacial, resolução de problemas |

---

## 🔧 API do Chatbot (`chatbot_api.php`)

### **Endpoint**

```
POST /chatbot_api.php
Content-Type: application/json

{
    "question": "Sua pergunta aqui"
}
```

### **Resposta de Sucesso**

```json
{
    "success": true,
    "response": "Resposta gerada pela IA"
}
```

### **Resposta de Erro**

```json
{
    "success": false,
    "message": "Mensagem de erro"
}
```

### **Funcionalidades Implementadas**

#### ✅ **1. Reconhecimento de Contexto**
- Identifica perguntas sobre jogos específicos
- Detecta intenção (informação, dicas, benefícios)
- Processa variações de escrita (memória, memoria, jogo da memoria)

#### ✅ **2. Respostas Estruturadas**
Para cada jogo, a IA fornece:
- 📝 Descrição e objetivo
- 📊 Nível de dificuldade
- 💪 Habilidades trabalhadas
- ✨ Benefícios específicos para TEA
- 🔧 Adaptações recomendadas
- ⏰ Quando e como usar

#### ✅ **3. Informações sobre TEA**
- Definição e características
- Mitos desmentidos (ex: vacinas NÃO causam autismo)
- Terapias e apoios disponíveis
- Dicas para educação inclusiva

#### ✅ **4. Dicas Contextualizadas**
- Orientações para professores
- Estratégias para terapeutas
- Conselhos para famílias

#### ✅ **5. Conversação Natural**
- Respostas a cumprimentos (oi, olá, bom dia)
- Perguntas sobre o assistente
- Agradecimentos e feedback

---

## 🧪 Como Testar

### **Opção 1: Página de Teste**

1. Acesse: `http://localhost:8000/test_chatbot.html`
2. Use os botões de perguntas sugeridas
3. Ou digite sua própria pergunta
4. Observe a resposta estruturada

### **Opção 2: Comando cURL**

```bash
curl -X POST http://localhost:8000/chatbot_api.php \
  -H "Content-Type: application/json" \
  -d '{"question": "O que é autismo?"}'
```

### **Opção 3: Via JavaScript**

```javascript
async function askChatbot(question) {
    const response = await fetch('chatbot_api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
    });

    const data = await response.json();
    console.log(data.response);
}

askChatbot('Benefícios do jogo da memória');
```

---

## 💡 Exemplos de Perguntas e Respostas

### **Pergunta 1: "O que é autismo?"**

**Resposta:**
```
Transtorno do Espectro Autista (TEA) é uma condição do neurodesenvolvimento
caracterizada por diferenças na comunicação, interação social e padrões de
comportamento e interesses. A intervenção precoce, adaptações ambientais e
atividades estruturadas podem promover desenvolvimento e inclusão.
```

### **Pergunta 2: "Benefícios do jogo da memória"**

**Resposta:**
```
🎮 **Jogo da Memória**

📝 Teste sua memória encontrando pares de cartas iguais

📊 Dificuldade: Fácil a Médio

💪 Habilidades trabalhadas:
• Memória visual de curto prazo
• Atenção sustentada
• Reconhecimento de padrões visuais
• Discriminação de estímulos
• Concentração

✨ Benefícios para TEA:
• Estimula a memória de trabalho e atenção sustentada
• Ajuda no reconhecimento visual e discriminação de estímulos
• Pode ser adaptado com imagens e ritmos mais calmos
• Promove autoconfiança ao completar níveis
• Fortalece a persistência e foco

🔧 Dicas de adaptação:
• Use imagens previsíveis e não muito complexas
• Mantenha sons suaves ou permita desabilitar áudio
• Comece com poucos pares e aumente gradualmente
• Ofereça tempo ilimitado para reduzir ansiedade
• Celebre cada acerto com feedback positivo visual

⏰ Quando usar: Ideal para sessões de 10-15 minutos, em ambiente
calmo, como atividade de aquecimento ou recompensa.
```

### **Pergunta 3: "Vacinas causam autismo?"**

**Resposta:**
```
IMPORTANTE: Vacinas NÃO causam autismo! Este é um mito completamente
desmentido pela ciência. Estudos extensivos provam que não há relação
entre vacinas e autismo.
```

### **Pergunta 4: "Dicas para professores"**

**Resposta:**
```
📚 Dicas de uso:

👩‍🏫 Para professores: Use os jogos como recompensa após tarefas mais
desafiadoras, Adapte o tempo conforme capacidade de atenção, Monitore
sinais de frustração, Celebre progressos não apenas resultados, Use os
jogos para trabalhar objetivos do PEI.
```

---

## 🎯 Palavras-Chave Reconhecidas

### **Sobre TEA**
- `autismo`, `tea`, `espectro`
- `sintomas`, `caracteristicas`
- `tratamento`, `terapia`, `apoio`
- `escola`, `inclusão`, `educação`
- `família`, `pais`, `cuidadores`
- `sensorial`, `rotina`
- `vacina`, `mitos`

### **Sobre Jogos**
- `memoria` → Jogo da Memória
- `velha` → Jogo da Velha
- `sequencia`, `genius` → Genius
- `caca`, `palavras` → Caça Palavras
- `fruit`, `ninja` → Fruit Ninja
- `quebra`, `puzzle` → Quebra-Cabeça

### **Conversação**
- `oi`, `ola`, `bom dia`
- `quem`, `nome`
- `ajuda`, `dicas`
- `obrigado`, `legal`

---

## 📊 Estatísticas de Uso (Opcional)

O sistema registra perguntas em `logs/chatbot_questions.log`:

```
[2025-11-06 14:30:15] Pergunta: O que é autismo? | Resposta: Transtorno do Espectro...
[2025-11-06 14:31:22] Pergunta: jogo da memória | Resposta: 🎮 **Jogo da Memória**...
```

Isso permite:
- ✅ Análise de perguntas mais frequentes
- ✅ Identificação de tópicos que precisam mais conteúdo
- ✅ Melhoria contínua da base de conhecimento

---

## 🔄 Como Expandir a Base de Conhecimento

### **1. Adicionar Novo Jogo**

Edite `data/ai_knowledge_autismo.json`:

```json
"jogos": {
    "novo-jogo": {
        "titulo": "Nome do Novo Jogo",
        "descricao": "Breve descrição",
        "nivel_dificuldade": "Médio",
        "habilidades_trabalhadas": [
            "Habilidade 1",
            "Habilidade 2"
        ],
        "beneficios": [
            "Benefício específico para TEA"
        ],
        "adaptacoes_tea": [
            "Como adaptar para autismo"
        ],
        "quando_usar": "Orientações de uso"
    }
}
```

### **2. Adicionar Nova Categoria de Informação**

```json
"nova_secao": {
    "titulo": "Título da Seção",
    "conteudo": ["Informação 1", "Informação 2"]
}
```

### **3. Atualizar chatbot_api.php**

Adicione lógica para processar a nova seção:

```php
if (isset($kb['nova_secao'])) {
    $knowledgeBase['palavra_chave'] = /* processar dados */;
}
```

---

## 🛡️ Segurança e Privacidade

### **Boas Práticas Implementadas**

- ✅ Validação de entrada (evita XSS)
- ✅ Respostas baseadas em conhecimento pré-definido
- ✅ Sem armazenamento de dados pessoais
- ✅ Logs opcionais (podem ser desativados)
- ✅ Rate limiting pode ser adicionado

### **Avisos Importantes**

⚠️ **Este chatbot NÃO substitui**:
- Diagnóstico médico profissional
- Orientação de terapeutas especializados
- Consulta com psicólogos ou psiquiatras
- Acompanhamento médico regular

✅ **Este chatbot PODE**:
- Fornecer informações educativas
- Orientar sobre uso dos jogos
- Explicar conceitos sobre TEA
- Sugerir estratégias pedagógicas

---

## 🚀 Próximos Passos (Futuras Melhorias)

### **Curto Prazo**
- [ ] Adicionar mais variações de perguntas
- [ ] Incluir links para recursos externos confiáveis
- [ ] Implementar feedback do usuário (útil/não útil)

### **Médio Prazo**
- [ ] Integrar com API de IA externa (OpenAI, Gemini)
- [ ] Adicionar suporte multilíngue
- [ ] Criar histórico de conversas por sessão

### **Longo Prazo**
- [ ] Personalização de respostas por perfil (professor/pai/terapeuta)
- [ ] Sugestões proativas baseadas em contexto
- [ ] Dashboard de análise de perguntas

---

## 📞 Contato e Suporte

Para dúvidas sobre o sistema de IA:
- 📧 Email: positivesense@gmail.com
- 📱 WhatsApp: +55 11 99999-9999

---

## 📄 Licença

Este sistema é parte do projeto PositiveSense e segue a mesma licença.

---

**Desenvolvido com 💙 pela equipe PositiveSense**
