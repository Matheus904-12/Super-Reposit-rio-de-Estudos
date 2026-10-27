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
    ['url' => 'trabalho.php', 'label' => 'Nosso Trabalho'],
    ['url' => 'videos.php', 'label' => 'Vídeos'],
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
    ['icon' => 'fab fa-whatsapp', 'url' => 'https://wa.me/5511999999999?text=Olá!%20Vim%20do%20site%20PositiveSense', 'title' => 'WhatsApp'],
    ['icon' => 'fas fa-envelope', 'url' => 'mailto:positivesense@gmail.com?subject=Contato%20do%20Site%20PositiveSense', 'title' => 'Email'],
    ['icon' => 'fab fa-spotify', 'url' => 'https://open.spotify.com/playlist/37i9dQZF1DWY5LGZYBBHHz?si=uvyTRAomSNS4BJfcW9ol8A', 'title' => 'Spotify']
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
    <link rel="stylesheet" href="css/loading.css?v=<?php echo time(); ?>">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        @media (max-width: 768px) {
            .auth-section {
                padding: 2rem 1rem !important;
            }

            .auth-card {
                padding: 2rem 1.5rem !important;
            }

            .auth-header h1 {
                font-size: 1.5rem !important;
            }

            .social-login {
                flex-direction: column !important;
                gap: 0.8rem !important;
            }

            .social-btn {
                width: 100% !important;
            }
        }
    </style>
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

                <div id="mensagem-feedback" style="display: none;" class="alert"></div>

                <form class="auth-form" id="formLogin">
                    <div class="input-group">
                        <i class="fas fa-envelope"></i>
                        <input
                            type="email"
                            name="email"
                            placeholder="Seu e-mail"
                            required
                            autocomplete="email">
                    </div>

                    <div class="input-group">
                        <i class="fas fa-lock"></i>
                        <input
                            type="password"
                            name="senha"
                            placeholder="Sua senha"
                            required
                            autocomplete="current-password"
                            id="password">
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

        // Processa login com AJAX
        document.getElementById('formLogin').addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const submitBtn = this.querySelector('.auth-submit');
            const btnText = submitBtn.querySelector('span');
            const originalText = btnText.textContent;

            // Desabilita botão e mostra loading
            submitBtn.disabled = true;
            btnText.textContent = 'Entrando...';

            try {
                const response = await fetch('processar_login.php', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include' // IMPORTANTE: Inclui cookies na requisição
                });

                const data = await response.json();

                if (data.success) {
                    mostrarMensagem(data.message, 'success');
                    setTimeout(() => {
                        window.location.href = data.redirect || 'inicial.php';
                    }, 1500);
                } else {
                    mostrarMensagem(data.message, 'error');
                    submitBtn.disabled = false;
                    btnText.textContent = originalText;
                }
            } catch (error) {
                mostrarMensagem('Erro ao processar login. Tente novamente.', 'error');
                submitBtn.disabled = false;
                btnText.textContent = originalText;
            }
        });

        function mostrarMensagem(mensagem, tipo) {
            const elemento = document.getElementById('mensagem-feedback');
            elemento.textContent = mensagem;
            elemento.className = 'alert alert-' + tipo;
            elemento.style.display = 'block';

            setTimeout(() => {
                elemento.style.display = 'none';
            }, 5000);
        }
    </script>

    <style>
        .alert {
            padding: 0.75rem 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            font-size: 0.9rem;
            text-align: center;
        }

        .alert-success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .alert-error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
    </style>

    <?php render_footer($footer_links, $social_media, $site_config['year']); ?>

    <!-- Loading Screen -->
    <script src="js/loading.js?v=<?php echo time(); ?>"></script>
</body>

</html>
