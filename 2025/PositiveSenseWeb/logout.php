<?php

/**
 * ========================================
 * LOGOUT
 * PositiveSense - Encerrar Sessão
 * ========================================
 */

require_once __DIR__ . '/config/session.php';
require_once __DIR__ . '/config/database.php';

// Registra log de logout se usuário estiver logado
if (estaLogado()) {
    try {
        $db = getDB();

        // Registra log
        $stmt = $db->prepare("
            INSERT INTO logs_acesso (usuario_id, acao, ip_address, user_agent)
            VALUES (?, 'logout', ?, ?)
        ");
        $stmt->execute([
            $_SESSION['usuario_id'],
            $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
        ]);

        // Desativa sessões ativas no banco
        if (isset($_COOKIE['sessao_token'])) {
            $stmt = $db->prepare("UPDATE sessoes SET ativo = FALSE WHERE token_sessao = ?");
            $stmt->execute([$_COOKIE['sessao_token']]);
            setcookie('sessao_token', '', time() - 3600, '/');
        }
    } catch (Exception $e) {
        error_log("Erro no logout: " . $e->getMessage());
    }
}

// Limpa todas as variáveis de sessão
$_SESSION = array();

// Destrói o cookie de sessão
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 3600, '/');
}

// Destrói a sessão
session_destroy();

// Redireciona para login
header('Location: login.php?logout=success');
exit;
