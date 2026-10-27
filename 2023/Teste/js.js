document.addEventListener('DOMContentLoaded', function() {
    gsap.fromTo('#eggmanImage', {opacity: 0, y: '-100%'}, {opacity: 1, y: 0, duration: 1, ease: 'power2.inOut'});
});
