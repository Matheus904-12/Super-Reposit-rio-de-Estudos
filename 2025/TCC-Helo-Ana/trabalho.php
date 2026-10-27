<?php
// Configurações do site
$site_config = [
    'title' => 'Nosso Trabalho - PositiveSense',
    'description' => 'Conheça os projetos desenvolvidos pela equipe PositiveSense para promover inclusão e educação',
    'year' => date('Y')
];

// Dados da navegação
$nav_items = [
    ['url' => 'inicial.php', 'label' => 'Início'],
    ['url' => 'sobre.php', 'label' => 'Sobre'],
    ['url' => 'trabalho.php', 'label' => 'Nosso trabalho'],
    ['url' => 'login.php', 'label' => 'Conta']
];

// Projetos desenvolvidos
$projetos = [
    [
        'icon' => 'fas fa-microchip',
        'title' => 'Sensor de Som',
        'description' => 'Dispositivo assistivo que detecta níveis de ruído e alerta em tempo real, criando ambientes mais acolhedores para estudantes com TEA.'
    ],
    [
        'icon' => 'fas fa-globe',
        'title' => 'Site Informativo',
        'description' => 'Plataforma web completa com informações sobre TEA, recursos educativos e jogos interativos para desenvolvimento cognitivo.'
    ],
    [
        'icon' => 'fas fa-mobile-alt',
        'title' => 'Aplicativo Mobile',
        'description' => 'App integrado ao sensor que permite monitoramento em tempo real, histórico de dados e configurações personalizadas.'
    ]
];

// Features do aplicativo
$app_features = [
    [
        'icon' => 'fas fa-chart-line',
        'title' => 'Monitoramento em Tempo Real',
        'description' => 'Visualize os níveis de ruído do ambiente instantaneamente'
    ],
    [
        'icon' => 'fas fa-history',
        'title' => 'Histórico Completo',
        'description' => 'Acesse dados históricos e identifique padrões ao longo do tempo'
    ],
    [
        'icon' => 'fas fa-bell',
        'title' => 'Alertas Personalizados',
        'description' => 'Configure notificações de acordo com suas necessidades'
    ],
    [
        'icon' => 'fas fa-cog',
        'title' => 'Configuração Flexível',
        'description' => 'Ajuste sensibilidade e preferências do sensor remotamente'
    ],
    [
        'icon' => 'fas fa-users',
        'title' => 'Multi-usuário',
        'description' => 'Compartilhe o acesso com professores, pais e terapeutas'
    ],
    [
        'icon' => 'fas fa-download',
        'title' => 'Relatórios Detalhados',
        'description' => 'Exporte dados para análise e compartilhamento com especialistas'
    ]
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

    <!-- Hero Section -->
    <section class="trabalho-hero">
        <div class="container">
            <div class="trabalho-hero-content">
                <h1>Nosso Trabalho</h1>
                <p>Desenvolvendo soluções inovadoras para promover inclusão e acessibilidade na educação</p>
            </div>
        </div>
    </section>

    <!-- Projetos Section -->
    <section class="projetos-section">
        <div class="container">
            <div class="section-header">
                <h2>Nossos Projetos</h2>
                <p>Conheça as iniciativas que compõem o ecossistema PositiveSense</p>
            </div>
            <div class="projetos-grid">
                <?php foreach ($projetos as $projeto): ?>
                    <div class="projeto-card">
                        <div class="projeto-icon">
                            <i class="<?php echo htmlspecialchars($projeto['icon']); ?>"></i>
                        </div>
                        <h3><?php echo htmlspecialchars($projeto['title']); ?></h3>
                        <p><?php echo htmlspecialchars($projeto['description']); ?></p>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- App Announcement Section -->
    <section class="app-announcement">
        <div class="container">
            <div class="app-announcement-grid">
                <div class="app-content">
                    <span class="app-badge">Em Breve</span>
                    <h2>Conheça o PositiveSense App</h2>
                    <p class="app-subtitle">O aplicativo que conecta você ao sensor de som em tempo real</p>
                    
                    <div class="app-description">
                        <p>
                            Estamos desenvolvendo um aplicativo mobile completo que permitirá o monitoramento 
                            e controle total do sensor de som diretamente do seu smartphone. Com uma interface 
                            intuitiva e recursos avançados, você terá todas as ferramentas necessárias para 
                            criar um ambiente ideal de aprendizado.
                        </p>
                    </div>

                    <div class="app-stats">
                        <div class="stat-item">
                            <i class="fas fa-download"></i>
                            <div>
                                <strong>Em breve</strong>
                                <span>Disponível para iOS e Android</span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-star"></i>
                            <div>
                                <strong>Gratuito</strong>
                                <span>100% gratuito para todos os usuários</span>
                            </div>
                        </div>
                    </div>

                    <div class="app-stores">
                        <a href="#" class="store-btn disabled">
                            <i class="fab fa-apple"></i>
                            <div>
                                <span>Em breve na</span>
                                <strong>App Store</strong>
                            </div>
                        </a>
                        <a href="#" class="store-btn disabled">
                            <i class="fab fa-google-play"></i>
                            <div>
                                <span>Em breve no</span>
                                <strong>Google Play</strong>
                            </div>
                        </a>
                    </div>
                </div>

                <div class="app-preview">
                    <div class="app-mockup">
                        <div class="phone-frame">
                            <div class="phone-screen">
                                <div class="app-interface">
                                    <div class="app-header-demo">
                                        <i class="fas fa-bars"></i>
                                        <span>PositiveSense</span>
                                        <i class="fas fa-bell"></i>
                                    </div>
                                    <div class="app-main-demo">
                                        <div class="sound-meter">
                                            <div class="meter-circle">
                                                <i class="fas fa-volume-up"></i>
                                                <span class="meter-value">42<small>dB</small></span>
                                            </div>
                                            <p class="meter-status">Ambiente Calmo</p>
                                        </div>
                                        <div class="quick-actions">
                                            <button class="action-btn-demo"><i class="fas fa-chart-bar"></i> Estatísticas</button>
                                            <button class="action-btn-demo"><i class="fas fa-cog"></i> Configurar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="floating-icon icon-1">
                            <i class="fas fa-bell"></i>
                        </div>
                        <div class="floating-icon icon-2">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="floating-icon icon-3">
                            <i class="fas fa-cog"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="app-features">
        <div class="container">
            <div class="section-header">
                <h2>Recursos do Aplicativo</h2>
                <p>Tudo que você precisa para monitorar e gerenciar o ambiente sonoro</p>
            </div>
            <div class="features-grid">
                <?php foreach ($app_features as $feature): ?>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="<?php echo htmlspecialchars($feature['icon']); ?>"></i>
                        </div>
                        <h3><?php echo htmlspecialchars($feature['title']); ?></h3>
                        <p><?php echo htmlspecialchars($feature['description']); ?></p>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
        <div class="container">
            <div class="cta-content">
                <h2>Fique por dentro das novidades</h2>
                <p>Cadastre-se para receber notificações quando o aplicativo estiver disponível</p>
                <div class="cta-form">
                    <input type="email" placeholder="Seu melhor e-mail" class="cta-input">
                    <button class="btn-primary">Quero ser notificado</button>
                </div>
            </div>
        </div>
    </section>

    <?php render_footer($footer_links, $social_media, $site_config['year']); ?>

    <script src="js/main.js"></script>
</body>
</html>
