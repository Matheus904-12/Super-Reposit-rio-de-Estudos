programa {
  funcao inicio() {
    
    Leia real valorContratado
Declare real taxa

Se valorContratado <= 10000 entao
    taxa = valorContratado * 0.1
Senao Se valorContratado <= 25000 entao
    taxa = valorContratado * 0.25
Senao
    taxa = valorContratado * 0.35
Fim Se

Escreva "Taxa a ser cobrada: ", taxa



  }
}
