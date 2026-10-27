<?php
require_once __DIR__ . '/config/session.php';

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
    ['url' => 'trabalho.php', 'label' => 'Nosso Trabalho'],
    ['url' => 'videos.php', 'label' => 'Vídeos'],
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
    ['icon' => 'fab fa-whatsapp', 'url' => 'https://wa.me/5511999999999?text=Olá!%20Vim%20do%20site%20PositiveSense', 'title' => 'WhatsApp'],
    ['icon' => 'fas fa-envelope', 'url' => 'mailto:positivesense@gmail.com?subject=Contato%20do%20Site%20PositiveSense', 'title' => 'Email'],
    ['icon' => 'fab fa-spotify', 'url' => 'https://open.spotify.com/playlist/37i9dQZF1DWY5LGZYBBHHz?si=uvyTRAomSNS4BJfcW9ol8A', 'title' => 'Spotify']
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
    <style>
        @media (max-width: 768px) {
            .trabalho-hero-content h1 {
                font-size: 1.8rem !important;
            }

            .projetos-grid {
                grid-template-columns: 1fr !important;
            }

            .app-announcement-grid {
                grid-template-columns: 1fr !important;
                gap: 2rem !important;
            }

            .app-mockup {
                max-width: 300px;
                margin: 0 auto;
            }

            .features-grid {
                grid-template-columns: 1fr !important;
            }

            .tech-stack-grid {
                grid-template-columns: repeat(2, 1fr) !important;
            }
        }
    </style>
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
                    <span class="app-badge">Disponível Agora</span>
                    <h2>Conheça o Risco - Amigo Virtual</h2>
                    <p class="app-subtitle">Seu companheiro digital para momentos de calma e concentração</p>

                    <div class="app-description">
                        <p>
                            O aplicativo Risco - Amigo Virtual está disponível! Desenvolvido especialmente para 
                            crianças com TEA, o app oferece jogos educativos, atividades de relaxamento e recursos 
                            de concentração em uma interface amigável e intuitiva, com o mascote Risco como seu guia pessoal.
                        </p>
                    </div>

                    <div class="app-stats">
                        <div class="stat-item">
                            <i class="fas fa-gamepad"></i>
                            <div>
                                <strong>Jogos Interativos</strong>
                                <span>Memória, quebra-cabeça e muito mais</span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-book"></i>
                            <div>
                                <strong>Conteúdo Educativo</strong>
                                <span>Artigos e vídeos sobre autismo</span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-heart"></i>
                            <div>
                                <strong>100% Gratuito</strong>
                                <span>Desenvolvido com carinho para inclusão</span>
                            </div>
                        </div>
                    </div>

                    <div class="app-stores">
                        <a href="https://expo.dev/accounts/heloisamachado/projects/risco-amigo-virtual/builds/1ba0fd4f-788c-4fd3-af77-5c3dfd38a806" target="_blank" class="store-btn" style="background: linear-gradient(135deg, #5B8FC4, #4A90E2);">
                            <i class="fab fa-android"></i>
                            <div>
                                <span>Baixar agora</span>
                                <strong>Android APK</strong>
                            </div>
                        </a>
                        <a href="app/application-1ba0fd4f-788c-4fd3-af77-5c3dfd38a806.apk" class="store-btn" style="background: linear-gradient(135deg, #22c55e, #16a34a);">
                            <i class="fas fa-download"></i>
                            <div>
                                <span>Download local</span>
                                <strong>APK do Repositório</strong>
                            </div>
                        </a>
                    </div>
                </div>

                <div class="app-preview">
                    <div class="app-mockup">
                        <div class="phone-frame">
                            <div class="phone-screen">
                                <div class="app-interface" style="background: linear-gradient(180deg, #E8F4FC 0%, #D8E8F5 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem;">
                                    <!-- Mascote Risco -->
                                    <div style="margin-bottom: 1.5rem;">
                                        <img src="img/mascote.png" alt="Risco" style="width: 160px; height: auto;">
                                    </div>
                                    
                                    <!-- Título -->
                                    <h3 style="color: #5B8FC4; font-size: 1.6rem; font-weight: 700; margin-bottom: 0.5rem; text-align: center;">Bem-vindo ao<br>PositiveSense!</h3>
                                    
                                    <!-- Subtítulo -->
                                    <p style="color: #666; font-size: 0.95rem; text-align: center; margin-bottom: 1.5rem; max-width: 260px; line-height: 1.5;">Seu amigo virtual para momentos de calma e concentração</p>
                                    
                                    <!-- Botão Começar -->
                                    <button style="background: #5B8FC4; color: white; border: none; padding: 0.9rem 2.5rem; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(91, 143, 196, 0.3); margin-bottom: 1.5rem;">Começar</button>
                                    
                                    <!-- Ícones de atividades -->
                                    <div style="display: flex; gap: 1.8rem; justify-content: center;">
                                        <div style="text-align: center;">
                                            <i class="fas fa-gamepad" style="font-size: 1.8rem; color: #5B8FC4;"></i>
                                        </div>
                                        <div style="text-align: center;">
                                            <i class="fas fa-book" style="font-size: 1.8rem; color: #5B8FC4;"></i>
                                        </div>
                                        <div style="text-align: center;">
                                            <i class="fas fa-play-circle" style="font-size: 1.8rem; color: #5B8FC4;"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="floating-icon icon-1">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="floating-icon icon-2">
                            <i class="fas fa-gamepad"></i>
                        </div>
                        <div class="floating-icon icon-3">
                            <i class="fas fa-smile"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>    <!-- Features Section -->
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
