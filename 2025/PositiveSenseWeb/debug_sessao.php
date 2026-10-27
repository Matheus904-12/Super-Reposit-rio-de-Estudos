<?php

/**
 * ========================================
 * DEBUG DE SESSÃO - POSITIVESENSE
 * ========================================
 *
 * Arquivo para verificar o estado da sessão e cookies
 */

require_once __DIR__ . '/config/session.php';

header('Content-Type: application/json; charset=utf-8');

// Informações do ambiente
$isVercel = (
    isset($_ENV['VERCEL']) ||
    isset($_SERVER['VERCEL']) ||
    isset($_ENV['VERCEL_ENV']) ||
    strpos($_SERVER['HTTP_HOST'] ?? '', 'vercel.app') !== false
);

$debug_info = [
    'ambiente' => [
        'host' => $_SERVER['HTTP_HOST'] ?? 'desconhecido',
        'is_vercel' => $isVercel,
        'is_https' => isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
        'protocol' => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http'
    ],
    'sessao_php' => [
        'session_id' => session_id(),
        'session_status' => session_status() === PHP_SESSION_ACTIVE ? 'ativa' : 'inativa',
        'usuario_logado' => isset($_SESSION['usuario_id']),
        'usuario_id' => $_SESSION['usuario_id'] ?? null,
        'usuario_nome' => $_SESSION['usuario_nome'] ?? null,
        'usuario_email' => $_SESSION['usuario_email'] ?? null
    ],
    'cookies' => [
        'sessao_token_existe' => isset($_COOKIE['sessao_token']),
        'sessao_token_valor' => isset($_COOKIE['sessao_token']) ? substr($_COOKIE['sessao_token'], 0, 10) . '...' : null,
        'todos_cookies' => array_keys($_COOKIE)
    ],
    'funcoes_disponiveis' => [
        'verificarSessao' => function_exists('verificarSessao'),
        'estaLogado' => function_exists('estaLogado'),
        'getUsuarioLogado' => function_exists('getUsuarioLogado')
    ]
];

// Se está logado, tenta buscar mais informações
if (estaLogado()) {
    try {
        require_once __DIR__ . '/config/database.php';
        $db = getDB();

        // Busca sessões ativas do usuário
        $stmt = $db->prepare("
            SELECT id, token_sessao, data_criacao, data_expiracao, ip_address
            FROM sessoes
            WHERE usuario_id = ? AND data_expiracao > NOW()
            ORDER BY data_criacao DESC
        ");
        $stmt->execute([$_SESSION['usuario_id']]);
        $sessoes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $debug_info['sessoes_banco'] = [
            'total_ativas' => count($sessoes),
            'sessoes' => array_map(function ($s) {
                return [
                    'id' => $s['id'],
                    'token' => substr($s['token_sessao'], 0, 10) . '...',
                    'criada_em' => $s['data_criacao'],
                    'expira_em' => $s['data_expiracao'],
                    'ip' => $s['ip_address']
                ];
            }, $sessoes)
        ];
    } catch (Exception $e) {
        $debug_info['erro_banco'] = $e->getMessage();
    }
}

echo json_encode($debug_info, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
