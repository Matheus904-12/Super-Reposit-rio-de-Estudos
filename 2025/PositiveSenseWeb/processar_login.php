<?php

/**
 * ========================================
 * PROCESSAMENTO DE LOGIN
 * PositiveSense - Sistema de Autenticação
 * ========================================
 */

require_once __DIR__ . '/config/session.php';
require_once __DIR__ . '/config/database.php';

// IMPORTANTE: Header DEPOIS do session.php para evitar "headers already sent"

// Função para registrar log de acesso
function registrarLog($usuario_id, $acao, $detalhes = null)
{
    try {
        $db = getDB();
        $stmt = $db->prepare("
            INSERT INTO logs_acesso (usuario_id, acao, ip_address, user_agent, detalhes)
            VALUES (?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $usuario_id,
            $acao,
            $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
            $detalhes
        ]);
    } catch (Exception $e) {
        error_log("Erro ao registrar log: " . $e->getMessage());
    }
}

// Função para criar sessão
function criarSessao($usuario_id)
{
    try {
        $db = getDB();
        $token = bin2hex(random_bytes(32));
        $expiracao = date('Y-m-d H:i:s', strtotime('+30 days'));

        $stmt = $db->prepare("
            INSERT INTO sessoes (usuario_id, token_sessao, ip_address, user_agent, data_expiracao)
            VALUES (?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $usuario_id,
            $token,
            $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
            $expiracao
        ]);

        return $token;
    } catch (Exception $e) {
        error_log("Erro ao criar sessão: " . $e->getMessage());
        return null;
    }
}

// Verifica se é requisição POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
    exit;
}

// NÃO definir header aqui - será definido DEPOIS de setcookie

// Obtém dados do POST
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$senha = $_POST['senha'] ?? '';
$lembrar = isset($_POST['lembrar']);

// Validações
if (empty($email) || empty($senha)) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['success' => false, 'message' => 'Por favor, preencha todos os campos']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['success' => false, 'message' => 'E-mail inválido']);
    exit;
}

try {
    $db = getDB();

    // Busca usuário por e-mail
    $stmt = $db->prepare("SELECT * FROM usuarios WHERE email = ? AND status = 'ativo' LIMIT 1");
    $stmt->execute([$email]);
    $usuario = $stmt->fetch();

    if (!$usuario) {
        registrarLog(null, 'login_falha', "E-mail não encontrado: $email");
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['success' => false, 'message' => 'E-mail ou senha incorretos']);
        exit;
    }

    // Verifica senha
    if (!password_verify($senha, $usuario['senha'])) {
        registrarLog($usuario['id'], 'login_falha', "Senha incorreta");
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['success' => false, 'message' => 'E-mail ou senha incorretos']);
        exit;
    }

    // Login bem-sucedido
    $_SESSION['usuario_id'] = $usuario['id'];
    $_SESSION['usuario_nome'] = $usuario['nome'];
    $_SESSION['usuario_email'] = $usuario['email'];
    $_SESSION['usuario_tipo'] = $usuario['tipo_usuario'];
    $_SESSION['usuario_foto'] = $usuario['foto_perfil'];

    // CRÍTICO: Salva a sessão imediatamente
    session_write_close();

    // Atualiza último acesso
    $stmt = $db->prepare("UPDATE usuarios SET ultimo_acesso = NOW() WHERE id = ?");
    $stmt->execute([$usuario['id']]);

    // Cria sessão persistente no banco (sempre, não só quando marcar "lembrar")
    $token_sessao = criarSessao($usuario['id']);

    // Log de debug
    error_log("Login bem-sucedido - Usuario ID: {$usuario['id']}, Token gerado: " . ($token_sessao ? 'SIM' : 'NÃO'));

    // IMPORTANTE: Cookie DEVE ser enviado ANTES de qualquer output (echo/json)
    if ($token_sessao) {
        // Detecta ambiente Vercel para cookies seguros
        $isVercel = (
            isset($_ENV['VERCEL']) ||
            isset($_SERVER['VERCEL']) ||
            isset($_ENV['VERCEL_ENV']) ||
            strpos($_SERVER['HTTP_HOST'] ?? '', 'vercel.app') !== false
        );

        // Cookie expira em 30 dias para manter login
        $cookieOptions = [
            'expires' => time() + (30 * 24 * 60 * 60),
            'path' => '/',
            'domain' => '', // Vazio = domínio atual
            'secure' => $isVercel, // HTTPS no Vercel
            'httponly' => true,
            'samesite' => 'Lax' // Lax permite cookies no mesmo domínio
        ];

        // Define cookie ANTES do header e echo
        setcookie('sessao_token', $token_sessao, $cookieOptions);

        // Log de debug
        error_log("Cookie definido - Ambiente: " . ($isVercel ? 'VERCEL' : 'LOCAL') . ", Secure: " . ($isVercel ? 'true' : 'false') . ", SameSite: " . ($isVercel ? 'None' : 'Lax'));
    }

    // Registra log
    registrarLog($usuario['id'], 'login_sucesso');

    // AGORA sim, define header JSON (após cookie)
    header('Content-Type: application/json; charset=utf-8');

    echo json_encode([
        'success' => true,
        'message' => 'Login realizado com sucesso!',
        'redirect' => 'inicial.php', // Mudado de perfil.php para inicial.php
        'usuario' => [
            'nome' => $usuario['nome'],
            'tipo' => $usuario['tipo_usuario']
        ]
    ]);
} catch (PDOException $e) {
    error_log("Erro no login: " . $e->getMessage());
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['success' => false, 'message' => 'Erro ao processar login. Tente novamente.']);
}
