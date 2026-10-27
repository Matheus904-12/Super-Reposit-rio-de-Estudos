programa {
  funcao inicio() {
    
    caracter resposta = 'N'

    inteiro c = 1 //contador
    real numero, soma


    enquanto (c <= 5) {
      escreva("Quer sair do laço? ")
      leia(resposta)
      soma += numero // soma = soma + numero
      c++ //1 c += 1 --- c = c + 1
    }

    escreva(soma)
  }
}
