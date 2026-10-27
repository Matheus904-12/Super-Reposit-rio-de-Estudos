<?php
if (!function_exists('component_header')) {
    function component_header($nav_items) {
        ?>
        <header>
            <div class="container">
                <nav aria-label="Principal">
                    <div class="logo">
                        <a href="index.php"><img src="img/download 2.png" alt="PositiveSense"></a>
                    </div>

                    <button id="menuToggle" aria-label="Abrir menu" class="btn btn-outline" aria-expanded="false">
                        ☰
                    </button>

                    <ul class="nav-links" role="menubar">
                        <?php foreach ($nav_items as $item): ?>
                            <li role="none"><a role="menuitem" href="<?php echo htmlspecialchars($item['url']); ?>"><?php echo htmlspecialchars($item['label']); ?></a></li>
                        <?php endforeach; ?>
                    </ul>
                </nav>
            </div>
        </header>
        <?php
    }
}
