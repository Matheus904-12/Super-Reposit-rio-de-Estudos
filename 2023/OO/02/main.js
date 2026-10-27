// Definindo classe Calculadora
class Calculadora {
    constructor() {
        // Inicializando o visor com o valor 0
        this.valor = '0';
    }

    // Método para adicionar um número ao visor
    adicionarNumero(numero) {
        // Se o valor atual for igual a 0, substitui pelo número
        if (this.valor === '0') {
            this.valor = numero;
        } else {
            // Senão, adiciona o número ao final do valor atual (ex:15)
            this.valor += numero;
        }
        this.atualizarVisor();
    }

    // Método para adicionar uma operação ao visor
    adicionarOperacao(operacao) {
        // Se o último caractere do valor for uma operação, substitui pela nova operação
        if (
            this.valor.slice(-1) === '+' ||
            this.valor.slice(-1) === '-' ||
            this.valor.slice(-1) === '*' ||
            this.valor.slice(-1) === '/'
        ) {
            this.valor = this.valor.slice(0, -1) + operacao;
        } else {
            // Senão, adiciona a operação no final
            this.valor += operacao;
        }
        this.atualizarVisor();
    }

    resultado() {
        try {
            // Usa a função eval para calcular o resultado da expressão no visor
            this.valor = eval(this.valor).toString();
        } catch (e) {
            // Se houver um erro na expressão, exibe a mensagem 'Erro'
            this.valor = 'Erro';
        }
        this.atualizarVisor();
    }

    limpar() {
        this.valor = '0';
        this.atualizarVisor();
    }

    atualizarVisor() {
        document.getElementById('visor').value = this.valor;
    }
}

let calculadora = new Calculadora();
