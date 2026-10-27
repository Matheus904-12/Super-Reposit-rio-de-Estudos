<?php
// Funções comuns do site (header e footer)
// Use guardas para evitar redeclaração caso o arquivo seja incluído várias vezes
require_once __DIR__ . '/components/header.php';

// Backwards-compatible wrapper
if (!function_exists('render_header')) {
    function render_header($nav_items) {
        component_header($nav_items);
    }
}

require_once __DIR__ . '/components/footer.php';

// Backwards-compatible wrapper
if (!function_exists('render_footer')) {
    function render_footer($footer_links, $social_media, $year) {
        component_footer($footer_links, $social_media, $year);
        echo '<script src="js/main.js"></script>';
    }
}

?>
