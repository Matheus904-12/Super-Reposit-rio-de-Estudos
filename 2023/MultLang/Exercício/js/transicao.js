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