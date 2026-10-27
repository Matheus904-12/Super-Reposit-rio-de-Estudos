programa {
  funcao inicio() {
    
    var salario = leia("Digite o salário do funcionário: ")

if (salario <= 1600) {
  salario = salario + 200
} else {
  escreva("Não receberá aumento.")
}

escreva("O novo salário do funcionário é: R$", salario)


  }
}
