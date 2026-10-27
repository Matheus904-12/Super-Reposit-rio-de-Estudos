const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});

// Redireciona para a tela de login ao clicar no botão "Vamos Começar"
function goToLogin() {
    window.location.href = "../login/login.html"; // Substitua com o caminho correto da sua página de login
}

// Controla o dropdown do menu hamburguer
document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector(".burguer");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    menuBtn.addEventListener("click", () => {
        // Alterna a visibilidade do menu dropdown
        if (dropdownMenu.style.display === "none" || dropdownMenu.style.display === "") {
            dropdownMenu.style.display = "flex";
            dropdownMenu.style.flexDirection = "column";
            dropdownMenu.style.gap = "10px";
        } else {
            dropdownMenu.style.display = "none";
        }
    });
});

// Função para abrir o chat
function openChat() {
    document.getElementById("chatPopup").style.display = "block";
    document.body.classList.add("blur-background");
}

// Função para fechar o chat
function closeChat() {
    document.getElementById("chatPopup").style.display = "none";
    document.body.classList.remove("blur-background");
}