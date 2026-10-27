document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('multiStepForm');
    const formSteps = Array.from(form.querySelectorAll('.form-step'));
    const nextButtons = form.querySelectorAll('.next-step');
    const prevButtons = form.querySelectorAll('.prev-step');
    const progress = document.querySelector('.progress');
    const stepIndicators = document.querySelectorAll('.step-indicator');
    let currentStep = 0;

    formSteps[currentStep].classList.add('active');
    updateProgress();

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep < formSteps.length - 1) {
                gsap.to(formSteps[currentStep], { opacity: 0, x: -100, duration: 0.5, onComplete: () => {
                    formSteps[currentStep].classList.remove('active');
                    stepIndicators[currentStep].classList.add('completed');
                    currentStep++;
                    formSteps[currentStep].classList.add('active');
                    gsap.fromTo(formSteps[currentStep], { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 0.5 });
                    updateProgress();
                    updateReview();
                }});
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 0) {
                gsap.to(formSteps[currentStep], { opacity: 0, x: 100, duration: 0.5, onComplete: () => {
                    formSteps[currentStep].classList.remove('active');
                    stepIndicators[currentStep].classList.remove('completed');
                    currentStep--;
                    formSteps[currentStep].classList.add('active');
                    gsap.fromTo(formSteps[currentStep], { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 0.5 });
                    updateProgress();
                }});
            }
        });
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Formulário enviado com sucesso!');
        // Aqui você pode adicionar o código para enviar os dados do formulário para o servidor
    });

    function updateReview() {
        if (currentStep === formSteps.length - 1) {
            const reviewInfo = form.querySelector('.review-info');
            reviewInfo.innerHTML = `
                <h3>Informações Pessoais</h3>
                <p><strong>Nome:</strong> ${form.firstName.value}</p>
                <p><strong>Sobrenome:</strong> ${form.lastName.value}</p>
                <p><strong>Email:</strong> ${form.email.value}</p>
                <p><strong>Telefone:</strong> ${form.phone.value}</p>
                
                <h3>Informações do Veículo</h3>
                <p><strong>Marca:</strong> ${form.make.value}</p>
                <p><strong>Modelo:</strong> ${form.model.value}</p>
                <p><strong>Ano:</strong> ${form.year.value}</p>
                <p><strong>Preço:</strong> R$${form.price.value}</p>
                
                <h3>Informações de Financiamento</h3>
                <p><strong>Entrada:</strong> R$${form.downPayment.value}</p>
                <p><strong>Prazo do Empréstimo:</strong> ${form.loanTerm.value} meses</p>
                <p><strong>Taxa de Juros:</strong> ${form.interestRate.value}%</p>
            `;
        }
    }

    function updateProgress() {
        const progressPercentage = (currentStep / (formSteps.length - 1)) * 100;
        gsap.to(progress, { width: `${progressPercentage}%`, duration: 0.5 });
        stepIndicators.forEach((indicator, index) => {
            if (index <= currentStep) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
});
