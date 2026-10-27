programa {
  funcao inicio() {
    
    real soma = 0
    real vaquinha = 0

    para(inteiro c = 1; c<=3; c++) {
      escreva("Com quanto vai contribuir? ")
      leia(vaquinha)
      soma += vaquinha //soma = soma + vaquuinha
    }
    escreva(soma)

    se(soma <= 50) {
      escreva("Não vai dar")
    } senao {
      escreva("\nVai dar")
    }

  }
}
