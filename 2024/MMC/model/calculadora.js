class Calculadora {
    static MMC(numero1, numero2) {
        // Lógica para calcular o MMC
        return (numero1 * numero2) / this.MDC(numero1, numero2);
    }

    static MDC(a, b) {
        // Lógica para calcular o MDC
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}

module.exports = Calculadora;
