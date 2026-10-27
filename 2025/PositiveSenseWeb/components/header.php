<?php

/**
 * ========================================
 * POSITIVESENSE - COMPONENTE HEADER
 * ========================================
 *
 * Cabeçalho do site com navegação responsiva
 * Inclui logo, menu e botão mobile
 *
 * @author PositiveSense Team
 * @version 1.0
 * @date 2025
 */

if (!function_exists('component_header')) {
    /**
     * Renderiza o header do site
     * @param array $nav_items Array com itens de navegação [url, label]
     */
    function component_header($nav_items)
    {
        // Verifica se usuário está logado
        $usuario_logado = isset($_SESSION['usuario_id']);
        $usuario_nome = $_SESSION['usuario_nome'] ?? '';
        $usuario_foto = $_SESSION['usuario_foto'] ?? 'img/avatars/avatar-vazio.svg';

        // Se a foto estiver vazia, usa avatar padrão
        if (empty($usuario_foto) || $usuario_foto === 'img/default-avatar.png') {
            $usuario_foto = 'img/avatars/avatar-vazio.svg';
        }

        $primeiro_nome = $usuario_logado ? explode(' ', $usuario_nome)[0] : '';
?>

        <!-- Carrega CSS de Acessibilidade -->
        <link rel="stylesheet" href="css/accessibility.css">

        <header>
            <div class="container">
                <nav aria-label="Principal" style="display: flex; align-items: center; gap: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div class="logo">
                            <a href="inicial.php"><img src="img/logo.png" alt="PositiveSense"></a>
                        </div>
                    </div>

                    <button id="menuToggle" aria-label="Abrir menu" class="btn btn-outline" aria-expanded="false">
                        ☰
                    </button>

                    <ul class="nav-links" role="menubar" style="margin-right: 60px;">
                        <?php foreach ($nav_items as $item): ?>
                            <li role="none"><a role="menuitem" href="<?php echo htmlspecialchars($item['url']); ?>"><?php echo htmlspecialchars($item['label']); ?></a></li>
                        <?php endforeach; ?>

                        <?php if ($usuario_logado): ?>
                            <li role="none" class="user-menu-item">
                                <div class="user-menu">
                                    <button class="user-menu-btn" onclick="toggleUserMenu()" aria-label="Menu do usuário">
                                        <img src="<?php echo htmlspecialchars($usuario_foto); ?>" alt="Foto de perfil" class="user-avatar">
                                        <i class="fas fa-chevron-down"></i>
                                    </button>
                                    <div class="user-dropdown" id="userDropdown">
                                        <a href="perfil.php"><i class="fas fa-user"></i> Meu Perfil</a>
                                        <a href="jogo.php"><i class="fas fa-gamepad"></i> Jogos</a>
                                        <a href="logout.php"><i class="fas fa-sign-out-alt"></i> Sair</a>
                                    </div>
                                </div>
                            </li>
                        <?php else: ?>
                            <li role="none">
                                <a href="login.php" class="btn-login">
                                    <i class="fas fa-user-circle"></i> Entrar
                                </a>
                            </li>
                        <?php endif; ?>
                    </ul>
                </nav>
            </div>
        </header>
<?php
    }
}
