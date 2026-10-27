// Jogo da Memória - JavaScript
class MemoryGame {
    constructor() {
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.timer = 0;
        this.timerInterval = null;
        this.isProcessing = false;
        
        // Imagens do Picsum Photos
        this.images = [
            'https://picsum.photos/id/237/300/300', // Cachorro
            'https://picsum.photos/id/1025/300/300', // Gato
            'https://picsum.photos/id/1074/300/300', // Flores
            'https://picsum.photos/id/1015/300/300', // Natureza
            'https://picsum.photos/id/1018/300/300', // Paisagem
            'https://picsum.photos/id/1019/300/300', // Montanha
            'https://picsum.photos/id/1020/300/300', // Praia
            'https://picsum.photos/id/1024/300/300', // Cidade
        ];

        this.init();
    }

    init() {
        this.loadBestTime();
        this.createCards();
        this.setupEventListeners();
        this.showWelcomeMessage();
    }

    showWelcomeMessage() {
        const savedGame = localStorage.getItem('memoryGameProgress');
        if (savedGame) {
            const data = JSON.parse(savedGame);
            this.showCustomAlert(
                '👋 Bem-vindo de volta!',
                `Você tem um jogo salvo com ${data.matchedPairs} pares encontrados. Vamos continuar?`,
                () => this.loadProgress()
            );
        } else {
            this.showCustomAlert(
                '🎮 Jogo da Memória',
                'Encontre todos os pares de cartas iguais no menor tempo possível! Boa sorte! 🍀',
                () => this.startTimer()
            );
        }
    }

    showCustomAlert(title, message, callback) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'custom-alert';
        alertDiv.innerHTML = `
            <div class="custom-alert-content">
                <h3>${title}</h3>
                <p>${message}</p>
                <button class="btn-primary" onclick="this.parentElement.parentElement.remove(); ${callback ? 'window.currentCallback()' : ''}">
                    OK
                </button>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .custom-alert {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            .custom-alert-content {
                background: white;
                padding: 2.5rem;
                border-radius: 20px;
                text-align: center;
                max-width: 450px;
                width: 90%;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: slideUp 0.5s ease;
            }
            .custom-alert-content h3 {
                color: #5b8fc4;
                font-size: 2rem;
                margin-bottom: 1rem;
            }
            .custom-alert-content p {
                color: #666;
                font-size: 1.1rem;
                margin-bottom: 2rem;
                line-height: 1.6;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(alertDiv);

        if (callback) {
            window.currentCallback = callback;
        }
    }

    createCards() {
        const grid = document.getElementById('memoryGrid');
        grid.innerHTML = '';
        
        // Duplicar imagens para criar pares
        const cardImages = [...this.images, ...this.images];
        
        // Embaralhar
        cardImages.sort(() => Math.random() - 0.5);

        cardImages.forEach((image, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.cardId = index;
            card.dataset.image = image;

            card.innerHTML = `
                <div class="card-face card-back">🎴</div>
                <div class="card-face card-front">
                    <img src="${image}" alt="Card ${index}" loading="lazy">
                </div>
            `;

            card.addEventListener('click', () => this.flipCard(card));
            grid.appendChild(card);
            this.cards.push(card);
        });
    }

    flipCard(card) {
        if (this.isProcessing || card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }

        if (!this.timerInterval) {
            this.startTimer();
        }

        card.classList.add('flipped');
        this.flippedCards.push(card);

        if (this.flippedCards.length === 2) {
            this.moves++;
            this.updateStats();
            this.checkMatch();
        }
    }

    checkMatch() {
        this.isProcessing = true;
        const [card1, card2] = this.flippedCards;

        if (card1.dataset.image === card2.dataset.image) {
            // Match!
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                this.matchedPairs++;
                this.updateStats();
                this.flippedCards = [];
                this.isProcessing = false;
                this.saveProgress();

                this.showMatchMessage();

                if (this.matchedPairs === this.images.length) {
                    this.gameWon();
                }
            }, 500);
        } else {
            // No match
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                this.flippedCards = [];
                this.isProcessing = false;
            }, 1000);
        }
    }

    showMatchMessage() {
        const messages = [
            '🎉 Ótimo!',
            '⭐ Incrível!',
            '🌟 Perfeito!',
            '💯 Excelente!',
            '🎊 Fantástico!',
            '✨ Maravilhoso!'
        ];
        const message = messages[Math.floor(Math.random() * messages.length)];
        
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #5b8fc4 0%, #4a7ab3 100%);
            color: white;
            padding: 1.5rem 3rem;
            border-radius: 50px;
            font-size: 2rem;
            font-weight: bold;
            z-index: 9998;
            animation: popIn 0.5s ease;
            box-shadow: 0 10px 40px rgba(91, 143, 196, 0.4);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'popOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 1000);
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer++;
            this.updateTimer();
        }, 1000);
    }

    updateTimer() {
        const minutes = Math.floor(this.timer / 60).toString().padStart(2, '0');
        const seconds = (this.timer % 60).toString().padStart(2, '0');
        document.getElementById('timer').textContent = `${minutes}:${seconds}`;
    }

    updateStats() {
        document.getElementById('moves').textContent = this.moves;
        document.getElementById('pairs').textContent = `${this.matchedPairs}/${this.images.length}`;
    }

    gameWon() {
        clearInterval(this.timerInterval);
        this.saveBestTime();
        localStorage.removeItem('memoryGameProgress');

        setTimeout(() => {
            document.getElementById('finalTime').textContent = document.getElementById('timer').textContent;
            document.getElementById('finalMoves').textContent = this.moves;
            document.getElementById('winModal').classList.add('show');
        }, 500);
    }

    resetGame() {
        clearInterval(this.timerInterval);
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.timer = 0;
        this.timerInterval = null;
        this.isProcessing = false;

        document.getElementById('timer').textContent = '00:00';
        this.updateStats();
        this.createCards();
        localStorage.removeItem('memoryGameProgress');

        this.showCustomAlert(
            '🔄 Novo Jogo',
            'Um novo desafio está pronto! Vamos lá! 💪',
            null
        );
    }

    saveProgress() {
        const data = {
            matchedPairs: this.matchedPairs,
            moves: this.moves,
            timer: this.timer,
            timestamp: Date.now()
        };
        localStorage.setItem('memoryGameProgress', JSON.stringify(data));
    }

    loadProgress() {
        const saved = localStorage.getItem('memoryGameProgress');
        if (saved) {
            const data = JSON.parse(saved);
            this.matchedPairs = data.matchedPairs;
            this.moves = data.moves;
            this.timer = data.timer;
            this.updateStats();
            this.startTimer();
        }
    }

    saveBestTime() {
        const best = localStorage.getItem('memoryGameBestTime');
        if (!best || this.timer < parseInt(best)) {
            localStorage.setItem('memoryGameBestTime', this.timer);
            this.loadBestTime();
            
            this.showCustomAlert(
                '🏆 NOVO RECORDE!',
                `Você estabeleceu um novo melhor tempo: ${document.getElementById('timer').textContent}! 🎉`,
                null
            );
        }
    }

    loadBestTime() {
        const best = localStorage.getItem('memoryGameBestTime');
        if (best) {
            const minutes = Math.floor(best / 60).toString().padStart(2, '0');
            const seconds = (best % 60).toString().padStart(2, '0');
            document.getElementById('best-time').textContent = `${minutes}:${seconds}`;
        }
    }

    setupEventListeners() {
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            document.getElementById('winModal').classList.remove('show');
            this.resetGame();
        });
        document.getElementById('backToGamesBtn').addEventListener('click', () => {
            window.location.href = 'jogo.php';
        });
    }
}

// Adicionar estilos de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes popIn {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2);
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
    @keyframes popOut {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicializar o jogo
const game = new MemoryGame();
