// Função para exibir uma mensagem de boas-vindas quando a página carregar
window.addEventListener('load', function() {
    var message = 'Bem-vindo à Fã Page PRONA 2006';
    alert(message);
  });
  
  // Função para adicionar um evento de clique ao botão "Saiba mais"
  var button = document.querySelector('.button');
  button.addEventListener('click', function(event) {
    event.preventDefault();
    alert('Você clicou no botão "Saiba mais"');
  });
  