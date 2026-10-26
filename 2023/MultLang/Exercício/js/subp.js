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

  // Function to open modal with product details
  function openProductModal(productId) {
    // Add logic to fetch and display product details based on productId
    // For simplicity, we'll just show/hide the modal for now
    productModal.style.display = 'flex';
  }

  // Function to close the modal
  function closeProductModal() {
    productModal.style.display = 'none';
  }

  // Event listeners for product cards
  productCards.forEach((card) => {
    card.addEventListener('click', () => {
      const productId = card.getAttribute('data-product-id');
      openProductModal(productId);
    });
  });

  // Event listener for close button in modal
  closeBtn.addEventListener('click', closeProductModal);
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