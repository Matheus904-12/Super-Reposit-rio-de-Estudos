<?php
require_once __DIR__ . '/config/session.php';

// Configurações do site
$site_config = [
    'title' => 'Vídeos Educativos - PositiveSense',
    'description' => 'Vídeos educativos sobre autismo e TEA',
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

// Vídeos educativos sobre autismo (IDs do YouTube)
$videos = [
    [
        'titulo' => 'Autismo - Entendendo o Transtorno',
        'descricao' => 'Vídeo educativo sobre o Transtorno do Espectro Autista e suas características.',
        'youtube_id' => 'jDLdhZiQ3W4',
        'categoria' => 'Introdução',
        'duracao' => '10:30'
    ],
    [
        'titulo' => 'Sinais e Sintomas do Autismo',
        'descricao' => 'Aprenda a identificar os principais sinais do TEA em crianças.',
        'youtube_id' => 'H33UFg94PEI',
        'categoria' => 'Diagnóstico',
        'duracao' => '15:20'
    ],
    [
        'titulo' => 'Como Ajudar Crianças com Autismo',
        'descricao' => 'Dicas práticas para pais e educadores no apoio ao desenvolvimento.',
        'youtube_id' => 'Lw5ZA03ozJc',
        'categoria' => 'Apoio',
        'duracao' => '12:45'
    ],
    [
        'titulo' => 'Inclusão Escolar e TEA',
        'descricao' => 'Estratégias para promover a inclusão de alunos com autismo.',
        'youtube_id' => 'i5IPiYpANVs',
        'categoria' => 'Educação',
        'duracao' => '18:10'
    ],
    [
        'titulo' => 'Comunicação no Autismo',
        'descricao' => 'Conheça métodos de comunicação alternativa e aumentativa.',
        'youtube_id' => 'y71rcL9hGZI',
        'categoria' => 'Comunicação',
        'duracao' => '14:35'
    ],
    [
        'titulo' => 'Terapias para Autismo',
        'descricao' => 'Principais terapias e intervenções para pessoas com TEA.',
        'youtube_id' => 'sAXf6o8Av7Q',
        'categoria' => 'Tratamento',
        'duracao' => '20:15'
    ],
    [
        'titulo' => 'Autismo - Compreensão e Acolhimento',
        'descricao' => 'Como acolher e compreender pessoas no espectro autista.',
        'youtube_id' => 'gSEu2od18PQ',
        'categoria' => 'Informação',
        'duracao' => '16:50'
    ],
    [
        'titulo' => 'Desenvolvimento Infantil no TEA',
        'descricao' => 'Aspectos do desenvolvimento de crianças com autismo.',
        'youtube_id' => 'THlJ_bmdUfk',
        'categoria' => 'Desenvolvimento',
        'duracao' => '11:25'
    ],
    [
        'titulo' => 'Autismo na Família',
        'descricao' => 'Como a família pode apoiar pessoas com TEA.',
        'youtube_id' => 'A2BEQOlcq7g',
        'categoria' => 'Família',
        'duracao' => '13:20'
    ],
    [
        'titulo' => 'Conscientização sobre Autismo',
        'descricao' => 'A importância da conscientização sobre o TEA.',
        'youtube_id' => 'kV6oCHroZhA',
        'categoria' => 'Conscientização',
        'duracao' => '9:15'
    ],
    [
        'titulo' => 'Autismo - Mitos e Verdades',
        'descricao' => 'Desconstrua mitos e entenda a realidade do espectro autista.',
        'youtube_id' => 'N-aOqPEx1wU',
        'categoria' => 'Informação',
        'duracao' => '17:40'
    ],
    [
        'titulo' => 'Intervenções Precoces no Autismo',
        'descricao' => 'Importância das intervenções precoces no desenvolvimento.',
        'youtube_id' => 'zTc5iPFqZvo',
        'categoria' => 'Tratamento',
        'duracao' => '15:55'
    ],
    [
        'titulo' => 'Autismo e Educação',
        'descricao' => 'Práticas pedagógicas para alunos com TEA.',
        'youtube_id' => 'A-O4zt6CtdU',
        'categoria' => 'Educação',
        'duracao' => '14:10'
    ],
    [
        'titulo' => 'Sensibilidade Sensorial no Autismo',
        'descricao' => 'Entenda a sobrecarga sensorial e como ajudar.',
        'youtube_id' => '7iN6h7SxDXg',
        'categoria' => 'Sensorial',
        'duracao' => '12:30'
    ],
    [
        'titulo' => 'Autismo - Diagnóstico e Avaliação',
        'descricao' => 'Como é feito o diagnóstico do TEA.',
        'youtube_id' => 'xHt9xZYby10',
        'categoria' => 'Diagnóstico',
        'duracao' => '19:20'
    ],
    [
        'titulo' => 'Autismo na Vida Adulta',
        'descricao' => 'Desafios e conquistas de adultos com autismo.',
        'youtube_id' => 'mohutPmk7mE',
        'categoria' => 'Adultos',
        'duracao' => '16:45'
    ],
    [
        'titulo' => 'Habilidades Sociais no TEA',
        'descricao' => 'Desenvolvendo habilidades sociais em pessoas com autismo.',
        'youtube_id' => 'n8AJPl6vCT4',
        'categoria' => 'Desenvolvimento',
        'duracao' => '13:50'
    ],
    [
        'titulo' => 'Autismo - Apoio Familiar',
        'descricao' => 'Orientações para famílias de pessoas com TEA.',
        'youtube_id' => 'cqOny2qcldU',
        'categoria' => 'Família',
        'duracao' => '11:15'
    ],
    [
        'titulo' => 'Comportamento no Autismo',
        'descricao' => 'Compreendendo comportamentos no espectro autista.',
        'youtube_id' => 'zWO6DhPbjb4',
        'categoria' => 'Comportamento',
        'duracao' => '18:25'
    ],
    [
        'titulo' => 'Autismo - Recursos e Tecnologias',
        'descricao' => 'Tecnologias assistivas para pessoas com TEA.',
        'youtube_id' => 'sf-xeb-qIss',
        'categoria' => 'Tecnologia',
        'duracao' => '14:40'
    ],
    [
        'titulo' => 'Inclusão Social e Autismo',
        'descricao' => 'Promovendo a inclusão social de pessoas com TEA.',
        'youtube_id' => 'KTGVsnJnYFs',
        'categoria' => 'Inclusão',
        'duracao' => '16:30'
    ],
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
        .videos-page {
            min-height: 100vh;
            background: #D8E8F5;
            padding: 6rem var(--container-padding) 4rem;
            position: relative;
            overflow: hidden;
        }

        .videos-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
                radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.4) 0%, transparent 50%);
            pointer-events: none;
        }

        .videos-header {
            max-width: 1200px;
            margin: 0 auto 3rem;
            text-align: center;
            position: relative;
            z-index: 1;
            padding-top: 3rem;
        }

        .videos-header h1 {
            font-size: clamp(2rem, 5vw, 2.8rem);
            color: #5B8FC4;
            margin-bottom: 1.5rem;
            font-weight: 800;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            animation: fadeInDown 0.8s ease;
        }

        .videos-header p {
            font-size: 1.05rem;
            color: #666;
            max-width: 700px;
            margin: 0 auto;
            line-height: 1.6;
            animation: fadeInUp 0.8s ease 0.2s both;
        }

        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .videos-container {
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
        }

        .videos-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
            animation: fadeIn 1s ease 0.4s both;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        .video-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
        }

        .video-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(91, 143, 196, 0.1));
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1;
            pointer-events: none;
        }

        .video-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(74, 144, 226, 0.3);
        }

        .video-card:hover::before {
            opacity: 1;
        }

        .video-thumbnail {
            position: relative;
            width: 100%;
            padding-top: 56.25%;
            /* 16:9 ratio */
            background: linear-gradient(135deg, #4A90E2, #5B8FC4);
            overflow: hidden;
        }

        .video-thumbnail img {
            transition: transform 0.4s ease;
        }

        .video-card:hover .video-thumbnail img {
            transform: scale(1.1);
        }

        .video-thumbnail iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }

        .video-play-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .video-card:hover .video-play-overlay {
            opacity: 1;
        }

        .play-button {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #4A90E2, #5B8FC4);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(74, 144, 226, 0.4);
            transition: all 0.3s ease;
        }

        .video-card:hover .play-button {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(74, 144, 226, 0.6);
        }

        .play-button i {
            color: white;
            font-size: 1.5rem;
            margin-left: 4px;
        }

        .video-info {
            padding: 1.5rem;
        }

        .video-category {
            display: inline-block;
            padding: 0.3rem 0.8rem;
            background: linear-gradient(135deg, #4A90E2, #5B8FC4);
            color: white;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 700;
            margin-bottom: 0.8rem;
            box-shadow: 0 2px 8px rgba(74, 144, 226, 0.2);
            letter-spacing: 0.3px;
        }

        .video-title {
            font-size: 1.05rem;
            color: #333;
            margin-bottom: 0.6rem;
            font-weight: 700;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            min-height: 2.8rem;
        }

        .video-description {
            color: #666;
            font-size: 0.9rem;
            line-height: 1.6;
            margin-bottom: 1rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            min-height: 2.88rem;
        }

        .video-meta {
            display: flex;
            align-items: center;
            gap: 1rem;
            color: #888;
            font-size: 0.85rem;
        }

        .video-meta i {
            color: #5B8FC4;
        }

        /* Modal de vídeo */
        .video-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }

        .video-modal.active {
            display: flex;
        }

        .video-modal-content {
            position: relative;
            width: 100%;
            max-width: 900px;
            background: black;
            border-radius: 12px;
            overflow: hidden;
        }

        .video-modal-close {
            position: absolute;
            top: -50px;
            right: 0;
            background: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: var(--text-primary);
            transition: all 0.3s ease;
        }

        .video-modal-close:hover {
            background: var(--primary);
            color: white;
            transform: rotate(90deg);
        }

        .video-modal-iframe {
            width: 100%;
            aspect-ratio: 16/9;
            border: none;
        }

        @media (max-width: 768px) {
            .videos-grid {
                grid-template-columns: 1fr;
            }

            .video-modal {
                padding: 1rem;
            }
        }
    </style>
</head>

<body>
    <?php render_header($nav_items); ?>

    <main class="videos-page">
        <div class="videos-header">
            <h1>Vídeos Educativos sobre Autismo</h1>
            <p>Aprenda mais sobre o Transtorno do Espectro Autista através de vídeos educativos cuidadosamente selecionados para pais, educadores e interessados.</p>
        </div>

        <div class="videos-container">
            <div class="videos-grid">
                <?php foreach ($videos as $index => $video): ?>
                    <div class="video-card" onclick="abrirVideo('<?php echo $video['youtube_id']; ?>', '<?php echo htmlspecialchars($video['titulo']); ?>')">
                        <div class="video-thumbnail">
                            <img src="https://img.youtube.com/vi/<?php echo $video['youtube_id']; ?>/hqdefault.jpg"
                                onerror="this.onerror=null; this.src='https://img.youtube.com/vi/<?php echo $video['youtube_id']; ?>/mqdefault.jpg';"
                                alt="<?php echo htmlspecialchars($video['titulo']); ?>"
                                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
                            <div class="video-play-overlay">
                                <div class="play-button">
                                    <i class="fas fa-play"></i>
                                </div>
                            </div>
                        </div>
                        <div class="video-info">
                            <span class="video-category">
                                <i class="fas fa-tag"></i> <?php echo $video['categoria']; ?>
                            </span>
                            <h3 class="video-title"><?php echo htmlspecialchars($video['titulo']); ?></h3>
                            <p class="video-description"><?php echo htmlspecialchars($video['descricao']); ?></p>
                            <div class="video-meta">
                                <span><i class="fas fa-clock"></i> <?php echo $video['duracao']; ?></span>
                                <span><i class="fas fa-eye"></i> Assistir</span>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </main>

    <!-- Modal de Vídeo -->
    <div class="video-modal" id="videoModal">
        <div class="video-modal-content">
            <button class="video-modal-close" onclick="fecharVideo()">
                <i class="fas fa-times"></i>
            </button>
            <iframe id="videoIframe" class="video-modal-iframe" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>

    <script>
        function abrirVideo(youtubeId, titulo) {
            const modal = document.getElementById('videoModal');
            const iframe = document.getElementById('videoIframe');

            iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
            modal.classList.add('active');

            // Previne scroll do body
            document.body.style.overflow = 'hidden';
        }

        function fecharVideo() {
            const modal = document.getElementById('videoModal');
            const iframe = document.getElementById('videoIframe');

            iframe.src = '';
            modal.classList.remove('active');

            // Restaura scroll do body
            document.body.style.overflow = 'auto';
        }

        // Fechar modal ao clicar fora do vídeo
        document.getElementById('videoModal').addEventListener('click', function(e) {
            if (e.target === this) {
                fecharVideo();
            }
        });

        // Fechar modal com ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                fecharVideo();
            }
        });
    </script>

    <?php render_footer($footer_links, $social_media, $site_config['year']); ?>

</body>

</html>
