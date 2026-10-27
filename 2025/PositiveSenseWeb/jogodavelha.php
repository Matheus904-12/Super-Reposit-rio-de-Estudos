<?php
require_once __DIR__ . '/config/session.php';
require_once __DIR__ . '/partials.php';

// Configurações do site
$site_config = [
    'title' => 'Jogo da Memória - PositiveSense',
    'description' => 'Jogo da memória divertido e educativo',
    'year' => date('Y')
];

// Dados da navegação
$nav_items = [
    ['url' => 'inicial.php', 'label' => 'Início'],
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
        /* If you need to override header/footer visuals for this page, add a small, scoped rule here. */

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
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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

        .game-mode {
            text-align: center;
            margin-bottom: 30px;
        }

        .mode-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .btn-mode {
            background: white;
            color: #5B8FC4;
            border: 3px solid #5B8FC4;
            padding: 15px 40px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }

        .btn-mode:hover {
            background: #5B8FC4;
            color: white;
            transform: translateY(-2px);
        }

        .btn-mode.active {
            background: linear-gradient(135deg, #5B8FC4 0%, #4A7AB3 100%);
            color: white;
            border-color: #5B8FC4;
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

        .game-board-container {
            text-align: center;
        }

        .game-board {
            background: white;
            padding: 40px;
            border-radius: 25px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            display: inline-block;
            margin: 0 auto;
        }

        .board {
            display: grid;
            grid-template-columns: repeat(3, 140px);
            grid-template-rows: repeat(3, 140px);
            gap: 15px;
        }

        .cell {
            background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
            border-radius: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 64px;
            font-weight: bold;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            user-select: none;
            position: relative;
        }

        .cell:hover:not(.taken) {
            transform: scale(1.05);
            background: linear-gradient(135deg, #E8F4F8 0%, #D4E8F0 100%);
        }

        .cell.taken {
            cursor: not-allowed;
        }

        .cell.x {
            color: #5B8FC4;
        }

        .cell.o {
            color: #4A7AB3;
        }

        .cell.winner {
            animation: winPulse 0.6s;
            background: linear-gradient(135deg, #66BB6A 0%, #43A047 100%);
            color: white !important;
        }

        @keyframes winPulse {

            0%,
            100% {
                transform: scale(1);
            }

            50% {
                transform: scale(1.1);
            }
        }

        .game-status {
            margin-top: 30px;
            text-align: center;
            font-size: 28px;
            font-weight: bold;
            color: #5C6BC0;
            min-height: 40px;
        }

        .game-status.player-x {
            color: #667eea;
        }

        .game-status.player-o {
            color: #764ba2;
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

        .draw-message {
            background: linear-gradient(135deg, #FFA726 0%, #FB8C00 100%);
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

        /* Footer styles removed and centralised in components/footer.php */

        /* Responsive */
        @media (max-width: 968px) {
            .game-container {
                padding: 0 15px;
            }

            .stats-container {
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
            }

            .board {
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

            .board {
                grid-template-columns: repeat(3, 100px);
                grid-template-rows: repeat(3, 100px);
                gap: 12px;
            }

            .cell {
                font-size: 48px;
            }

            .game-title {
                font-size: 32px;
            }

            .game-board {
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

            .game-status {
                font-size: 22px;
                padding: 15px 30px;
            }
        }

        @media (max-width: 480px) {
            .logo img {
                height: 50px;
            }

            .board {
                grid-template-columns: repeat(3, 80px);
                grid-template-rows: repeat(3, 80px);
                gap: 10px;
            }

            .cell {
                font-size: 40px;
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

            .game-status {
                font-size: 20px;
                padding: 12px 20px;
            }

            .game-board {
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
            .board {
                grid-template-columns: repeat(3, 70px);
                grid-template-rows: repeat(3, 70px);
                gap: 8px;
            }

            .cell {
                font-size: 36px;
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

            .game-status {
                font-size: 18px;
                padding: 10px 15px;
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
                <i class="fas fa-hashtag"></i>Jogo da Velha
            </h1>

            <div class="stats-container">
                <div class="stat-card">
                    <div class="stat-label"><i class="fas fa-times"></i> Vitórias X</div>
                    <div class="stat-value" id="winsX">0</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label"><i class="fas fa-circle"></i> Vitórias O</div>
                    <div class="stat-value" id="winsO">0</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label"><i class="fas fa-handshake"></i> Empates</div>
                    <div class="stat-value" id="draws">0</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label"><i class="fas fa-gamepad"></i> Jogos</div>
                    <div class="stat-value" id="totalGames">0</div>
                </div>
            </div>

            <div class="game-mode">
                <div class="mode-buttons">
                    <button class="btn-mode active" data-mode="2players" onclick="setGameMode('2players', this)">
                        <i class="fas fa-users"></i> 2 Jogadores
                    </button>
                    <button class="btn-mode" data-mode="vsComputer" onclick="setGameMode('vsComputer', this)">
                        <i class="fas fa-robot"></i> vs Computador
                    </button>
                </div>
            </div>

            <div class="controls">
                <button class="btn-game" onclick="resetGame()">
                    <i class="fas fa-redo"></i> Novo Jogo
                </button>
            </div>

            <div class="game-board-container">
                <div class="game-board">
                    <div class="board" id="gameBoard">
                        <div class="cell" onclick="makeMove(0)"></div>
                        <div class="cell" onclick="makeMove(1)"></div>
                        <div class="cell" onclick="makeMove(2)"></div>
                        <div class="cell" onclick="makeMove(3)"></div>
                        <div class="cell" onclick="makeMove(4)"></div>
                        <div class="cell" onclick="makeMove(5)"></div>
                        <div class="cell" onclick="makeMove(6)"></div>
                        <div class="cell" onclick="makeMove(7)"></div>
                        <div class="cell" onclick="makeMove(8)"></div>
                    </div>
                </div>
                <div class="game-status" id="gameStatus">
                    <i class="fas fa-times"></i> Vez do Jogador X
                </div>
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

        // Game Variables
        let board = ['', '', '', '', '', '', '', '', ''];
        let currentPlayer = 'X';
        let gameMode = '2players';
        let gameActive = true;
        let stats = {
            winsX: 0,
            winsO: 0,
            draws: 0,
            totalGames: 0
        };

        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        function setGameMode(mode, btn) {
            gameMode = mode;
            const buttons = document.querySelectorAll('.btn-mode');
            buttons.forEach(b => b.classList.remove('active'));
            // If caller provided the button element, use it; otherwise try to find by data-mode
            if (btn && btn.classList) {
                btn.classList.add('active');
            } else {
                const found = document.querySelector(`.btn-mode[data-mode="${mode}"]`);
                if (found) found.classList.add('active');
            }
            resetGame();
        }

        function makeMove(index) {
            if (board[index] !== '' || !gameActive) return;

            board[index] = currentPlayer;
            updateBoard();

            if (checkWin()) {
                endGame(`Jogador ${currentPlayer} venceu!`);
                stats[`wins${currentPlayer}`]++;
                stats.totalGames++;
                updateStats();
                return;
            }

            if (checkDraw()) {
                endGame('Empate!', true);
                stats.draws++;
                stats.totalGames++;
                updateStats();
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateStatus();

            if (gameMode === 'vsComputer' && currentPlayer === 'O' && gameActive) {
                setTimeout(computerMove, 500);
            }
        }

        function computerMove() {
            const availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);

            // Tentar ganhar
            for (let move of availableMoves) {
                board[move] = 'O';
                if (checkWin()) {
                    updateBoard();
                    endGame('Computador venceu!');
                    stats.winsO++;
                    stats.totalGames++;
                    updateStats();
                    return;
                }
                board[move] = '';
            }

            // Bloquear jogador
            for (let move of availableMoves) {
                board[move] = 'X';
                if (checkWin()) {
                    board[move] = 'O';
                    updateBoard();
                    currentPlayer = 'X';
                    updateStatus();
                    return;
                }
                board[move] = '';
            }

            // Jogar no centro se disponível
            if (board[4] === '') {
                board[4] = 'O';
            } else {
                // Jogar em posição aleatória
                const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
                board[randomMove] = 'O';
            }

            updateBoard();

            if (checkDraw()) {
                endGame('Empate!', true);
                stats.draws++;
                stats.totalGames++;
                updateStats();
                return;
            }

            currentPlayer = 'X';
            updateStatus();
        }

        function updateBoard() {
            const cells = document.querySelectorAll('.cell');
            cells.forEach((cell, index) => {
                cell.textContent = board[index];
                cell.className = 'cell';
                if (board[index] !== '') {
                    cell.classList.add('taken');
                    cell.classList.add(board[index].toLowerCase());
                }
            });
        }

        function checkWin() {
            for (let condition of winningConditions) {
                const [a, b, c] = condition;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    highlightWinningCells(condition);
                    return true;
                }
            }
            return false;
        }

        function highlightWinningCells(cells) {
            const cellElements = document.querySelectorAll('.cell');
            cells.forEach(index => {
                cellElements[index].classList.add('winner');
            });
        }

        function checkDraw() {
            return board.every(cell => cell !== '');
        }

        function updateStatus() {
            const status = document.getElementById('gameStatus');
            const icon = currentPlayer === 'X' ? '<i class="fas fa-times"></i>' : '<i class="fas fa-circle"></i>';
            status.innerHTML = `${icon} Vez do Jogador ${currentPlayer}`;
            status.className = 'game-status';
            status.classList.add(`player-${currentPlayer.toLowerCase()}`);
        }

        function endGame(message, isDraw = false) {
            gameActive = false;
            const successMessage = document.getElementById('successMessage');
            successMessage.textContent = message;
            successMessage.className = 'success-message show';
            if (isDraw) {
                successMessage.classList.add('draw-message');
            }

            const status = document.getElementById('gameStatus');
            status.textContent = message;

            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 3000);
        }

        function resetGame() {
            board = ['', '', '', '', '', '', '', '', ''];
            currentPlayer = 'X';
            gameActive = true;
            updateBoard();
            updateStatus();
            document.getElementById('successMessage').classList.remove('show');

            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => cell.classList.remove('winner'));
        }

        function updateStats() {
            document.getElementById('winsX').textContent = stats.winsX;
            document.getElementById('winsO').textContent = stats.winsO;
            document.getElementById('draws').textContent = stats.draws;
            document.getElementById('totalGames').textContent = stats.totalGames;

            saveStats();
        }

        function saveStats() {
            const statsData = JSON.stringify(stats);
            const encodedStats = btoa(statsData);
            document.cookie = `tictactoe_stats=${encodedStats}; path=/; max-age=31536000`;
        }

        function loadStats() {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                const [name, value] = cookie.trim().split('=');
                if (name === 'tictactoe_stats') {
                    try {
                        const decodedStats = atob(value);
                        stats = JSON.parse(decodedStats);
                        updateStats();
                    } catch (e) {
                        console.log('Erro ao carregar estatísticas');
                    }
                    break;
                }
            }
        }

        window.onload = () => {
            loadStats();
            updateStatus();

            // Adicionar suporte a touch para dispositivos móveis
            const cells = document.querySelectorAll('.cell');
            cells.forEach((cell, index) => {
                cell.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    makeMove(index);
                });
            });
        };

        // Adicionar resize responsivo
        window.addEventListener('resize', () => {
            updateBoard();
        });
    </script>
</body>

</html>
