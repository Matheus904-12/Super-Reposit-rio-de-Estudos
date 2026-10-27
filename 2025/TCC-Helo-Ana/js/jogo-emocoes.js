// Jogo de Pareamento de Emoções
class EmotionGame {
    constructor() {
        this.emotions = [
            {
                name: 'Feliz',
                emoji: '😊',
                images: [
                    'https://picsum.photos/id/1027/300/200', // Pessoa sorrindo
                    'https://picsum.photos/id/177/300/200',  // Alegria
                    'https://picsum.photos/id/180/300/200'   // Diversão
                ]
            },
            {
                name: 'Triste',
                emoji: '😢',
                images: [
                    'https://picsum.photos/id/1005/300/200', // Melancolia
                    'https://picsum.photos/id/124/300/200',  // Solidão
                    'https://picsum.photos/id/133/300/200'   // Tristeza
                ]
            },
            {
                name: 'Surpreso',
                emoji: '😮',
                images: [
                    'https://picsum.photos/id/1016/300/200', // Surpresa
                    'https://picsum.photos/id/1021/300/200', // Espanto
                    'https://picsum.photos/id/1022/300/200'  // Admiração
                ]
            },
            {
                name: 'Calmo',
                emoji: '😌',
                images: [
                    'https://picsum.photos/id/1015/300/200', // Paz
                    'https://picsum.photos/id/1019/300/200', // Tranquilidade
                    'https://picsum.photos/id/1036/300/200'  // Serenidade
                ]
            },
            {
                name: 'Animado',
                emoji: '🤩',
                images: [
                    'https://picsum.photos/id/1018/300/200', // Energia
                    'https://picsum.photos/id/1043/300/200', // Entusiasmo
                    'https://picsum.photos/id/1044/300/200'  // Vibração
                ]
            },
            {
                name: 'Pensativo',
                emoji: '🤔',
                images: [
                    'https://picsum.photos/id/119/300/200',  // Reflexão
                    'https://picsum.photos/id/139/300/200',  // Contemplação
                    'https://picsum.photos/id/146/300/200'   // Meditação
                ]
            },
            {
                name: 'Bravo',
                emoji: '😠',
                images: [
                    'https://picsum.photos/id/188/300/200',  // Raiva
                    'https://picsum.photos/id/189/300/200',  // Irritação
                    'https://picsum.photos/id/193/300/200'   // Fúria
                ]
            },
            {
                name: 'Amoroso',
                emoji: '😍',
                images: [
                    'https://picsum.photos/id/1040/300/200', // Amor
                    'https://picsum.photos/id/1045/300/200', // Carinho
                    'https://picsum.photos/id/1062/300/200'  // Afeto
                ]
            }
        ];

        this.level = 1;
        this.score = 0;
        this.correct = 0;
        this.currentQuestion = 1;
        this.questionsPerLevel = 10;
        this.currentEmotion = null;
        this.isProcessing = false;

        this.init();
    }

    init() {
        this.loadHighScore();
        this.updateStats();
        this.showWelcomeMessage();
    }

    showWelcomeMessage() {
        this.showCustomAlert(
            '😊 Bem-vindo ao Pareamento de Emoções!',
            'Vamos testar suas habilidades de reconhecer emoções! Observe a emoção e escolha a imagem que melhor a representa. Boa sorte! 🍀'
        );
    }

    showCustomAlert(title, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'custom-alert';
        alertDiv.innerHTML = `
            <div class="custom-alert-content">
                <h3>${title}</h3>
                <p>${message}</p>
                <button class="btn-primary" onclick="this.parentElement.parentElement.remove(); window.emotionGame.nextQuestion();">
                    Começar
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
                max-width: 500px;
                width: 90%;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: slideUp 0.5s ease;
            }
            .custom-alert-content h3 {
                color: #e91e63;
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
    }

    nextQuestion() {
        if (this.currentQuestion > this.questionsPerLevel) {
            this.levelUp();
            return;
        }

        // Escolher uma emoção aleatória
        this.currentEmotion = this.emotions[Math.floor(Math.random() * this.emotions.length)];

        // Atualizar display da emoção
        document.getElementById('emotionEmoji').textContent = this.currentEmotion.emoji;
        document.getElementById('emotionName').textContent = this.currentEmotion.name;

        // Criar opções de imagens
        this.createOptions();

        // Atualizar progresso
        this.updateProgress();
    }

    createOptions() {
        const optionsContainer = document.getElementById('emotionOptions');
        optionsContainer.innerHTML = '';

        // Pegar uma imagem correta
        const correctImage = this.currentEmotion.images[Math.floor(Math.random() * this.currentEmotion.images.length)];

        // Pegar imagens incorretas de outras emoções
        const wrongEmotions = this.emotions.filter(e => e.name !== this.currentEmotion.name);
        const wrongImages = [];
        
        // Número de opções aumenta com o nível
        const numOptions = Math.min(3 + this.level, 6);
        const numWrongOptions = numOptions - 1;

        for (let i = 0; i < numWrongOptions; i++) {
            const wrongEmotion = wrongEmotions[Math.floor(Math.random() * wrongEmotions.length)];
            const wrongImage = wrongEmotion.images[Math.floor(Math.random() * wrongEmotion.images.length)];
            wrongImages.push({ image: wrongImage, correct: false });
        }

        // Combinar e embaralhar
        const allOptions = [
            { image: correctImage, correct: true },
            ...wrongImages
        ].sort(() => Math.random() - 0.5);

        // Criar elementos HTML
        allOptions.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'emotion-option';
            optionDiv.innerHTML = `
                <img src="${option.image}" alt="Opção ${index + 1}" loading="lazy">
                <p class="emotion-option-text">Opção ${index + 1}</p>
            `;

            optionDiv.addEventListener('click', () => this.selectOption(optionDiv, option.correct));
            optionsContainer.appendChild(optionDiv);
        });
    }

    selectOption(element, isCorrect) {
        if (this.isProcessing) return;
        this.isProcessing = true;

        const allOptions = document.querySelectorAll('.emotion-option');
        allOptions.forEach(opt => opt.style.pointerEvents = 'none');

        if (isCorrect) {
            element.classList.add('correct');
            this.correct++;
            this.score += 10 * this.level;
            this.updateStats();
            
            this.showFeedback('correct');
            
            setTimeout(() => {
                this.currentQuestion++;
                this.isProcessing = false;
                this.nextQuestion();
            }, 1500);
        } else {
            element.classList.add('wrong');
            this.showFeedback('wrong');
            
            setTimeout(() => {
                element.classList.remove('wrong');
                allOptions.forEach(opt => opt.style.pointerEvents = 'auto');
                this.isProcessing = false;
            }, 1000);
        }
    }

    showFeedback(type) {
        const messages = {
            correct: ['🎉 Correto!', '⭐ Ótimo!', '✨ Perfeito!', '💯 Excelente!', '🌟 Incrível!'],
            wrong: ['❌ Tente novamente!', '🤔 Quase lá!', '💪 Você consegue!']
        };

        const messageList = messages[type];
        const message = messageList[Math.floor(Math.random() * messageList.length)];

        const feedback = document.createElement('div');
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: ${type === 'correct' ? 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)' : 'linear-gradient(135deg, #f44336 0%, #ef5350 100%)'};
            color: white;
            padding: 1.5rem 3rem;
            border-radius: 50px;
            font-size: 2rem;
            font-weight: bold;
            z-index: 9998;
            animation: popIn 0.5s ease;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        `;

        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.style.animation = 'popOut 0.3s ease';
            setTimeout(() => feedback.remove(), 300);
        }, 1000);
    }

    updateStats() {
        document.getElementById('level').textContent = this.level;
        document.getElementById('score').textContent = this.score;
        document.getElementById('correct').textContent = this.correct;
    }

    updateProgress() {
        const progress = (this.currentQuestion / this.questionsPerLevel) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('currentQuestion').textContent = this.currentQuestion;
        document.getElementById('totalQuestions').textContent = this.questionsPerLevel;
    }

    levelUp() {
        if (this.level >= 5) {
            this.gameOver();
            return;
        }

        document.getElementById('nextLevel').textContent = this.level + 1;
        document.getElementById('levelScore').textContent = this.score;
        document.getElementById('levelCorrect').textContent = this.correct;
        document.getElementById('levelUpModal').classList.add('show');
    }

    continueToNextLevel() {
        document.getElementById('levelUpModal').classList.remove('show');
        this.level++;
        this.currentQuestion = 1;
        this.questionsPerLevel += 2; // Aumenta dificuldade
        this.updateStats();
        this.nextQuestion();
    }

    gameOver() {
        this.saveHighScore();
        
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalLevel').textContent = this.level;
        document.getElementById('finalCorrect').textContent = this.correct;
        document.getElementById('gameOverModal').classList.add('show');
    }

    resetGame() {
        this.level = 1;
        this.score = 0;
        this.correct = 0;
        this.currentQuestion = 1;
        this.questionsPerLevel = 10;
        
        document.getElementById('gameOverModal').classList.remove('show');
        this.updateStats();
        this.nextQuestion();
    }

    saveHighScore() {
        const saved = localStorage.getItem('emotionGameHighScore');
        if (!saved || this.score > parseInt(saved)) {
            localStorage.setItem('emotionGameHighScore', this.score);
            this.loadHighScore();
        }
    }

    loadHighScore() {
        const highscore = localStorage.getItem('emotionGameHighScore');
        if (highscore) {
            document.getElementById('highscore').textContent = highscore;
        }
    }

    setupEventListeners() {
        document.getElementById('continueBtn').addEventListener('click', () => this.continueToNextLevel());
        document.getElementById('playAgainBtn').addEventListener('click', () => this.resetGame());
        document.getElementById('backToGamesBtn').addEventListener('click', () => {
            window.location.href = 'jogo.php';
        });
    }
}

// Adicionar animações
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
const emotionGame = new EmotionGame();
window.emotionGame = emotionGame; // Tornar global para uso nos alerts
emotionGame.setupEventListeners();
