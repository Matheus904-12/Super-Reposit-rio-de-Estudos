let jogadorEscolha = 0;
let jogadorPontos = 0;
let computadorEscolha = 0;
let computadorPontos = 0;
let ganhador = -1;
let historico = [];

function jogar(escolha){
    jogadorEscolha = escolha;
    computadorEscolha = Math.floor(Math.random() * 3) + 1;


/*PEDRA = 1
  PAPEL = 2
  TESOURA = 3
*/

if (jogadorEscolha == 1 && computadorEscolha == 1) {
    ganhador = 0;
    //*PEDRA = PEDRA*//
} else if (jogadorEscolha == 1 && computadorEscolha == 2) {
    ganhador = 2;
    //PEDRA E PAPEL = PAPEL//
} else if (jogadorEscolha == 1 && computadorEscolha == 3) {
    ganhador = 1;
    //PEDRA E TESOURA = PEDRA//
} else if (jogadorEscolha == 2 && computadorEscolha == 1) {
    ganhador = 1;
    //PAPEL E PEDRA = PEDRA
} else if (jogadorEscolha == 2 && computadorEscolha == 2) {
    ganhador =  0;
    //PAPEL E PAPEL = NADA
} else if (jogadorEscolha == 2 && computadorEscolha == 3) {
    ganhador = 2;
    //PAPEL E TESOURA = TESOURA
} else if (jogadorEscolha == 3 && computadorEscolha == 1) {
    ganhador = 2;
    //TESOURA E PEDRA = PEDRA
} else if (jogadorEscolha == 3 && computadorEscolha == 2) {
    ganhador = 1;
    //TESOURA E PAPEL = TESOURA
} else if (jogadorEscolha == 3 && computadorEscolha == 3) {
    ganhador = 0;
    //TESOURA E TESOURA = EMPATE
}


document.getElementById('jogadorEscolha1').classList.remove('selecionado');
document.getElementById('jogadorEscolha2').classList.remove('selecionado');
document.getElementById('jogadorEscolha3').classList.remove('selecionado');
document.getElementById('computadorEscolha1').classList.remove('selecionado');
document.getElementById('computadorEscolha2').classList.remove('selecionado');
document.getElementById('computadorEscolha3').classList.remove('selecionado');



document.getElementById('jogadorEscolha'+jogadorEscolha).classList.add('selecionado');
document.getElementById('computadorEscolha'+computadorEscolha).classList.add('selecionado');


/*
EMPATE = 0;
JOGADOR = 1;
COMPUTADOR = 2;
*/


// Atualizar placar
if (ganhador === 1) {
    jogadorPontos++;
} else if (ganhador === 2) {
    computadorPontos++;
}

document.getElementById('jogadorPontos').textContent = jogadorPontos;
document.getElementById('computadorPontos').textContent = computadorPontos;


// Mensagem do resultado
let mensagem = '';
if (ganhador === 1) {
    mensagem = 'Você venceu!';
} else if (ganhador === 2) {
    mensagem = 'Você perdeu!';
} else {
    mensagem = 'Empate!';
}

// Adicionar ao histórico
historico.push({
    jogador: jogadorEscolha,
    computador: computadorEscolha,
    resultado: ganhador
});

// Atualizar elementos na página
document.getElementById('jogadorPontos').textContent = jogadorPontos;
document.getElementById('computadorPontos').textContent = computadorPontos;
document.querySelector('.result-message').textContent = mensagem;
document.querySelector('.result-message').className = `result-message ${ganhadorClass}`;

// Exibir histórico
mostrarHistorico();

// Adicionar classe de estilo à mensagem
let mensagemElement = document.getElementById('mensagem');
mensagemElement.classList.remove('vitoria', 'derrota', 'empate');
if (ganhador === 1) {
    mensagemElement.classList.add('vitoria');
} else if (ganhador === 2) {
    mensagemElement.classList.add('derrota');
} else {
    mensagemElement.classList.add('empate');
}
}

function mostrarHistorico() {
let historicoList = document.getElementById('historico-list');
historicoList.innerHTML = '';

for (let i = 0; i < historico.length; i++) {
    let item = historico[i];
    let resultado = '';
    if (item.resultado === 1) {
        resultado = 'Vitória';
    } else if (item.resultado === 2) {
        resultado = 'Derrota';
    } else {
        resultado = 'Empate';
    }

    let listItem = document.createElement('li');
    listItem.textContent = `Jogador: ${item.jogador} | Computador: ${item.computador} | Resultado: ${resultado}`;
    historicoList.appendChild(listItem);
}


document.getElementById('historico-toggle').addEventListener('click', function() {
    const historicoList = document.querySelector('.historico-list');
    historicoList.style.display = historicoList.style.display === 'none' ? 'block' : 'none';
    this.textContent = historicoList.style.display === 'none' ? 'Ver Histórico' : 'Esconder Histórico';
});

// Mensagem do resultado
let mensagem = '';
if (ganhador === 1) {
    mensagem = 'Você venceu!';
} else if (ganhador === 2) {
    mensagem = 'Você perdeu!';
} else {
    mensagem = 'Empate!';
}

// Adicionar ao histórico
historico.push({
    jogador: jogadorEscolha,
    computador: computadorEscolha,
    resultado: ganhador
});


// Atualizar elementos na página
document.getElementById('jogadorPontos').textContent = jogadorPontos;
document.getElementById('computadorPontos').textContent = computadorPontos;
document.querySelector('.result-message').textContent = mensagem;
document.querySelector('.result-message').className = `result-message ${ganhadorClass}`;


 // Adicionar classe de estilo à mensagem
let mensagemElement = document.querySelector('.mensagem');
mensagemElement.classList.remove('vitoria', 'derrota', 'empate');
if (ganhador === 1) {
    mensagemElement.classList.add('vitoria');
} else if (ganhador === 2) {
    mensagemElement.classList.add('derrota');
} else {
    mensagemElement.classList.add('empate');
}

// Atualizar estilo da página com base no resultado
document.querySelector('.box').className = `box ${ganhadorClass}`;

 


// Atualizar cor de fundo com base no resultado
if (ganhador === 1) {
    document.body.style.backgroundColor = '#4CAF50'; // Verde
} else if (ganhador === 2) {
    document.body.style.backgroundColor = '#FF5733'; // Vermelho
} else {
    document.body.style.backgroundColor = '#FFC300'; // Amarelo
}


// Selecionar escolha do jogador
document.getElementById(`jogadorEscolha${jogadorEscolha}`).classList.add('selecionado');


// Atualizar escolhas do jogador
document.getElementById(`jogadorEscolha${jogadorEscolha}`).classList.add('selecionado');
document.getElementById(`computadorEscolha${computadorEscolha}`).classList.add('selecionado');

// Atualizar estilo da página com base no resultado
document.querySelector('.box').className = `box ${ganhadorClass}`;

// Função para reiniciar o jogo
function reiniciarJogo() {
    jogadorPontos = 0;
    computadorPontos = 0;
    historico = [];
    limparEscolhas();
    atualizarPlacar();
    limparMensagem();
    mostrarHistorico();
    resetarEstiloPagina();
}

// Limpar escolhas selecionadas
function limparEscolhas() {
    document.querySelectorAll('.escolha').forEach(element => {
        element.classList.remove('selecionado');
    });
}

// Atualizar placar
function atualizarPlacar() {
    document.getElementById('jogadorPontos').textContent = jogadorPontos;
    document.getElementById('computadorPontos').textContent = computadorPontos;
}

// Limpar mensagem do resultado
function limparMensagem() {
    document.querySelector('.result-message').textContent = '';
    document.querySelector('.mensagem').className = 'mensagem';
}

// Resetar estilo da página
function resetarEstiloPagina() {
    document.querySelector('.box').className = 'box';
}

// Botão de reiniciar o jogo
document.getElementById('reiniciar-jogo').addEventListener('click', function() {
    reiniciarJogo();
});


// Função para reiniciar o jogo
function reiniciarJogo() {
    jogadorPontos = 0;
    computadorPontos = 0;
    historico = [];
    limparEscolhas();
    atualizarPlacar();
    limparMensagem();
    mostrarHistorico();
    resetarEstiloPagina();
}

// Limpar escolhas selecionadas
function limparEscolhas() {
    document.querySelectorAll('.escolha').forEach(element => {
        element.classList.remove('selecionado');
    });
}

// Atualizar placar
function atualizarPlacar() {
    document.getElementById('jogadorPontos').textContent = jogadorPontos;
    document.getElementById('computadorPontos').textContent = computadorPontos;
}

// Limpar mensagem do resultado
function limparMensagem() {
    document.querySelector('.result-message').textContent = '';
    document.querySelector('.mensagem').className = 'mensagem';
}

// Resetar estilo da página
function resetarEstiloPagina() {
    document.querySelector('.box').className = 'box';
}

// Botão de reiniciar o jogo
document.getElementById('reiniciar-jogo').addEventListener('click', function() {
    reiniciarJogo();
});


}

