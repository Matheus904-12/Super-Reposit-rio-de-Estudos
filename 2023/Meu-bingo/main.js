// Função que é executada quando a página é carregada
window.onload = initAll;

// Função que inicializa todas as variáveis e chama a função newCard()
function initAll() {
    // Atribui a função anotherCard() ao evento onclick do elemento com o id "reload"
    document.getElementById("reload").onclick = anotherCard;
    // Chama a função newCard()
    newCard();
}

// Função que cria um novo baralho de cartas
function newCard() {
    for (var i = 0; i < 24; i++) setSquare(i);
}

// Array que armazena os valores dos números nas colunas
var colPlace = new Array(0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4);
var usedNums = new Array(76);

function setSquare(thisSquare) {
    var currSquare = "square" + thisSquare;
    var colBasis = colPlace[thisSquare] * 15;
    var newNum;
    do { newNum = colBasis + getNewNum() + 1; } while (usedNums[newNum]);
    usedNums[newNum] = true;
    document.getElementById(currSquare).innerHTML = newNum;
    document.getElementById(currSquare).className = "";
    document.getElementById(currSquare).onmousedown = toggleColor;
}

function getNewNum() { return Math.floor(Math.random() * 15); }

function anotherCard() {
    for (var i = 1; i < usedNums.length; i++) usedNums[i] = false;
    newCard();
    return false;
}

function toggleColor(evt) {
    var thisSquare = evt ? evt.target : window.event.srcElement;
    thisSquare.className = thisSquare.className === "" ? "pickedBG" : "";
}