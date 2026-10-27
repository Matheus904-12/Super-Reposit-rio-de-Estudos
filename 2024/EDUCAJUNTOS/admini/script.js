function selectSection(button, sectionId) {
    // Remove a classe 'active' de todos os botões
    const buttons = document.querySelectorAll(".sidebar button");
    buttons.forEach(btn => btn.classList.remove("active"));
    
    // Adiciona a classe 'active' ao botão clicado
    button.classList.add("active");
    
    // Esconde todas as seções
    const sections = document.querySelectorAll(".content section");
    sections.forEach(section => section.classList.remove("active"));
    
    // Mostra a seção correspondente ao botão clicado
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.add("active");
}

function openReport(type) {
    // Abre um relatório com base no tipo de usuário
    if (type === 'total') {
        alert("Abrindo relatório de Total de Usuários");
    } else if (type === 'active') {
        alert("Abrindo relatório de Usuários Ativos");
    } else if (type === 'inactive') {
        alert("Abrindo relatório de Usuários Inativos");
    }
}


function toggleDetails(button) {
    const userItem = button.closest('.user-item');
    const userActions = userItem.querySelector('.user-actions');
    
    // Alterna a visibilidade da área de detalhes
    if (userActions.style.display === 'none' || userActions.style.display === '') {
        userActions.style.display = 'block';
        button.textContent = '▲'; // Muda a seta para cima
    } else {
        userActions.style.display = 'none';
        button.textContent = '▼'; // Muda a seta para baixo
    }
}

function toggleUserForm() {
    const form = document.getElementById('userForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}
