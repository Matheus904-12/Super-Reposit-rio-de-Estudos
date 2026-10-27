<?php
/**
 * ========================================
 * GOOGLE OAUTH - INICIAR LOGIN
 * PositiveSense - Redirecionamento para Google
 * ========================================
 */

require_once __DIR__ . '/config/google_oauth.php';

// Redirecionar para Google
header('Location: ' . iniciar_auth_google());
exit;
?>
