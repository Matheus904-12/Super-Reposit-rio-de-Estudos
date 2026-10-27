programa {
  funcao inicio() {
    
   var valorServicos = leia("Digite o valor dos serviços contratados: ")
var faturamento = leia("Digite o faturamento da empresa: ")

var percentual = 0.0

if (valorServicos <= 10000) {
  percentual = 0.1
} else if (valorServicos <= 25000) {
  percentual = 0.25
} else {
  percentual = 0.35
}

var valorCobrado = valorServicos * percentual

escreva("O valor a ser cobrado é: R$", valorCobrado)
}
);





  }
