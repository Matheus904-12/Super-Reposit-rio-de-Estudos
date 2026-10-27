<?php
// Configurações do site
$site_config = [
    'title' => 'Pareamento de Emoções - PositiveSense',
    'description' => 'Jogo educativo para reconhecimento de emoções',
    'year' => date('Y')
];

// Dados da navegação
$nav_items = [
    ['url' => 'inicial.php', 'label' => 'Início'],
    ['url' => 'sobre.php', 'label' => 'Sobre'],
    ['url' => 'trabalho.php', 'label' => 'Nosso trabalho'],
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
    ['icon' => 'img/whatsapp.png', 'url' => '#', 'title' => 'WhatsApp'],
    ['icon' => 'img/email.png', 'url' => '#', 'title' => 'Email'],
    ['icon' => 'img/spotify.png', 'url' => '#', 'title' => 'Spotify']
];

require_once __DIR__ . '/partials.php';
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo htmlspecialchars($site_config['description']); ?>">
    <title><?php echo htmlspecialchars($site_config['title']); ?></title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/jogo-emocoes.css">
</head>
<body>
    <?php render_header($nav_items); ?>

    <main class="game-main">
        <div class="game-header">
            <h1>😊 Pareamento de Emoções</h1>
            <div class="game-stats">
                <div class="stat">
                    <span class="stat-label">Nível:</span>
                    <span class="stat-value" id="level">1</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Pontos:</span>
                    <span class="stat-value" id="score">0</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Acertos:</span>
                    <span class="stat-value" id="correct">0</span>
                </div>
                <div class="stat">
                    <span class="stat-label">🏆 Recorde:</span>
                    <span class="stat-value" id="highscore">0</span>
                </div>
            </div>
        </div>

        <div class="emotion-game-container">
            <div class="emotion-display">
                <div class="emotion-card" id="emotionCard">
                    <div class="emotion-emoji" id="emotionEmoji">😊</div>
                    <p class="emotion-name" id="emotionName">Feliz</p>
                </div>
            </div>

            <div class="emotion-options" id="emotionOptions">
                <!-- Opções serão geradas por JavaScript -->
            </div>

            <div class="game-progress">
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
                <p class="progress-text">Questão <span id="currentQuestion">1</span> de <span id="totalQuestions">10</span></p>
            </div>
        </div>

        <div class="game-instructions">
            <h3>📖 Como Jogar</h3>
            <ul>
                <li>Observe a emoção mostrada na tela</li>
                <li>Escolha a imagem que melhor representa essa emoção</li>
                <li>Acerte para ganhar pontos e avançar de nível</li>
                <li>Cada nível fica mais desafiador!</li>
                <li>Seu recorde é salvo automaticamente</li>
            </ul>
        </div>
    </main>

    <!-- Modal de Level Up -->
    <div class="modal" id="levelUpModal">
        <div class="modal-content">
            <h2>🎊 Nível Completo!</h2>
            <p class="level-message">Você passou para o nível <strong id="nextLevel">2</strong>!</p>
            <div class="level-stats">
                <p>⭐ Pontuação: <strong id="levelScore">0</strong></p>
                <p>✅ Acertos: <strong id="levelCorrect">0</strong></p>
            </div>
            <button class="btn-primary" id="continueBtn">Continuar ➜</button>
        </div>
    </div>

    <!-- Modal de Game Over -->
    <div class="modal" id="gameOverModal">
        <div class="modal-content">
            <h2>🎮 Fim de Jogo!</h2>
            <p class="game-over-message">Você completou todos os níveis!</p>
            <div class="final-stats">
                <p>🏆 Pontuação Final: <strong id="finalScore">0</strong></p>
                <p>📊 Nível Alcançado: <strong id="finalLevel">1</strong></p>
                <p>✨ Acertos Totais: <strong id="finalCorrect">0</strong></p>
            </div>
            <button class="btn-primary" id="playAgainBtn">🎮 Jogar Novamente</button>
            <button class="btn-secondary" id="backToGamesBtn">← Voltar aos Jogos</button>
        </div>
    </div>

    <script src="js/jogo-emocoes.js"></script>

    <?php render_footer($footer_links, $social_media, $site_config['year']); ?>
</body>
</html>
