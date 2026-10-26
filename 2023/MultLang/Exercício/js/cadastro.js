const entrarMobile = document.querySelector('.entrar-mobile');
const fotoPreview = document.getElementById('foto-preview');
const inputFile = document.getElementById('inputFile');

function atualizarVisualizacao() {
    const fotoRegistrada = localStorage.getItem('fotoRegistrada');
    if (fotoRegistrada) {
        fotoPreview.style.backgroundImage = `url(${fotoRegistrada})`;
        // Atualizar a visualização da foto no lugar original
        entrarMobile.forEach(element => {
            element.innerHTML = `<div id="imagemNaBarraDeNavegacao" style="background-image: url(${fotoRegistrada}); width: 50px; height: 50px; background-size: cover; border-radius: 15px"></div>`;
        });
    }
}

// Adicionar evento de clique ao botão de cadastro
const botaoCadastrar = document.getElementById('botao-cadastrar');
botaoCadastrar.addEventListener('click', function () {
    // Coloque aqui a lógica de cadastro

    // Após o cadastro, chame a função para atualizar a visualização
    atualizarVisualizacao();
});

function escolherArquivo() {
    // Simula o clique no input de arquivo oculto
    inputFile.click();
}

function selecionarArquivo() {
    // Lógica para lidar com a seleção de arquivo aqui
    var selectedFile = inputFile.files[0];

    if (selectedFile) {
        // Salvar a foto no localStorage
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageDataURL =
