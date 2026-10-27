<?php
// Configurações do site
$site_config = [
    'title' => 'Nosso Trabalho - PositiveSense',
    'description' => 'Tecnologia para um ambiente escolar mais inclusivo',
    'year' => date('Y')
];

// Dados da navegação
$nav_items = [
    ['url' => 'index.php', 'label' => 'Início'],
    ['url' => 'sobre.php', 'label' => 'Sobre'],
    ['url' => 'trabalho.php', 'label' => 'Nosso trabalho'],
    ['url' => '#contato', 'label' => 'Contato']
];

// Dados dos benefícios
$beneficios = [
    [
        'icon' => 'img/scar.png',
        'title' => 'Inclusão escolar',
    ],
    [
        'icon' => 'img/scar2.png',
        'title' => 'Auxílio à concentração',
    ],
    [
        'icon' => 'img/scar3.png',
        'title' => 'Sensibilização da comunidade',
    ],
    [
        'icon' => 'img/scar4.png',
        'title' => 'Uso de tecnologia acessível',
    ]
];

// Dados do footer
$footer_links = [
    'Início' => [
        ['label' => 'Home', 'url' => 'index.php']
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

// Função para renderizar benefícios (específica desta página)
if (!function_exists('render_beneficios')) {
    function render_beneficios($beneficios) {
        ?>
        <div class="beneficios-grid container">
            <?php foreach ($beneficios as $beneficio): ?>
                <div class="beneficio-item">
                    <div class="beneficio-icon">
                        <img src="<?php echo htmlspecialchars($beneficio['icon']); ?>" 
                             alt="<?php echo htmlspecialchars($beneficio['title']); ?>">
                    </div>
                    <p><?php echo htmlspecialchars($beneficio['title']); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
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
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <?php render_header($nav_items); ?>

    <!-- Hero Section -->
    <section class="hero-trabalho">
        <div class="hero-trabalho-container">
            <div class="hero-trabalho-content">
                <h1>Tecnologia para um ambiente escolar mais inclusivo</h1>
                <p>Uma frase curta explicando a ideia l"Um sensor de som que ajuda estudantes com TEA a se concentrarem melhor</p>
                <button class="btn-primary">Saiba mais</button>
            </div>
            <div class="hero-trabalho-image">
                <img src="img/manu2.png" alt="Mascote PositiveSense">
            </div>
        </div>
    </section>

    <!-- Nossa Ideia Section -->
    <section class="ideia-section">
        <div class="ideia-container">
            <div class="ideia-content">
                <h2>Nossa ideia</h2>
                <p>Nosso projeto propõe instalar sensores de som que acendem luzes quando a sala está muito barulhenta, ajudando alunos com TEA a se concentrarem melhor</p>
            </div>
            <div class="ideia-image">
                <img src="img/manu.png" alt="Ilustração da nossa ideia">
            </div>
        </div>
    </section>

    <!-- Benefícios Section -->
    <section class="beneficios-section">
        <div class="beneficios-header">
            <h2>Benefícios</h2>
        </div>
        <?php render_beneficios($beneficios); ?>
    </section>

    <!-- Objetivo Section -->
    <section class="objetivo-section">
        <p>Nosso objetivo é unir tecnologia, acessibilidade e educação para transformar a sala de aula em um espaço mais acolhedor</p>
    </section>

    <?php render_footer($footer_links, $social_media, $site_config['year']); ?>
</body>
</html>