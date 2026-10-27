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
    <link rel="stylesheet" href="css/jogo-memoria.css">
</head>

<body>
    <?php render_header($nav_items); ?>


    <main class="game-main"><br>
        <div class="game-header">
            <h1>Jogo da Memória</h1>
            <div class="game-stats">
                <div class="stat">
                    <span class="stat-label">Movimentos:</span>
                    <span class="stat-value" id="moves">0</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Pares:</span>
                    <span class="stat-value" id="pairs">0/8</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Tempo:</span>
                    <span class="stat-value" id="timer">00:00</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Melhor:</span>
                    <span class="stat-value" id="best-time">--:--</span>
                </div>
            </div>
            <button class="btn-reset" id="resetBtn">Novo Jogo</button>
        </div>

        <div class="memory-game-container">
            <div class="memory-grid" id="memoryGrid">
                <!-- Cards serão gerados por JavaScript -->
            </div>
        </div>

        <div class="game-instructions">
            <h3>Como Jogar</h3>
            <ul>
                <li>Clique em duas cartas para virá-las</li>
                <li>Se as imagens forem iguais, elas permanecerão viradas</li>
                <li>Se forem diferentes, elas voltarão ao normal</li>
                <li>Encontre todos os 8 pares para vencer!</li>
                <li>Seu progresso é salvo automaticamente</li>
            </ul>
        </div>
    </main>

    <!-- Modal de Vitória -->
    <div class="modal" id="winModal">
        <div class="modal-content">
            <h2>Parabéns!</h2>
            <p class="win-message">Você completou o jogo!</p>
            <div class="win-stats">
                <p>Tempo: <strong id="finalTime">--:--</strong></p>
                <p>Movimentos: <strong id="finalMoves">0</strong></p>
            </div>
            <button class="btn-primary" id="playAgainBtn">Jogar Novamente</button>
            <button class="btn-secondary" id="backToGamesBtn">← Voltar aos Jogos</button>
        </div>
    </div>

    <script src="js/jogo-memoria.js"></script>

    <?php render_footer($footer_links, $social_media, $site_config['year']); ?>
</body>

</html>
