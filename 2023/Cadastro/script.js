'use strict';

/*PRE-CARREGAMENTO*/

const preloader = 
document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded",
 function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});


/* Adicionar Evento em Múltiplos Elementos */

const addEventOnElements =
 function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; 
    i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }555555555
}



/*Toggle de Navegação Móvel*/

const navbar =
 document.querySelector("[data-navbar]");
const navTogglers = 
document.querySelectorAll("[data-nav-toggler]");
const navLinks =
 document.querySelectorAll("[data-nav-link]");
const overlay = 
document.querySelector("[data-overlay]");

addEventOnElements(navTogglers, "click",
 function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
});

addEventOnElements(navLinks, "click", function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
});



/* Cabeçalho Ativo no Rolamento */

const header = 
document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  header.classList[window.scrollY > 100 ? "add" :
   "remove"]("active");
});



/* Efeito de Inclinação em Elementos
javascript */

const tiltElements = 
document.querySelectorAll("[data-tilt]");

const initTilt = function (event) {

  // Cálculo do efeito de inclinação
  const centerX = this.offsetWidth / 2;
  const centerY = this.offsetHeight / 2;

  const tiltPosY = 
  ((event.offsetX - centerX) / centerX) * 10;
  const tiltPosX = 
  ((event.offsetY - centerY) / centerY) * 10;

  this.style.transform =
   `perspective(1000px) rotateX(${tiltPosX}deg)
    rotateY(${tiltPosY - (tiltPosY * 2)}deg)`;

}

addEventOnElements(tiltElements,
   "mousemove", initTilt);

addEventOnElements(tiltElements, 
  "mouseout", function () {
  this.style.transform = 
  `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
});



/* Conteúdo de Abas */

const tabBtns = 
document.querySelectorAll("[data-tab-btn]");
const tabContents = 
document.querySelectorAll("[data-tab-content]");

let lastActiveTabBtn = tabBtns[0];
let lastActiveTabContent = tabContents[0];

const filterContent = function () {

  if (!(lastActiveTabBtn === this)) {

    lastActiveTabBtn.classList.remove("active");
    lastActiveTabContent.classList.remove("active");

    this.classList.add("active");
    lastActiveTabBtn = this;

    const currentTabContent =
document.querySelector(`[data-tab-content="${
  this.dataset.tabBtn}"]`);

    currentTabContent.classList.add("active");
    lastActiveTabContent = currentTabContent;

  }

}

addEventOnElements(tabBtns, "click", filterContent);



/* Cursor Personalizado */

const cursors =
 document.querySelectorAll("[data-cursor]");
const hoveredElements = 
[...document.querySelectorAll("button"),
 ...document.querySelectorAll("a")];

 // Adicionando ouvinte de evento mousemove
window.addEventListener("mousemove",
// Posição do cursor personalizado
 function (event) {

  const posX = event.clientX;
  const posY = event.clientY;

  /** cursor dot position */
  cursors[0].style.left = `${posX}px`;
  cursors[0].style.top = `${posY}px`;

  /** cursor outline position */
  setTimeout(function () {
    cursors[1].style.left = `${posX}px`;
    cursors[1].style.top = `${posY}px`;
  }, 80);

});

/** add hovered class when mouseover on hoverElements */
addEventOnElements(hoveredElements,
   "mouseover", function () {
  for (let i = 0, len = cursors.length;
     i < len; i++) {
    cursors[i].classList.add("hovered");
  }
});

// Removendo a classe "hovered"
addEventOnElements(hoveredElements,
   "mouseout", function () {
  for (let i = 0, len = cursors.length; 
    i < len; i++) {
    cursors[i].classList.remove("hovered");
  }
});

// Login e Cadastr-se //

function flipCard() {
  var card = document.getElementById('card');
  card.style.transform = card.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
}

function validarEntrada() {
  const emailEntrada = document.getElementById('email').value;
  const senhaEntrada = document.getElementById('senha').value;
  const botaoEntrar = document.getElementById('botaoEntrar');

  if (!emailEntrada || !senhaEntrada) {
      alert('Por favor, preencha todos os campos antes de entrar.');
      botaoEntrar.disabled = true;
  } else {
      botaoEntrar.disabled = false;
      // Continue com a lógica de login
      // signIn(emailEntrada, senhaEntrada);
  }
}

function validarCadastro() {
  const nomeCadastro = document.getElementById('nome').value;
  const emailCadastro = document.getElementById('cadastroEmail').value;
  const senhaCadastro = document.getElementById('cadastroSenha').value;
  const botaoCadastrar = document.getElementById('botaoCadastrar');

  if (!nomeCadastro || !emailCadastro || !senhaCadastro) {
      alert('Por favor, preencha todos os campos antes de cadastrar.');
      botaoCadastrar.disabled = true;
  } else {
      botaoCadastrar.disabled = false;
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


    function mostrarSubpagina(imagemSrc, titulo, descricao) {
        // Preencher os dados da subpágina
        document.getElementById('subpagina-imagem').innerHTML = '<img src="' + imagemSrc + '" alt="Imagem do Projeto">';
        document.getElementById('subpagina-titulo').innerText = titulo;
        document.getElementById('subpagina-descricao').innerText = descricao;

        // Exibir a subpágina
        document.getElementById('subpagina').style.display = 'block';
    }

    function fecharSubpagina() {
        // Fechar a subpágina
        document.getElementById('subpagina').style.display = 'none';
    }

    document.addEventListener('DOMContentLoaded', function () {
      const productCards = document.querySelectorAll('.product-card');
      const productModal = document.getElementById('productModal');
      const closeBtn = document.getElementById('closeBtn');
    
      // Função para abrir o modal com os detalhes do produto
      function openProductModal(productId) {
        // Lógica para buscar e exibir os detalhes do produto com base no productId
        // Por simplicidade, vamos mostrar/ocultar o modal por enquanto
        productModal.style.display = 'flex';
      }
    
      // Função para fechar o modal
      function closeProductModal() {
        productModal.style.display = 'none';
      }
    
      // Adiciona ouvintes de evento aos cards de produto
      productCards.forEach((card) => {
        card.addEventListener('click', () => {
          const productId = card.getAttribute('data-product-id');
          openProductModal(productId);
        });
      });
    
      // Adiciona ouvinte de evento ao botão de fechar no modal
      closeBtn.addEventListener('click', closeProductModal);
    
      // Fecha o modal ao clicar fora dele
      window.addEventListener('click', function (event) {
        if (event.target === productModal) {
          closeProductModal();
        }
      });
    });
    
    
// Open Product Details Modal
function openProductDetails(jjj) {
  var modal = document.getElementById('productDetailsModal'+jjj);
  modal.style.display = 'block';
}

// Close Product Details Modal
function closeProductDetails(jjj) {
  var modal = document.getElementById('productDetailsModal'+jjj);
  modal.style.display = 'none';
}

// Close Modal on Outside Click
window.onclick = function (event) {
  var modal = document.getElementById('productDetailsModal');
  if (event.target == modal) {
      modal.style.display = 'none';
  }
}



//TESTE 1



    var mediaStream;

function abrirCamera() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function (stream) {
            mediaStream = stream;
            const areaVideo = document.getElementById('camera');
            areaVideo.srcObject = stream;
        })
        .catch(function (error) {
            console.error('Não foi possível acessar a câmera:', error);
        });
}

function tirarFoto() {
  const areaVideo = document.getElementById('camera');
  const canvas = document.createElement('canvas');
  canvas.width = areaVideo.videoWidth;
  canvas.height = areaVideo.videoHeight;
  const context = canvas.getContext('2d');
  context.drawImage(areaVideo, 0, 0, canvas.width, canvas.height);
  const imageDataURL = canvas.toDataURL();

  // Salvar a foto no localStorage
  localStorage.setItem('fotoRegistrada', imageDataURL);

  const fotoPreviewForm = document.getElementById('foto-preview-form');
  fotoPreviewForm.style.backgroundImage = `url(${imageDataURL})`;
}

// Recuperar a foto do localStorage
const fotoRegistrada = localStorage.getItem('fotoRegistrada');

// Se houver uma foto registrada, substituir o botão pela imagem
if (fotoRegistrada) {
  const entrarMobile = document.querySelector('.entrar-mobile');
  entrarMobile.innerHTML = `<div id="imagemNaBarraDeNavegacao" style="background-image: url(${fotoRegistrada}); width: 50px; height: 50px; background-size: cover; border-radius: 15px"></div>`;
  // Adicione estilos adicionais conforme necessário
}


function fechar() {
    if (mediaStream) {
        mediaStream.getTracks()[0].stop();
        const areaVideo = document.getElementById('camera');
        areaVideo.srcObject = null;
        mediaStream = null;
    }
}

function exibirFotoPreview(input) {
  const fotoPreviewForm = document.getElementById('foto-preview-form');

  if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
          const imageDataURL = e.target.result;
          fotoPreviewForm.style.backgroundImage = `url(${imageDataURL})`;
      };
      reader.readAsDataURL(input.files[0]);
  }
}

// Função para uploud da imagem via explorador de arquivos


function escolherArquivo() {
  // Simula o clique no input de arquivo oculto
  var inputFile = document.getElementById('inputFile');
  inputFile.click();
}

function selecionarArquivo() {
  // Lógica para lidar com a seleção de arquivo aqui
  var inputFile = document.getElementById('inputFile');
  var selectedFile = inputFile.files[0];
  
  if (selectedFile) {
    // Salvar a foto no localStorage
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageDataURL = e.target.result;
      localStorage.setItem('fotoRegistrada', imageDataURL);
      
      // Atualizar a visualização da foto
      const fotoPreviewForm = document.getElementById('foto-preview-form');
      fotoPreviewForm.style.backgroundImage = `url(${imageDataURL})`;

      // Adicionar lógica adicional, se necessário

      // Limpar as informações do usuário
      limparInformacoes();
    };
    reader.readAsDataURL(selectedFile);
  }
}