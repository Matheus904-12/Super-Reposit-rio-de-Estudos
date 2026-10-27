// Verifica as respostas do jogo e mostra o resultado
function checkAnswers() {
    var answers = document.querySelectorAll("input[type='radio']:checked");
    var correctAnswers = 0;
  
    for (var i = 0; i < answers.length; i++) {
      if (answers[i].value === "resposta correta") {
        correctAnswers++;
      }
    }
  
    var result = document.querySelector(".result");
    result.innerHTML = "Você acertou " + correctAnswers + " de " + answers.length + " perguntas.";
  }
  
  // Habilita o botão de enviar quando todas as perguntas são respondidas
  function enableSubmitButton() {
    var button = document.querySelector("button");
    var questions = document.querySelectorAll(".question");
  
    for (var i = 0; i < questions.length; i++) {
      if (!questions[i].querySelector("input[type='radio']:checked")) {
        button.disabled = true;
        return;
      }
    }
  
    button.disabled = false;
  }
  
  // Eventos
  document.querySelector(".question input[type='radio']").addEventListener("change", enableSubmitButton);
  document.querySelector("button").addEventListener("click", checkAnswers);
  