<?php

/**
 * ========================================
 * PROCESSAR SELEÇÃO DE AVATAR PREDEFINIDO
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
    $avatar = trim($_POST['avatar'] ?? '');
    $usuario_id = $_SESSION['usuario_id'];

    // Lista de avatares permitidos
    $avatares_permitidos = [
        'img/mascoteroxo.jpeg',
        'img/mascoterosa.jpeg',
        'img/mascoteverde.jpeg',
        'img/mascoteamarelo.jpeg',
        'img/mascotevermelho.jpeg',
        'img/mascotecolorido.jpeg'
    ];

    // Validação
    if (empty($avatar)) {
        throw new Exception('Selecione um avatar');
    }

    if (!in_array($avatar, $avatares_permitidos)) {
        throw new Exception('Avatar inválido');
    }

    $pdo = getDB();

    // Atualiza avatar no banco
    $stmt = $pdo->prepare("UPDATE usuarios SET foto_perfil = ? WHERE id = ?");
    $stmt->execute([$avatar, $usuario_id]);

    // Atualiza sessão
    $_SESSION['usuario_foto'] = $avatar;

    echo json_encode([
        'sucesso' => true,
        'mensagem' => 'Avatar atualizado com sucesso!',
        'foto_url' => $avatar
    ]);
} catch (Exception $e) {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => $e->getMessage()
    ]);
}
