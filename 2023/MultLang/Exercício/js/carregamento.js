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