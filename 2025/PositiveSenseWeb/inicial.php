<?php
require_once __DIR__ . '/config/session.php';

// Configurações do site
$site_config = [
    'title' => 'PositiveSense - Inovação a serviço da educação',
    'description' => 'Projeto voltado à inclusão escolar por meio de tecnologia assistiva',
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
        'link' => 'sobre.php'
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

// Função para renderizar cards (específica desta página)
if (!function_exists('render_cards')) {
    function render_cards($cards)
    {
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
    <link rel="stylesheet" href="css/loading.css?v=<?php echo time(); ?>">
    <style>
        @media (max-width: 768px) {
            .hero-container {
                flex-direction: column !important;
                text-align: center;
            }

            .hero-content h1 {
                font-size: 1.8rem !important;
            }

            .hero-content>div {
                margin: 0 auto !important;
            }

            section[style*="padding: 4rem"] {
                padding: 2rem 1rem !important;
            }

            h2[style*="font-size: 2.5rem"] {
                font-size: 1.8rem !important;
            }

            div[style*="display: flex; gap: 1.5rem"] {
                flex-direction: column;
                gap: 1rem !important;
            }
        }

        /* Estilos para o vídeo da hero */
        #videoHero {
            display: none;
        }

        .hero-mascot {
            width: 85%;
            max-width: 500px;
            height: auto;
        }


        .hero-image {
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
        }
    </style>
</head>

<body>

    <?php render_header($nav_items); ?>

    <section class="hero" id="inicio">
        <div class="hero-container">
            <div class="hero-content">
                <h1>Mais concentração, mais inclusão:</h1>
                <p>Inovação a serviço da educação.</p>
                <div style="display: flex; flex-direction: column; gap: 1.5rem; align-items: center; width: 100%; max-width: 300px;">
                    <a href="jogo.php" class="btn-primary" style="width: 100%; justify-content: center; text-align: center;">
                        <i class="fas fa-gamepad"></i> Jogos
                    </a>
                    <a href="videos.php" class="btn-primary" style="width: 100%; justify-content: center; text-align: center;">
                        <i class="fas fa-video"></i> Vídeos
                    </a>
                    <a href="artigos.php" class="btn-primary" style="width: 100%; justify-content: center; text-align: center;">
                        <i class="fas fa-book"></i> Artigos
                    </a>
                </div>
            </div>
            <div class="hero-image">
                <img id="imgHero"
                    class="hero-mascot"
                    src="img/mascote.gif"
                    alt="Mascote PositiveSense">

            </div>
        </div>
    </section>

    <script>
        // Menu toggle (se necessário)
        function toggleMenu() {
            const navMenu = document.getElementById('navMenu');
            if (navMenu) {
                navMenu.classList.toggle('active');
            }
        }
    </script>

    <?php render_cards($cards); ?>

    <!-- Seção de Recursos -->
    <section style="background: #f8f9fa; padding: 4rem 2rem;">
        <div style="max-width: 1200px; margin: 0 auto;">
            <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 1rem; color: #5B8FC4; font-weight: 800;">O que oferecemos</h2>
            <p style="text-align: center; color: #666; margin-bottom: 3rem; font-size: 1.1rem; max-width: 700px; margin-left: auto; margin-right: auto;">Ferramentas e recursos desenvolvidos especialmente para apoiar estudantes com TEA</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #4A90E2, #5B8FC4); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                        <i class="fas fa-brain" style="font-size: 1.8rem; color: white;"></i>
                    </div>
                    <h3 style="font-size: 1.4rem; color: #333; margin-bottom: 1rem; font-weight: 700;">Jogos Cognitivos</h3>
                    <p style="color: #666; line-height: 1.6; font-size: 0.95rem;">Desenvolva habilidades de memória, concentração e raciocínio lógico através de jogos educativos adaptados.</p>
                </div>
                <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #4A90E2, #5B8FC4); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                        <i class="fas fa-video" style="font-size: 1.8rem; color: white;"></i>
                    </div>
                    <h3 style="font-size: 1.4rem; color: #333; margin-bottom: 1rem; font-weight: 700;">Vídeos Educativos</h3>
                    <p style="color: #666; line-height: 1.6; font-size: 0.95rem;">Aprenda sobre TEA com vídeos informativos sobre diagnóstico, tratamento e estratégias de apoio.</p>
                </div>
                <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #4A90E2, #5B8FC4); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                        <i class="fas fa-newspaper" style="font-size: 1.8rem; color: white;"></i>
                    </div>
                    <h3 style="font-size: 1.4rem; color: #333; margin-bottom: 1rem; font-weight: 700;">Artigos Especializados</h3>
                    <p style="color: #666; line-height: 1.6; font-size: 0.95rem;">Acesse conteúdos escritos por especialistas sobre inclusão escolar e desenvolvimento infantil.</p>
                </div>
                <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #4A90E2, #5B8FC4); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                        <i class="fas fa-microchip" style="font-size: 1.8rem; color: white;"></i>
                    </div>
                    <h3 style="font-size: 1.4rem; color: #333; margin-bottom: 1rem; font-weight: 700;">Sensor IoT</h3>
                    <p style="color: #666; line-height: 1.6; font-size: 0.95rem;">Monitoramento de ruído em tempo real para prevenir sobrecarga sensorial em salas de aula.</p>
                </div>
                <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #4A90E2, #5B8FC4); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                        <i class="fas fa-comments" style="font-size: 1.8rem; color: white;"></i>
                    </div>
                    <h3 style="font-size: 1.4rem; color: #333; margin-bottom: 1rem; font-weight: 700;">Chatbot Inteligente</h3>
                    <p style="color: #666; line-height: 1.6; font-size: 0.95rem;">Tire dúvidas sobre autismo com nosso assistente virtual disponível 24 horas por dia.</p>
                </div>
                <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #4A90E2, #5B8FC4); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                        <i class="fas fa-user-circle" style="font-size: 1.8rem; color: white;"></i>
                    </div>
                    <h3 style="font-size: 1.4rem; color: #333; margin-bottom: 1rem; font-weight: 700;">Perfil Personalizável</h3>
                    <p style="color: #666; line-height: 1.6; font-size: 0.95rem;">Crie sua conta e escolha entre 8 avatares coloridos do mascote para personalizar seu perfil.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Seção de Chamada para Ação -->
    <section style="background: linear-gradient(135deg, #D8E8F5, #E3F2FD); padding: 4rem 2rem;">
        <div style="max-width: 900px; margin: 0 auto; text-align: center;">
            <h2 style="font-size: 2.5rem; color: #5B8FC4; margin-bottom: 1.5rem; font-weight: 800;">Faça parte dessa transformação</h2>
            <p style="font-size: 1.2rem; color: #666; margin-bottom: 2.5rem; line-height: 1.8;">Junte-se a nós na missão de criar ambientes educacionais mais inclusivos e acolhedores para todos.</p>
            <div style="display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap;">
                <a href="sobre.php" class="btn-primary" style="padding: 1rem 2.5rem; font-size: 1.1rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-info-circle"></i> Saiba Mais
                </a>
                <a href="login.php" class="btn-primary" style="padding: 1rem 2.5rem; font-size: 1.1rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; background: linear-gradient(135deg, #5B8FC4, #4A90E2);">
                    <i class="fas fa-user-plus"></i> Criar Conta
                </a>
            </div>
        </div>
    </section>

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

    <!-- Loading Screen -->
    <script src="js/loading.js?v=<?php echo time(); ?>"></script>
</body>

</html>
