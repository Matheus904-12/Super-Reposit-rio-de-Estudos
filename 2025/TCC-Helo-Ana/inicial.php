<?php
// Configurações do site
$site_config = [
    'title' => 'PositiveSense - Inovação a serviço da educação',
    'description' => 'Projeto voltado à inclusão escolar por meio de tecnologia assistiva',
    'year' => date('Y')
];

// Dados da navegação
$nav_items = [
    ['url' => 'index.php', 'label' => 'Início'],
    ['url' => 'sobre.php', 'label' => 'Sobre'],
    ['url' => 'trabalho.php', 'label' => 'Nosso trabalho'],
    ['url' => 'login.php', 'label' => 'Conta']
];

// Dados dos cards
$cards = [
    [
        'title' => 'Sobre',
        'description' => 'Projeto voltado à inclusão escolar por meio de tecnologia assistiva.',
        'link' => 'sobre.php'
    ],
    [
        'title' => 'Nosso trabalho',
        'description' => 'Desenvolvimento de sensor de som, site informativo e aplicativo interativo.',
        'link' => 'trabalho.php'
    ],
    [
        'title' => 'Origem',
        'description' => 'Iniciativa criada para apoiar estudantes com TEA e promover ambientes mais acolhedores.',
        'link' => 'origem.php'
    ]
];

// Dados do footer
$footer_links = [
    'Início' => [
        ['label' => 'Home', 'url' => '#']
    ],
    'Sobre nós' => [
        ['label' => 'Nossos serviços', 'url' => '#']
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

// Função para renderizar cards (específica desta página)
if (!function_exists('render_cards')) {
    function render_cards($cards) {
        ?>
        <section class="cards-section">
            <div class="cards-container">
                <?php foreach ($cards as $card): ?>
                    <div class="card">
                        <h3><?php echo htmlspecialchars($card['title']); ?></h3>
                        <p><?php echo htmlspecialchars($card['description']); ?></p>
                        <a href="<?php echo htmlspecialchars($card['link']); ?>" class="card-link">
                            Saiba mais →
                        </a>
                    </div>
                <?php endforeach; ?>
            </div>
        </section>
        <?php
    }
}
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

    <section class="hero" id="inicio">
        <div class="hero-container">
            <div class="hero-content">
                <h1>Mais concentração, mais inclusão:</h1>
                <p>Inovação a serviço da educação.</p>
                <a href="jogo.php" class="btn-primary">Jogos</a>
            </div>
            <div class="hero-image">
                <img src="img/mascote.png" alt="Mãe e filho jogando">
            </div>
        </div>
    </section>

    <?php render_cards($cards); ?>

    <section class="mission-section">
        <div class="mission-container">
            <div class="mission-content">
                <h2>Nos preocupamos com a causa</h2>
                <p>Nos preocupamos porque inclusão é essencial. Cada criança com TEA tem o direito de frequentar a escola sem sobrecarga sensorial. Nossa missão é tornar as salas de aula mais conscientes, preparadas e acolhedoras.</p>
            </div>
            <div class="mission-image">
                <img src="img/p.png" alt="Equipe PositiveSense">
            </div>
        </div>
    </section>

    <?php render_footer($footer_links, $social_media, $site_config['year']); ?>
</body>
</html>