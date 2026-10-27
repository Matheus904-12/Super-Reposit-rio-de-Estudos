<?php

/**
 * ========================================
 * PROCESSAR ALTERAÇÃO DE SENHA
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
    $senha_atual = $_POST['senha_atual'] ?? '';
    $nova_senha = $_POST['nova_senha'] ?? '';
    $confirmar_senha = $_POST['confirmar_senha'] ?? '';
    $usuario_id = $_SESSION['usuario_id'];

    // Validações
    if (empty($senha_atual)) {
        throw new Exception('Digite a senha atual');
    }

    if (empty($nova_senha)) {
        throw new Exception('Digite a nova senha');
    }

    if (strlen($nova_senha) < 6) {
        throw new Exception('A nova senha deve ter no mínimo 6 caracteres');
    }

    if ($nova_senha !== $confirmar_senha) {
        throw new Exception('As senhas não coincidem');
    }

    $pdo = getDB();

    // Busca senha atual do banco
    $stmt = $pdo->prepare("SELECT senha FROM usuarios WHERE id = ?");
    $stmt->execute([$usuario_id]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$usuario) {
        throw new Exception('Usuário não encontrado');
    }

    // Verifica senha atual
    if (!password_verify($senha_atual, $usuario['senha'])) {
        throw new Exception('Senha atual incorreta');
    }

    // Atualiza senha
    $nova_senha_hash = password_hash($nova_senha, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("UPDATE usuarios SET senha = ? WHERE id = ?");
    $stmt->execute([$nova_senha_hash, $usuario_id]);

    echo json_encode([
        'sucesso' => true,
        'mensagem' => 'Senha alterada com sucesso!'
    ]);
} catch (Exception $e) {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => $e->getMessage()
    ]);
}
