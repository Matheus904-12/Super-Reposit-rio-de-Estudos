// Cria um array de 76 posições para marcar os números que já foram sorteados.
var usedNums = new Array(76);

// Gera um novo cartão da sorte.
function novacartela() {
  for (var i = 0; i < 24; i++) setSquare(i);
}

function setSquare(thisSquare) {
    var currSquare = "square" + thisSquare;
    var newNum;
    var colPlace = new Array(0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4);
    do { newNum = (colPlace[thisSquare] * 15) + getNewNum() + 1; } while (usedNums[newNum]);
    usedNums[newNum] = true;
    document.getElementById(currSquare).innerHTML = newNum;
}

function getNewNum() { return Math.floor(Math.random() * 75); }