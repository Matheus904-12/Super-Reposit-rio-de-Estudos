initMultiStepForm();

function initMultiStepForm() {
    const progressNumber = document.querySelectorAll(".step").length;
    const slidePage = document.querySelector(".slide-page");
    const submitBtn = document.querySelector(".submit");
    const progressText = document.querySelectorAll(".step p");
    const progressCheck = document.querySelectorAll(".step .check");
    const bullet = document.querySelectorAll(".step .bullet");
    const pages = document.querySelectorAll(".page");
    const nextButtons = document.querySelectorAll(".next");
    const prevButtons = document.querySelectorAll(".prev");
    const stepsNumber = pages.length;

    if (progressNumber !== stepsNumber) {
        console.warn(
            "Erro, o número de etapas na barra de progresso não corresponde ao número de páginas"
        );
    }

    document.documentElement.style.setProperty("--stepNumber", stepsNumber);

    let current = 1;

    for (let i = 0; i < nextButtons.length; i++) {
        nextButtons[i].addEventListener("click", function (event) {
            event.preventDefault();

            inputsValid = validateInputs(this);

            if (inputsValid) {
                slidePage.style.marginLeft = `-${
                    (100 / stepsNumber) * current
                }%`;
                bullet[current - 1].classList.add("active");
                progressCheck[current - 1].classList.add("active");
                progressText[current - 1].classList.add("active");
                current += 1;
            }
        });
    }

    for (let i = 0; i < prevButtons.length; i++) {
        prevButtons[i].addEventListener("click", function (event) {
            event.preventDefault();
            slidePage.style.marginLeft = `-${
                (100 / stepsNumber) * (current - 2)
            }%`;
            bullet[current - 2].classList.remove("active");
            progressCheck[current - 2].classList.remove("active");
            progressText[current - 2].classList.remove("active");
            current -= 1;
        });
    }

    submitBtn.addEventListener("click", function () {
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
        current += 1;
        setTimeout(function () {
            alert("Formulário enviado com sucesso!");
            location.reload();
        }, 800);
    });

    function validateInputs(ths) {
        let inputsValid = true;

        const inputs = ths.parentElement.parentElement.querySelectorAll("input, select");
        for (let i = 0; i < inputs.length; i++) {
            const valid = inputs[i].checkValidity();
            if (!valid) {
                inputsValid = false;
                inputs[i].classList.add("invalid-input");
            } else {
                inputs[i].classList.remove("invalid-input");
            }
        }
        return inputsValid;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray("*[class]").forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                scrub: true
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });
    
    document.addEventListener("DOMContentLoaded", () => {
        // Remove a tela de carregamento após o carregamento da página
        const loadingScreen = document.getElementById("loading-screen");
        loadingScreen.classList.add("loaded");

        // Animação de surgimento para todos os elementos
        gsap.from(".body, .header, .hero, .servicos, .produto, .navbar, .logo, .nav-links a, .btn, .card, .card__article, .container, .row, .social, .footer, .links,", {
            duration: 1.2,
            opacity: 0,
            y: 50,
            stagger: 0.1,
            ease: "power2.out"
        });

        // Animação para elementos ao rolar a página
        gsap.utils.toArray(".servicos, .produto, .garantia-qualidade").forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 30%",
                    scrub: true
                },
                opacity: 0,
                y: 50,
                duration: 1
            });
        });
    });

    window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    document.addEventListener("DOMContentLoaded", function() {
        // Seleciona os elementos específicos dentro da classe 'relativi'
        const elementsToAnimate = document.querySelectorAll(".relativi .field, .relativi .form-outer, .relativi header, .relativi .progress-bar, .relativi .step, .relativi .bullet, .relativi .check");
    
        // Aplica animações a cada elemento encontrado
        elementsToAnimate.forEach((el, index) => {
            gsap.from(el, {
                duration: 1,                // Duração da animação em segundos
                opacity: 0,                 // Inicia a opacidade em 0 (invisível)
                y: 50,                      // Inicia a 50px abaixo da posição final
                delay: index * 0.2,         // Adiciona um pequeno atraso baseado no índice do elemento
                ease: "power4.out",         // Tipo de easing para suavizar a animação
            });
        });
    });
    

}

