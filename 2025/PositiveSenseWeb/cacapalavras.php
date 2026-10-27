<?php
require_once __DIR__ . '/config/session.php';

// Configurações do site
$site_config = [
    'title' => 'Caça-Palavras - PositiveSense',
    'description' => 'Jogo de caça-palavras educativo para desenvolvimento cognitivo e vocabulário',
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

        /* Header/footer styles removed from page-level and centralized in components/header.php and components/footer.php */

        /* Game Section */
        .game-section {
            background: linear-gradient(135deg, #E8F4F8 0%, #D4E8F0 100%);
            padding: 60px 20px;
            min-height: calc(100vh - 200px);
            position: relative;
            margin-top: 90px;
        }

        .game-container {
            max-width: 1200px;
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

        .game-area {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 30px;
            align-items: start;
        }

        .puzzle-container {
            background: white;
            padding: 30px;
            border-radius: 25px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .word-grid {
            display: grid;
            gap: 4px;
            margin: 0 auto;
            user-select: none;
        }

        .grid-cell {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
            border-radius: 8px;
            font-weight: bold;
            font-size: 18px;
            color: #5B8FC4;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .grid-cell:hover {
            transform: scale(1.1);
            background: linear-gradient(135deg, #E8F4F8 0%, #D4E8F0 100%);
        }

        .grid-cell.selected {
            background: linear-gradient(135deg, #5B8FC4 0%, #4A7AB3 100%);
            color: white;
            transform: scale(1.05);
        }

        .grid-cell.found {
            background: linear-gradient(135deg, #66BB6A 0%, #43A047 100%);
            color: white;
            animation: foundPulse 0.5s;
        }

        @keyframes foundPulse {

            0%,
            100% {
                transform: scale(1);
            }

            50% {
                transform: scale(1.15);
            }
        }

        .words-panel {
            background: white;
            padding: 30px;
            border-radius: 25px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            min-width: 280px;
        }

        .words-title {
            color: #5C6BC0;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            text-align: center;
        }

        .word-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .word-item {
            padding: 15px 20px;
            background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
            border-radius: 15px;
            font-weight: 600;
            color: #5C6BC0;
            transition: all 0.3s;
            text-align: center;
            font-size: 16px;
        }

        .word-item.found {
            background: linear-gradient(135deg, #66BB6A 0%, #43A047 100%);
            color: white;
            text-decoration: line-through;
            transform: scale(0.95);
            opacity: 0.7;
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
            .game-area {
                grid-template-columns: 1fr;
            }

            .words-panel {
                order: -1;
            }

            .word-list {
                flex-direction: row;
                flex-wrap: wrap;
            }

            .word-item {
                flex: 1 1 auto;
                min-width: 120px;
            }

            .stats-container {
                grid-template-columns: repeat(2, 1fr);
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

            .grid-cell {
                width: 35px;
                height: 35px;
                font-size: 16px;
            }

            .game-title {
                font-size: 32px;
            }

            .game-subtitle {
                font-size: 16px;
                padding: 0 10px;
            }

            .stat-value {
                font-size: 28px;
            }

            .stat-card {
                padding: 20px;
            }

            .btn-game {
                padding: 15px 40px;
                font-size: 16px;
            }

            .game-section {
                padding: 40px 15px;
            }

            .puzzle-container,
            .words-panel {
                padding: 20px;
            }

            .difficulty-selector {
                padding: 0 10px;
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

            .game-container {
                padding: 10px;
                margin: 10px;
            }

            .grid-cell {
                width: 24px;
                height: 24px;
                font-size: 12px;
                border-radius: 4px;
            }

            .word-search-grid {
                gap: 2px;
                max-width: 100%;
                overflow-x: auto;
                padding: 5px;
            }

            .game-title {
                font-size: 20px;
                padding: 0 10px;
            }

            .game-title i {
                margin-right: 6px;
                font-size: 18px;
            }

            .game-subtitle {
                font-size: 13px;
                padding: 0 10px;
            }

            .puzzle-container {
                padding: 10px;
            }

            .words-panel {
                padding: 12px;
                min-width: auto;
            }

            .words-title {
                font-size: 16px;
                margin-bottom: 12px;
            }

            .word-item {
                padding: 10px 12px;
                font-size: 13px;
                min-width: 100px;
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
                padding: 14px 30px;
                font-size: 15px;
                width: 100%;
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

            .decorative-image {
                width: 100px;
                height: 100px;
                bottom: 15px;
                right: 15px;
            }
        }

        @media (max-width: 360px) {
            .grid-cell {
                width: 24px;
                height: 24px;
                font-size: 12px;
                gap: 3px;
            }

            .game-title {
                font-size: 20px;
            }

            .stat-value {
                font-size: 20px;
            }

            .word-item {
                font-size: 13px;
                padding: 10px 12px;
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
                <i class="fas fa-search"></i>Caça-Palavras
            </h1>
            <p class="game-subtitle">Encontre todas as palavras escondidas no diagrama!</p>

            <div class="stats-container">
                <div class="stat-card">
                    <div class="stat-label"><i class="fas fa-check-circle"></i> Encontradas</div>
                    <div class="stat-value" id="wordsFound">0</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label"><i class="fas fa-list"></i> Total</div>
                    <div class="stat-value" id="totalWords">0</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label"><i class="far fa-clock"></i> Tempo</div>
                    <div class="stat-value" id="timer">00:00</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label"><i class="fas fa-trophy"></i> Melhor Tempo</div>
                    <div class="stat-value" id="bestTime">--:--</div>
                </div>
            </div>

            <div class="difficulty-selector">
                <label for="difficulty">Tema:</label>
                <select id="difficulty">
                    <option value="animais">Animais</option>
                    <option value="cores">Cores</option>
                    <option value="frutas">Frutas</option>
                    <option value="paises">Países</option>
                    <option value="esportes">Esportes</option>
                </select>
            </div>

            <div class="controls">
                <button class="btn-game" id="startBtn">
                    <i class="fas fa-play"></i> Novo Jogo
                </button>
            </div>

            <div class="game-area">
                <div class="puzzle-container">
                    <div class="word-grid" id="wordGrid"></div>
                </div>

                <div class="words-panel">
                    <div class="words-title">
                        <i class="fas fa-list-check"></i> Palavras
                    </div>
                    <div class="word-list" id="wordList"></div>
                </div>
            </div>

            <div class="success-message" id="successMessage">
                <i class="fas fa-trophy"></i> Parabéns! Você encontrou todas as palavras! <i class="fas fa-star"></i>
            </div>
        </div>
    </section>

    <?php render_footer($footer_links, $social_media, $site_config['year']); ?>

    <script>
        // Menu Toggle
        function toggleMenu() {
            document.getElementById('navMenu').classList.toggle('active');
        }

        // Game Variables
        const wordThemes = {
            animais: ['GATO', 'CACHORRO', 'LEAO', 'TIGRE', 'URSO', 'COELHO', 'ELEFANTE', 'GIRAFA'],
            cores: ['VERMELHO', 'AZUL', 'VERDE', 'AMARELO', 'ROXO', 'LARANJA', 'ROSA', 'PRETO'],
            frutas: ['MACA', 'BANANA', 'LARANJA', 'UVA', 'MANGA', 'MELANCIA', 'MORANGO', 'ABACAXI'],
            paises: ['BRASIL', 'PORTUGAL', 'ESPANHA', 'ITALIA', 'FRANCA', 'ALEMANHA', 'JAPAO', 'CANADA'],
            esportes: ['FUTEBOL', 'VOLEI', 'BASQUETE', 'TENIS', 'NATACAO', 'CORRIDA', 'BOXE', 'JUDO']
        };

        let gridSize = 15;
        let grid = [];
        let words = [];
        let foundWords = [];
        let selectedCells = [];
        let isSelecting = false;
        let timer = 0;
        let timerInterval = null;
        let bestTimes = {};

        function startGame() {
            const theme = document.getElementById('difficulty').value;
            words = [...wordThemes[theme]].sort(() => Math.random() - 0.5).slice(0, 6);
            foundWords = [];
            selectedCells = [];
            timer = 0;

            stopTimer();
            createGrid();
            placeWords();
            fillEmptyCells();
            renderGrid();
            renderWordList();
            updateStats();
            startTimer();

            document.getElementById('successMessage').classList.remove('show');
        }

        function createGrid() {
            grid = [];
            for (let i = 0; i < gridSize; i++) {
                grid[i] = [];
                for (let j = 0; j < gridSize; j++) {
                    grid[i][j] = {
                        letter: '',
                        wordId: -1
                    };
                }
            }
        }

        function placeWords() {
            const directions = [{
                    x: 0,
                    y: 1
                }, // horizontal direita
                {
                    x: 1,
                    y: 0
                }, // vertical baixo
                {
                    x: 1,
                    y: 1
                }, // diagonal baixo-direita
                {
                    x: 1,
                    y: -1
                }, // diagonal baixo-esquerda
            ];

            words.forEach((word, wordId) => {
                let placed = false;
                let attempts = 0;

                while (!placed && attempts < 100) {
                    const direction = directions[Math.floor(Math.random() * directions.length)];
                    const startX = Math.floor(Math.random() * gridSize);
                    const startY = Math.floor(Math.random() * gridSize);

                    if (canPlaceWord(word, startX, startY, direction)) {
                        placeWord(word, startX, startY, direction, wordId);
                        placed = true;
                    }
                    attempts++;
                }
            });
        }

        function canPlaceWord(word, startX, startY, direction) {
            for (let i = 0; i < word.length; i++) {
                const x = startX + direction.x * i;
                const y = startY + direction.y * i;

                if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
                    return false;
                }

                if (grid[x][y].letter !== '' && grid[x][y].letter !== word[i]) {
                    return false;
                }
            }
            return true;
        }

        function placeWord(word, startX, startY, direction, wordId) {
            for (let i = 0; i < word.length; i++) {
                const x = startX + direction.x * i;
                const y = startY + direction.y * i;
                grid[x][y] = {
                    letter: word[i],
                    wordId: wordId
                };
            }
        }

        function fillEmptyCells() {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    if (grid[i][j].letter === '') {
                        grid[i][j].letter = letters[Math.floor(Math.random() * letters.length)];
                    }
                }
            }
        }

        function renderGrid() {
            const gridElement = document.getElementById('wordGrid');
            gridElement.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
            gridElement.innerHTML = '';

            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    const cell = document.createElement('div');
                    cell.className = 'grid-cell';
                    cell.textContent = grid[i][j].letter;
                    cell.dataset.row = i;
                    cell.dataset.col = j;

                    // Mouse events
                    cell.addEventListener('mousedown', startSelection);
                    cell.addEventListener('mouseenter', continueSelection);
                    cell.addEventListener('mouseup', endSelection);

                    // Touch events para mobile
                    cell.addEventListener('touchstart', handleTouchStart);
                    cell.addEventListener('touchmove', handleTouchMove);
                    cell.addEventListener('touchend', handleTouchEnd);

                    gridElement.appendChild(cell);
                }
            }
        }

        function renderWordList() {
            const listElement = document.getElementById('wordList');
            listElement.innerHTML = '';

            words.forEach(word => {
                const item = document.createElement('div');
                item.className = 'word-item';
                if (foundWords.includes(word)) {
                    item.classList.add('found');
                }
                item.textContent = word;
                listElement.appendChild(item);
            });
        }

        function startSelection(e) {
            isSelecting = true;
            selectedCells = [e.target];
            e.target.classList.add('selected');
        }

        function continueSelection(e) {
            if (!isSelecting) return;

            if (!selectedCells.includes(e.target)) {
                selectedCells.push(e.target);
                e.target.classList.add('selected');
            }
        }

        function endSelection() {
            if (!isSelecting) return;
            isSelecting = false;

            checkWord();

            selectedCells.forEach(cell => {
                if (!cell.classList.contains('found')) {
                    cell.classList.remove('selected');
                }
            });
            selectedCells = [];
        }

        function checkWord() {
            const selectedWord = selectedCells.map(cell => cell.textContent).join('');
            const reversedWord = selectedWord.split('').reverse().join('');

            let foundWord = null;
            if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
                foundWord = selectedWord;
            } else if (words.includes(reversedWord) && !foundWords.includes(reversedWord)) {
                foundWord = reversedWord;
            }

            if (foundWord) {
                foundWords.push(foundWord);
                selectedCells.forEach(cell => {
                    cell.classList.add('found');
                    cell.classList.remove('selected');
                });
                renderWordList();
                updateStats();

                if (foundWords.length === words.length) {
                    endGame();
                }
            }
        }

        function startTimer() {
            timerInterval = setInterval(() => {
                timer++;
                updateTimerDisplay();
            }, 1000);
        }

        function stopTimer() {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
        }

        function updateTimerDisplay() {
            const minutes = Math.floor(timer / 60);
            const seconds = timer % 60;
            document.getElementById('timer').textContent =
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        function updateStats() {
            document.getElementById('wordsFound').textContent = foundWords.length;
            document.getElementById('totalWords').textContent = words.length;
            loadBestTime();
        }

        function endGame() {
            stopTimer();
            document.getElementById('successMessage').classList.add('show');

            const theme = document.getElementById('difficulty').value;
            if (!bestTimes[theme] || timer < bestTimes[theme]) {
                bestTimes[theme] = timer;
                saveBestTime();
            }
        }

        function saveBestTime() {
            localStorage.setItem('wordSearchBestTimes', JSON.stringify(bestTimes));
        }

        function loadBestTime() {
            const saved = localStorage.getItem('wordSearchBestTimes');
            if (saved) {
                bestTimes = JSON.parse(saved);
            }

            const theme = document.getElementById('difficulty').value;
            if (bestTimes[theme]) {
                const minutes = Math.floor(bestTimes[theme] / 60);
                const seconds = bestTimes[theme] % 60;
                document.getElementById('bestTime').textContent =
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            } else {
                document.getElementById('bestTime').textContent = '--:--';
            }
        }

        // Adicionar suporte para toque em dispositivos móveis
        document.addEventListener('mouseup', () => {
            if (isSelecting) {
                endSelection();
            }
        });

        // Touch support para dispositivos móveis
        function handleTouchStart(e) {
            e.preventDefault();
            isSelecting = true;
            const touch = e.touches[0];
            const cell = e.target;
            selectedCells = [cell];
            cell.classList.add('selected');
        }

        function handleTouchMove(e) {
            e.preventDefault();
            if (!isSelecting) return;

            const touch = e.touches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);

            if (element && element.classList.contains('grid-cell')) {
                if (!selectedCells.includes(element)) {
                    selectedCells.push(element);
                    element.classList.add('selected');
                }
            }
        }

        function handleTouchEnd(e) {
            e.preventDefault();
            if (!isSelecting) return;
            isSelecting = false;

            checkWord();

            selectedCells.forEach(cell => {
                if (!cell.classList.contains('found')) {
                    cell.classList.remove('selected');
                }
            });
            selectedCells = [];
        }

        // Inicializar melhor tempo ao carregar a página
        window.addEventListener('load', () => {
            loadBestTime();

            // Adicionar event listener para o botão Iniciar
            const startBtn = document.getElementById('startBtn');
            if (startBtn) {
                startBtn.addEventListener('click', startGame);
            }
        });
    </script>
</body>

</html>
