var entradaSenha = document.getElementById('entradaSenha');
var medidorPoder = document.getElementById('medidorPoder');
var requisitoComprimento = document.getElementById('requisitoComprimento');
var requisitoMinuscula = document.getElementById('requisitoMinuscula');
var requisitoMaiuscula = document.getElementById('requisitoMaiuscula');
var requisitoNumero = document.getElementById('requisitoNumero');
var requisitoSimbolo = document.getElementById('requisitoSimbolo');
var textoPoder = document.getElementById('textoPoder');
var mostrarSenha = document.getElementById('mostrarSenha');

// ao digitar senha
entradaSenha.addEventListener('input', () => {
    var senha = entradaSenha.value;
    var poder = verificarPoder(senha);

    // cores baseadas na forca da senha (é um if else 'poder < 50 ? se sim aplica "red" : = se nao')
    var cor = poder < 50 ? 'red' : poder < 80 ? '#ffc800' : 'lime';

    // trans css
    medidorPoder.style.width = poder + '%';
    medidorPoder.style.background = cor;

    // texto refresh
    textoPoder.textContent = 'Força da senha: ' + poder + '%';

    // refresh indicators
    atualizar(senha);
});

// toggle password visibility
mostrarSenha.addEventListener('click', () => {
    entradaSenha.type = entradaSenha.type === 'password' ? 'text' : 'password';
});

// calc password strengh
function verificarPoder(senha) {
    var comprimentoMinimo = 8;
    var possuiMinuscula = /[a-z]/.test(senha);
    var possuiMaiuscula = /[A-Z]/.test(senha);
    var possuiNumeros = /\d/.test(senha);
    var possuiSimbolo = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(senha);

    var poder = 0;

    if (senha.length >= comprimentoMinimo) {
        poder += 25;
        requisitoComprimento.classList.remove('vermelho');
        requisitoComprimento.classList.add('verde');
    } else {
        requisitoComprimento.classList.add('vermelho');
        requisitoComprimento.classList.remove('verde');
    };

    if (possuiMinuscula) {
        poder += 25;
        requisitoMinuscula.classList.remove('vermelho');
        requisitoMinuscula.classList.add('verde');
    } else {
        requisitoMinuscula.classList.add('vermelho')
        requisitoMinuscula.classList.remove('verde');
    };

    if (possuiMaiuscula) {
        poder += 25;
        requisitoMaiuscula.classList.remove('vermelho');
        requisitoMaiuscula.classList.add('verde');
    } else {
        requisitoMaiuscula.classList.add('vermelho')
        requisitoMaiuscula.classList.remove('verde');
    };

    if (possuiNumeros) {
        poder += 25;
        requisitoNumero.classList.remove('vermelho');
        requisitoNumero.classList.add('verde');
    } else {
        requisitoNumero.classList.add('vermelho')
        requisitoNumero.classList.remove('verde');
    };

    if (possuiSimbolo) {
        poder += 25;
        requisitoSimbolo.classList.remove('vermelho');
        requisitoSimbolo.classList.add('verde');
    } else {
        requisitoSimbolo.classList.add('vermelho')
        requisitoSimbolo.classList.remove('verde');
    };

    return Math.min(100, poder)
};

// function to update indicators
function atualizar(senha){
    verificarPoder(senha);
}

