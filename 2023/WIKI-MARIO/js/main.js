document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');

    hamburgerMenu.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const moedasDiv = document.querySelector('.moedas');
    moedasDiv.classList.add('.loaded .mario');
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const overlayTexts = document.querySelectorAll('.overlay-text h3');

    function animateText(index) {
      if (index < overlayTexts.length) {
        setTimeout(function() {
          overlayTexts[index].style.opacity = 1;
          overlayTexts[index].style.transform = 'translateY(0)';
          animateText(index + 1);
        }, 200);
      }
    }

    animateText(0);
  });