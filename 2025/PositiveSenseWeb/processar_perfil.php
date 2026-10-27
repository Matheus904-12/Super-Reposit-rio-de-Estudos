<?php

/**
 * ========================================
 * PROCESSAR ATUALIZAÇÃO DE PERFIL
 * ========================================
 */

require_once __DIR__ . '/config/session.php';
header('Content-Type: application/json');

// Verifica se está logado
if (!estaLogado()) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Sessão expirada. Faça login novamente.']);
    exit;
}

// Valida método POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Método inválido']);
    exit;
}

require_once __DIR__ . '/config/database.php';

try {
    $nome = trim($_POST['nome'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $usuario_id = $_SESSION['usuario_id'];

    // Validações
    if (empty($nome)) {
        throw new Exception('O nome é obrigatório');
    }

    if (empty($email)) {
        throw new Exception('O email é obrigatório');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Email inválido');
    }

    $pdo = getDB();

    // Verifica se email já está em uso por outro usuário
    $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ? AND id != ?");
    $stmt->execute([$email, $usuario_id]);

    if ($stmt->fetch()) {
        throw new Exception('Este email já está sendo usado por outro usuário');
    }

    // Atualiza dados
    $stmt = $pdo->prepare("
        UPDATE usuarios
        SET nome = ?, email = ?
        WHERE id = ?
    ");

    $stmt->execute([$nome, $email, $usuario_id]);

    // Atualiza sessão
    $_SESSION['usuario_nome'] = $nome;
    $_SESSION['usuario_email'] = $email;

    echo json_encode([
        'sucesso' => true,
        'mensagem' => 'Dados atualizados com sucesso!'
    ]);
} catch (Exception $e) {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => $e->getMessage()
    ]);
}
