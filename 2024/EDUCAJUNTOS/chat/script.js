document.getElementById('sendButton').addEventListener('click', sendMessage);

async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    const chatOutput = document.getElementById("chat-output");

    if (userInput.trim() !== "") {
        // Exibe a mensagem do usuário
        const userMessage = document.createElement("div");
        userMessage.classList.add("chat-message", "user-message");
        userMessage.textContent = userInput;
        chatOutput.appendChild(userMessage);

        // Limpa o campo de entrada
        document.getElementById("user-input").value = "";

        // Faz a chamada à API para gerar a resposta
        const response = await fetchResponse(userInput);

        // Exibe a resposta da plataforma
        const botMessage = document.createElement("div");
        botMessage.classList.add("chat-message", "bot-message");
        botMessage.textContent = response;
        chatOutput.appendChild(botMessage);

        // Rola para a última mensagem
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
}

async function fetchResponse(question) {
    try {
        const response = await fetch('https://api.exemplo.com/gerarResposta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer SUA_CHAVE_API'
            },
            body: JSON.stringify({ prompt: question, max_tokens: 100 })
        });
        const data = await response.json();
        return data.text; // Ajuste de acordo com o retorno da API
    } catch (error) {
        console.error("Erro ao obter resposta da API:", error);
        return "Desculpe, não consegui responder agora. Tente novamente mais tarde.";
    }
}
