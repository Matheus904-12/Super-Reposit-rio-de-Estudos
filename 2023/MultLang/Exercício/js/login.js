function validarEntrada() {
  const emailEntrada = document.getElementById('email').value;
  const senhaEntrada = document.getElementById('senha').value;

  if (!emailEntrada || !senhaEntrada) {
      alert('Por favor, preencha todos os campos antes de entrar.');
  } else {
      // Continue com a lógica de login
      // signIn(emailEntrada, senhaEntrada);
  }
}

function validarCadastro() {
  const nomeCadastro = document.getElementById('nome').value;
  const emailCadastro = document.getElementById('cadastroEmail').value;
  const senhaCadastro = document.getElementById('cadastroSenha').value;

  if (!nomeCadastro || !emailCadastro || !senhaCadastro) {
      alert('Por favor, preencha todos os campos antes de cadastrar.');
  } else {
      // Continue com a lógica de cadastro
      // cadastrar(nomeCadastro, emailCadastro, senhaCadastro);
  }
}

function entrar() {
  // Obter os valores dos campos de login
  var email = document.getElementById('loginEmail').value;
  var senha = document.getElementById('loginSenha').value;

  // Verificar se o usuário está cadastrado
  var usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];
  var usuarioEncontrado = usuariosCadastrados.find(function (user) {
      return user.email === email && user.senha === senha;
  });

  if (usuarioEncontrado) {
      alert('Login bem-sucedido!');
      // Lógica para redirecionar ou realizar outras ações após o login
  } else {
      alert('Usuário não encontrado. Verifique suas credenciais.');
  }
}

function cadastrar() {
  // Obter os valores dos campos de cadastro
  var nome = document.getElementById('cadastroNome').value;
  var email = document.getElementById('cadastroEmail').value;
  var senha = document.getElementById('cadastroSenha').value;
  var fotoRegistrada = localStorage.getItem('fotoRegistrada');

  // Verificar se o email já está cadastrado
  var usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];
  var emailExistente = usuariosCadastrados.some(function (user) {
      return user.email === email;
  });

  if (emailExistente) {
      alert('Este email já está cadastrado. Por favor, use outro.');
  } else if (!nome || !email || !senha) {
      alert('Por favor, preencha todos os campos antes de cadastrar.');
  } else {
      // Adicionar novo usuário ao armazenamento local
      var novoUsuario = { nome: nome, email: email, senha: senha, foto: fotoRegistrada };
      usuariosCadastrados.push(novoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuariosCadastrados));

      // Limpar as informações do formulário
      document.getElementById('cadastroNome').value = '';
      document.getElementById('cadastroEmail').value = '';
      document.getElementById('cadastroSenha').value = '';
      document.getElementById('fotoRegistrada').value = '';

      // Limpar as informações do usuário
      limparInformacoes();

      alert('Cadastro bem-sucedido! Você pode fazer login agora.');
      // Lógica para redirecionar ou realizar outras ações após o cadastro
  }
}
