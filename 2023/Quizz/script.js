const questions = [
    {
        question: "Qual é a capital da França?",
        options: [
            '<i class="fas fa-flag"></i> Paris',
            '<i class="fas fa-flag"></i> Madri',
            '<i class="fas fa-flag"></i> Roma',
            '<i class="fas fa-flag"></i> Berlim'
        ],
        correctAnswer: 0,
        imagePath: "frança2.jpg"
    },
    {
        question: "Qual é a capital do Brasil?",
        options: [
            '<i class="fas fa-flag"></i> Brasília',
            '<i class="fas fa-flag"></i> Rio de Janeiro',
            '<i class="fas fa-flag"></i> São Paulo',
            '<i class="fas fa-flag"></i> Belo Horizonte'
        ],
        correctAnswer: 0,
        imagePath: "brasil20.jpeg"
    },
    {
        question: "Qual é o maior planeta do Sistema Solar?",
        options: [
            '<i class="fas fa-globe"></i> Marte',
            '<i class="fas fa-globe"></i> Júpiter',
            '<i class="fas fa-globe"></i> Vênus',
            '<i class="fas fa-globe"></i> Urano'
        ],
        correctAnswer: 1,
        imagePath: "sistema.jpeg"
    },
    {
        question: "Qual é o processo pelo qual as plantas convertem luz solar em energia?",
        options: [
            '<i class="fas fa-leaf"></i> Fotossíntese',
            '<i class="fas fa-leaf"></i> Respiração celular',
            '<i class="fas fa-leaf"></i> Osmose',
            '<i class="fas fa-leaf"></i> Mitose'
        ],
        correctAnswer: 0,
        imagePath: "planta.jpg"
    },
    {
        question: "Qual é a maior lua de Júpiter?",
        options: [
            '<i class="fas fa-moon"></i> Europa',
            '<i class="fas fa-moon"></i> Ganimedes',
            '<i class="fas fa-moon"></i> Calisto',
            '<i class="fas fa-moon"></i> Io'
        ],
        correctAnswer: 0,
        imagePath: "jupiter.jpg"
    }
];

const colors = ["#FF5555", "#FFD700", "#4CAF50", "#3498DB"]; // Cores para as alternativas

const correctSound = new Audio('depositphotos_426537900-track-correct-guess-bing.mp3');
const incorrectSound = new Audio('som_de_resposta_errada_efeito_sonoro_toquesengracadosmp3.com');
const backgroundMusic = new Audio('LAKEY INSPIRED - Me 2 (Feat. Julian Avila).mp3');
backgroundMusic.loop = true;

const questionContainer = document.querySelector('.question');
const optionsContainer = document.querySelector('.options-container');
const scoreDisplay = document.getElementById('score');
const chancesDisplay = document.getElementById('chances');
const timerCircle = document.querySelector('.timer-circle');
const resultDisplay = document.getElementById('result');

let currentQuestionIndex = 0;
let score = 0;
let chances = 2;
let timeLeft = 60;
let timer;

// Event listener para iniciar o áudio
document.addEventListener("DOMContentLoaded", function() {
    backgroundMusic.play();
});

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.innerHTML = currentQuestion.question;
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.classList.add('option');
        optionElement.innerHTML = option;
        optionElement.style.backgroundColor = colors[index]; // Definir cor de fundo
        optionElement.addEventListener('click', () => checkAnswer(index));
        optionsContainer.appendChild(optionElement);
    });

    const imagePath = currentQuestion.imagePath;
    document.body.style.backgroundImage = `url('${imagePath}')`;

    startTimer();
}

function startTimer() {
    updateTimerDisplay();
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(-1);
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timePercent = (timeLeft / 60) * 100;
    timerCircle.style.background = `conic-gradient(transparent ${360 - timePercent * 3.6}deg, #fff ${360 - timePercent * 3.6}deg)`;
    document.getElementById('time-left').textContent = timeLeft;
}

function checkAnswer(selectedIndex) {
    clearInterval(timer);

    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = currentQuestion.correctAnswer;

    if (selectedIndex === correctIndex) {
        score += 10;
        scoreDisplay.textContent = score;
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            timeLeft = 60;
            displayQuestion();
        } else {
            questionContainer.textContent = "Quiz completado!";
            optionsContainer.innerHTML = '';
            resultDisplay.textContent = '';
            timerCircle.style.display = 'none';
            backgroundMusic.pause();
        }
    } else {
        chances--;
        chancesDisplay.textContent = chances;

        if (chances === 0) {
            currentQuestionIndex = 0;
            score = 0;
            chances = 2;
            timeLeft = 60;
            displayQuestion();
        } else {
            resultDisplay.textContent = "Resposta incorreta. Tente novamente!";
            timeLeft = 60;
            displayQuestion();
        }
        incorrectSound.play();
    }
}

// Início do Quiz
displayQuestion();
backgroundMusic.play();