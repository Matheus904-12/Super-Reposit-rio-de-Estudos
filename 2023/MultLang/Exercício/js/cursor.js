/* Cursor Personalizado */

const cursors = document.querySelectorAll("[data-cursor]");
const hoveredElements = [
  ...document.querySelectorAll("button"),
  ...document.querySelectorAll("a")
];

// Verificar se o dispositivo é um dispositivo móvel
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Adicionar ouvinte de evento mousemove apenas se não for um dispositivo móvel
if (!isMobile) {
  window.addEventListener("mousemove", function (event) {
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
}

/** Adicionar ouvinte de evento touchstart para dispositivos móveis */
window.addEventListener("touchstart", function (event) {
  const touch = event.touches[0];

  /** cursor dot position */
  cursors[0].style.left = `${touch.clientX}px`;
  cursors[0].style.top = `${touch.clientY}px`;

  /** cursor outline position */
  setTimeout(function () {
    cursors[1].style.left = `${touch.clientX}px`;
    cursors[1].style.top = `${touch.clientY}px`;
  }, 80);
});

/** Adicionar ouvinte de evento touchmove para dispositivos móveis */
window.addEventListener("touchmove", function (event) {
  const touch = event.touches[0];

  /** cursor dot position */
  cursors[0].style.left = `${touch.clientX}px`;
  cursors[0].style.top = `${touch.clientY}px`;

  /** cursor outline position */
  setTimeout(function () {
    cursors[1].style.left = `${touch.clientX}px`;
    cursors[1].style.top = `${touch.clientY}px`;
  }, 80);
});

/** Adicionar classe 'hovered' quando mouseover em hoveredElements */
addEventOnElements(hoveredElements, "mouseover", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.add("hovered");
  }
});

/** Remover classe 'hovered' */
addEventOnElements(hoveredElements, "mouseout", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.remove("hovered");
  }
});

/** Função utilitária para adicionar eventos a vários elementos */
function addEventOnElements(elements, event, callback) {
  elements.forEach(function (element) {
    element.addEventListener(event, callback);
  });
}
