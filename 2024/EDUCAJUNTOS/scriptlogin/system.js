// Seleciona os botões de login e cadastro
const botaoEntrar = document.querySelector("#loginForm .animated-button");
const botaoCadastrar = document.querySelector("#registerForm .animated-button");

// Função para salvar o nome e redirecionar
function saveUserDataAndRedirect(event) {
    event.preventDefault();

    // Captura o nome com base no formulário atual (login ou cadastro)
    const isRegisterForm = document.querySelector("#registerForm").style.display !== "none";
    const nameInput = isRegisterForm ? document.querySelector("#registerForm input[name='text']") : null;
    const username = nameInput ? nameInput.value : "[SEU NOME]";

    // Salva o nome no localStorage
    localStorage.setItem("username", username);

    // Redireciona para a página de início
    window.location.href = "/inicio/index.html";
}

// Adiciona os eventos de clique para salvar e redirecionar
botaoEntrar.addEventListener("click", saveUserDataAndRedirect);
botaoCadastrar.addEventListener("click", saveUserDataAndRedirect);

// Função para preencher o nome do usuário na página de boas-vindas
function populateUserInfo() {
    // Verifica se estamos na página de início
    if (window.location.pathname.includes("/inicio/index.html")) {
        const username = localStorage.getItem("username") || "[SEU NOME]";

        // Preenche os elementos do HTML com o nome do usuário
        const welcomeHeader = document.getElementById("username-placeholder");
        const welcomeSubHeader = document.getElementById("username-subheader-placeholder");

        if (welcomeHeader) welcomeHeader.textContent = username;
        if (welcomeSubHeader) welcomeSubHeader.textContent = username;
    }
}

// Executa a função ao carregar a página de início
window.addEventListener("load", populateUserInfo);
