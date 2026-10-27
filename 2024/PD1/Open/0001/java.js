// Código JavaScript para mudar o título da página com base na página atual

let titulo = document.querySelector('title');
let url = window.location.href;

if (url.includes('index.html')) {
  titulo.innerHTML = 'Minha Página Inicial';
} else if (url.includes('sobre.html')) {
  titulo.innerHTML = 'Sobre Nós';
} else if (url.includes('contato.html')) {
  titulo.innerHTML = 'Entre em Contato';
} else if (url.includes('blog.html')) {
  titulo.innerHTML = 'Meu Blog';
} else {
  titulo.innerHTML = 'Minha Página com Navegação';
}
