<?php

/**
 * ========================================
 * PROCESSAMENTO DE REGISTRO
 * PositiveSense - Cadastro de Usuários
 * ========================================
 */

require_once __DIR__ . '/config/session.php';
require_once __DIR__ . '/config/database.php';

// IMPORTANTE: Header DEPOIS do session.php para evitar "headers already sent"

// Função para registrar log
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

// Verifica se é requisição POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
    exit;
}

// NÃO definir header aqui - será definido DEPOIS de setcookie

// Obtém e sanitiza dados
$nome = trim($_POST['nome'] ?? '');
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$senha = $_POST['senha'] ?? '';
$confirmar_senha = $_POST['confirmar_senha'] ?? '';
$tipo_usuario = $_POST['tipo_usuario'] ?? 'aluno';
$aceitar_termos = isset($_POST['aceitar_termos']);

// Validações
if (empty($nome) || empty($email) || empty($senha) || empty($confirmar_senha)) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['success' => false, 'message' => 'Por favor, preencha todos os campos obrigatórios']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['success' => false, 'message' => 'E-mail inválido']);
    exit;
}

if (strlen($senha) < 6) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['success' => false, 'message' => 'A senha deve ter no mínimo 6 caracteres']);
    exit;
}

if ($senha !== $confirmar_senha) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['success' => false, 'message' => 'As senhas não coincidem']);
    exit;
}

if (!in_array($tipo_usuario, ['aluno', 'professor', 'responsavel'])) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['success' => false, 'message' => 'Tipo de usuário inválido']);
    exit;
}

if (!$aceitar_termos) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['success' => false, 'message' => 'Você deve aceitar os termos de uso']);
    exit;
}

try {
    $db = getDB();

    // Verifica se e-mail já existe
    $stmt = $db->prepare("SELECT id FROM usuarios WHERE email = ? LIMIT 1");
    $stmt->execute([$email]);

    if ($stmt->fetch()) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['success' => false, 'message' => 'Este e-mail já está cadastrado']);
        exit;
    }

    // Criptografa senha
    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

    // Insere novo usuário
    $stmt = $db->prepare("
        INSERT INTO usuarios (nome, email, senha, tipo_usuario, status)
        VALUES (?, ?, ?, ?, 'ativo')
    ");

    $stmt->execute([$nome, $email, $senha_hash, $tipo_usuario]);
    $usuario_id = $db->lastInsertId();

    // Registra log
    registrarLog($usuario_id, 'registro', "Novo usuário cadastrado: $nome ($tipo_usuario)");

    // Cria sessão automaticamente após cadastro
    $_SESSION['usuario_id'] = $usuario_id;
    $_SESSION['usuario_nome'] = $nome;
    $_SESSION['usuario_email'] = $email;
    $_SESSION['usuario_tipo'] = $tipo_usuario;
    $_SESSION['usuario_foto'] = 'img/avatars/avatar-vazio.svg';

    // CRÍTICO: Salva a sessão imediatamente
    session_write_close();

    // Cria sessão persistente no banco
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

    // Define cookie de sessão (30 dias)
    // Detecta ambiente Vercel para cookies seguros
    $isVercel = (
        isset($_ENV['VERCEL']) ||
        isset($_SERVER['VERCEL']) ||
        isset($_ENV['VERCEL_ENV']) ||
        strpos($_SERVER['HTTP_HOST'] ?? '', 'vercel.app') !== false
    );

    $cookieOptions = [
        'expires' => time() + (30 * 24 * 60 * 60),
        'path' => '/',
        'domain' => '',
        'secure' => $isVercel, // HTTPS no Vercel
        'httponly' => true,
        'samesite' => 'Lax' // Lax permite cookies no mesmo domínio
    ];

    setcookie('sessao_token', $token, $cookieOptions);

    // Log de debug
    error_log("Registro concluído - Usuario ID: $usuario_id, Token gerado");

    // AGORA sim, define header JSON (após cookie)
    header('Content-Type: application/json; charset=utf-8');

    echo json_encode([
        'success' => true,
        'message' => 'Cadastro realizado com sucesso! Redirecionando...',
        'redirect' => 'inicial.php' // Mudado de perfil.php?novo=1 para inicial.php
    ]);
} catch (PDOException $e) {
    error_log("Erro no registro: " . $e->getMessage());

    // Mensagem mais específica para debug
    $mensagem = 'Erro ao processar cadastro.';

    // Se for erro de conexão
    if (strpos($e->getMessage(), 'SQLSTATE[HY000] [1049]') !== false) {
        $mensagem = 'Banco de dados não encontrado. Execute o script database/positivesense.sql primeiro.';
    }
    // Se for erro de tabela não existir
    elseif (strpos($e->getMessage(), "Table") !== false && strpos($e->getMessage(), "doesn't exist") !== false) {
        $mensagem = 'Tabela não encontrada. Execute o script database/positivesense.sql primeiro.';
    }
    // Se for erro de conexão com MySQL
    elseif (strpos($e->getMessage(), 'SQLSTATE[HY000] [2002]') !== false) {
        $mensagem = 'Não foi possível conectar ao MySQL. Verifique se o MySQL está rodando no XAMPP.';
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => false,
        'message' => $mensagem,
        'error_details' => $e->getMessage() // Para debug
    ]);
} catch (Exception $e) {
    error_log("Erro geral no registro: " . $e->getMessage());
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => false,
        'message' => 'Erro inesperado ao processar cadastro.',
        'error_details' => $e->getMessage()
    ]);
}
