<?php
require_once __DIR__ . '/config/session.php';

// Configurações do site
$site_config = [
    'title' => 'Genius - Jogo de Sequência - PositiveSense',
    'description' => 'Jogo de sequência colorida para desenvolvimento de memória e concentração',
    'year' => date('Y')
];

// Dados da navegação
$nav_items = [
    ['url' => 'index.php', 'label' => 'Início'],
    ['url' => 'sobre.php', 'label' => 'Sobre'],
    ['url' => 'trabalho.php', 'label' => 'Nosso Trabalho'],
    ['url' => 'videos.php', 'label' => 'Vídeos'],
    ['url' => 'login.php', 'label' => 'Conta']
];

// Dados do footer

$footer_links = [
    'Início' => [
        ['label' => 'Home', 'url' => 'inicial.php']
    ],
    'Sobre nós' => [
        ['label' => 'Nossos serviços', 'url' => 'sobre.php']
    ],
    'Suporte' => [
        ['label' => 'Telefones', 'url' => '#'],
        ['label' => 'Chat', 'url' => '#']
    ]
];

$social_media = [
    ['icon' => 'fab fa-whatsapp', 'url' => 'https://wa.me/5511999999999?text=Olá!%20Vim%20do%20site%20PositiveSense', 'title' => 'WhatsApp'],
    ['icon' => 'fas fa-envelope', 'url' => 'mailto:positivesense@gmail.com?subject=Contato%20do%20Site%20PositiveSense', 'title' => 'Email'],
    ['icon' => 'fab fa-spotify', 'url' => 'https://open.spotify.com/playlist/37i9dQZF1DWY5LGZYBBHHz?si=uvyTRAomSNS4BJfcW9ol8A', 'title' => 'Spotify']
];

// Carrega partials para render_header/render_footer
require_once __DIR__ . '/partials.php';
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo htmlspecialchars($site_config['description']); ?>">
    <title><?php echo htmlspecialchars($site_config['title']); ?></title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/styles.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f5f5f5;
        }

        /* Header styles are provided by the shared component to ensure consistent design */

        /* Game Section */
        .game-section {
            background: linear-gradient(135deg, #E8F4F8 0%, #D4E8F0 100%);
            padding: 60px 20px;
            min-height: calc(100vh - 200px);
            position: relative;
            margin-top: 100px;
        }

        .game-container {
            max-width: 900px;
            margin: 0 auto;
        }

        .game-title {
            text-align: center;
            color: #5B8FC4;
            font-size: 42px;
            margin-bottom: 20px;
            font-weight: 700;
        }

        .game-title i {
            margin-right: 15px;
        }

        .game-subtitle {
            text-align: center;
            color: #7BA5D4;
            font-size: 18px;
            margin-bottom: 40px;
            font-weight: 500;
        }

        .stats-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }

        .stat-card {
            background: white;
            padding: 25px;
            border-radius: 20px;
            box-shadow: 0 4px 20px rgba(91, 143, 196, 0.15);
            text-align: center;
            transition: transform 0.3s;
        }

        .stat-card:hover {
            transform: translateY(-5px);
        }

        .stat-label {
            color: #7BA5D4;
            font-size: 14px;
            margin-bottom: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .stat-value {
            color: #5B8FC4;
            font-size: 36px;
            font-weight: bold;
        }

        .difficulty-selector {
            text-align: center;
            margin-bottom: 30px;
        }

        .difficulty-selector label {
            margin-right: 15px;
            color: #5B8FC4;
            font-weight: 700;
            font-size: 18px;
        }

        .difficulty-selector select {
            padding: 12px 20px;
            border-radius: 25px;
            border: 3px solid #5B8FC4;
            color: #5B8FC4;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            background: white;
            transition: all 0.3s;
        }

        .difficulty-selector select:hover {
            background: #F5F7FF;
            transform: translateY(-2px);
        }

        .difficulty-selector select:focus {
            outline: none;
            box-shadow: 0 0 0 4px rgba(91, 143, 196, 0.2);
        }

        .controls {
            text-align: center;
            margin-bottom: 40px;
        }

        .btn-game {
            background: linear-gradient(135deg, #5B8FC4 0%, #4A7AB3 100%);
            color: white;
            border: none;
            padding: 18px 50px;
            border-radius: 50px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 20px rgba(91, 143, 196, 0.4);
            display: inline-flex;
            align-items: center;
            gap: 10px;
        }

        .btn-game:hover:not(:disabled) {
            transform: translateY(-3px);
            box-shadow: 0 6px 25px rgba(91, 143, 196, 0.5);
        }

        .btn-game:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .game-board-wrapper {
            text-align: center;
        }

        .game-board {
            background: white;
            padding: 50px;
            border-radius: 30px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            display: inline-block;
            position: relative;
        }

        .genius-container {
            width: 400px;
            height: 400px;
            position: relative;
            margin: 0 auto;
        }

        .genius-center {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 120px;
            height: 120px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
            z-index: 10;
        }

        .center-text {
            text-align: center;
            color: white;
            font-weight: bold;
        }

        .center-level {
            font-size: 36px;
            line-height: 1;
        }

        .center-label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 5px;
        }

        .color-button {
            position: absolute;
            width: 180px;
            height: 180px;
            cursor: pointer;
            transition: all 0.2s;
            border: 8px solid white;
        }

        .color-button:hover:not(.disabled) {
            transform: scale(1.05);
            filter: brightness(1.1);
        }

        .color-button.active {
            filter: brightness(1.5);
            transform: scale(1.08);
            box-shadow: 0 0 40px currentColor;
        }

        .color-button.disabled {
            cursor: not-allowed;
            opacity: 0.7;
        }

        .green {
            background: #4CAF50;
            top: 0;
            left: 0;
            border-top-left-radius: 100%;
        }

        .red {
            background: #F44336;
            top: 0;
            right: 0;
            border-top-right-radius: 100%;
        }

        .yellow {
            background: #FFC107;
            bottom: 0;
            left: 0;
            border-bottom-left-radius: 100%;
        }

        .blue {
            background: #2196F3;
            bottom: 0;
            right: 0;
            border-bottom-right-radius: 100%;
        }

        .game-status {
            margin-top: 30px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #5C6BC0;
            min-height: 30px;
        }

        .game-status.waiting {
            color: #7986CB;
        }

        .game-status.playing {
            color: #667eea;
            animation: pulse 1.5s infinite;
        }

        .game-status.error {
            color: #F44336;
        }

        @keyframes pulse {

            0%,
            100% {
                opacity: 1;
            }

            50% {
                opacity: 0.6;
            }
        }

        .success-message {
            background: linear-gradient(135deg, #66BB6A 0%, #43A047 100%);
            color: white;
            padding: 25px 40px;
            border-radius: 20px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            margin-top: 30px;
            display: none;
            animation: slideIn 0.5s;
            box-shadow: 0 10px 30px rgba(67, 160, 71, 0.4);
        }

        .success-message.show {
            display: block;
        }

        .error-message {
            background: linear-gradient(135deg, #EF5350 0%, #E53935 100%);
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Imagem decorativa */
        .decorative-image {
            position: absolute;
            bottom: 20px;
            right: 20px;
            width: 150px;
            height: 150px;
            z-index: 100;
            opacity: 0.9;
            transition: all 0.3s ease;
        }

        .decorative-image img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: brightness(1.1) contrast(1.2);
            background: transparent;
        }

        .decorative-image:hover {
            transform: scale(1.1);
            opacity: 1;
        }

        /* Footer styles are provided by the shared component to ensure consistent design */

        /* Responsive */
        @media (max-width: 968px) {
            .game-container {
                padding: 0 15px;
            }

            .stats-container {
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
            }

            .genius-container {
                width: 350px;
                height: 350px;
            }

            .color-button {
                width: 160px;
                height: 160px;
            }
        }

        @media (max-width: 768px) {
            .header-container {
                padding: 0 20px;
            }

            .nav {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: #f8f9fa;
                flex-direction: column;
                padding: 20px;
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
                gap: 20px;
            }

            .nav.active {
                display: flex;
            }

            .menu-toggle {
                display: flex;
            }

            .footer-container {
                flex-direction: column;
                gap: 40px;
                padding: 0 20px;
            }

            .footer-sections {
                flex-direction: column;
                gap: 30px;
            }

            .genius-container {
                width: 320px;
                height: 320px;
            }

            .color-button {
                width: 145px;
                height: 145px;
                border: 6px solid white;
            }

            .genius-center {
                width: 100px;
                height: 100px;
            }

            .center-level {
                font-size: 28px;
            }

            .game-board {
                padding: 30px;
            }

            .game-title {
                font-size: 32px;
            }

            .stat-value {
                font-size: 28px;
            }

            .stat-card {
                padding: 20px;
            }

            .btn-game {
                padding: 16px 40px;
                font-size: 17px;
            }

            .game-section {
                padding: 40px 15px;
            }

            .difficulty-selector select {
                padding: 10px 15px;
                font-size: 14px;
            }
        }

        @media (max-width: 480px) {
            .logo img {
                height: 50px;
            }

            .genius-container {
                width: 280px;
                height: 280px;
            }

            .color-button {
                width: 125px;
                height: 125px;
            }

            .genius-center {
                width: 80px;
                height: 80px;
            }

            .center-level {
                font-size: 24px;
            }

            .center-label {
                font-size: 10px;
            }

            .game-title {
                font-size: 24px;
            }

            .game-title i {
                margin-right: 8px;
            }

            .game-board {
                padding: 20px;
            }

            .stat-card {
                padding: 15px;
            }

            .stat-label {
                font-size: 11px;
            }

            .stat-value {
                font-size: 24px;
            }

            .btn-game {
                padding: 15px 35px;
                font-size: 16px;
                width: 100%;
            }

            .stats-container {
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }

            .header-container {
                padding: 0 15px;
            }

            .footer-logo img {
                height: 60px;
            }

            .controls {
                padding: 0 10px;
            }

            .decorative-image {
                width: 100px;
                height: 100px;
                bottom: 15px;
                right: 15px;
            }
        }

        @media (max-width: 360px) {
            .genius-container {
                width: 240px;
                height: 240px;
            }

            .color-button {
                width: 105px;
                height: 105px;
                border: 5px solid white;
            }

            .genius-center {
                width: 70px;
                height: 70px;
            }

            .center-level {
                font-size: 20px;
            }

            .game-title {
                font-size: 20px;
            }

            .stat-value {
                font-size: 20px;
            }

            .btn-game {
                padding: 12px 25px;
                font-size: 14px;
            }

            .stat-card {
                padding: 12px;
            }

            .decorative-image {
                width: 80px;
                height: 80px;
                bottom: 10px;
                right: 10px;
            }
        }
    </style>
</head>

<body>
    <?php render_header($nav_items); ?>

    <!-- Game Section -->
    <section class="game-section">
        <div class="game-container">
            <h1 class="game-title">
                <i class="fas fa-brain"></i>Genius
            </h1>
            <p class="game-subtitle">Memorize e repita a sequência de cores!</p>

            <div class="stats-container">
                <div class="stat-card">
                    <div class="stat-label"><i class="fas fa-layer-group"></i> Nível Atual</div>
                    <div class="stat-value" id="currentLevel">1</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label"><i class="fas fa-trophy"></i> Recorde</div>
                    <div class="stat-value" id="bestScore">0</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label"><i class="fas fa-gamepad"></i> Partidas</div>
                    <div class="stat-value" id="gamesPlayed">0</div>
                </div>
            </div>

            <div class="difficulty-selector">
                <label for="difficulty">Velocidade:</label>
                <select id="difficulty">
                    <option value="800">Devagar</option>
                    <option value="600" selected>Normal</option>
                    <option value="400">Rápido</option>
                    <option value="250">Muito Rápido</option>
                </select>
            </div>

            <div class="controls">
                <button class="btn-game" id="startBtn">
                    <i class="fas fa-play"></i> Iniciar Jogo
                </button>
            </div>

            <div class="game-board-wrapper">
                <div class="game-board">
                    <div class="genius-container">
                        <div class="color-button green disabled" data-color="green"></div>
                        <div class="color-button red disabled" data-color="red"></div>
                        <div class="color-button yellow disabled" data-color="yellow"></div>
                        <div class="color-button blue disabled" data-color="blue"></div>

                        <div class="genius-center">
                            <div class="center-text">
                                <div class="center-level" id="levelDisplay">1</div>
                                <div class="center-label">NÍVEL</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="game-status" id="gameStatus">Clique em "Iniciar Jogo" para começar</div>
                <div class="success-message" id="successMessage"></div>
            </div>
        </div>
    </section>

    <?php render_footer($footer_links, $social_media, $site_config['year']); ?>


    <script>
        // Menu Toggle
        function toggleMenu() {
            document.getElementById('navMenu').classList.toggle('active');
        }

        // Game Variables - declared globally for onclick access
        let sequence = [];
        let playerSequence = [];
        let level = 1;
        let isPlaying = false;
        let isPlayerTurn = false;
        const colors = ['green', 'red', 'yellow', 'blue'];
        let speed = 600;
        let stats = {
            bestScore: 0,
            gamesPlayed: 0
        };

        // Sound frequencies for each color
        const soundFrequencies = {
            green: 329.63,
            red: 261.63,
            yellow: 220.00,
            blue: 164.81
        };

        function playSound(color) {
            const audioContext = new(window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = soundFrequencies[color];
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        }

        // Global functions for onclick handlers
        function startGame() {
            sequence = [];
            playerSequence = [];
            level = 1;
            isPlaying = true;
            speed = parseInt(document.getElementById('difficulty').value);

            document.getElementById('startBtn').disabled = true;
            document.getElementById('difficulty').disabled = true;
            updateDisplay();

            setTimeout(() => {
                nextLevel();
            }, 500);
        }

        // nextLevel must be global for startGame to call it
        function nextLevel() {
            playerSequence = [];
            isPlayerTurn = false;

            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            sequence.push(randomColor);

            updateStatus('Observe a sequência...', 'playing');
            disableButtons();

            playSequence();
        }

        // playSequence must be global
        function playSequence() {
            let i = 0;
            const interval = setInterval(() => {
                if (i < sequence.length) {
                    lightUpButton(sequence[i]);
                    i++;
                } else {
                    clearInterval(interval);
                    setTimeout(() => {
                        isPlayerTurn = true;
                        enableButtons();
                        updateStatus('Sua vez! Repita a sequência', 'waiting');
                    }, 500);
                }
            }, speed);
        }

        // lightUpButton must be global
        function lightUpButton(color) {
            const button = document.querySelector(`.${color}`);
            button.classList.add('active');
            playSound(color);

            setTimeout(() => {
                button.classList.remove('active');
            }, speed * 0.6);
        }

        // playerClick must be global for onclick handlers
        function playerClick(color) {
            if (!isPlayerTurn || !isPlaying) return;

            lightUpButton(color);
            playerSequence.push(color);

            const currentIndex = playerSequence.length - 1;

            if (playerSequence[currentIndex] !== sequence[currentIndex]) {
                gameOver();
                return;
            }

            if (playerSequence.length === sequence.length) {
                isPlayerTurn = false;
                level++;
                updateDisplay();

                if (level > stats.bestScore) {
                    stats.bestScore = level - 1;
                    saveStats();
                }

                showMessage(`Nível ${level - 1} completo!`, false);

                setTimeout(() => {
                    hideMessage();
                    nextLevel();
                }, 1500);
            }
        }

        // gameOver must be global
        function gameOver() {
            isPlaying = false;
            isPlayerTurn = false;
            disableButtons();

            stats.gamesPlayed++;
            if (level - 1 > stats.bestScore) {
                stats.bestScore = level - 1;
            }
            saveStats();

            updateStatus('Fim de jogo!', 'error');
            showMessage(`Game Over! Você chegou ao nível ${level - 1}`, true);

            document.getElementById('startBtn').disabled = false;
            document.getElementById('difficulty').disabled = false;

            setTimeout(() => {
                updateStatus('Clique em "Iniciar Jogo" para tentar novamente', 'waiting');
            }, 2000);
        }

        // Helper functions - must be global
        function enableButtons() {
            document.querySelectorAll('.color-button').forEach(btn => {
                btn.classList.remove('disabled');
            });
        }

        function disableButtons() {
            document.querySelectorAll('.color-button').forEach(btn => {
                btn.classList.add('disabled');
            });
        }

        function updateDisplay() {
            document.getElementById('currentLevel').textContent = level;
            document.getElementById('levelDisplay').textContent = level;
            document.getElementById('bestScore').textContent = stats.bestScore;
            document.getElementById('gamesPlayed').textContent = stats.gamesPlayed;
        }

        function updateStatus(text, className) {
            const status = document.getElementById('gameStatus');
            status.textContent = text;
            status.className = 'game-status ' + className;
        }

        function showMessage(text, isError) {
            const message = document.getElementById('successMessage');
            message.textContent = text;
            message.className = 'success-message show';
            if (isError) {
                message.classList.add('error-message');
            }
        }

        function hideMessage() {
            document.getElementById('successMessage').classList.remove('show');
        }

        function saveStats() {
            const statsData = JSON.stringify(stats);
            const encodedStats = btoa(statsData);
            document.cookie = `genius_stats=${encodedStats}; path=/; max-age=31536000`;
        }

        function loadStats() {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                const [name, value] = cookie.trim().split('=');
                if (name === 'genius_stats') {
                    try {
                        const decodedStats = atob(value);
                        stats = JSON.parse(decodedStats);
                        updateDisplay();
                    } catch (e) {
                        console.log('Erro ao carregar estatísticas');
                    }
                    break;
                }
            }
        }

        window.onload = () => {
            loadStats();
            disableButtons();

            // Adicionar event listener para o botão Iniciar
            const startBtn = document.getElementById('startBtn');
            startBtn.addEventListener('click', startGame);

            // Adicionar event listeners para os botões de cores
            const colorButtons = document.querySelectorAll('.color-button');
            colorButtons.forEach((button) => {
                // Click event
                button.addEventListener('click', function() {
                    const color = this.dataset.color;
                    playerClick(color);
                });

                // Touch support para dispositivos móveis
                button.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    const color = button.dataset.color;
                    if (isPlayerTurn && isPlaying) {
                        playerClick(color);
                    }
                }, {
                    passive: false
                });
            });
        };

        // Adicionar resize responsivo
        window.addEventListener('resize', () => {
            // Ajustar tamanho do genius se necessário
            updateDisplay();
        });
    </script>
</body>

</html>
