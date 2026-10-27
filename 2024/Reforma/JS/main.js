const slider = document.querySelectorAll('.imagensc');
const proxBtn = document.querySelectorAll('.depois');
const antesBtn = document.querySelectorAll('.antes');    

let slideAtivo = 0;

function esconderSlide() {
    slider.forEach(item => item.classList.remove('on'));
}

function mostrarSlider() {
    slider[slideAtivo].classList.add('on');
}

function nextSlider() {
    esconderSlide();
    if(slideAtivo === slider.length - 1) {
        slideAtivo = 0;
    } else {
        slideAtivo++;
    }
    mostrarSlider();
}

function antesSlider() {
    esconderSlide();
    if(slideAtivo === 0) {
        slideAtivo = slider.length - 1;
    } else {
        slideAtivo--;
    }
    mostrarSlider();
}


proxBtn.forEach(btn => btn.addEventListener('click', nextSlider));


antesBtn.forEach(btn => btn.addEventListener('click', antesSlider));
