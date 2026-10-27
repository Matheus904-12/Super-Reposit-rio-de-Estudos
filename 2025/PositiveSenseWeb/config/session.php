<?php

/**
 * ========================================
 * POSITIVESENSE - GERENCIAMENTO DE SESSÃO
 * ========================================
 *
 * Sistema de sessão persistente com suporte a cookies
 * Mantém usuário logado até logout explícito
 *
 * @author PositiveSense Team
 * @version 1.0
 * @date 2025
 */

// Inicia output buffering para evitar problemas com headers no Vercel
if (!ob_get_level()) {
    ob_start();
}

// Inicia sessão se ainda não foi iniciada
if (session_status() === PHP_SESSION_NONE) {
    // Configurações de segurança da sessão
    @ini_set('session.cookie_httponly', 1);
    @ini_set('session.use_only_cookies', 1);
    @ini_set('session.cookie_lifetime', 0); // Sessão expira ao fechar navegador (se não tiver "lembrar-me")

    // Detecta se está no Vercel (serverless)
    $isVercel = (
        isset($_ENV['VERCEL']) ||
        isset($_SERVER['VERCEL']) ||
        isset($_ENV['VERCEL_ENV']) ||
        strpos($_SERVER['HTTP_HOST'] ?? '', 'vercel.app') !== false
    );

    // Configurações de cookie para Vercel (HTTPS)
    if ($isVercel) {
        @ini_set('session.cookie_secure', 1); // HTTPS only
        @ini_set('session.cookie_samesite', 'Lax');
    }

    @session_start();
}

/**
 * Verifica se há um token de sessão válido
 * Restaura sessão do usuário se token for válido
 */
function verificarSessao()
{
    // Reinicia sessão se foi fechada
    if (session_status() === PHP_SESSION_NONE) {
        @session_start();
    }

    // Se já está logado, não precisa verificar token
    if (isset($_SESSION['usuario_id'])) {
        error_log("Sessão já existe - Usuario ID: {$_SESSION['usuario_id']}");
        return true;
    }

    // Verifica se existe cookie de sessão
    if (!isset($_COOKIE['sessao_token'])) {
        error_log("Nenhum cookie de sessão encontrado");
        return false;
    }

    error_log("Cookie de sessão encontrado, tentando restaurar sessão...");

    try {
        require_once __DIR__ . '/database.php';
        $db = getDB();
        $token = $_COOKIE['sessao_token'];

        // Busca sessão válida no banco
        $stmt = $db->prepare("
            SELECT s.*, u.*
            FROM sessoes s
            INNER JOIN usuarios u ON s.usuario_id = u.id
            WHERE s.token_sessao = ?
            AND s.data_expiracao > NOW()
            AND u.status = 'ativo'
            LIMIT 1
        ");
        $stmt->execute([$token]);
        $sessao = $stmt->fetch();

        if ($sessao) {
            // Restaura sessão do usuário
            $_SESSION['usuario_id'] = $sessao['id'];
            $_SESSION['usuario_nome'] = $sessao['nome'];
            $_SESSION['usuario_email'] = $sessao['email'];
            $_SESSION['usuario_tipo'] = $sessao['tipo_usuario'];
            $_SESSION['usuario_foto'] = $sessao['foto_perfil'];

            error_log("Sessão restaurada com sucesso - Usuario: {$sessao['nome']} (ID: {$sessao['id']})");

            // Atualiza último acesso
            $stmt = $db->prepare("UPDATE usuarios SET ultimo_acesso = NOW() WHERE id = ?");
            $stmt->execute([$sessao['id']]);

            // Renova a sessão por mais 30 dias
            $nova_expiracao = date('Y-m-d H:i:s', strtotime('+30 days'));
            $stmt = $db->prepare("UPDATE sessoes SET data_expiracao = ? WHERE id = ?");
            $stmt->execute([$nova_expiracao, $sessao['id']]);

            // Renova o cookie também
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

            return true;
        } else {
            // Token inválido ou expirado, remove cookie
            error_log("Token de sessão inválido ou expirado");
            setcookie('sessao_token', '', time() - 3600, '/');
            return false;
        }
    } catch (Exception $e) {
        error_log("Erro ao verificar sessão: " . $e->getMessage());
        return false;
    }
}

/**
 * Verifica se usuário está logado
 * @return bool
 */
function estaLogado()
{
    verificarSessao();
    return isset($_SESSION['usuario_id']);
}

/**
 * Obtém dados do usuário logado
 * @return array|null
 */
function getUsuarioLogado()
{
    if (!estaLogado()) {
        return null;
    }

    return [
        'id' => $_SESSION['usuario_id'],
        'nome' => $_SESSION['usuario_nome'],
        'email' => $_SESSION['usuario_email'],
        'tipo' => $_SESSION['usuario_tipo'],
        'foto' => $_SESSION['usuario_foto'] ?? 'img/avatars/avatar-vazio.svg'
    ];
}

/**
 * Requer autenticação - redireciona para login se não estiver logado
 */
function requerAutenticacao()
{
    if (!estaLogado()) {
        header('Location: login.php');
        exit;
    }
}

// Verifica sessão automaticamente
verificarSessao();
