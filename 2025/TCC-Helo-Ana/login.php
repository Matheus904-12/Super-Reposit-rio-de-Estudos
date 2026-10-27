<?php
// Configurações do site
$site_config = [
    'title' => 'Login - PositiveSense',
    'description' => 'Faça login no PositiveSense',
    'year' => date('Y')
];

// Dados da navegação
$nav_items = [
    ['url' => 'index.php', 'label' => 'Início'],
    ['url' => 'sobre.php', 'label' => 'Sobre'],
    ['url' => 'trabalho.php', 'label' => 'Nosso trabalho'],
    ['url' => 'login.php', 'label' => 'Conta']
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
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo htmlspecialchars($site_config['description']); ?>">
    <title><?php echo htmlspecialchars($site_config['title']); ?></title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <?php render_header($nav_items); ?>

    <!-- Nova Tela de Login Elegante -->
    <section class="auth-section">
        <div class="auth-container">
            <div class="auth-card">
                <div class="auth-header">
                    <h1>Bem-vindo de volta</h1>
                    <p>Entre com sua conta para continuar</p>
                </div>

                <div class="auth-social">
                    <button type="button" class="social-btn google-btn" onclick="loginComGoogle()">
                        <i class="fab fa-google"></i>
                        <span>Continuar com Google</span>
                    </button>
                    <button type="button" class="social-btn facebook-btn" onclick="loginComFacebook()">
                        <i class="fab fa-facebook-f"></i>
                        <span>Continuar com Facebook</span>
                    </button>
                </div>

                <div class="auth-divider">
                    <span>ou entre com e-mail</span>
                </div>

                <form class="auth-form" method="POST" action="processar_login.php">
                    <div class="input-group">
                        <i class="fas fa-envelope"></i>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Seu e-mail" 
                            required
                            autocomplete="email"
                        >
                    </div>

                    <div class="input-group">
                        <i class="fas fa-lock"></i>
                        <input 
                            type="password" 
                            name="senha" 
                            placeholder="Sua senha" 
                            required
                            autocomplete="current-password"
                            id="password"
                        >
                        <button type="button" class="toggle-password" onclick="togglePassword()">
                            <i class="fas fa-eye" id="toggleIcon"></i>
                        </button>
                    </div>

                    <div class="auth-options">
                        <label class="checkbox-label">
                            <input type="checkbox" name="lembrar">
                            <span>Lembrar-me</span>
                        </label>
                        <a href="recuperar-senha.php" class="forgot-link">Esqueceu a senha?</a>
                    </div>

                    <button type="submit" class="auth-submit">
                        <span>Entrar</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </form>

                <div class="auth-footer">
                    <p>Não tem uma conta? <a href="registro.php">Cadastre-se gratuitamente</a></p>
                </div>
            </div>

            <div class="auth-illustration">
                <div class="illustration-content">
                    <h2>Junte-se à nossa comunidade</h2>
                    <p>Acesse jogos educativos, recursos de apoio e uma plataforma completa para desenvolvimento de crianças com TEA.</p>
                    <div class="illustration-features">
                        <div class="feature-item">
                            <i class="fas fa-gamepad"></i>
                            <span>Jogos Interativos</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-brain"></i>
                            <span>Desenvolvimento Cognitivo</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-users"></i>
                            <span>Comunidade Inclusiva</span>
                        </div>
                    </div>
                </div>
                <div class="illustration-bg">
                    <img src="img/mascote.png" alt="Mascote PositiveSense" onerror="this.style.display='none'">
                </div>
            </div>
        </div>
    </section>

    <script>
        function loginComGoogle() {
            alert('Login com Google será implementado em breve!');
        }

        function loginComFacebook() {
            alert('Login com Facebook será implementado em breve!');
        }

        function togglePassword() {
            const password = document.getElementById('password');
            const toggleIcon = document.getElementById('toggleIcon');
            
            if (password.type === 'password') {
                password.type = 'text';
                toggleIcon.classList.remove('fa-eye');
                toggleIcon.classList.add('fa-eye-slash');
            } else {
                password.type = 'password';
                toggleIcon.classList.remove('fa-eye-slash');
                toggleIcon.classList.add('fa-eye');
            }
        }
    </script>

    <?php render_footer($footer_links, $social_media, $site_config['year']); ?>
</body>
</html>