<?php

/**
 * TESTE DE COOKIE - DEBUG
 * Verifica se cookies estão sendo definidos corretamente
 */

session_start();

// Define um cookie de teste
$isVercel = strpos($_SERVER['HTTP_HOST'] ?? '', 'vercel.app') !== false;

$cookieOptions = [
    'expires' => time() + (30 * 24 * 60 * 60),
    'path' => '/',
    'domain' => '',
    'secure' => $isVercel,
    'httponly' => true,
    'samesite' => 'Lax'
];

$result = setcookie('teste_sessao', 'valor_teste_123', $cookieOptions);

header('Content-Type: application/json; charset=utf-8');

echo json_encode([
    'cookie_definido' => $result,
    'isVercel' => $isVercel,
    'host' => $_SERVER['HTTP_HOST'] ?? 'unknown',
    'cookies_recebidos' => $_COOKIE,
    'secure' => $cookieOptions['secure'],
    'php_version' => PHP_VERSION,
    'headers_sent' => headers_sent($file, $line),
    'headers_sent_file' => $file ?? null,
    'headers_sent_line' => $line ?? null
]);
