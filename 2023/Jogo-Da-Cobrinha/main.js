// Obtendo o elemento do canvas do HTML
const canvas = document.getElementById('gameCanvas');

// Obtendo o contexto 2D do canvas para desenhar
const ctx = canvas.getContext('2d');

// Obtendo o elemento que exibirá a pontuação
const scoreElement = document.getElementById('scoreValue');

// Criando objetos de áudio para sons do jogo
const gameOverSound = new Audio('perder.mp3.wav'); // Som de game over
const eatAppleSound = new Audio('ganhar.mp3.wav'); // Som de pegar a maçã

// Definindo o tamanho de cada célula e do canvas
const cellSize = 40;  
const canvasSize = canvas.width / cellSize;

// Inicializando a posição e direção da cobra, pontuação e comida
let snake = [{ x: 10, y: 10 }];
let food = { x: Math.floor(Math.random() * canvasSize), y: Math.floor(Math.random() * canvasSize) };
let dx = 0;
let dy = 0;
let score = 0;

// Função para desenhar a cobra na tela
function drawSnake() {
    ctx.fillStyle = '#00ff00'; // Cor verde
    snake.forEach(segment => ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize));
}

// Função para desenhar a comida na tela
function drawFood() {
    ctx.fillStyle = '#ff0000'; // Cor vermelha
    ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
}

// Função para mover a cobra
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * canvasSize), y: Math.floor(Math.random() * canvasSize) };
        score += 10;
        scoreElement.textContent = score;
        eatAppleSound.play(); // Toca o som de pegar a maçã
    } else {
        snake.pop();
    }
}

// Função para verificar colisões
function checkCollision() {
    const head = snake[0];
    const collided = head.x < 0 || head.y < 0 || head.x >= canvasSize || head.y >= canvasSize || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
    
    if (collided) {
        gameOverSound.play(); // Toca o som de game over
    }

    return collided;
}

// Função principal do jogo, controla o loop do jogo
function gameLoop() {
    if (checkCollision()) {
        alert(`Game over! Sua pontuação foi ${score}. Pressione OK para recomeçar.`);
        snake = [{ x: 10, y: 10 }];
        dx = 0;
        dy = 0;
        score = 0;
        scoreElement.textContent = score;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    moveSnake();

    setTimeout(gameLoop, 100);
}

// Adiciona um event listener para capturar as teclas pressionadas
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w': // Tecla W para cima
            if (dy !== 1) {
                dx = 0;
                dy = -1;
            }
            break;
        case 's': // Tecla S para baixo
            if (dy !== -1) {
                dx = 0;
                dy = 1;
            }
            break;
        case 'a': // Tecla A para esquerda
            if (dx !== 1) {
                dx = -1;
                dy = 0;
            }
            break;
        case 'd': // Tecla D para direita
            if (dx !== -1) {
                dx = 1;
                dy = 0;
            }
            break;
    }
});


// Inicia o loop do jogo
gameLoop();
