<?php
/**
 * ========================================
 * POSITIVESENSE - DADOS DO SITE
 * ========================================
 *
 * Configurações centralizadas para navegação,
 * footer e redes sociais
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
 * Retorna os itens de navegação padrão
 * @return array
 */
function get_nav_items() {
    return [
        ['url' => 'inicial.php', 'label' => 'Início'],
        ['url' => 'sobre.php', 'label' => 'Sobre'],
        ['url' => 'trabalho.php', 'label' => 'Nosso trabalho'],
        ['url' => 'videos.php', 'label' => 'Vídeos'],
        ['url' => 'login.php', 'label' => 'Conta']
    ];
}

/**
 * Retorna as seções do footer
 * @return array
 */
function get_footer_sections() {
    return [
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
}

/**
 * Retorna as redes sociais
 * @return array
 */
function get_social_media() {
    return [
        ['icon' => 'fab fa-whatsapp', 'url' => 'https://wa.me/5511999999999?text=Olá!%20Vim%20do%20site%20PositiveSense', 'title' => 'WhatsApp'],
        ['icon' => 'fas fa-envelope', 'url' => 'mailto:positivesense@gmail.com?subject=Contato%20do%20Site%20PositiveSense', 'title' => 'Email'],
        ['icon' => 'fab fa-spotify', 'url' => 'https://open.spotify.com/playlist/37i9dQZF1DWY5LGZYBBHHz?si=uvyTRAomSNS4BJfcW9ol8A', 'title' => 'Spotify']
    ];
}

/**
 * Retorna configurações do site
 * @param string $page_title Título da página
 * @param string $page_description Descrição da página
 * @return array
 */
function get_site_config($page_title = 'PositiveSense', $page_description = 'Inovação a serviço da educação') {
    return [
        'title' => $page_title,
        'description' => $page_description,
        'year' => date('Y')
    ];
}

