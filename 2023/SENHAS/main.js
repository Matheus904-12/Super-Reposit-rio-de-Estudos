//variaveis de captura de elemento

var entradaSenha = document.getElementById('entradaSenha');
var medidorPoder = document.getElementById('medidorPoder');
var requisitoComprimento = document.getElementById('requisitoComprimento');
var requisitoMinuscula = document.getElementById('requisitoMinuscula');
var requisitoMaiuscula = document.getElementById('requisitoMaiuscula');
var requisitoNumero = document.getElementById('requisitoNumero');
var requisitoSimbolo = document.getElementById('requisitoSimbolo');
var textoPoder = document.getElementById('textoPoder');
var mostrarSenha = document.getElementById('mostrarSenha');

// executar função ao digitar a senha
entradaSenha.addEventListener('input', function () {
    var senha = entradaSenha.value;
    var Poder = verificarPoder(senha); // Corrigido para "Poder" com "P" maiúsculo
    var cor = Poder < 50 ? 'red' : Poder < 80 ? 'yellow' : 'green';

    medidorPoder.style.width = Poder + '%';
    medidorPoder.style.backgroundColor = cor;
    medidorPoder.style.transition = 'width 0.9s ease'; // Adicionando transição suave
    textoPoder.textContent = 'Força da Senha: ' + Poder + '%';
    atualizar(senha);
});

mostrarSenha.addEventListener('click', function () {
    entradaSenha.type = entradaSenha.type === 'password' ? 'text' : 'password';
})

//Função para calcular a força da senha
function verificarPoder(senha) {
    var comprimentoMinimo = 8;
    var possuiMinuscula = /[a-z]/.test(senha);
    var possuiMaiuscula = /[A-Z]/.test(senha);
    var possuiNumeros = /\d/.test(senha);
    
    var possuiSimbolo = /[!@#$^&*()_+{}\[\]:;<>,.?~\\/-]/.test(senha);

    // Pontos com base nas regras
    var Poder = 0;

    if (senha.length >= comprimentoMinimo) {
        Poder += 25;
        requisitoComprimento.classList.remove('vermelho');
        requisitoComprimento.classList.add('verde');
    } else {
        requisitoComprimento.classList.add('vermelho');
        requisitoComprimento.classList.remove('verde');
    }

    if (possuiMinuscula) {
        Poder += 25;
        requisitoMinuscula.classList.remove('vermelho');
        requisitoMinuscula.classList.add('verde');
    } else {
        requisitoMinuscula.classList.add('vermelho');
        requisitoMinuscula.classList.remove('verde');
    }

    if (possuiMaiuscula) {
        Poder += 25;
        requisitoMaiuscula.classList.remove('vermelho');
        requisitoMaiuscula.classList.add('verde');
    } else {
        requisitoMaiuscula.classList.add('vermelho');
        requisitoMaiuscula.classList.remove('verde');
    }

    if (possuiSimbolo) {
        Poder += 25;
        requisitoSimbolo.classList.remove('vermelho');
        requisitoSimbolo.classList.add('verde');
    } else {
        requisitoSimbolo.classList.add('vermelho');
        requisitoSimbolo.classList.remove('verde');
    }

    if (possuiNumeros) {
        Poder += 25;
        requisitoNumero.classList.remove('vermelho');
        requisitoNumero.classList.add('verde');
    } else {
        requisitoNumero.classList.add('vermelho');
        requisitoNumero.classList.remove('verde');
    }

    

    return Math.min(100, Poder)

};

//Função para atualizar indicadores de requisitos
function atualizar(senha) {
    verificarPoder(senha);
}