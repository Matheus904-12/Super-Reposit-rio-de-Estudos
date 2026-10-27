const form = document.getElementById("contactForm");
const submitButton = document.getElementById("submitButton");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitButton.innerHTML = "Enviando...";
    submitButton.disabled = true;

    const formData = new FormData(form);
    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            submitButton.innerHTML = "Enviado!";
            submitButton.disabled = false;

            // Reseta o formulário após 2 segundos e volta o botão para o texto "Enviar"
            setTimeout(() => {
                submitButton.innerHTML = 'Enviar <i class="uil uil-message"></i>';
                form.reset();
            }, 5000);
        } else {
            submitButton.innerHTML = "Erro!";
            setTimeout(() => {
                submitButton.innerHTML = 'Enviar <i class="uil uil-message"></i>';
                submitButton.disabled = false;
            }, 5000);
        }
    } catch (error) {
        submitButton.innerHTML = "Erro!";
        setTimeout(() => {
            submitButton.innerHTML = 'Enviar <i class="uil uil-message"></i>';
            submitButton.disabled = false;
        }, 5000);
    }
});