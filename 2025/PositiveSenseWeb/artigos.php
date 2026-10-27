<?php
require_once __DIR__ . '/config/session.php';

// Configurações do site
$site_config = [
    'title' => 'Artigos Educativos - PositiveSense',
    'description' => 'Artigos e conteúdos educativos sobre autismo e TEA',
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

// Artigos educativos sobre autismo
$artigos = [
    [
        'titulo' => 'Entendendo o Transtorno do Espectro Autista',
        'resumo' => 'Uma visão completa sobre o que é o TEA, suas características e como ele se manifesta em diferentes pessoas.',
        'autor' => 'Scielo',
        'data' => '2025-10-15',
        'categoria' => 'Introdução',
        'tempo_leitura' => '5 min',
        'imagem' => 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
        'link' => 'https://www.scielo.br/j/ensaio/a/y9npmhcjddVQVVLyGhPsynC/?format=pdf&lang=pt'
    ],
    [
        'titulo' => 'Espectro Autista - Revisão Científica',
        'resumo' => 'Aprenda a identificar os primeiros sinais do TEA em bebês e crianças pequenas para buscar apoio adequado.',
        'autor' => 'UNAERP',
        'data' => '2025-10-10',
        'categoria' => 'Diagnóstico',
        'tempo_leitura' => '7 min',
        'imagem' => 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&h=300&fit=crop',
        'link' => 'https://www.unaerp.br/revista-cientifica-integrada/edicoes-anteriores/volume-4-edicao-4/3703-rci-espectro-autismo-07-2020/file'
    ],
    [
        'titulo' => 'Estratégias de Comunicação para Crianças com TEA',
        'resumo' => 'Técnicas eficazes de comunicação alternativa e aumentativa para ajudar crianças não-verbais ou com dificuldades de fala.',
        'autor' => 'Mackenzie',
        'data' => '2025-10-05',
        'categoria' => 'Comunicação',
        'tempo_leitura' => '8 min',
        'imagem' => 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&h=300&fit=crop',
        'link' => 'https://editorarevistas.mackenzie.br/index.php/cpgdd/article/view/15625'
    ],
    [
        'titulo' => 'Inclusão Escolar: Desafios e Soluções',
        'resumo' => 'Como promover uma verdadeira inclusão de alunos com autismo no ambiente escolar com práticas efetivas.',
        'autor' => 'Brazilian Journal',
        'data' => '2025-09-28',
        'categoria' => 'Educação',
        'tempo_leitura' => '10 min',
        'imagem' => 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop',
        'link' => 'https://bjihs.emnuvens.com.br/bjihs/article/view/1890'
    ],
    [
        'titulo' => 'Terapia ABA: O que é e como funciona',
        'resumo' => 'Conheça a Análise do Comportamento Aplicada, uma das terapias mais eficazes para pessoas com TEA.',
        'autor' => 'Scielo Preprints',
        'data' => '2025-09-20',
        'categoria' => 'Tratamento',
        'tempo_leitura' => '12 min',
        'imagem' => 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=300&fit=crop',
        'link' => 'https://preprints.scielo.org/index.php/scielo/preprint/view/5565'
    ],
    [
        'titulo' => 'Autismo e Sensibilidade Sensorial',
        'resumo' => 'Entenda como funciona a sobrecarga sensorial e aprenda estratégias para criar ambientes mais confortáveis.',
        'autor' => 'Pepsic',
        'data' => '2025-09-15',
        'categoria' => 'Sensorial',
        'tempo_leitura' => '6 min',
        'imagem' => 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop',
        'link' => 'https://pepsic.bvsalud.org/scielo.php?script=sci_arttext&pid=S2177-093X2019000100007'
    ],
    [
        'titulo' => 'Autismo na Vida Adulta: Desafios e Conquistas',
        'resumo' => 'Explore as particularidades do autismo em adultos e como apoiar sua independência e qualidade de vida.',
        'autor' => 'Semana Acadêmica',
        'data' => '2025-09-08',
        'categoria' => 'Adultos',
        'tempo_leitura' => '9 min',
        'imagem' => 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop',
        'link' => 'https://semanaacademica.org.br/system/files/artigos/artigo_66.pdf'
    ],
    [
        'titulo' => 'Desmistificando Mitos sobre o Autismo',
        'resumo' => 'Combata a desinformação conhecendo os principais mitos e verdades sobre o Transtorno do Espectro Autista.',
        'autor' => 'Scielo Brasil',
        'data' => '2025-09-01',
        'categoria' => 'Informação',
        'tempo_leitura' => '5 min',
        'imagem' => 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop',
        'link' => 'https://www.scielo.br/j/jbpsiq/a/DQNzt7JYrHxTkrV7kqkFXyS/?lang=pt'
    ],
    [
        'titulo' => 'Abril Azul - Conscientização do Autismo',
        'resumo' => 'Todos os mundos cabem no espectro: dignidade, defesa de direitos e bem-viver da pessoa com transtorno do espectro autista.',
        'autor' => 'FENAPESTALOZZI',
        'data' => '2025-08-25',
        'categoria' => 'Conscientização',
        'tempo_leitura' => '6 min',
        'imagem' => 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&h=300&fit=crop',
        'link' => 'https://fenapestalozzi.org.br/abril-azul-todos-os-mundos-cabem-no-espectro-dignidade-defesa-de-direitos-e-bem-viver-da-pessoa-com-transtorno-do-espectro-autista/'
    ],
    [
        'titulo' => 'Dia Mundial da Conscientização do Autismo',
        'resumo' => 'Conheça a importância do dia 2 de abril e o compromisso com a inclusão e apoio às pessoas com autismo.',
        'autor' => 'Casas André Luiz',
        'data' => '2025-08-18',
        'categoria' => 'Conscientização',
        'tempo_leitura' => '5 min',
        'imagem' => 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop',
        'link' => 'https://casasandreluiz.org.br/noticias/dia-mundial-da-conscientizacao-do-autismo-2-de-abril/'
    ],
    [
        'titulo' => 'Instituto C - Compromisso com Inclusão',
        'resumo' => 'O dia mundial de conscientização do autismo e o compromisso do Instituto C com a inclusão e o apoio.',
        'autor' => 'Instituto C',
        'data' => '2025-08-10',
        'categoria' => 'Inclusão',
        'tempo_leitura' => '7 min',
        'imagem' => 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop',
        'link' => 'https://institutoc.org.br/o-dia-mundial-de-conscientizacao-do-autismo-e-o-compromisso-do-instituto-c-com-a-inclusao-e-o-apoio/'
    ],
    [
        'titulo' => 'Cartilha sobre Autismo - Guia Completo',
        'resumo' => 'Material educativo completo da USP sobre o transtorno do espectro autista com informações fundamentais.',
        'autor' => 'USP',
        'data' => '2025-08-05',
        'categoria' => 'Educação',
        'tempo_leitura' => '15 min',
        'imagem' => 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop',
        'link' => 'https://www.iag.usp.br/~eder/autismo/Cartilha-Autismo-final.pdf'
    ],
    [
        'titulo' => 'Pesquisas sobre Autismo',
        'resumo' => 'Compilado de pesquisas científicas recentes sobre autismo e seus avanços no tratamento e compreensão.',
        'autor' => 'Autismo em Dia',
        'data' => '2025-07-28',
        'categoria' => 'Pesquisa',
        'tempo_leitura' => '10 min',
        'imagem' => 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop',
        'link' => 'https://blog.autismoemdia.com.br/blog/pesquisas-sobre-autismo/'
    ],
    [
        'titulo' => 'Desenvolvimento Cognitivo no TEA',
        'resumo' => 'Estudo sobre o desenvolvimento cognitivo e estratégias de intervenção em crianças com transtorno do espectro autista.',
        'autor' => 'Editor@ Realize',
        'data' => '2025-07-20',
        'categoria' => 'Desenvolvimento',
        'tempo_leitura' => '8 min',
        'imagem' => 'https://images.unsplash.com/photo-1560421683-6856ea585c78?w=400&h=300&fit=crop',
        'link' => 'https://editorarealize.com.br/artigo/visualizar/36779'
    ],
    [
        'titulo' => 'TEA e Educação Inclusiva',
        'resumo' => 'Práticas pedagógicas inclusivas para alunos com transtorno do espectro autista no ambiente escolar.',
        'autor' => 'Revista Doctum',
        'data' => '2025-07-15',
        'categoria' => 'Educação',
        'tempo_leitura' => '9 min',
        'imagem' => 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop',
        'link' => 'https://revista.doctum.edu.br/index.php/EDU/article/view/626'
    ],
    [
        'titulo' => 'Desenvolvimento da Criança com Autismo',
        'resumo' => 'Aspectos do desenvolvimento infantil em crianças diagnosticadas com transtorno do espectro autista.',
        'autor' => 'UNIFIA',
        'data' => '2025-07-08',
        'categoria' => 'Desenvolvimento',
        'tempo_leitura' => '11 min',
        'imagem' => 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=400&h=300&fit=crop',
        'link' => 'https://portal.unisepe.com.br/unifia/wp-content/uploads/sites/10001/2019/06/060_DESENVOLVIMENTO-DA-CRIAN%C3%87A-COM-AUTISMO_687_a_697.pdf'
    ],
    [
        'titulo' => 'Possíveis Causas do Autismo',
        'resumo' => 'Artigo do Dr. Drauzio Varella sobre as possíveis causas e fatores de risco do transtorno do espectro autista.',
        'autor' => 'Dr. Drauzio Varella',
        'data' => '2025-07-01',
        'categoria' => 'Ciência',
        'tempo_leitura' => '7 min',
        'imagem' => 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
        'link' => 'https://drauziovarella.uol.com.br/pediatria/possiveis-causas-do-autismo-artigo/'
    ],
    [
        'titulo' => 'Artigo Científico sobre Autismo',
        'resumo' => 'Estudo científico aprofundado sobre características, diagnóstico e intervenções no transtorno do espectro autista.',
        'autor' => 'Núcleo do Conhecimento',
        'data' => '2025-06-25',
        'categoria' => 'Pesquisa',
        'tempo_leitura' => '14 min',
        'imagem' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
        'link' => 'https://www.nucleodoconhecimento.com.br/wp-content/uploads/artigo-cientifico/pdf/autismo.pdf'
    ],
    [
        'titulo' => 'Estudos em Psicologia - TEA',
        'resumo' => 'Pesquisa em psicologia sobre aspectos comportamentais e cognitivos do transtorno do espectro autista.',
        'autor' => 'Scielo',
        'data' => '2025-06-18',
        'categoria' => 'Psicologia',
        'tempo_leitura' => '12 min',
        'imagem' => 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop',
        'link' => 'https://www.scielo.br/j/estpsi/a/TnpzjSG4ZGqkJMPMWCqNZRL/?format=html&lang=pt'
    ],
    [
        'titulo' => 'Intervenções Psicológicas no Autismo',
        'resumo' => 'Abordagens psicológicas e terapêuticas eficazes para pessoas com transtorno do espectro autista.',
        'autor' => 'Scielo',
        'data' => '2025-06-10',
        'categoria' => 'Tratamento',
        'tempo_leitura' => '10 min',
        'imagem' => 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=400&h=300&fit=crop',
        'link' => 'https://www.scielo.br/j/estpsi/a/WMg8wtWKDzbsGnvGRXG6GZt/?lang=pt'
    ],
    [
        'titulo' => 'Aspectos Psiquiátricos do TEA',
        'resumo' => 'Compreensão dos aspectos psiquiátricos associados ao transtorno do espectro autista e comorbidades.',
        'autor' => 'Revista Brasileira de Psiquiatria',
        'data' => '2025-06-05',
        'categoria' => 'Psiquiatria',
        'tempo_leitura' => '13 min',
        'imagem' => 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=300&fit=crop',
        'link' => 'https://www.scielo.br/j/rbp/a/pQT5d9NrjtgpDntk3qcgXhw/?format=html&lang=pt'
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
        .artigos-page {
            min-height: 100vh;
            background: #D8E8F5;
            padding: 6rem var(--container-padding) 4rem;
            position: relative;
            overflow: hidden;
        }

        .artigos-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
                radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.4) 0%, transparent 50%);
            pointer-events: none;
        }

        .artigos-header {
            max-width: 1200px;
            margin: 0 auto 3rem;
            text-align: center;
            position: relative;
            z-index: 1;
            padding-top: 3rem;
        }

        .artigos-header h1 {
            font-size: clamp(2rem, 5vw, 2.8rem);
            color: #5B8FC4;
            margin-bottom: 1.5rem;
            font-weight: 800;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            animation: fadeInDown 0.8s ease;
        }

        .artigos-header p {
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

        .artigos-container {
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
        }

        .artigos-grid {
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

        .artigo-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            position: relative;
        }

        .artigo-card::before {
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

        .artigo-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(74, 144, 226, 0.3);
        }

        .artigo-card:hover::before {
            opacity: 1;
        }

        .artigo-imagem {
            width: 100%;
            height: 220px;
            overflow: hidden;
            background: linear-gradient(135deg, #4A90E2, #5B8FC4);
            position: relative;
            position: relative;
        }

        .artigo-imagem::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.1) 100%);
        }

        .artigo-imagem img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }

        .artigo-card:hover .artigo-imagem img {
            transform: scale(1.15) rotate(2deg);
        }

        .artigo-content {
            padding: 1.5rem;
            flex: 1;
            display: flex;
            flex-direction: column;
            position: relative;
            z-index: 2;
        }

        .artigo-categoria {
            display: inline-block;
            padding: 0.3rem 0.8rem;
            background: linear-gradient(135deg, #4A90E2, #5B8FC4);
            color: white;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 700;
            margin-bottom: 0.8rem;
            width: fit-content;
            box-shadow: 0 2px 8px rgba(74, 144, 226, 0.2);
            letter-spacing: 0.3px;
        }

        .artigo-titulo {
            font-size: 1.05rem;
            color: #333;
            margin-bottom: 0.6rem;
            font-weight: 800;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            min-height: 2.8rem;
        }

        .artigo-resumo {
            color: #666;
            font-size: 0.9rem;
            line-height: 1.6;
            margin-bottom: 1.2rem;
            flex: 1;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            min-height: 4.32rem;
        }

        .artigo-meta {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 1rem;
            border-top: 1px solid #e0e0e0;
            font-size: 0.8rem;
            color: #888;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .artigo-autor {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .artigo-autor i {
            color: #5B8FC4;
        }

        .artigo-info {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .artigo-info span {
            display: flex;
            align-items: center;
            gap: 0.3rem;
        }

        .artigo-info i {
            color: #5B8FC4;
        }

        .artigo-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            padding: 0.8rem 1.5rem;
            background: linear-gradient(135deg, #4A90E2, #5B8FC4);
            color: white;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 700;
            margin-top: 1rem;
            transition: all 0.3s ease;
            box-shadow: 0 3px 12px rgba(74, 144, 226, 0.25);
            letter-spacing: 0.3px;
            font-size: 0.85rem;
        }

        .artigo-btn:hover {
            background: linear-gradient(135deg, #5B8FC4, #4A90E2);
            transform: translateX(3px);
            box-shadow: 0 5px 18px rgba(74, 144, 226, 0.4);
        }

        .artigo-btn i {
            transition: transform 0.3s ease;
            font-size: 0.8rem;
        }

        .artigo-btn:hover i {
            transform: translateX(3px);
        }

        @media (max-width: 768px) {
            .artigos-grid {
                grid-template-columns: 1fr;
            }

            .artigo-meta {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.4rem;
            }

            .artigo-imagem {
                height: 160px;
            }
        }
    </style>
</head>

<body>
    <?php render_header($nav_items); ?>

    <main class="artigos-page">
        <div class="artigos-header">
            <h1>Artigos Educativos sobre Autismo</h1>
            <p>Leia artigos informativos e educativos sobre o Transtorno do Espectro Autista, escritos por especialistas e profissionais da área.</p>
        </div>

        <div class="artigos-container">
            <div class="artigos-grid">
                <?php foreach ($artigos as $artigo): ?>
                    <article class="artigo-card">
                        <div class="artigo-imagem">
                            <img src="<?php echo htmlspecialchars($artigo['imagem']); ?>"
                                alt="<?php echo htmlspecialchars($artigo['titulo']); ?>">
                        </div>
                        <div class="artigo-content">
                            <span class="artigo-categoria">
                                <i class="fas fa-tag"></i> <?php echo $artigo['categoria']; ?>
                            </span>
                            <h2 class="artigo-titulo"><?php echo htmlspecialchars($artigo['titulo']); ?></h2>
                            <p class="artigo-resumo"><?php echo htmlspecialchars($artigo['resumo']); ?></p>

                            <div class="artigo-meta">
                                <div class="artigo-autor">
                                    <i class="fas fa-user-circle"></i>
                                    <span><?php echo htmlspecialchars($artigo['autor']); ?></span>
                                </div>
                                <div class="artigo-info">
                                    <span>
                                        <i class="fas fa-calendar"></i>
                                        <?php echo date('d/m/Y', strtotime($artigo['data'])); ?>
                                    </span>
                                    <span>
                                        <i class="fas fa-clock"></i>
                                        <?php echo $artigo['tempo_leitura']; ?>
                                    </span>
                                </div>
                            </div>

                            <a href="<?php echo htmlspecialchars($artigo['link']); ?>" class="artigo-btn" target="_blank" rel="noopener noreferrer">
                                Ler artigo completo <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </article>
                <?php endforeach; ?>
            </div>
        </div>
    </main>

    <?php render_footer($footer_links, $social_media, $site_config['year']); ?>

</body>

</html>
