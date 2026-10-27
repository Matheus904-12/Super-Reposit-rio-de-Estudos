<?php
// Configurações do site
$site_config = [
    'title' => 'Sobre - PositiveSense',
    'description' => 'Conheça os desafios e possibilidades do TEA',
    'year' => date('Y')
];

// Dados da navegação
$nav_items = [
    ['url' => 'index.php', 'label' => 'Início'],
    ['url' => 'sobre.php', 'label' => 'Sobre'],
    ['url' => 'trabalho.php', 'label' => 'Nosso trabalho'],
    ['url' => 'login.php', 'label' => 'Conta']
];

// Dados dos desafios
$desafios = [
    [
        'title' => 'Diagnóstico Precoce',
        'description' => 'O diagnóstico precoce do Transtorno do Espectro Autista (TEA) é fundamental para garantir o desenvolvimento e a qualidade de vida da criança. Quanto antes o autismo for identificado, maiores são as chances de iniciar intervenções adequadas, favorecendo a aquisição de habilidades sociais, cognitivas e de comunicação.',
        'image' => 'img/diagnostico.png',
        'image_position' => 'left'
    ],
    [
        'title' => 'Educação Inclusiva',
        'description' => 'A educação inclusiva no autismo é um direito fundamental que garante às pessoas dentro do espectro o acesso a ambientes escolares adaptados, que respeitem suas particularidades e necessidades. Ela não significa apenas que a criança seja da mesma sala de aula, mas sim oferecer condições para que o estudante participe ativamente do processo educacional.',
        'image' => 'img/educacao.png',
        'image_position' => 'right'
    ],
    [
        'title' => 'Preconceito e Estigma',
        'description' => 'A educação inclusiva no autismo é um elemento fundamental que garante às pessoas dentro do espectro o acesso à aprendizagem em ambientes escolares regulares, com respeito às suas particularidades e necessidades. Ela não significa apenas que a mesma sala de aula, mas sim oferecer condições para que o estudante participe ativamente do processo educacional.',
        'image' => 'img/preconceito.png',
        'image_position' => 'left'
    ],
    [
        'title' => 'Mercado de trabalho',
        'description' => 'A inclusão de pessoas com Transtorno do Espectro Autista (TEA) no mercado de trabalho é um desafio, mas também uma grande oportunidade para empresas e para a sociedade. Muitas vezes, o preconceito ou a falta de informações fazem com que pessoas autistas sejam subestimadas ou até excluídas de processos seletivos.',
        'image' => 'img/mercado.png',
        'image_position' => 'right'
    ],
    [
        'title' => 'Apoio familiar',
        'description' => 'O apoio familiar é essencial para o desenvolvimento e o bem-estar da pessoa com Transtorno do Espectro Autista (TEA). A família é o primeiro núcleo de acolhimento e desempenha um papel fundamental na socialização e na construção da autoestima e autonomia do indivíduo.',
        'image' => 'img/apoio.png',
        'image_position' => 'left'
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

// Função para renderizar os desafios (específica desta página)
if (!function_exists('render_desafios')) {
    function render_desafios($desafios) {
        foreach ($desafios as $desafio) {
            $flex_direction = $desafio['image_position'] === 'left' ? 'row' : 'row-reverse';
            ?>
            <div class="desafio-item" style="flex-direction: <?php echo $flex_direction; ?>;">
                <div class="desafio-image">
                    <img src="<?php echo htmlspecialchars($desafio['image']); ?>" 
                         alt="<?php echo htmlspecialchars($desafio['title']); ?>">
                </div>
                <div class="desafio-content">
                    <h3><?php echo htmlspecialchars($desafio['title']); ?></h3>
                    <p><?php echo htmlspecialchars($desafio['description']); ?></p>
                </div>
            </div>
            <?php
        }
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

    <!-- Hero Section -->
    <section class="hero-sobre">
        <div class="hero-sobre-container">
            <div class="hero-sobre-content">
                <h1>Autismo: Compreensão e inclusão</h1>
                <p>Conheça os desafios e a possibilidades de um futuro mais acessível</p>
            </div>
            <div class="hero-sobre-image">
                <img src="img/mascote.png" alt="Mascote PositiveSense">
            </div>
        </div>
    </section>

    <!-- Info Section -->
    <section class="info-section">
        <p>O Transtorno do Espectro Autista (TEA) é uma condição neurológica que afeta comunicação, interação social e comportamento, manifestando-se em diferentes graus de intensidade. Pode envolver dificuldades de linguagem, compreensão social, comportamentos repetitivos e interesses restritos, mas cada pessoa com TEA é única e pode apresentar habilidades especiais que devem ser valorizadas.</p>
    </section>

    <!-- Desafios Section -->
    <section class="desafios-section">
        <div class="desafios-header">
            <h2>Principais Desafios</h2>
        </div>
        <div class="desafios-container">
            <?php render_desafios($desafios); ?>
        </div>
    </section>

    <?php render_footer($footer_links, $social_media, $site_config['year']); ?>
</body>
</html>