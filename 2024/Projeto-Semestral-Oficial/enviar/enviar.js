const signInBtn = document.querySelector('#sign-in-btn');
const signUpBtn = document.querySelector('#sign-up-btn');
const container = document.querySelector('.container'); //selecionar os elementos do DOM com os IDs

signUpBtn.addEventListener('click', () => {
  container.classList.add('sign-up-mode');
}); //alterar o estilo ou comportamento do contêiner, aplicando regras CSS vinculadas a essa classe.

signInBtn.addEventListener('click', () => {
  container.classList.remove('sign-up-mode');
}); //reverte o estilo ou comportamento alterado anteriormente.
