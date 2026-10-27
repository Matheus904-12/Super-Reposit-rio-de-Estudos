<?php
if (!function_exists('component_footer')) {
    function component_footer($footer_links, $social_media, $year) {
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
                    <img src="img/download 2.png" alt="PositiveSense" style="height: 100px; margin-bottom: 1rem;">
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
                                    $icon_class = isset($icon_map[$social['title']]) 
                                        ? $icon_map[$social['title']] 
                                        : 'fas fa-link';
                                    ?>
                                    <a href="<?php echo htmlspecialchars($social['url']); ?>" 
                                       title="<?php echo htmlspecialchars($social['title']); ?>"
                                       class="social-icon-link">
                                        <i class="<?php echo $icon_class; ?>"></i>
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
        <?php
    }
}
