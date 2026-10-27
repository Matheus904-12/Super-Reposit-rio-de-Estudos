// Carrossel
const carousel = document.querySelector('.carousel-container');
const images = carousel.querySelectorAll('img');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
let currentIndex = 0;

// Função para exibir a imagem atual
function showImage(index) {
  // Verifica se o índice está dentro do intervalo válido
  if (index >= 0 && index < images.length) {
    // Remove a classe ativa de todas as imagens
    images.forEach(img => img.classList.remove('active'));
    // Adiciona a classe ativa na imagem atual
    images[index].classList.add('active');
    // Atualiza o índice atual
    currentIndex = index;
  }
}

// Exibe a primeira imagem quando a página é carregada
showImage(currentIndex);

// Avança para a próxima imagem
function nextImage() {
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  showImage(currentIndex);
}

// Volta para a imagem anterior
function prevImage() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  showImage(currentIndex);
}

// Eventos de clique nos botões de navegação
nextButton.addEventListener('click', nextImage);
prevButton.addEventListener('click', prevImage);
