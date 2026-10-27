<?php

/**
 * ========================================
 * PERFIL DO USUÁRIO - POSITIVESENSE
 * ========================================
 */

// Carrega sistema de sessão (inclui session_start e restauração via cookie)
require_once __DIR__ . '/config/session.php';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/partials.php';

// Verifica se usuário está logado
if (!estaLogado()) {
    header('Location: login.php');
    exit;
}

// Itens de navegação (padronizados)
$nav_items = [
    ['url' => 'inicial.php', 'label' => 'Início'],
    ['url' => 'sobre.php', 'label' => 'Sobre'],
    ['url' => 'trabalho.php', 'label' => 'Nosso Trabalho'],
    ['url' => 'videos.php', 'label' => 'Vídeos'],
    ['url' => 'login.php', 'label' => 'Conta']
];

// Verifica se é novo cadastro
$novo_cadastro = isset($_GET['novo']) && $_GET['novo'] == '1';

// Busca dados completos do usuário
try {
    $pdo = getDB();
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE id = ?");
    $stmt->execute([$_SESSION['usuario_id']]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$usuario) {
        header('Location: logout.php');
        exit;
    }
} catch (PDOException $e) {
    die("Erro ao carregar perfil: " . $e->getMessage());
}
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Perfil - PositiveSense</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/loading.css?v=<?php echo time(); ?>">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .profile-section {
            min-height: 100vh;
            background: linear-gradient(135deg, var(--bg-hero) 0%, var(--bg-accent) 100%);
            padding: 100px 1rem 2rem;
        }

        .profile-container {
            max-width: 900px;
            margin: 0 auto;
        }

        /* Banner de Boas-Vindas */
        .welcome-banner {
            background: linear-gradient(135deg, #4CAF50, #66BB6A);
            color: white;
            border-radius: 15px;
            padding: 2rem;
            margin-bottom: 2rem;
            display: flex;
            align-items: center;
            gap: 1.5rem;
            box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
            animation: slideDown 0.5s ease-out;
            position: relative;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .welcome-icon {
            width: 60px;
            height: 60px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .welcome-icon i {
            font-size: 2rem;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {

            0%,
            100% {
                transform: scale(1);
            }

            50% {
                transform: scale(1.1);
            }
        }

        .welcome-text h2 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }

        .welcome-text p {
            font-size: 1rem;
            opacity: 0.95;
            line-height: 1.6;
        }

        .close-banner {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }

        .close-banner:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: rotate(90deg);
        }

        .profile-header {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
            display: flex;
            align-items: center;
            gap: 2rem;
            flex-wrap: wrap;
        }

        .profile-avatar-container {
            position: relative;
            flex-shrink: 0;
        }

        .profile-avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid var(--primary);
        }

        .avatar-upload-btn {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 40px;
            height: 40px;
            background: var(--primary);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 3px solid white;
        }

        .avatar-upload-btn:hover {
            background: var(--primary-dark);
            transform: scale(1.1);
        }

        .avatar-upload-btn i {
            color: white;
            font-size: 1rem;
        }

        .profile-info {
            flex: 1;
        }

        .profile-info h1 {
            font-size: 2rem;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
        }

        .profile-info .user-type {
            display: inline-block;
            padding: 0.25rem 1rem;
            background: var(--bg-accent);
            color: var(--primary);
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }

        .profile-stats {
            display: flex;
            gap: 2rem;
            margin-top: 1rem;
        }

        .stat-item {
            text-align: center;
        }

        .stat-item .number {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary);
        }

        .stat-item .label {
            font-size: 0.85rem;
            color: var(--text-secondary);
        }

        .profile-content {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        }

        .tabs {
            display: flex;
            gap: 1rem;
            border-bottom: 2px solid var(--bg-secondary);
            margin-bottom: 2rem;
        }

        .tab {
            padding: 1rem 1.5rem;
            background: none;
            border: none;
            font-size: 1rem;
            font-weight: 600;
            color: var(--text-secondary);
            cursor: pointer;
            position: relative;
            transition: all 0.3s ease;
        }

        .tab.active {
            color: var(--primary);
        }

        .tab.active::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--primary);
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-group label {
            display: block;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
        }

        .form-group input,
        .form-group select {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid var(--bg-secondary);
            border-radius: 10px;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus {
            border-color: var(--primary);
            outline: none;
            box-shadow: 0 0 0 3px rgba(91, 143, 196, 0.1);
        }

        .form-group input:disabled {
            background: var(--bg-secondary);
            cursor: not-allowed;
        }

        .form-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
        }

        .info-card {
            background: var(--bg-secondary);
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 1rem;
        }

        .info-card h3 {
            font-size: 1.1rem;
            color: var(--text-primary);
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .info-card h3 i {
            color: var(--primary);
        }

        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 0.75rem 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .info-row:last-child {
            border-bottom: none;
        }

        .info-label {
            font-weight: 600;
            color: var(--text-secondary);
        }

        .info-value {
            color: var(--text-primary);
        }

        .btn {
            padding: 0.75rem 2rem;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }

        .btn-primary {
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(91, 143, 196, 0.4);
        }

        .btn-secondary {
            background: white;
            color: var(--primary);
            border: 2px solid var(--primary);
        }

        .btn-secondary:hover {
            background: var(--bg-accent);
        }

        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .alert {
            padding: 1rem;
            border-radius: 10px;
            margin-bottom: 1.5rem;
            display: none;
            align-items: center;
            gap: 0.5rem;
        }

        .alert.show {
            display: flex;
            animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
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

        .password-toggle {
            position: relative;
        }

        .password-toggle input {
            padding-right: 3rem;
        }

        .password-toggle-btn {
            position: absolute;
            right: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 0.5rem;
        }

        /* Galeria de Avatares */
        .avatar-gallery-section {
            background: var(--bg-secondary);
            padding: 2rem;
            border-radius: 15px;
            margin-bottom: 2rem;
        }

        .avatar-gallery-section h3 {
            font-size: 1.3rem;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .avatar-gallery-section h3 i {
            color: var(--primary);
        }

        .avatar-gallery-desc {
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
            font-size: 0.95rem;
        }

        .avatar-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1.5rem;
            margin-bottom: 1.5rem;
        }

        .avatar-option {
            position: relative;
            width: 100%;
            aspect-ratio: 1;
            border-radius: 50%;
            overflow: hidden;
            cursor: pointer;
            border: 3px solid transparent;
            transition: all 0.3s ease;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .avatar-option:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 20px rgba(91, 143, 196, 0.3);
        }

        .avatar-option.active {
            border-color: var(--primary);
            box-shadow: 0 0 0 4px rgba(91, 143, 196, 0.2);
        }

        .avatar-option img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            transform: scale(1.2);
        }

        .avatar-check {
            position: absolute;
            top: 5px;
            right: 5px;
            background: var(--primary);
            color: white;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9rem;
            border: 2px solid white;
            animation: checkPulse 0.3s ease;
        }

        @keyframes checkPulse {
            0% {
                transform: scale(0);
            }

            50% {
                transform: scale(1.2);
            }

            100% {
                transform: scale(1);
            }
        }

        .avatar-actions {
            display: flex;
            justify-content: center;
            margin-top: 1.5rem;
        }

        @media (max-width: 768px) {
            .profile-section {
                padding: 80px 0.5rem 1rem;
                overflow-x: hidden;
            }

            .profile-container {
                padding: 0 0.5rem;
                max-width: 100%;
                overflow-x: hidden;
            }

            .welcome-banner {
                flex-direction: column;
                text-align: center;
                padding: 1.5rem 1rem;
                margin-bottom: 1rem;
                max-width: 100%;
            }

            .welcome-icon {
                width: 50px;
                height: 50px;
            }

            .welcome-text {
                max-width: 100%;
                word-wrap: break-word;
            }

            .welcome-text h2 {
                font-size: 1.05rem;
                margin-bottom: 0.3rem;
                word-wrap: break-word;
            }

            .welcome-text p {
                font-size: 0.82rem;
                line-height: 1.4;
                word-wrap: break-word;
            }

            .profile-header {
                text-align: center;
                flex-direction: column;
                padding: 1.5rem 0.8rem;
                max-width: 100%;
            }

            .profile-avatar {
                margin-bottom: 1rem;
            }

            .profile-info h1 {
                font-size: 1.3rem;
                word-wrap: break-word;
            }

            .profile-stats {
                justify-content: center;
                gap: 0.8rem;
                flex-wrap: wrap;
                max-width: 100%;
            }

            .stat {
                padding: 0.5rem;
                min-width: 70px;
            }

            .stat-number {
                font-size: 1.2rem;
            }

            .stat-label {
                font-size: 0.72rem;
            }

            .tabs {
                flex-wrap: wrap;
                gap: 0.3rem;
                max-width: 100%;
            }

            .tab {
                flex: 1;
                min-width: 85px;
                font-size: 0.82rem;
                padding: 0.7rem 0.4rem;
            }

            .section-title {
                font-size: 1.15rem;
                margin-bottom: 1rem;
            }

            .games-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
                max-width: 100%;
            }

            .game-card {
                padding: 1rem;
                max-width: 100%;
            }

            .tab-content {
                max-width: 100%;
                overflow-x: hidden;
            }
        }
    </style>
</head>

<body>
    <?php render_header($nav_items); ?>

    <section class="profile-section">
        <div class="profile-container">

            <?php if ($novo_cadastro): ?>
                <!-- Mensagem de Boas-Vindas para Novos Usuários -->
                <div class="welcome-banner">
                    <div class="welcome-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="welcome-text">
                        <h2>🎉 Bem-vindo à família PositiveSense, <?php echo htmlspecialchars(explode(' ', $usuario['nome'])[0]); ?>!</h2>
                        <p>Seu cadastro foi realizado com sucesso! Agora você pode personalizar seu perfil, escolher um avatar e explorar todos os nossos jogos educativos.</p>
                    </div>
                    <button class="close-banner" onclick="this.parentElement.style.display='none'">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            <?php endif; ?>

            <!-- Cabeçalho do Perfil -->
            <div class="profile-header">
                <div class="profile-avatar-container">
                    <img src="<?php echo htmlspecialchars($usuario['foto_perfil'] ?: 'img/default-avatar.png'); ?>"
                        alt="Foto de perfil"
                        class="profile-avatar"
                        id="avatarPreview">
                    <label for="avatarUpload" class="avatar-upload-btn" title="Alterar foto">
                        <i class="fas fa-camera"></i>
                    </label>
                    <input type="file" id="avatarUpload" accept="image/*" style="display: none;">
                </div>

                <div class="profile-info">
                    <h1><?php echo htmlspecialchars($usuario['nome']); ?></h1>
                    <span class="user-type">
                        <i class="fas fa-user"></i>
                        <?php
                        $tipos = [
                            'aluno' => 'Aluno',
                            'professor' => 'Professor',
                            'responsavel' => 'Responsável',
                            'admin' => 'Administrador'
                        ];
                        echo $tipos[$usuario['tipo_usuario']] ?? 'Usuário';
                        ?>
                    </span>

                    <div class="profile-stats">
                        <div class="stat-item">
                            <div class="number"><?php echo date('d/m/Y', strtotime($usuario['data_cadastro'])); ?></div>
                            <div class="label">Membro desde</div>
                        </div>
                        <div class="stat-item">
                            <div class="number">
                                <?php
                                if ($usuario['ultimo_acesso']) {
                                    $diff = time() - strtotime($usuario['ultimo_acesso']);
                                    if ($diff < 3600) echo 'Agora';
                                    elseif ($diff < 86400) echo 'Hoje';
                                    else echo 'Há ' . floor($diff / 86400) . ' dias';
                                } else {
                                    echo 'Primeiro acesso';
                                }
                                ?>
                            </div>
                            <div class="label">Último acesso</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Conteúdo com Abas -->
            <div class="profile-content">
                <div class="tabs">
                    <button class="tab active" onclick="switchTab('dados')">
                        <i class="fas fa-user-edit"></i> Meus Dados
                    </button>
                    <button class="tab" onclick="switchTab('seguranca')">
                        <i class="fas fa-lock"></i> Segurança
                    </button>
                    <button class="tab" onclick="switchTab('info')">
                        <i class="fas fa-info-circle"></i> Informações
                    </button>
                </div>

                <!-- Aba: Meus Dados -->
                <div id="tab-dados" class="tab-content active">
                    <div id="alertDados" class="alert"></div>

                    <!-- Galeria de Avatares -->
                    <div class="avatar-gallery-section">
                        <h3>
                            <i class="fas fa-images"></i> Escolha seu Avatar
                        </h3>
                        <p class="avatar-gallery-desc">Selecione um avatar predefinido ou faça upload da sua própria foto</p>

                        <div class="avatar-gallery">
                            <?php
                            $avatares = [
                                'img/mascoteroxo.jpeg',
                                'img/mascoterosa.jpeg',
                                'img/mascoteverde.jpeg',
                                'img/mascoteamarelo.jpeg',
                                'img/mascotevermelho.jpeg',
                                'img/mascotecolorido.jpeg'
                            ];

                            $avatar_atual = $usuario['foto_perfil'] ?? 'img/mascoteroxo.jpeg';

                            foreach ($avatares as $avatar):
                                $ativo = ($avatar === $avatar_atual) ? 'active' : '';
                            ?>
                                <div class="avatar-option <?php echo $ativo; ?>"
                                    onclick="selecionarAvatar('<?php echo $avatar; ?>', this)"
                                    data-avatar="<?php echo $avatar; ?>">
                                    <img src="<?php echo $avatar; ?>" alt="Avatar">
                                    <?php if ($ativo): ?>
                                        <div class="avatar-check">
                                            <i class="fas fa-check-circle"></i>
                                        </div>
                                    <?php endif; ?>
                                </div>
                            <?php endforeach; ?>
                        </div>

                        <div class="avatar-actions">
                            <label for="avatarUploadCustom" class="btn btn-secondary">
                                <i class="fas fa-upload"></i>
                                Ou fazer upload da sua foto
                            </label>
                            <input type="file" id="avatarUploadCustom" accept="image/*" style="display: none;">
                        </div>
                    </div>

                    <hr style="margin: 2rem 0; border: none; border-top: 2px solid var(--bg-secondary);">

                    <form id="formDados">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="nome">
                                    <i class="fas fa-user"></i> Nome Completo
                                </label>
                                <input type="text"
                                    id="nome"
                                    name="nome"
                                    value="<?php echo htmlspecialchars($usuario['nome']); ?>"
                                    required>
                            </div>

                            <div class="form-group">
                                <label for="email">
                                    <i class="fas fa-envelope"></i> Email
                                </label>
                                <input type="email"
                                    id="email"
                                    name="email"
                                    value="<?php echo htmlspecialchars($usuario['email']); ?>"
                                    required>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="tipo_usuario">
                                    <i class="fas fa-id-badge"></i> Tipo de Usuário
                                </label>
                                <select id="tipo_usuario" name="tipo_usuario" disabled>
                                    <option value="aluno" <?php echo $usuario['tipo_usuario'] == 'aluno' ? 'selected' : ''; ?>>Aluno</option>
                                    <option value="professor" <?php echo $usuario['tipo_usuario'] == 'professor' ? 'selected' : ''; ?>>Professor</option>
                                    <option value="responsavel" <?php echo $usuario['tipo_usuario'] == 'responsavel' ? 'selected' : ''; ?>>Responsável</option>
                                    <option value="admin" <?php echo $usuario['tipo_usuario'] == 'admin' ? 'selected' : ''; ?>>Administrador</option>
                                </select>
                                <small style="color: var(--text-secondary); margin-top: 0.25rem; display: block;">
                                    <i class="fas fa-lock"></i> Este campo não pode ser alterado
                                </small>
                            </div>

                            <div class="form-group">
                                <label for="status">
                                    <i class="fas fa-toggle-on"></i> Status da Conta
                                </label>
                                <input type="text"
                                    value="<?php echo $usuario['status'] == 'ativo' ? 'Ativa' : 'Inativa'; ?>"
                                    disabled>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary" id="btnSalvarDados">
                            <i class="fas fa-save"></i> Salvar Alterações
                        </button>
                    </form>
                </div>

                <!-- Aba: Segurança -->
                <div id="tab-seguranca" class="tab-content">
                    <div id="alertSenha" class="alert"></div>

                    <form id="formSenha">
                        <div class="form-group password-toggle">
                            <label for="senha_atual">
                                <i class="fas fa-key"></i> Senha Atual
                            </label>
                            <input type="password"
                                id="senha_atual"
                                name="senha_atual"
                                placeholder="Digite sua senha atual"
                                required>
                            <button type="button" class="password-toggle-btn" onclick="togglePassword('senha_atual')">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>

                        <div class="form-row">
                            <div class="form-group password-toggle">
                                <label for="nova_senha">
                                    <i class="fas fa-lock"></i> Nova Senha
                                </label>
                                <input type="password"
                                    id="nova_senha"
                                    name="nova_senha"
                                    placeholder="Mínimo 6 caracteres"
                                    minlength="6"
                                    required>
                                <button type="button" class="password-toggle-btn" onclick="togglePassword('nova_senha')">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>

                            <div class="form-group password-toggle">
                                <label for="confirmar_senha">
                                    <i class="fas fa-check-circle"></i> Confirmar Nova Senha
                                </label>
                                <input type="password"
                                    id="confirmar_senha"
                                    name="confirmar_senha"
                                    placeholder="Digite novamente"
                                    minlength="6"
                                    required>
                                <button type="button" class="password-toggle-btn" onclick="togglePassword('confirmar_senha')">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary" id="btnAlterarSenha">
                            <i class="fas fa-shield-alt"></i> Alterar Senha
                        </button>
                    </form>
                </div>

                <!-- Aba: Informações -->
                <div id="tab-info" class="tab-content">
                    <div class="info-card">
                        <h3>
                            <i class="fas fa-user-circle"></i>
                            Informações da Conta
                        </h3>
                        <div class="info-row">
                            <span class="info-label">ID do Usuário:</span>
                            <span class="info-value">#<?php echo $usuario['id']; ?></span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Email:</span>
                            <span class="info-value"><?php echo htmlspecialchars($usuario['email']); ?></span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Tipo de Conta:</span>
                            <span class="info-value"><?php echo $tipos[$usuario['tipo_usuario']] ?? 'Usuário'; ?></span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Status:</span>
                            <span class="info-value">
                                <i class="fas fa-circle" style="color: <?php echo $usuario['status'] == 'ativo' ? '#28a745' : '#dc3545'; ?>; font-size: 0.5rem;"></i>
                                <?php echo ucfirst($usuario['status']); ?>
                            </span>
                        </div>
                    </div>

                    <div class="info-card">
                        <h3>
                            <i class="fas fa-clock"></i>
                            Atividade
                        </h3>
                        <div class="info-row">
                            <span class="info-label">Cadastro realizado:</span>
                            <span class="info-value"><?php echo date('d/m/Y \à\s H:i', strtotime($usuario['data_cadastro'])); ?></span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Último acesso:</span>
                            <span class="info-value">
                                <?php
                                echo $usuario['ultimo_acesso']
                                    ? date('d/m/Y \à\s H:i', strtotime($usuario['ultimo_acesso']))
                                    : 'Primeiro acesso';
                                ?>
                            </span>
                        </div>
                    </div>

                    <div class="info-card" style="background: linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%); border: 1px solid #ffcccc;">
                        <h3 style="color: #dc3545;">
                            <i class="fas fa-exclamation-triangle"></i>
                            Zona de Perigo
                        </h3>
                        <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                            Ações irreversíveis que afetam permanentemente sua conta.
                        </p>
                        <button class="btn" style="background: #dc3545; color: white;" onclick="confirmarExclusao()">
                            <i class="fas fa-trash-alt"></i>
                            Excluir Minha Conta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script src="js/main.js"></script>
    <script>
        // Trocar entre abas
        function switchTab(tabName) {
            // Remove active de todas as abas
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            // Ativa a aba clicada
            event.target.closest('.tab').classList.add('active');
            document.getElementById('tab-' + tabName).classList.add('active');
        }

        // Toggle visualização de senha
        function togglePassword(inputId) {
            const input = document.getElementById(inputId);
            const btn = input.parentElement.querySelector('.password-toggle-btn i');

            if (input.type === 'password') {
                input.type = 'text';
                btn.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                btn.classList.replace('fa-eye-slash', 'fa-eye');
            }
        }

        // Selecionar avatar predefinido
        async function selecionarAvatar(avatarPath, elemento) {
            try {
                const formData = new FormData();
                formData.append('avatar', avatarPath);

                const response = await fetch('processar_avatar_predefinido.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.sucesso) {
                    // Remove active de todos
                    document.querySelectorAll('.avatar-option').forEach(opt => {
                        opt.classList.remove('active');
                        const check = opt.querySelector('.avatar-check');
                        if (check) check.remove();
                    });

                    // Adiciona active no selecionado
                    elemento.classList.add('active');
                    elemento.innerHTML += '<div class="avatar-check"><i class="fas fa-check-circle"></i></div>';

                    // Atualiza preview no header
                    document.getElementById('avatarPreview').src = avatarPath;
                    document.querySelectorAll('.user-avatar').forEach(img => {
                        img.src = avatarPath + '?t=' + Date.now();
                    });

                    showAlert('alertDados', 'success', result.mensagem);
                } else {
                    throw new Error(result.mensagem || 'Erro ao selecionar avatar');
                }
            } catch (error) {
                showAlert('alertDados', 'error', error.message);
                console.error('Erro:', error);
            }
        }

        // Upload de foto customizada (da galeria)
        document.getElementById('avatarUploadCustom').addEventListener('change', async function(e) {
            const file = e.target.files[0];
            if (!file) return;

            // Validação
            if (!file.type.startsWith('image/')) {
                showAlert('alertDados', 'error', 'Por favor, selecione apenas imagens!');
                return;
            }

            if (file.size > 5 * 1024 * 1024) { // 5MB
                showAlert('alertDados', 'error', 'A imagem deve ter no máximo 5MB!');
                return;
            }

            // Preview
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('avatarPreview').src = e.target.result;
            };
            reader.readAsDataURL(file);

            // Upload
            const formData = new FormData();
            formData.append('foto', file);

            try {
                const response = await fetch('processar_avatar.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.sucesso) {
                    // Remove active de avatares predefinidos
                    document.querySelectorAll('.avatar-option').forEach(opt => {
                        opt.classList.remove('active');
                        const check = opt.querySelector('.avatar-check');
                        if (check) check.remove();
                    });

                    showAlert('alertDados', 'success', 'Foto atualizada com sucesso!');
                    document.querySelectorAll('.user-avatar').forEach(img => {
                        img.src = result.foto_url + '?t=' + Date.now();
                    });
                } else {
                    throw new Error(result.mensagem || 'Erro ao fazer upload');
                }
            } catch (error) {
                showAlert('alertDados', 'error', error.message);
                console.error('Erro:', error);
            }
        });

        // Upload de foto de perfil (do header)
        document.getElementById('avatarUpload').addEventListener('change', async function(e) {
            const file = e.target.files[0];
            if (!file) return;

            // Validação
            if (!file.type.startsWith('image/')) {
                alert('Por favor, selecione apenas imagens!');
                return;
            }

            if (file.size > 5 * 1024 * 1024) { // 5MB
                alert('A imagem deve ter no máximo 5MB!');
                return;
            }

            // Preview
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('avatarPreview').src = e.target.result;
            };
            reader.readAsDataURL(file);

            // Upload
            const formData = new FormData();
            formData.append('foto', file);

            try {
                const response = await fetch('processar_avatar.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.sucesso) {
                    showAlert('alertDados', 'success', 'Foto atualizada com sucesso!');
                    // Atualiza foto no header também
                    document.querySelectorAll('.user-avatar').forEach(img => {
                        img.src = result.foto_url + '?t=' + Date.now();
                    });
                } else {
                    throw new Error(result.mensagem || 'Erro ao fazer upload');
                }
            } catch (error) {
                showAlert('alertDados', 'error', error.message);
                console.error('Erro:', error);
            }
        });

        // Salvar dados pessoais
        document.getElementById('formDados').addEventListener('submit', async function(e) {
            e.preventDefault();

            const btn = document.getElementById('btnSalvarDados');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';

            try {
                const formData = new FormData(this);

                const response = await fetch('processar_perfil.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.sucesso) {
                    showAlert('alertDados', 'success', result.mensagem);
                    // Atualiza nome no header
                    const primeiroNome = formData.get('nome').split(' ')[0];
                    document.querySelectorAll('.user-name').forEach(el => {
                        el.textContent = primeiroNome;
                    });
                    // Atualiza título da página
                    document.querySelector('.profile-info h1').textContent = formData.get('nome');
                } else {
                    throw new Error(result.mensagem || 'Erro ao salvar');
                }
            } catch (error) {
                showAlert('alertDados', 'error', error.message);
                console.error('Erro:', error);
            } finally {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-save"></i> Salvar Alterações';
            }
        });

        // Alterar senha
        document.getElementById('formSenha').addEventListener('submit', async function(e) {
            e.preventDefault();

            const novaSenha = document.getElementById('nova_senha').value;
            const confirmarSenha = document.getElementById('confirmar_senha').value;

            if (novaSenha !== confirmarSenha) {
                showAlert('alertSenha', 'error', 'As senhas não coincidem!');
                return;
            }

            const btn = document.getElementById('btnAlterarSenha');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Alterando...';

            try {
                const formData = new FormData(this);

                const response = await fetch('processar_senha.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.sucesso) {
                    showAlert('alertSenha', 'success', result.mensagem);
                    this.reset();
                } else {
                    throw new Error(result.mensagem || 'Erro ao alterar senha');
                }
            } catch (error) {
                showAlert('alertSenha', 'error', error.message);
                console.error('Erro:', error);
            } finally {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-shield-alt"></i> Alterar Senha';
            }
        });

        // Função auxiliar para mostrar alertas
        function showAlert(elementId, type, message) {
            const alert = document.getElementById(elementId);
            alert.className = 'alert alert-' + type + ' show';
            alert.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : 'exclamation-circle') + '"></i> ' + message;

            setTimeout(() => {
                alert.classList.remove('show');
            }, 5000);
        }

        // Confirmar exclusão de conta
        function confirmarExclusao() {
            if (confirm('⚠️ ATENÇÃO!\n\nVocê está prestes a EXCLUIR PERMANENTEMENTE sua conta.\n\nTodos os seus dados serão perdidos e esta ação NÃO PODE SER DESFEITA.\n\nTem certeza absoluta que deseja continuar?')) {
                if (confirm('Esta é sua última chance!\n\nDigite OK para confirmar a exclusão definitiva da conta.')) {
                    window.location.href = 'processar_exclusao.php';
                }
            }
        }
    </script>

    <!-- Loading Screen -->
    <script src="js/loading.js?v=<?php echo time(); ?>"></script>
</body>

</html>
