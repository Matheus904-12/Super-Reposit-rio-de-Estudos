<?php
/**
 * ========================================
 * POSITIVESENSE - CONFIGURAÇÕES DO SITE
 * ========================================
 *
 * Arquivo de configuração centralizado
 * Contém todas as configurações globais do site
 *
 * @author PositiveSense Team
 * @version 1.0
 * @date 2025
 */

// Previne acesso direto
if (!defined('POSITIVESENSE')) {
    define('POSITIVESENSE', true);
}

/**
 * INFORMAÇÕES DO SITE
 */
define('SITE_NAME', 'PositiveSense');
define('SITE_TITLE', 'PositiveSense - Inovação a serviço da educação');
define('SITE_DESCRIPTION', 'Projeto voltado à inclusão escolar por meio de tecnologia assistiva');
define('SITE_YEAR', date('Y'));

/**
 * NAVEGAÇÃO PRINCIPAL
 */
$GLOBALS['nav_items'] = [
    ['url' => 'index.php', 'label' => 'Início'],
    ['url' => 'sobre.php', 'label' => 'Sobre'],
    ['url' => 'trabalho.php', 'label' => 'Nosso trabalho'],
    ['url' => 'login.php', 'label' => 'Conta']
];

/**
 * REDES SOCIAIS
 */
$GLOBALS['social_media'] = [
    [
        'icon' => 'fab fa-whatsapp',
        'url' => 'https://wa.me/5511999999999?text=Olá!%20Vim%20do%20site%20PositiveSense',
        'title' => 'WhatsApp'
    ],
    [
        'icon' => 'fas fa-envelope',
        'url' => '#',
        'title' => 'Email'
    ],
    [
        'icon' => 'fab fa-spotify',
        'url' => 'https://open.spotify.com/playlist/37i9dQZF1DWY5LGZYBBHHz?si=uvyTRAomSNS4BJfcW9ol8A',
        'title' => 'Spotify'
    ]
];

/**
 * LINKS DO FOOTER
 */
$GLOBALS['footer_links'] = [
    'Início' => [
        ['label' => 'Home', 'url' => 'index.php']
    ],
    'Sobre nós' => [
        ['label' => 'Nossos serviços', 'url' => 'sobre.php'],
        ['label' => 'Nosso trabalho', 'url' => 'trabalho.php']
    ],
    'Suporte' => [
        ['label' => 'Contato', 'url' => '#'],
        ['label' => 'FAQ', 'url' => '#']
    ]
];

/**
 * CAMINHOS DO PROJETO
 */
define('BASE_PATH', __DIR__ . '/..');
define('COMPONENTS_PATH', BASE_PATH . '/components');
define('CSS_PATH', '/css');
define('JS_PATH', '/js');
define('IMG_PATH', '/img');

/**
 * FUNÇÃO AUXILIAR: Obter configuração do site
 */
function get_site_config() {
    return [
        'title' => SITE_TITLE,
        'description' => SITE_DESCRIPTION,
        'name' => SITE_NAME,
        'year' => SITE_YEAR
    ];
}

/**
 * FUNÇÃO AUXILIAR: Obter navegação
 */
function get_nav_items() {
    return $GLOBALS['nav_items'];
}

/**
 * FUNÇÃO AUXILIAR: Obter redes sociais
 */
function get_social_media() {
    return [
        ['icon' => 'fab fa-whatsapp', 'url' => 'https://wa.me/5511999999999?text=Olá!%20Vim%20do%20site%20PositiveSense', 'title' => 'WhatsApp'],
        ['icon' => 'fas fa-envelope', 'url' => 'mailto:positivesense@gmail.com?subject=Contato%20do%20Site%20PositiveSense', 'title' => 'Email'],
        ['icon' => 'fab fa-spotify', 'url' => 'https://open.spotify.com/playlist/37i9dQZF1DWY5LGZYBBHHz?si=uvyTRAomSNS4BJfcW9ol8A', 'title' => 'Spotify']
    ];
}

/**
 * FUNÇÃO AUXILIAR: Obter links do footer
 */
function get_footer_links() {
    return $GLOBALS['footer_links'];
}
