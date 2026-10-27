<?php
require_once __DIR__ . '/config/session.php';

// Configurações do site
$site_config = [
    'title' => 'Fruit Ninja - PositiveSense',
    'description' => 'Jogo de cortar frutas para desenvolvimento de coordenação motora e reflexos',
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
            overflow-x: hidden;
        }

        /* Header/footer styles removed from page-level and centralized in components/header.php and components/footer.php */
        /* Use small scoped overrides here only if necessary. */

        /* Game Section */
        .game-section {
            background: linear-gradient(135deg, #E8F4F8 0%, #D4E8F0 100%);
            padding: 60px 20px;
            min-height: calc(100vh - 200px);
            position: relative;
            margin-top: 90px;
        }

        .game-container {
            max-width: 1000px;
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
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
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

        .controls {
            text-align: center;
            margin-bottom: 30px;
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

        .btn-game:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 25px rgba(91, 143, 196, 0.5);
        }

        .game-canvas-wrapper {
            background: white;
            padding: 20px;
            border-radius: 25px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
            position: relative;
            overflow: hidden;
        }

        #gameCanvas {
            display: block;
            width: 100%;
            height: 500px;
            background: linear-gradient(180deg, #87CEEB 0%, #E0F6FF 100%);
            border-radius: 15px;
            cursor: crosshair;
            touch-action: none;
        }

        .game-info {
            background: white;
            padding: 20px;
            border-radius: 20px;
            box-shadow: 0 4px 20px rgba(91, 143, 196, 0.15);
            text-align: center;
        }

        .game-info p {
            color: #5B8FC4;
            font-size: 16px;
            margin: 5px 0;
        }

        .success-message {
            background: linear-gradient(135deg, #66BB6A 0%, #43A047 100%);
            color: white;
            padding: 25px 40px;
            border-radius: 20px;
            text-align: center;
            font-size: 28px;
            font-weight: bold;
            margin-top: 30px;
            display: none;
            animation: slideIn 0.5s;
            box-shadow: 0 10px 30px rgba(67, 160, 71, 0.4);
        }

        .success-message.show {
            display: block;
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

        /* Footer styles removed and centralized in components/footer.php */

        /* Responsive */
        @media (max-width: 968px) {
            .game-container {
                padding: 0 15px;
            }

            .stats-container {
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
            }

            #gameCanvas {
                height: 400px;
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

            .game-title {
                font-size: 32px;
            }

            .game-subtitle {
                font-size: 16px;
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

            #gameCanvas {
                height: 350px;
            }
        }

        @media (max-width: 480px) {
            .logo img {
                height: 50px;
            }

            .game-title {
                font-size: 24px;
            }

            .game-title i {
                margin-right: 8px;
            }

            .game-subtitle {
                font-size: 14px;
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

            #gameCanvas {
                height: 300px;
            }

            .decorative-image {
                width: 100px;
                height: 100px;
                bottom: 15px;
                right: 15px;
            }
        }

        @media (max-width: 360px) {
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

            #gameCanvas {
                height: 250px;
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
                <i class="fas fa-apple-alt"></i>Fruit Ninja
            </h1>
            <p class="game-subtitle">Corte as frutas com o mouse ou toque! Cuidado com as bombas!</p>

            <div class="stats-container">
                <div class="stat-card">
                    <div class="stat-label"><i class="fas fa-star"></i> Pontos</div>
                    <div class="stat-value" id="score">0</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label"><i class="fas fa-apple-alt"></i> Frutas Cortadas</div>
                    <div class="stat-value" id="fruitsCut">0</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label"><i class="fas fa-heart"></i> Vidas</div>
                    <div class="stat-value" id="lives">3</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label"><i class="fas fa-trophy"></i> Recorde</div>
                    <div class="stat-value" id="bestScore">0</div>
                </div>
            </div>

            <div class="controls">
                <button class="btn-game" onclick="startGame()">
                    <i class="fas fa-play"></i> Iniciar Jogo
                </button>
            </div>

            <div class="game-canvas-wrapper">
                <canvas id="gameCanvas"></canvas>
            </div>

            <div class="game-info">
                <p><i class="fas fa-info-circle"></i> <strong>Como jogar:</strong> Arraste o mouse ou dedo sobre as frutas para cortá-las!</p>
                <p><i class="fas fa-exclamation-triangle"></i> Evite as bombas ou perderá uma vida!</p>
            </div>

            <div class="success-message" id="successMessage"></div>
        </div>
    </section>

    <?php render_footer($footer_links, $social_media, $site_config['year']); ?>

    <script>
        // Menu Toggle
        function toggleMenu() {
            document.getElementById('navMenu').classList.toggle('active');
        }

        // Game Variables
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        let score = 0;
        let fruitsCut = 0;
        let lives = 3;
        let bestScore = 0;
        let gameActive = false;
        let fruits = [];
        let sliceTrail = [];
        let gameLoop;
        let spawnInterval;

        // Frutas disponíveis
        const fruitTypes = [{
                emoji: '🍎',
                color: '#FF3B30',
                points: 10
            },
            {
                emoji: '🍊',
                color: '#FF9500',
                points: 10
            },
            {
                emoji: '🍋',
                color: '#FFCC00',
                points: 10
            },
            {
                emoji: '🍉',
                color: '#34C759',
                points: 15
            },
            {
                emoji: '🍇',
                color: '#AF52DE',
                points: 15
            },
            {
                emoji: '🍓',
                color: '#FF2D55',
                points: 20
            },
            {
                emoji: '🥝',
                color: '#30D158',
                points: 20
            },
            {
                emoji: '🍌',
                color: '#FFD60A',
                points: 10
            }
        ];

        // Configurar canvas
        function resizeCanvas() {
            const wrapper = canvas.parentElement;
            canvas.width = wrapper.clientWidth - 40;
            canvas.height = parseInt(window.getComputedStyle(canvas).height);
        }

        // Iniciar jogo
        function startGame() {
            score = 0;
            fruitsCut = 0;
            lives = 3;
            fruits = [];
            sliceTrail = [];
            gameActive = true;

            updateDisplay();

            if (gameLoop) clearInterval(gameLoop);
            if (spawnInterval) clearInterval(spawnInterval);

            gameLoop = setInterval(update, 1000 / 60); // 60 FPS
            spawnInterval = setInterval(spawnFruit, 1000); // Spawn a cada 1 segundo
        }

        // Criar fruta
        function spawnFruit() {
            if (!gameActive) return;

            const isBomb = Math.random() < 0.15; // 15% de chance de bomba
            const startX = Math.random() * canvas.width;
            const velocityX = (Math.random() - 0.5) * 8;
            const velocityY = -15 - Math.random() * 5;

            const fruit = {
                x: startX,
                y: canvas.height,
                velocityX: velocityX,
                velocityY: velocityY,
                gravity: 0.5,
                size: 40,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                sliced: false,
                isBomb: isBomb,
                type: isBomb ? null : fruitTypes[Math.floor(Math.random() * fruitTypes.length)]
            };

            fruits.push(fruit);
        }

        // Atualizar jogo
        function update() {
            if (!gameActive) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Desenhar trilha do corte
            drawSliceTrail();

            // Atualizar e desenhar frutas
            for (let i = fruits.length - 1; i >= 0; i--) {
                const fruit = fruits[i];

                fruit.velocityY += fruit.gravity;
                fruit.x += fruit.velocityX;
                fruit.y += fruit.velocityY;
                fruit.rotation += fruit.rotationSpeed;

                // Remover frutas que saíram da tela
                if (fruit.y > canvas.height + 100) {
                    if (!fruit.sliced && !fruit.isBomb) {
                        lives--;
                        updateDisplay();
                        if (lives <= 0) {
                            endGame();
                        }
                    }
                    fruits.splice(i, 1);
                    continue;
                }

                drawFruit(fruit);
            }
        }

        // Desenhar fruta
        function drawFruit(fruit) {
            ctx.save();
            ctx.translate(fruit.x, fruit.y);
            ctx.rotate(fruit.rotation);

            if (fruit.isBomb) {
                // Desenhar bomba
                ctx.font = `${fruit.size}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('💣', 0, 0);
            } else {
                // Desenhar fruta
                ctx.font = `${fruit.size}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(fruit.type.emoji, 0, 0);
            }

            ctx.restore();
        }

        // Desenhar trilha do corte
        function drawSliceTrail() {
            if (sliceTrail.length < 2) return;

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            ctx.beginPath();
            ctx.moveTo(sliceTrail[0].x, sliceTrail[0].y);

            for (let i = 1; i < sliceTrail.length; i++) {
                ctx.lineTo(sliceTrail[i].x, sliceTrail[i].y);
            }

            ctx.stroke();

            // Limpar trilha antiga
            if (sliceTrail.length > 20) {
                sliceTrail.shift();
            }
        }

        // Verificar corte
        function checkSlice(x, y) {
            for (let fruit of fruits) {
                if (fruit.sliced) continue;

                const dx = x - fruit.x;
                const dy = y - fruit.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < fruit.size) {
                    fruit.sliced = true;

                    if (fruit.isBomb) {
                        // Cortou bomba - perde uma vida
                        lives--;
                        updateDisplay();
                        createExplosion(fruit.x, fruit.y);
                        if (lives <= 0) {
                            endGame();
                        }
                    } else {
                        // Cortou fruta
                        score += fruit.type.points;
                        fruitsCut++;
                        updateDisplay();
                        createSplash(fruit);
                    }
                }
            }
        }

        // Criar explosão
        function createExplosion(x, y) {
            ctx.save();
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
            ctx.beginPath();
            ctx.arc(x, y, 50, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // Criar splash de fruta
        function createSplash(fruit) {
            ctx.save();
            ctx.fillStyle = fruit.type.color + '80';
            ctx.beginPath();
            ctx.arc(fruit.x, fruit.y, 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // Mouse/Touch events
        let isSlicing = false;

        canvas.addEventListener('mousedown', (e) => {
            isSlicing = true;
            sliceTrail = [];
        });

        canvas.addEventListener('mousemove', (e) => {
            if (!isSlicing || !gameActive) return;

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            sliceTrail.push({
                x,
                y
            });
            checkSlice(x, y);
        });

        canvas.addEventListener('mouseup', () => {
            isSlicing = false;
            setTimeout(() => {
                sliceTrail = [];
            }, 200);
        });

        // Touch events para mobile
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            isSlicing = true;
            sliceTrail = [];
        });

        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (!isSlicing || !gameActive) return;

            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;

            sliceTrail.push({
                x,
                y
            });
            checkSlice(x, y);
        });

        canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            isSlicing = false;
            setTimeout(() => {
                sliceTrail = [];
            }, 200);
        });

        // Atualizar display
        function updateDisplay() {
            document.getElementById('score').textContent = score;
            document.getElementById('fruitsCut').textContent = fruitsCut;
            document.getElementById('lives').textContent = lives;

            if (score > bestScore) {
                bestScore = score;
                saveBestScore();
            }
        }

        // Fim de jogo
        function endGame() {
            gameActive = false;
            clearInterval(gameLoop);
            clearInterval(spawnInterval);

            const message = document.getElementById('successMessage');
            message.innerHTML = `<i class="fas fa-trophy"></i> Fim de Jogo! Pontuação: ${score} <i class="fas fa-star"></i>`;
            message.classList.add('show');

            setTimeout(() => {
                message.classList.remove('show');
            }, 5000);
        }

        // Salvar melhor pontuação
        function saveBestScore() {
            localStorage.setItem('fruitNinjaBestScore', bestScore);
            document.getElementById('bestScore').textContent = bestScore;
        }

        // Carregar melhor pontuação
        function loadBestScore() {
            const saved = localStorage.getItem('fruitNinjaBestScore');
            if (saved) {
                bestScore = parseInt(saved);
                document.getElementById('bestScore').textContent = bestScore;
            }
        }

        // Inicialização
        window.addEventListener('load', () => {
            resizeCanvas();
            loadBestScore();
        });

        window.addEventListener('resize', () => {
            resizeCanvas();
        });
    </script>
</body>

</html>
