<?php

/**
 * ========================================
 * PÁGINA DE REGISTRO
 * PositiveSense - Cadastro de Novos Usuários
 * ========================================
 */

// Configurações do site
$site_config = [
    'title' => 'Cadastro - PositiveSense',
    'description' => 'Crie sua conta no PositiveSense',
    'year' => date('Y')
];

// Dados da navegação
$nav_items = [
    ['url' => 'inicial.php', 'label' => 'Início'],
    ['url' => 'sobre.php', 'label' => 'Sobre'],
    ['url' => 'trabalho.php', 'label' => 'Nosso Trabalho'],
    ['url' => 'videos.php', 'label' => 'Vídeos'],
    ['url' => 'login.php', 'label' => 'Conta']
];

// Dados do footer
$footer_links = [
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

            .form-row {
                grid-template-columns: 1fr !important;
            }
        }
    </style>
</head>

<body>
    <?php render_header($nav_items); ?>

    <section class="auth-section">
        <div class="auth-container">
            <div class="auth-card">
                <div class="auth-header">
                    <h1>Criar nova conta</h1>
                    <p>Preencha os dados para se cadastrar</p>
                </div>

                <div id="mensagem-feedback" style="display: none;" class="alert"></div>

                <form class="auth-form" id="formRegistro">
                    <div class="input-group">
                        <i class="fas fa-user"></i>
                        <input type="text" name="nome" placeholder="Nome completo" required autocomplete="name">
                    </div>

                    <div class="input-group">
                        <i class="fas fa-envelope"></i>
                        <input type="email" name="email" placeholder="Seu e-mail" required autocomplete="email">
                    </div>

                    <div class="input-group">
                        <i class="fas fa-lock"></i>
                        <input type="password" name="senha" id="senha" placeholder="Senha (mínimo 6 caracteres)" required minlength="6" autocomplete="new-password">
                        <button type="button" class="toggle-password" onclick="togglePassword('senha')">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>

                    <div class="input-group">
                        <i class="fas fa-lock"></i>
                        <input type="password" name="confirmar_senha" id="confirmar_senha" placeholder="Confirme a senha" required autocomplete="new-password">
                        <button type="button" class="toggle-password" onclick="togglePassword('confirmar_senha')">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>

                    <div class="input-group">
                        <i class="fas fa-user-tag"></i>
                        <select name="tipo_usuario" required style="width: 100%; padding: 0.75rem 1rem 0.75rem 3rem; border: 2px solid var(--bg-secondary); border-radius: 10px; font-size: 0.9rem;">
                            <option value="">Selecione seu perfil</option>
                            <option value="aluno">Aluno</option>
                            <option value="professor">Professor</option>
                            <option value="responsavel">Responsável</option>
                        </select>
                    </div>

                    <div class="auth-options" style="margin-top: 0.5rem;">
                        <label class="checkbox-label">
                            <input type="checkbox" name="aceitar_termos" required>
                            <span style="font-size: 0.85rem;">Aceito os <a href="#" style="color: var(--primary);">termos de uso</a></span>
                        </label>
                    </div>

                    <button type="submit" class="auth-submit">
                        <span>Criar conta</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </form>

                <div class="auth-footer">
                    <p>Já tem uma conta? <a href="login.php">Faça login</a></p>
                </div>
            </div>

            <div class="auth-illustration">
                <div class="illustration-content">
                    <h2>Bem-vindo ao PositiveSense</h2>
                    <p>Cadastre-se e tenha acesso a uma plataforma completa de jogos educativos e recursos para desenvolvimento.</p>
                    <div class="illustration-features">
                        <div class="feature-item">
                            <i class="fas fa-check-circle"></i>
                            <span>100% Gratuito</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-shield-alt"></i>
                            <span>Dados Protegidos</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-star"></i>
                            <span>Conteúdo Exclusivo</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script>
        function togglePassword(inputId) {
            const input = document.getElementById(inputId);
            const icon = input.nextElementSibling.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }

        document.getElementById('formRegistro').addEventListener('submit', async function(e) {
            e.preventDefault();

            console.log('=== INICIANDO CADASTRO ===');

            const formData = new FormData(this);
            const senha = formData.get('senha');
            const confirmarSenha = formData.get('confirmar_senha');

            // Log dos dados do formulário
            console.log('Dados do formulário:');
            for (let [key, value] of formData.entries()) {
                if (key !== 'senha' && key !== 'confirmar_senha') {
                    console.log(`${key}: ${value}`);
                }
            }

            if (senha !== confirmarSenha) {
                mostrarMensagem('As senhas não coincidem!', 'error');
                return;
            }

            const submitBtn = this.querySelector('.auth-submit');
            const btnText = submitBtn.querySelector('span');
            const originalText = btnText.textContent;

            submitBtn.disabled = true;
            btnText.textContent = 'Cadastrando...';

            try {
                console.log('Enviando requisição para processar_registro.php...');

                const response = await fetch('processar_registro.php', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include' // IMPORTANTE: Inclui cookies na requisição
                });

                console.log('Status da resposta:', response.status);
                console.log('Headers:', response.headers);

                // Tenta ler como texto primeiro para ver se há algum erro
                const responseText = await response.text();
                console.log('Resposta (texto):', responseText);

                // Tenta fazer parse do JSON
                let data;
                try {
                    data = JSON.parse(responseText);
                    console.log('Resposta (JSON):', data);
                } catch (parseError) {
                    console.error('Erro ao fazer parse do JSON:', parseError);
                    throw new Error('Resposta inválida do servidor. Verifique o console para detalhes.');
                }

                if (data.success) {
                    mostrarMensagem(data.message, 'success');
                    console.log('Redirecionando para:', data.redirect);
                    setTimeout(() => {
                        window.location.href = data.redirect || 'perfil.php';
                    }, 1500);
                } else {
                    let mensagem = data.message || 'Erro ao processar cadastro';
                    // Mostra detalhes do erro se disponível (apenas em desenvolvimento)
                    if (data.error_details) {
                        console.error('Erro detalhado:', data.error_details);
                        mensagem += '<br><small style="font-size: 0.75rem; opacity: 0.8;">' + data.error_details + '</small>';
                    }
                    mostrarMensagem(mensagem, 'error');
                    submitBtn.disabled = false;
                    btnText.textContent = originalText;
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                mostrarMensagem('Erro ao conectar com o servidor: ' + error.message + '<br><small>Verifique se o MySQL está rodando no XAMPP e veja o console (F12) para mais detalhes.</small>', 'error');
                submitBtn.disabled = false;
                btnText.textContent = originalText;
            }
        });

        function mostrarMensagem(mensagem, tipo) {
            const elemento = document.getElementById('mensagem-feedback');
            elemento.innerHTML = mensagem; // Suporta HTML
            elemento.className = 'alert alert-' + tipo;
            elemento.style.display = 'block';

            // Scroll para o topo para ver a mensagem
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // Auto-fechar após 8 segundos (exceto erros)
            if (tipo === 'success') {
                setTimeout(() => {
                    elemento.style.display = 'none';
                }, 8000);
            }
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

    <script>
        // Botão de Libras no Formulário
        document.getElementById('btn-libras-registro')?.addEventListener('click', function() {
            if (window.librasManager) {
                window.librasManager.ativar();
                window.librasManager.mostrarDicionario();
            } else {
                alert('Libras não carregado. Recarregue a página.');
            }
        });
    </script>

    <?php render_footer($footer_links, $social_media, $site_config['year']); ?>

    <!-- Loading Screen -->
    <script src="js/loading.js?v=<?php echo time(); ?>"></script>
</body>

</html>
