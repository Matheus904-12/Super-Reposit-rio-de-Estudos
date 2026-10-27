<?php
/**
 * ========================================
 * POSITIVESENSE - FUNÇÕES COMUNS
 * ========================================
 *
 * Arquivo de funções compartilhadas
 * Carrega componentes header e footer
 *
 * @author PositiveSense Team
 * @version 1.0
 * @date 2025
 */

// Previne redeclaração
if (!defined('POSITIVESENSE')) {
    define('POSITIVESENSE', true);
}

// Gerencia sessão de usuário
require_once __DIR__ . '/config/session.php';

// Carrega dados do site
require_once __DIR__ . '/config/site-data.php';

// Carrega componentes
require_once __DIR__ . '/components/header.php';
require_once __DIR__ . '/components/footer.php';

/**
 * Renderiza o header do site
 * @param array $nav_items Itens de navegação
 */
if (!function_exists('render_header')) {
    function render_header($nav_items) {
        component_header($nav_items);
    }
}

/**
 * Renderiza o footer do site
 * @param array $footer_links Links do footer
 * @param array $social_media Redes sociais
 * @param string $year Ano do copyright
 */
if (!function_exists('render_footer')) {
    function render_footer($footer_links, $social_media, $year) {
        component_footer($footer_links, $social_media, $year);
        echo '<link rel="stylesheet" href="css/chatbot.css">';
        echo '<script src="js/chatbot.js"></script>';
        echo '<script src="js/main.js"></script>';
    }
}

