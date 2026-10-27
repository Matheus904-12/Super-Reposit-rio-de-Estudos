// botão tema
const trocarTema = document.getElementById('trocar-tema');

trocarTema.addEventListener('click', () => {
    trocarTema.classList.toggle('temaEscuro-Botao');
    trocarTema.classList.toggle('temaClaro-Botao');

    if (trocarTema.classList.contains('temaEscuro-Botao')) {
        trocarTema.style.backgroundImage = 'url("img/toggleOFF.png")';

        // tema claro
        document.documentElement.style.setProperty('--corFundo', '#fff');
        document.documentElement.style.setProperty('--corFundoDestaque', '#b112d9');
        document.documentElement.style.setProperty('--corTexto-2', '#000');
        document.documentElement.style.setProperty('--fundoImgLanding', '#09ff00');
        document.documentElement.style.setProperty('--corTextoLaranja', '#ff9310');
    }
    
    else if (trocarTema.classList.contains('temaClaro-Botao')) {
        trocarTema.style.backgroundImage = 'url("img/toggleON.png")';
        
        // tema escuro
        document.documentElement.style.setProperty('--corFundo', '#000');
        document.documentElement.style.setProperty('--corFundoDestaque', '#464646');
        document.documentElement.style.setProperty('--corTexto-2', '#fff');
        document.documentElement.style.setProperty('--fundoImgLanding', '#008cff');
        document.documentElement.style.setProperty('--corTextoLaranja', '#09ff00');
    }
});
