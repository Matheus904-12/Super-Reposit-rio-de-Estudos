var boxes = document.querySelectorAll(".box");

for (var i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", function() {
    var box = document.createElement("div");
    box.className = "question-box";

    var question1 = document.createElement("input");
    question1.type = "text";
    question1.placeholder = "Pergunta 1";

    var question2 = document.createElement("input");
    question2.type = "text";
    question2.placeholder = "Pergunta 2";

    box.appendChild(question1);
    box.appendChild(question2);

    document.body.appendChild(box);
  });
}


function calculatePerimeter() {
   
    var sideLength = document.getElementById("sideLength").value;
  
    function calcQuad() {
    let a=Number(prompt("Qual é o valor do lado 1 da forma?"));
    let b=Number(prompt("Qual é o valor do lado 2 da forma?"));

    let result="A área do retângulo é "+a*b+"m²";

    document.getElementById("valorQuad").innerHTML = result;
}

function calcTria() {
    let a=Number(prompt("Qual é o tamanho da base da forma?"));
    let b=Number(prompt("Qual é a altura da forma?"));

    let result="A área do triângulo é "+a*b/2+"m²";

    document.getElementById("valorTria").innerHTML = result;
}

function calcCirc() {
    let a=Number(prompt("Qual é o raio (R) do círculo?"));

    let o=Math.PI
    
    let result="A área do círculo é "+o*a**2+"m²";

    document.getElementById("valorCirc").innerHTML = result;
}

function calcTrap() {
    let a=Number(prompt("Qual é o tamanho da base MAIOR?"));
    let b=Number(prompt("Qual é o tamanho da base MENOR?"));
    let c=Number(prompt("Qual é a altura?"));

    let result="A área do trapézio é "+(a+b)*c/2+"m²";

    document.getElementById("valorTrap").innerHTML = result;
}

function calcLosa() {
    let a=Number(prompt("Qual é o tamanho da diagonal MAIOR?"));
    let b=Number(prompt("Qual é o tamanho da diagonal MENOR?"));
    
    let result="A área do losango é "+a*b/2+"m²";

    document.getElementById("valorLosa").innerHTML = result;
}
    var perimeter = 4 * sideLength;
  
   
    document.getElementById("perimeter").innerHTML = perimeter;
  }
