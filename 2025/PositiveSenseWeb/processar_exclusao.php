<?php

/**
 * ========================================
 * PROCESSAR EXCLUSÃO DE CONTA
 * ========================================
 */

require_once __DIR__ . '/config/session.php';

// Verifica se está logado
if (!estaLogado()) {
    header('Location: login.php');
    exit;
}

require_once __DIR__ . '/config/database.php';

try {
    $usuario_id = $_SESSION['usuario_id'];
    $pdo = getDB();

    // Busca dados do usuário antes de excluir
    $stmt = $pdo->prepare("SELECT foto_perfil FROM usuarios WHERE id = ?");
    $stmt->execute([$usuario_id]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    // Deleta foto de perfil se existir
    if ($usuario['foto_perfil'] && $usuario['foto_perfil'] !== 'img/default-avatar.png') {
        $fotoPath = __DIR__ . '/' . $usuario['foto_perfil'];
        if (file_exists($fotoPath)) {
            unlink($fotoPath);
        }
    }

    // Inicia transação
    $pdo->beginTransaction();

    // Deleta sessões
    $stmt = $pdo->prepare("DELETE FROM sessoes WHERE usuario_id = ?");
    $stmt->execute([$usuario_id]);

    // Deleta logs
    $stmt = $pdo->prepare("DELETE FROM logs_acesso WHERE usuario_id = ?");
    $stmt->execute([$usuario_id]);

    // Deleta usuário
    $stmt = $pdo->prepare("DELETE FROM usuarios WHERE id = ?");
    $stmt->execute([$usuario_id]);

    // Confirma transação
    $pdo->commit();

    // Destroi sessão
    session_destroy();

    // Redireciona para página inicial
    header('Location: index.php?conta_excluida=1');
    exit;
} catch (Exception $e) {
    // Reverte transação em caso de erro
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    $_SESSION['erro_exclusao'] = $e->getMessage();
    header('Location: perfil.php');
    exit;
}
