programa {
  funcao inicio() {
    
  var nota1 = leia("Digite a primeira nota: ")
var nota2 = leia("Digite a segunda nota: ")
var nota3 = leia("Digite a terceira nota: ")
var nota4 = leia("Digite a quarta nota: ")

var soma = nota1 + nota2 + nota3 + nota4
var media = soma / 4

if (media >= 7) {
  escreva("Aprovado!")
} else if (media >= 5) {
  escreva("Recuperação.")
} else {
  escreva("Reprovado.")
}



  }
}
