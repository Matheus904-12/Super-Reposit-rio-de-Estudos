# 🤖 Como Usar o Chatbot PositiveSense

## ⚠️ IMPORTANTE: Servidor Correto

O chatbot **PRECISA** ser acessado através do **servidor PHP**, não do Live Server!

### ❌ NÃO FUNCIONA:
```
http://127.0.0.1:5500/test_chatbot.html  ❌ (Live Server)
http://127.0.0.1:5501/test_chatbot.html  ❌ (Live Server)
```

### ✅ FUNCIONA:
```
http://localhost:8000/test_chatbot.html  ✅ (Servidor PHP)
```

---

## 🚀 Como Usar - Passo a Passo

### 1️⃣ **Feche o Live Server**
- No VSCode, clique no **"X"** ou **"Port: 5500"** no canto inferior direito
- Ou pressione: `Ctrl + Shift + P` → Digite "Live Server: Stop"

### 2️⃣ **Verifique se o Servidor PHP está Rodando**
- Procure por um terminal chamado: `🚀 Iniciar Servidor PHP`
- Deve mostrar algo como: `PHP Development Server (http://localhost:8000) started`

### 3️⃣ **Se o Servidor PHP NÃO estiver rodando:**
```bash
# Opção 1: Via Task do VSCode
Ctrl + Shift + P → "Tasks: Run Task" → "🚀 Iniciar Servidor PHP"

# Opção 2: Manualmente no terminal
cd c:\xampp\htdocs\PositiveSense
php -S localhost:8000
```

### 4️⃣ **Acesse o Chatbot**
- Abra seu navegador
- Digite: `http://localhost:8000/test_chatbot.html`
- Ou clique no alert de redirecionamento automático

---

## 🎯 Recursos do Chatbot

### Perguntas Pré-Configuradas (8):
1. ❓ **"O que é autismo?"** - Informações sobre TEA
2. 🎮 **"Quais jogos vocês têm?"** - Lista de jogos disponíveis
3. 🧠 **"Benefícios do jogo da memória"** - Detalhes do jogo
4. 🎵 **"Como usar o genius?"** - Informações sobre Genius
5. 👩‍🏫 **"Dicas para professores"** - Orientações educacionais
6. ❌ **"Mitos sobre autismo"** - Desmistificação
7. 🍎 **"Fruit Ninja para TEA"** - Adaptações do jogo
8. 🩺 **"Terapias para autismo"** - Informações terapêuticas

### Campo de Entrada Livre:
Digite qualquer pergunta relacionada a:
- Autismo e TEA
- Jogos educativos da plataforma
- Adaptações para crianças autistas
- Dicas para professores/terapeutas/famílias

---

## 🔧 Detecção Automática de Problema

A página agora detecta automaticamente se você está no servidor errado:

### 🚨 Avisos que Você Verá:
1. **Banner vermelho no topo** com a URL correta
2. **Alert popup** oferecendo redirecionamento automático
3. **Mensagem de erro** se tentar enviar pergunta sem estar no servidor correto

---

## 🧪 Testando a API Diretamente

Se quiser testar a API sem a interface:

```bash
# PowerShell
$body = @{ question = "O que é autismo?" } | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:8000/chatbot_api.php" -Method POST -Body $body -ContentType "application/json"
```

```bash
# cURL
curl -X POST http://localhost:8000/chatbot_api.php \
  -H "Content-Type: application/json" \
  -d '{"question":"O que é autismo?"}'
```

---

## 📊 Status da API

### ✅ Funcionando Corretamente:
```json
{
  "success": true,
  "response": "Transtorno do Espectro Autista (TEA)..."
}
```

### ❌ Erro - Método Incorreto:
```json
{
  "success": false,
  "message": "Método não permitido. Use POST."
}
```

### ❌ Erro - Pergunta Vazia:
```json
{
  "success": false,
  "message": "Pergunta não fornecida"
}
```

---

## 🐛 Solução de Problemas

### Problema: "405 Method Not Allowed"
**Causa:** Você está acessando via Live Server (porta 5500)
**Solução:** Feche o Live Server e acesse via `localhost:8000`

### Problema: "Failed to fetch" ou "Network Error"
**Causa:** Servidor PHP não está rodando
**Solução:** Inicie o servidor PHP (veja passo 3 acima)

### Problema: "Pergunta não fornecida"
**Causa:** Campo de pergunta está vazio
**Solução:** Digite uma pergunta antes de clicar em Enviar

### Problema: Resposta vazia ou genérica
**Causa:** Pergunta não reconhecida pela IA
**Solução:** Reformule a pergunta ou use uma das sugestões pré-configuradas

---

## 💡 Dicas de Uso

### ✅ Boas Práticas:
- Use perguntas claras e objetivas
- Experimente as perguntas sugeridas primeiro
- Palavras-chave funcionam bem: "memória", "velha", "autismo", "dicas"
- Pergunte sobre jogos específicos pelo nome

### ❌ Evite:
- Perguntas muito curtas (menos de 3 caracteres)
- Tópicos não relacionados a TEA ou jogos educativos
- Múltiplas perguntas em uma só vez

---

## 📚 Base de Conhecimento

O chatbot tem conhecimento sobre:

### 🧠 Sobre TEA:
- Definição e características do autismo
- Mitos e verdades sobre TEA
- Terapias e tratamentos disponíveis
- Educação inclusiva
- Apoio familiar

### 🎮 Sobre os Jogos:
1. **Jogo da Memória** - Memória visual e atenção
2. **Jogo da Velha** - Lógica e turnos sociais
3. **Genius (Sequência)** - Padrões e memória sequencial
4. **Caça Palavras** - Vocabulário e atenção ao detalhe
5. **Fruit Ninja** - Coordenação motora e reflexos
6. **Quebra-Cabeça** - Percepção espacial e resolução de problemas

### 💼 Dicas Especializadas:
- Orientações para professores
- Estratégias para terapeutas
- Conselhos para famílias

---

## 🎉 Pronto para Usar!

Agora é só:
1. ✅ Garantir que está em `http://localhost:8000`
2. ✅ Clicar em uma pergunta sugerida
3. ✅ Ou digitar sua própria pergunta
4. ✅ Receber uma resposta detalhada e útil!

**Divirta-se explorando o conhecimento da IA sobre TEA! 🤖💙**
