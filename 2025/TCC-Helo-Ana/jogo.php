<?php
// Configurações do site
$site_config = [
    'title' => 'Jogos - PositiveSense',
    'description' => 'Jogos educativos para desenvolvimento',
    'year' => date('Y')
];

// Dados da navegação
$nav_items = [
    ['url' => 'index.php', 'label' => 'Início'],
    ['url' => 'sobre.php', 'label' => 'Sobre'],
    ['url' => 'trabalho.php', 'label' => 'Nosso trabalho'],
    ['url' => 'contato.php', 'label' => 'Contato']
];

// Dados dos jogos
$jogos = [
    [
        'title' => 'Jogos de associação e memória',
        'url' => 'jogo-memoria.php'
    ],
    [
        'title' => 'Pareamento de Emoções',
        'url' => 'jogo-emocoes.php'
    ]
];

// Dados do footer
$footer_sections = [
    [
        'title' => 'Início',
        'links' => [
            ['label' => 'Home', 'url' => 'index.php']
        ]
    ],
    [
        'title' => 'Sobre nós',
        'links' => [
            ['label' => 'Nossos serviços', 'url' => 'sobre.php']
        ]
    ],
    [
        'title' => 'Suporte',
        'links' => [
            ['label' => 'Telefones', 'url' => '#'],
            ['label' => 'Chat', 'url' => '#']
        ]
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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <?php render_header($nav_items); ?>

    <main>
        <div class="games-container">
            <div class="games-section">
                <h2>Clique para iniciar o jogo</h2>
                <div class="game-buttons">
                    <?php foreach ($jogos as $jogo): ?>
                        <a href="<?php echo htmlspecialchars($jogo['url']); ?>" class="game-button">
                            <?php echo htmlspecialchars($jogo['title']); ?>
                        </a>
                    <?php endforeach; ?>
                </div>
            </div>
            
            <div class="mascot-section">
                <img src="img/mascote.png" alt="Mascote PositiveSense">
            </div>
        </div>
    </main>

    <?php render_footer($footer_sections, $social_media, $site_config['year']); ?>
</body>
</html>