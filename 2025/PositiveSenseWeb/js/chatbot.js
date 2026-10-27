/**
 * ========================================
 * CHATBOT ASSISTENTE - TEA & AUTISMO
 * PositiveSense - Assistente Virtual
 * ========================================
 */

class ChatbotAssistente {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.init();
  }

  init() {
    this.createChatbotHTML();
    this.attachEventListeners();
    this.showWelcomeMessage();
  }

  createChatbotHTML() {
    const chatbotHTML = `
            <div class="chatbot-container">
                <button class="chatbot-toggle" id="chatbotToggle">
                    <img src="img/mascote.png" alt="Assistente">
                    <i class="fas fa-times"></i>
                    <span class="chatbot-badge">?</span>
                </button>

                <div class="chatbot-window" id="chatbotWindow">
                    <div class="chatbot-header">
                        <div class="chatbot-avatar">
                            <img src="img/mascote.png" alt="Risco" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                        </div>
                        <div class="chatbot-info">
                            <h3>Tire dúvidas com o Risco</h3>
                            <p>Seu assistente sobre autismo</p>
                        </div>
                        <div class="chatbot-status">
                            <span class="status-dot"></span>
                            <span>Online</span>
                        </div>
                    </div>

                    <div class="chatbot-messages" id="chatbotMessages">
                        <!-- Mensagens aparecerão aqui -->
                    </div>

                    <div class="quick-suggestions" id="quickSuggestions">
                        <button class="suggestion-btn" data-question="O que é TEA?">O que é TEA?</button>
                        <button class="suggestion-btn" data-question="Quais são os sinais do autismo?">Sinais do autismo</button>
                        <button class="suggestion-btn" data-question="Como ajudar uma pessoa com TEA?">Como ajudar?</button>
                        <button class="suggestion-btn" data-question="Quais atividades são boas para crianças com TEA?">Atividades recomendadas</button>
                    </div>

                    <div class="chatbot-input-area">
                        <div class="chatbot-input-wrapper">
                            <input
                                type="text"
                                class="chatbot-input"
                                id="chatbotInput"
                                placeholder="Digite sua pergunta..."
                                autocomplete="off"
                            >
                            <button class="chatbot-send-btn" id="chatbotSend">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

    document.body.insertAdjacentHTML("beforeend", chatbotHTML);
  }

  attachEventListeners() {
    const toggle = document.getElementById("chatbotToggle");
    const sendBtn = document.getElementById("chatbotSend");
    const input = document.getElementById("chatbotInput");
    const suggestions = document.querySelectorAll(".suggestion-btn");

    toggle.addEventListener("click", () => this.toggleChat());
    sendBtn.addEventListener("click", () => this.sendMessage());
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.sendMessage();
    });

    suggestions.forEach((btn) => {
      btn.addEventListener("click", () => {
        const question = btn.getAttribute("data-question");
        this.sendMessage(question);
      });
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    const window = document.getElementById("chatbotWindow");
    const toggle = document.getElementById("chatbotToggle");

    if (this.isOpen) {
      window.classList.add("active");
      toggle.classList.add("active");
      document.querySelector(".chatbot-badge").style.display = "none";
    } else {
      window.classList.remove("active");
      toggle.classList.remove("active");
    }
  }

  showWelcomeMessage() {
    const messagesContainer = document.getElementById("chatbotMessages");
    const welcomeHTML = `
            <div class="welcome-message">
                <h4>👋 Olá! Seja bem-vindo!</h4>
                <p>Sou o assistente virtual da PositiveSense. Estou aqui para responder suas dúvidas sobre TEA (Transtorno do Espectro Autista) e autismo. Como posso ajudá-lo hoje?</p>
            </div>
        `;
    messagesContainer.innerHTML = welcomeHTML;
  }

  async sendMessage(predefinedMessage = null) {
    const input = document.getElementById("chatbotInput");
    const message = predefinedMessage || input.value.trim();

    if (!message) return;

    // Adiciona mensagem do usuário
    this.addMessage(message, "user");
    input.value = "";

    // Mostra indicador de digitação
    this.showTypingIndicator();

    // Simula delay de digitação (1-3 segundos baseado no tamanho da resposta)
    const response = await this.getAIResponse(message);
    const typingDelay = Math.min(3000, Math.max(1000, response.length * 20));

    await new Promise((resolve) => setTimeout(resolve, typingDelay));

    // Remove indicador de digitação
    this.hideTypingIndicator();

    // Adiciona resposta do bot com efeito de digitação
    this.addMessageWithTyping(response, "bot");
  }

  addMessage(text, sender) {
    const messagesContainer = document.getElementById("chatbotMessages");
    const time = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const messageHTML = `
            <div class="message ${sender}">
                <div class="message-avatar">
                    ${sender === "bot" ? "🧠" : "👤"}
                </div>
                <div class="message-content">
                    <div class="message-bubble">${this.formatMessage(
      text
    )}</div>
                    <div class="message-time">${time}</div>
                </div>
            </div>
        `;

    messagesContainer.insertAdjacentHTML("beforeend", messageHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  addMessageWithTyping(text, sender) {
    const messagesContainer = document.getElementById("chatbotMessages");
    const time = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const messageHTML = `
            <div class="message ${sender}">
                <div class="message-avatar">
                    ${sender === "bot" ? "🧠" : "👤"}
                </div>
                <div class="message-content">
                    <div class="message-bubble">${this.formatMessage(
      text
    )}</div>
                    <div class="message-time">${time}</div>
                </div>
            </div>
        `;

    messagesContainer.insertAdjacentHTML("beforeend", messageHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  formatMessage(text) {
    // Formata URLs em links
    text = text.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank">$1</a>'
    );
    // Quebra linhas
    text = text.replace(/\n/g, "<br>");
    return text;
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById("chatbotMessages");
    const typingHTML = `
            <div class="message bot typing-message">
                <div class="message-avatar">🧠</div>
                <div class="message-content">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;
    messagesContainer.insertAdjacentHTML("beforeend", typingHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTypingIndicator() {
    const typingMessage = document.querySelector(".typing-message");
    if (typingMessage) {
      typingMessage.remove();
    }
  }

  async getAIResponse(question) {
    try {
      // Primeiro, tenta responder com respostas pré-definidas
      const predefinedResponse = this.getPredefinedResponse(question);
      if (predefinedResponse) {
        return predefinedResponse;
      }

      // Se não houver resposta pré-definida, usa API de IA
      const response = await fetch("chatbot_api.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: question }),
      });

      const data = await response.json();

      if (data.success) {
        return data.response;
      } else {
        return "Desculpe, não consegui processar sua pergunta no momento. Por favor, tente novamente.";
      }
    } catch (error) {
      console.error("Erro ao obter resposta:", error);
      return "Desculpe, ocorreu um erro. Por favor, tente novamente mais tarde.";
    }
  }

  normalizeText(text) {
    return text
      .toLowerCase()
      .trim()
      // Remove acentos
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      // Corrige erros comuns de digitação
      .replace(/oque/g, "o que")
      .replace(/oq/g, "o que")
      .replace(/pq/g, "porque")
      .replace(/vc/g, "voce")
      .replace(/tb/g, "tambem")
      .replace(/tah/g, "ta")
      .replace(/eh/g, "e")
      .replace(/mt/g, "muito")
      .replace(/nd/g, "nada")
      .replace(/tbm/g, "tambem")
      .replace(/cmg/g, "comigo")
      .replace(/msg/g, "mensagem")
      .replace(/blz/g, "beleza")
      // Remove pontuação extra
      .replace(/[?!.,;]+/g, " ")
      // Remove espaços múltiplos
      .replace(/\s+/g, " ")
      .trim();
  }

  getPredefinedResponse(question) {
    // Normaliza a pergunta para tolerar erros de digitação
    const q = this.normalizeText(question);

    // Saudações
    if (
      q.match(/^(oi|ola|olá|hey|opa|e ai|eai|bom dia|boa tarde|boa noite|ola|oie|oii)$/)
    ) {
      const saudacoes = [
        "Olá! 👋 Como posso ajudá-lo hoje?",
        "Oi! 😊 Em que posso ser útil?",
        "Olá! Estou aqui para responder suas dúvidas sobre TEA e autismo. Como posso ajudar?",
        "Oi! Seja bem-vindo! Tem alguma dúvida sobre autismo ou TEA?",
      ];
      return saudacoes[Math.floor(Math.random() * saudacoes.length)];
    }

    // Como você está / Tudo bem
    if (
      q.includes("como vai") ||
      q.includes("tudo bem") ||
      q.includes("como está")
    ) {
      return "Estou muito bem, obrigado por perguntar! 😊 Estou aqui pronto para ajudar com suas dúvidas sobre TEA e autismo. Como posso ajudá-lo?";
    }

    // Agradecimentos
    if (q.match(/^(obrigado|obrigada|valeu|thanks|brigado|obg)$/)) {
      return "Por nada! 😊 Fico feliz em poder ajudar! Se tiver mais alguma dúvida, estou aqui!";
    }

    // Despedidas
    if (q.match(/^(tchau|até logo|até mais|adeus|bye|falou)$/)) {
      return "Até logo! 👋 Foi um prazer ajudá-lo. Volte sempre que precisar!";
    }

    // Quem é você / O que você faz
    if (
      q.includes("quem é você") ||
      q.includes("quem e voce") ||
      q.includes("o que você faz") ||
      q.includes("o que voce faz")
    ) {
      return "Sou o Assistente Virtual da PositiveSense! 🧠 Fui criado para ajudar pais, educadores e interessados a entenderem melhor o TEA (Transtorno do Espectro Autista). Posso responder dúvidas, dar orientações e explicar sobre autismo de forma clara e acessível!";
    }

    // O que é PositiveSense
    if (
      q.includes("positivesense") ||
      q.includes("positive sense") ||
      q.includes("sobre o site") ||
      q.includes("sobre vocês")
    ) {
      return "A PositiveSense é um projeto dedicado à inclusão escolar através de tecnologia assistiva! 🌟 Oferecemos:\n\n• Sensor de som para alertar sobre sobrecarga sensorial\n• Jogos educativos desenvolvidos para crianças com TEA\n• Site informativo sobre autismo\n• Ferramentas para educadores e famílias\n\nNossa missão é tornar as salas de aula mais acolhedoras e conscientes!";
    }

    // O que é TEA - respostas variadas
    if (
      q.match(/(o que|oque|oq).*(tea|autismo|espectro autista)/) ||
      q.match(/(tea|autismo).*(e|eh|significa|definicao|conceito)/) ||
      q.includes("explica tea") ||
      q.includes("explica autismo")
    ) {
      return 'O TEA (Transtorno do Espectro Autista) é uma condição neurológica que afeta o desenvolvimento e a forma como uma pessoa se comunica e interage com outras pessoas. 🧠\n\nÉ chamado de "espectro" porque pode se manifestar de formas muito diferentes e com intensidades variadas em cada pessoa.\n\n✨ Pessoas com TEA podem ter habilidades extraordinárias em áreas específicas e contribuir muito para a sociedade!';
    }

    // Causas do autismo
    if (q.includes("causa") && (q.includes("autismo") || q.includes("tea"))) {
      return "As causas do TEA ainda não são totalmente conhecidas, mas pesquisas indicam que é resultado de uma combinação de fatores:\n\n• Genética (hereditariedade)\n• Fatores ambientais durante a gestação\n• Diferenças no desenvolvimento cerebral\n\n❌ IMPORTANTE: Vacinas NÃO causam autismo! Isso já foi comprovado cientificamente.\n\n✅ O diagnóstico precoce é fundamental para o melhor desenvolvimento!";
    }

    // Sinais e sintomas
    if (
      q.includes("sinais") ||
      q.includes("sintomas") ||
      q.includes("identificar") ||
      q.includes("reconhecer")
    ) {
      return "Os principais sinais do autismo incluem:\n\n📌 Comunicação:\n• Dificuldade em falar ou atraso na fala\n• Uso limitado de gestos\n• Ecolalia (repetir palavras/frases)\n\n📌 Interação Social:\n• Pouco contato visual\n• Dificuldade em fazer amizades\n• Preferência por ficar sozinho\n\n📌 Comportamento:\n• Movimentos repetitivos (estereotipias)\n• Apego a rotinas específicas\n• Interesses intensos e focados\n• Sensibilidade sensorial\n\n⚠️ Cada pessoa com TEA é única! Nem todos apresentam todos os sinais.";
    }

    // Como ajudar
    if (
      q.includes("como ajudar") ||
      q.includes("como apoiar") ||
      q.includes("o que fazer")
    ) {
      return "Para ajudar uma pessoa com TEA:\n\n💙 No dia a dia:\n• Seja paciente e compreensivo\n• Mantenha rotinas consistentes\n• Use comunicação clara e objetiva\n• Respeite os limites sensoriais\n• Evite surpresas e mudanças bruscas\n\n🎯 Desenvolvimento:\n• Busque terapias especializadas (ABA, fonoaudiologia, TO)\n• Estimule interações sociais gradualmente\n• Use recursos visuais (quadros, imagens)\n• Valorize as habilidades únicas\n\n🏫 Na escola:\n• Crie um ambiente previsível\n• Adapte atividades quando necessário\n• Promova inclusão com consciência";
    }

    // Tratamento
    if (
      q.includes("tratamento") ||
      q.includes("terapia") ||
      q.includes("cura")
    ) {
      return "⚠️ O TEA não tem 'cura', pois não é uma doença, mas uma condição neurológica.\n\n✅ Porém, existem tratamentos eficazes:\n\n🔹 ABA (Análise do Comportamento Aplicada)\n🔹 Fonoaudiologia\n🔹 Terapia Ocupacional\n🔹 Psicoterapia\n🔹 Musicoterapia\n🔹 Equoterapia\n🔹 Acompanhamento pedagógico especializado\n\nQuanto mais cedo começar o tratamento, melhores os resultados! 💪\n\nCada pessoa precisa de um plano individualizado baseado em suas necessidades.";
    }

    // Atividades e jogos
    if (
      q.includes("atividades") ||
      q.includes("jogos") ||
      q.includes("brincadeiras") ||
      q.includes("o que fazer para entreter")
    ) {
      return "Atividades recomendadas para crianças com TEA:\n\n🎮 Jogos Digitais:\n• Jogo da Memória (atenção e concentração)\n• Pareamento de Emoções (reconhecimento de sentimentos)\n• Quebra-Cabeça (raciocínio lógico)\n• Jogo da Sequência (padrões)\n\n🎨 Atividades Manuais:\n• Pintura e desenho\n• Massinha de modelar\n• Construção com blocos\n\n🎵 Outras:\n• Música e dança\n• Atividades físicas estruturadas\n• Leitura de histórias com rotina\n\n💡 Dica: Respeite o ritmo e interesses da criança!";
    }

    // Escola e educação
    if (
      q.includes("escola") ||
      q.includes("educação") ||
      q.includes("inclusão escolar") ||
      q.includes("sala de aula")
    ) {
      return "Inclusão escolar para crianças com TEA:\n\n📚 Direitos:\n• Toda criança com TEA tem direito à educação\n• Acompanhamento especializado quando necessário\n• Adaptações curriculares\n\n🎯 Estratégias na sala:\n• Use recursos visuais (quadros, agendas)\n• Mantenha rotina consistente\n• Minimize estímulos sensoriais excessivos\n• Dê instruções claras e objetivas\n• Permita pausas quando necessário\n\n👥 Sensibilização:\n• Eduque colegas sobre diversidade\n• Promova empatia e respeito\n• Celebre as diferenças\n\n💡 A PositiveSense oferece ferramentas para ajudar nesse processo!";
    }

    // Sobrecarga sensorial
    if (
      q.includes("sobrecarga") ||
      q.includes("sensorial") ||
      q.includes("barulho") ||
      q.includes("ruído")
    ) {
      return "Sobrecarga sensorial no TEA:\n\n⚡ O que é:\nPessoas com TEA podem ter sensibilidade aumentada a:\n• Sons altos ou constantes\n• Luzes muito fortes\n• Cheiros intensos\n• Texturas específicas\n• Ambientes lotados\n\n🚨 Sinais de sobrecarga:\n• Cobrir os ouvidos\n• Agitação ou irritabilidade\n• Gritos ou choro\n• Necessidade de isolamento\n• Estereotipias aumentadas\n\n✅ Como ajudar:\n• Reduza estímulos quando possível\n• Ofereça um espaço calmo\n• Use fones de cancelamento de ruído\n• Respeite o tempo de recuperação\n\n🔔 O sensor da PositiveSense ajuda a monitorar níveis de som!";
    }

    // Comunicação
    if (
      q.includes("comunicação") ||
      q.includes("falar") ||
      q.includes("linguagem") ||
      q.includes("não verbal")
    ) {
      return "Comunicação no TEA:\n\n🗣️ Desafios comuns:\n• Atraso ou ausência de fala\n• Dificuldade em expressar necessidades\n• Pouco uso de gestos\n• Interpretação literal da linguagem\n\n✅ Estratégias de apoio:\n• Use comunicação visual (PECS, imagens)\n• Seja claro e objetivo nas instruções\n• Dê tempo para processar informações\n• Evite metáforas e sarcasmo\n• Valorize tentativas de comunicação\n\n📱 Tecnologias assistivas:\n• Aplicativos de comunicação alternativa\n• Pranchas de comunicação\n• Rotinas visuais\n\n💡 Lembre-se: comunicação vai além da fala!";
    }

    // Idade adulta
    if (
      q.includes("adulto") ||
      q.includes("vida adulta") ||
      q.includes("trabalho") ||
      q.includes("independência")
    ) {
      return "Autismo na vida adulta:\n\n👨‍💼 Trabalho e carreira:\n• Pessoas com TEA podem ter carreiras de sucesso\n• Muitas empresas valorizam suas habilidades únicas\n• Adaptações no ambiente podem ser necessárias\n• Áreas como TI, ciências e artes são comuns\n\n🏠 Vida independente:\n• Com suporte adequado, muitos vivem de forma independente\n• Alguns precisam de apoio contínuo\n• Cada caso é individual\n\n❤️ Relacionamentos:\n• Pessoas com TEA podem ter relacionamentos significativos\n• Comunicação clara é fundamental\n• Respeito às necessidades é essencial\n\n🌟 O diagnóstico tardio também é válido e pode trazer autoconhecimento!";
    }

    // Mitos e verdades
    if (q.includes("mito") || q.includes("verdade") || q.includes("vacina")) {
      return "Mitos e verdades sobre autismo:\n\n❌ MITOS:\n• Vacinas causam autismo (FALSO!)\n• Pessoas com autismo não sentem emoções (FALSO!)\n• Autismo é causado por má criação (FALSO!)\n• Todas as pessoas com TEA são gênios (NEM SEMPRE)\n• Autismo só afeta meninos (FALSO!)\n\n✅ VERDADES:\n• TEA é uma condição neurológica\n• Cada pessoa é única\n• Diagnóstico precoce ajuda muito\n• Pessoas com TEA podem ter vidas plenas\n• Respeito e inclusão fazem diferença\n\n📚 Informação correta combate o preconceito!";
    }

    // Níveis de suporte
    if (
      q.includes("nível") ||
      q.includes("grau") ||
      q.includes("leve") ||
      q.includes("severo")
    ) {
      return "Níveis de suporte no TEA:\n\n🔹 Nível 1 (Suporte necessário):\n• Dificuldades sociais perceptíveis\n• Alguma inflexibilidade\n• Pode viver de forma independente\n\n🔹 Nível 2 (Suporte substancial):\n• Déficits sociais marcantes\n• Dificuldade com mudanças\n• Precisa de suporte regular\n\n🔹 Nível 3 (Suporte muito substancial):\n• Déficits graves na comunicação\n• Inflexibilidade extrema\n• Necessita suporte intensivo\n\n⚠️ Importante: O nível pode variar ao longo da vida e não define o potencial da pessoa!";
    }

    return null;
  }
}

// Inicializa o chatbot quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  new ChatbotAssistente();
});
