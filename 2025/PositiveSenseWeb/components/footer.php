<?php

/**
 * ========================================
 * POSITIVESENSE - COMPONENTE FOOTER
 * ========================================
 *
 * Rodapé do site com links e redes sociais
 * Inclui logo, menus e copyright
 *
 * @author PositiveSense Team
 * @version 1.0
 * @date 2025
 */

if (!function_exists('component_footer')) {
    /**
     * Renderiza o footer do site
     * @param array $footer_links Links organizados por seção
     * @param array $social_media Redes sociais com ícones
     * @param string $year Ano do copyright
     */
    function component_footer($footer_links, $social_media, $year)
    {
        // Mapeamento de ícones Font Awesome
        $icon_map = [
            'WhatsApp' => 'fab fa-whatsapp',
            'Email' => 'fas fa-envelope',
            'Spotify' => 'fab fa-spotify',
            'Facebook' => 'fab fa-facebook-f',
            'Instagram' => 'fab fa-instagram',
            'Twitter' => 'fab fa-twitter',
            'LinkedIn' => 'fab fa-linkedin-in'
        ];
?>
        <footer role="contentinfo">
            <div class="container footer-container">
                <div class="footer-column">
                    <img src="img/logo.png" alt="PositiveSense" style="height: 100px; margin-bottom: 1rem;">
                </div>
                <?php foreach ($footer_links as $section => $links): ?>
                    <div class="footer-column">
                        <h4><?php echo htmlspecialchars($section); ?></h4>
                        <ul>
                            <?php foreach ($links as $link): ?>
                                <li>
                                    <a href="<?php echo htmlspecialchars($link['url']); ?>"><?php echo htmlspecialchars($link['label']); ?></a>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                        <?php if ($section === 'Suporte'): ?>
                            <div class="social-icons">
                                <?php foreach ($social_media as $social): ?>
                                    <?php
                                    // Usa o ícone do array ou fallback para o mapa
                                    $icon_class = $social['icon'];
                                    // Define target blank para links externos
                                    $target = (strpos($social['url'], 'http') === 0 && strpos($social['url'], 'mailto:') === false) ? ' target="_blank" rel="noopener noreferrer"' : '';
                                    ?>
                                    <a href="<?php echo htmlspecialchars($social['url']); ?>"
                                        title="<?php echo htmlspecialchars($social['title']); ?>"
                                        class="social-icon-link" <?php echo $target; ?>>
                                        <i class="<?php echo htmlspecialchars($icon_class); ?>"></i>
                                    </a>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
            <div class="copyright" style="text-align:center;padding-top:1rem;">
                Copyright <?php echo $year; ?> Todos os direitos reservados.
            </div>
        </footer>

        <!-- Painel de Acessibilidade -->
        <?php include_once __DIR__ . '/accessibility-panel.php'; ?>

        <!-- Scripts de Acessibilidade -->
        <script src="js/accessibility.js?v=<?php echo time(); ?>"></script>

        <!-- Scripts de Libras -->
        <script src="js/libras.js"></script>
<?php
    }
}
