<?php
require_once __DIR__ . '/config/session.php';

// Configurações do site
$site_config = [
    'title' => 'Quebra-Cabeças - PositiveSense',
    'description' => 'Jogo de quebra-cabeças educativo para desenvolvimento cognitivo',
    'year' => date('Y')
];

// Dados da navegação
$nav_items = [
    ['url' => 'index.php', 'label' => 'Início'],
    ['url' => 'sobre.php', 'label' => 'Sobre'],
    ['url' => 'trabalho.php', 'label' => 'Nosso trabalho'],
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

        /* Header/footer styles removed from page-level and centralized in components/header.php and components/footer.php */

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
            margin-bottom: 40px;
            font-weight: 700;
        }

        .game-title i {
            margin-right: 15px;
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

        .puzzle-container {
            background: white;
            padding: 40px;
            border-radius: 25px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            display: inline-block;
            margin: 0 auto;
        }

        .puzzle-wrapper {
            text-align: center;
        }

        .puzzle-grid {
            display: grid;
            grid-template-columns: repeat(3, 150px);
            grid-template-rows: repeat(3, 150px);
            gap: 12px;
            margin: 0 auto;
        }

        .puzzle-piece {
            background: #f5f5f5;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            font-weight: bold;
            color: white;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
            user-select: none;
            position: relative;
            overflow: hidden;
            background-size: cover;
            background-position: center;
        }

        .puzzle-piece::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
        }

        .puzzle-piece:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
            z-index: 10;
        }

        .puzzle-piece.empty {
            background: #E8EAF6;
            cursor: default;
            box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .puzzle-piece.empty:hover {
            transform: none;
            z-index: 1;
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

        /* Imagem decorativa inferior esquerda */
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

        .difficulty-selector {
            margin-bottom: 30px;
            text-align: center;
        }

        .difficulty-selector label {
            margin-right: 15px;
            color: #5C6BC0;
            font-weight: 700;
            font-size: 18px;
        }

        .difficulty-selector select {
            padding: 12px 20px;
            border-radius: 25px;
            border: 3px solid #5C6BC0;
            color: #5C6BC0;
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
            box-shadow: 0 0 0 4px rgba(92, 107, 192, 0.2);
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

            .puzzle-grid {
                grid-template-columns: repeat(3, 110px);
                grid-template-rows: repeat(3, 110px);
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

            .puzzle-grid {
                grid-template-columns: repeat(3, 100px);
                grid-template-rows: repeat(3, 100px);
                gap: 10px;
            }

            .puzzle-piece {
                font-size: 36px;
            }

            .game-title {
                font-size: 32px;
            }

            .game-subtitle {
                font-size: 16px;
                padding: 0 10px;
            }

            .puzzle-container {
                padding: 25px;
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

            .difficulty-selector {
                padding: 0 10px;
            }

            .difficulty-selector select {
                padding: 10px 15px;
                font-size: 14px;
            }

            .success-message {
                font-size: 24px;
                padding: 20px 30px;
            }
        }

        @media (max-width: 480px) {
            .logo img {
                height: 50px;
            }

            .puzzle-grid {
                grid-template-columns: repeat(3, 80px);
                grid-template-rows: repeat(3, 80px);
                gap: 8px;
            }

            .puzzle-piece {
                font-size: 28px;
                border-radius: 15px;
            }

            .btn-game {
                padding: 15px 35px;
                font-size: 16px;
                width: 100%;
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

            .puzzle-container {
                padding: 15px;
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

            .success-message {
                font-size: 20px;
                padding: 20px 25px;
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

            .difficulty-selector label {
                font-size: 16px;
                margin-right: 10px;
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
            .puzzle-grid {
                grid-template-columns: repeat(3, 70px);
                grid-template-rows: repeat(3, 70px);
                gap: 6px;
            }

            .puzzle-piece {
                font-size: 24px;
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

            .success-message {
                font-size: 18px;
                padding: 15px 20px;
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
                <i class="fas fa-puzzle-piece"></i>Quebra-Cabeças
            </h1>

            <div class="stats-container">
                <div class="stat-card">
                    <div class="stat-label"><i class="far fa-clock"></i> Tempo</div>
                    <div class="stat-value" id="timer">00:00</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label"><i class="fas fa-hand-pointer"></i> Movimentos</div>
                    <div class="stat-value" id="moves">0</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label"><i class="fas fa-trophy"></i> Melhor</div>
                    <div class="stat-value" id="best">--</div>
                </div>
            </div>

            <div class="difficulty-selector">
                <label for="difficulty">Dificuldade:</label>
                <select id="difficulty">
                    <option value="3">Fácil (3x3)</option>
                    <option value="4">Médio (4x4)</option>
                    <option value="5">Difícil (5x5)</option>
                </select>
            </div>

            <div class="controls">
                <button class="btn-game" onclick="startGame()">
                    <i class="fas fa-sync-alt"></i> Novo Jogo
                </button>
            </div>

            <div class="puzzle-wrapper">
                <div class="puzzle-container">
                    <div class="puzzle-grid" id="puzzleGrid"></div>
                </div>
                <div class="success-message" id="successMessage">
                    <i class="fas fa-trophy"></i> Parabéns! Você completou o quebra-cabeças! <i class="fas fa-star"></i>
                </div>
            </div>
        </div>
    </section>

    <?php render_footer($footer_links, $social_media, $site_config['year']); ?>

    <script>
        // Menu Toggle
        function toggleMenu() {
            document.getElementById('navMenu').classList.toggle('active');
        }

        // Game Logic
        let size = 3;
        let tiles = [];
        let emptyIndex = size * size - 1;
        let moves = 0;
        let timer = 0;
        let timerInterval = null;
        let gameStarted = false;

        function initGame() {
            size = parseInt(document.getElementById('difficulty').value);
            tiles = [];
            for (let i = 0; i < size * size - 1; i++) {
                tiles.push(i + 1);
            }
            tiles.push(0);
            emptyIndex = size * size - 1;
            moves = 0;
            timer = 0;
            gameStarted = false;

            updateDisplay();
            renderPuzzle();
        }

        function renderPuzzle() {
            const grid = document.getElementById('puzzleGrid');
            const pieceSize = size === 3 ? 150 : size === 4 ? 110 : 85;
            const puzzleImage = 'img/puzzle-mascote.jpg.png'; // Imagem do quebra-cabeça - mascote meditando

            // Responsivo para diferentes tamanhos de tela
            let currentPieceSize = pieceSize;
            if (window.innerWidth <= 480) {
                const mobileSizes = {
                    3: 80,
                    4: 60,
                    5: 48
                };
                currentPieceSize = mobileSizes[size];
                grid.style.gridTemplateColumns = `repeat(${size}, ${mobileSizes[size]}px)`;
                grid.style.gridTemplateRows = `repeat(${size}, ${mobileSizes[size]}px)`;
            } else if (window.innerWidth <= 768) {
                const mobileSizes = {
                    3: 100,
                    4: 75,
                    5: 60
                };
                currentPieceSize = mobileSizes[size];
                grid.style.gridTemplateColumns = `repeat(${size}, ${mobileSizes[size]}px)`;
                grid.style.gridTemplateRows = `repeat(${size}, ${mobileSizes[size]}px)`;
            } else {
                grid.style.gridTemplateColumns = `repeat(${size}, ${pieceSize}px)`;
                grid.style.gridTemplateRows = `repeat(${size}, ${pieceSize}px)`;
            }

            grid.innerHTML = '';

            tiles.forEach((tile, index) => {
                const piece = document.createElement('div');
                piece.className = tile === 0 ? 'puzzle-piece empty' : 'puzzle-piece';

                // Se não for peça vazia, aplicar a parte da imagem correspondente
                if (tile !== 0) {
                    const row = Math.floor((tile - 1) / size);
                    const col = (tile - 1) % size;

                    // Calcular posição da imagem de fundo
                    const bgPosX = -(col * currentPieceSize);
                    const bgPosY = -(row * currentPieceSize);
                    const totalSize = currentPieceSize * size;

                    piece.style.backgroundImage = `url('${puzzleImage}')`;
                    piece.style.backgroundSize = `${totalSize}px ${totalSize}px`;
                    piece.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;

                    // Adicionar número pequeno no canto para ajudar (opcional)
                    piece.innerHTML = `<span style="position: absolute; top: 2px; right: 5px; font-size: 12px; color: rgba(255,255,255,0.6); text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">${tile}</span>`;
                }

                // Suporte para click e touch
                piece.onclick = () => moveTile(index);
                piece.ontouchend = (e) => {
                    e.preventDefault();
                    moveTile(index);
                };

                grid.appendChild(piece);
            });
        }

        function shufflePuzzle() {
            let shuffleMoves = size === 3 ? 100 : size === 4 ? 200 : 300;

            for (let i = 0; i < shuffleMoves; i++) {
                const validMoves = getValidMoves();
                const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
                [tiles[emptyIndex], tiles[randomMove]] = [tiles[randomMove], tiles[emptyIndex]];
                emptyIndex = randomMove;
            }

            renderPuzzle();
        }

        function getValidMoves() {
            const validMoves = [];
            const row = Math.floor(emptyIndex / size);
            const col = emptyIndex % size;

            if (row > 0) validMoves.push(emptyIndex - size);
            if (row < size - 1) validMoves.push(emptyIndex + size);
            if (col > 0) validMoves.push(emptyIndex - 1);
            if (col < size - 1) validMoves.push(emptyIndex + 1);

            return validMoves;
        }

        function moveTile(index) {
            if (!gameStarted) {
                startTimer();
                gameStarted = true;
            }

            const validMoves = getValidMoves();

            if (validMoves.includes(index)) {
                [tiles[emptyIndex], tiles[index]] = [tiles[index], tiles[emptyIndex]];
                emptyIndex = index;
                moves++;

                updateDisplay();
                renderPuzzle();

                if (checkWin()) {
                    endGame();
                }
            }
        }

        function checkWin() {
            for (let i = 0; i < tiles.length - 1; i++) {
                if (tiles[i] !== i + 1) return false;
            }
            return tiles[tiles.length - 1] === 0;
        }

        function startTimer() {
            timerInterval = setInterval(() => {
                timer++;
                updateDisplay();
            }, 1000);
        }

        function stopTimer() {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        function updateDisplay() {
            document.getElementById('moves').textContent = moves;

            const minutes = Math.floor(timer / 60);
            const seconds = timer % 60;
            document.getElementById('timer').textContent =
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        function endGame() {
            stopTimer();
            document.getElementById('successMessage').classList.add('show');

            const bestKey = `best_${size}x${size}`;
            const currentBest = localStorage.getItem(bestKey);

            if (!currentBest || moves < parseInt(currentBest)) {
                localStorage.setItem(bestKey, moves);
                document.getElementById('best').textContent = moves;
            }

            setTimeout(() => {
                document.getElementById('successMessage').classList.remove('show');
            }, 5000);
        }

        function loadBestScore() {
            const bestKey = `best_${size}x${size}`;
            const best = localStorage.getItem(bestKey);
            document.getElementById('best').textContent = best || '--';
        }

        function startGame() {
            stopTimer();
            document.getElementById('successMessage').classList.remove('show');
            initGame();
            shufflePuzzle();
            loadBestScore();
        }

        document.getElementById('difficulty').addEventListener('change', () => {
            startGame();
        });

        window.onload = () => {
            initGame();
            loadBestScore();
        };

        // Responsive resize
        window.addEventListener('resize', () => {
            renderPuzzle();
        });

        // Suporte a gestos de swipe para mobile
        let touchStartX = 0;
        let touchStartY = 0;
        let touchedTile = null;

        document.getElementById('puzzleGrid').addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;

            const target = e.target;
            if (target.classList.contains('puzzle-piece') && !target.classList.contains('empty')) {
                touchedTile = Array.from(target.parentElement.children).indexOf(target);
            }
        });

        document.getElementById('puzzleGrid').addEventListener('touchmove', (e) => {
            e.preventDefault(); // Prevenir scroll durante o jogo
        }, {
            passive: false
        });

        document.getElementById('puzzleGrid').addEventListener('touchend', (e) => {
            if (touchedTile === null) return;

            const touch = e.changedTouches[0];
            const touchEndX = touch.clientX;
            const touchEndY = touch.clientY;

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            // Detectar direção do swipe
            if (Math.abs(deltaX) > 30 || Math.abs(deltaY) > 30) {
                // Swipe detectado, mover peça se possível
                moveTile(touchedTile);
            }

            touchedTile = null;
        });
    </script>
</body>

</html>
