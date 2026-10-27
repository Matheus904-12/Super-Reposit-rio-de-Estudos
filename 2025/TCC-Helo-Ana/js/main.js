// ========================================
// DESIGN MODERNO - JavaScript Interactions
// ========================================

document.addEventListener('DOMContentLoaded', function () {
  // Menu Mobile Toggle
  const btn = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');

  if (btn && navLinks) {
    function toggleMenu() {
      const isOpen = navLinks.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    function closeMenu() {
      navLinks.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Fechar ao clicar fora
    document.addEventListener('click', function (e) {
      if (navLinks.classList.contains('open') && 
          !navLinks.contains(e.target) && 
          e.target !== btn) {
        closeMenu();
      }
    });

    // Fechar com Escape
    document.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.key === 'Esc') && 
          navLinks.classList.contains('open')) {
        closeMenu();
        btn.focus();
      }
    });

    // Focus Trap
    navLinks.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      const focusable = navLinks.querySelectorAll('a, button');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  // Scroll Header Effect
  let lastScroll = 0;
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // Animação de Entrada (Scroll reveal)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Animar cards e sections
  const animatedElements = document.querySelectorAll('.card, .beneficio-item, .desafio-item');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Smooth scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
