function Escolher(idioma) {
    fetch(`textos_${idioma}.json`)
        .then(response => response.json())
        .then(texto => {
            document.getElementById('paragrafo1').innerText = texto.paragrafo1;
            document.getElementById('paragrafo2').innerText = texto.paragrafo2;
            document.getElementById('paragrafo3').innerText = texto.paragrafo3;
            document.getElementById('paragrafo4').innerText = texto.paragrafo4;
            document.getElementById('paragrafo5').innerText = texto.paragrafo5;
            document.getElementById('paragrafo6').innerText = texto.paragrafo6;
            document.getElementById('paragrafo7').innerText = texto.paragrafo7;
            document.getElementById('paragrafo8').innerText = texto.paragrafo8;
        })
        .catch(error => console.error('Erro buscando textos:', error));
}

gsap.from('.conteudo', {
    duration: 1,
    opacity: 0,
    y: 50,
    stagger: 0.3,
    ease: 'power2.inOut',
    onComplete: function () {
        gsap.to('.conteudo', { opacity: 1 });
    }
});

