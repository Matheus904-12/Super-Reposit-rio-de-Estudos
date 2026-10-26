let indiceAtual = 0; //indice da imagem atual
const slides = document.querySelectorAll('.slide'); //guarda tudo dentro dessa div, ou que tenha esse mesmo nome no html
const totalSlides = slides.length //conta quantas coisas tem a classe slide
const intervalo = 5000; //5 segundos

//função para mostrar os slides
function mostrarSlide (indice){
    const carrosselSlides = document.querySelector('.carrossel');
    carrosselSlides.style.transform = `translateX(-${indice * 100}%)`;
}
//avançar manualmente para o slide anterior
function anterior(){
    indiceAtual = (indiceAtual - 1 + totalSlides) % totalSlides ;
    mostrarSlide(indiceAtual);
}
//avançar manualmente para o proximo slide
function proximo(){
    indiceAtual = (indiceAtual + 1) % totalSlides;
    mostrarSlide(indiceAtual);
}
//carrossel andar sozinho
function avancar(){
    indiceAtual = (indiceAtual + 1) % totalSlides ;
    mostrarSlide(indiceAtual);
}
//intervalo para autoavançar
setInterval(avancar, 5000)


