programa {
  funcao inicio() {
    //PARA

    /*
    para acessar o arquivo é necessario colocar o codigo 5.
    leia o número digitado pelo usuario, se o numero for igual a 5,
    mostre "acesso permitido".
    Senã deixe o usuario tentar novamente, ele podera tentar cinco 
    vezes se ele digitar 5 o código é encerrado, senão é feita uma 
    contagem regressiva, se esgotar as tentativas, mostre a
    mensagem "FIM"
    */

  inteiro codigo_acesso

escreva("Qual o código? ")
leia(codigo_acesso)

se (codigo_acesso != 5) {
  inteiro tentativas = 5
  enquanto (tentativas > 1) {
    escreva("TENTE DE NOVO \nRESTAM ", tentativas,"TENTATIVAS")
    escreva("\Qual o codigo? ")
    leia(codigo_acesso)

    if (codigo_acesso == 5) {
      escreva("Acesso Permitido")
      tentativas = 0
    }
    tentativas--
  }
  escreva("*****FIM******")
} else {
  escreva("Acesso permitido")
}


