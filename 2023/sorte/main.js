const btnSortear = document.querySelector('.sortear')
// btnSortear = ativa o javascript
const textarea = document.querySelector('textarea')
// textarea = campo que o usuario irá informar os nomes
const tagesultado = document.querySelector('.resultado p')
// tagResultado = onde vamos mostrar o resultado
const popUpResultado = document.querySelector('.resultado')
//popUpResultado = para pegar o resultado
const textarea = document.querySelector('#entradaDados');
const resultadoValor = document.querySelector('#resultadoValor');


function pegarDadosFormulario() {
    const valorCampo = textarea.value;
    //pega o texto digitado pelo usuario
    const listaNomes = valorCampo.split(";");
    //separa os nomes pela virgula
    const tamanhoArray = listaNomes.length
    /*conta qunatos nomes, a biblioteca lenght conta o tamanho da string */
    const posicaoNome = gerarNumeroAleatorio(tamanhoArray);
    /* gerar um número aleatorio correspondente a posição de um nome */
    const nome = listaNomes[posicaoNome]
    // Recebe o nome sorteado

    mostraResultado(nome);
    textarea.value = ""
}

btnSortear.addEventListener("click",pegarDadosFormulario)

function gerarNumeroAleatorio(tamanhoArray) {
    return Math.floor(Math.random()*(tamanhoArray-0)+0);
    /* O tamanhoArray guarda a quantidade de nomes que vamos sortear, e assim, usando o Math.random vamos escolher um número aleatorio dentron desse intervalo. */
}

function mostraResultado(nome) {
    tagResultado.innerHTML = `Resultado ${nome}`
    popUpResultado.classList.add("Resultado");

}


//Teste//


function pegarDadosFormulario() {
    const valorCampo = textarea.value.trim(); // Remove espaços em branco extras no início e no final
    const listaDados = valorCampo.split(','); // Separa por vírgulas

    if (listaDados.length === 0) {
        resultadoValor.textContent = 'Nenhum dado para sortear.';
    } else {
        const posicaoSorteada = gerarNumeroAleatorio(listaDados.length);
        const dadoSorteado = listaDados[posicaoSorteada].trim(); // Remove espaços em branco extras

        resultadoValor.textContent = dadoSorteado;
    }

    textarea.value = '';
}

function gerarNumeroAleatorio(tamanhoArray) {
    return Math.floor(Math.random() * tamanhoArray);
}