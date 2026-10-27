<?php
/**
 * ========================================
 * GOOGLE OAUTH - CONFIGURAÇÃO
 * PositiveSense - Login com Google
 * ========================================
 *
 * Para usar:
 * 1. Crie um projeto em https://console.cloud.google.com/
 * 2. Gere credenciais OAuth 2.0 (Web Application)
 * 3. Adicione as URIs autorizadas:
 *    - http://localhost:8000/tcc/google_auth.php
 *    - http://localhost:8000/tcc/google_callback.php
 *    - Seu domínio em produção
 * 4. Copie Client ID e Client Secret para as variáveis abaixo
 */

// ========================================
// CONFIGURAÇÕES (ALTERAR COM SEUS VALORES)
// ========================================

define('GOOGLE_CLIENT_ID', 'SEU_CLIENT_ID_AQUI.apps.googleusercontent.com');
define('GOOGLE_CLIENT_SECRET', 'SEU_CLIENT_SECRET_AQUI');
define('GOOGLE_REDIRECT_URI', 'http://localhost:8000/tcc/google_callback.php');

// OAuth 2.0 endpoints
define('GOOGLE_AUTH_URL', 'https://accounts.google.com/o/oauth2/v2/auth');
define('GOOGLE_TOKEN_URL', 'https://oauth2.googleapis.com/token');
define('GOOGLE_USERINFO_URL', 'https://www.googleapis.com/oauth2/v2/userinfo');

// ========================================
// FUNÇÃO: Iniciar autenticação com Google
// ========================================

function iniciar_auth_google() {
    $scopes = [
        'openid',
        'profile',
        'email'
    ];

    $auth_url = GOOGLE_AUTH_URL . '?' . http_build_query([
        'client_id' => GOOGLE_CLIENT_ID,
        'redirect_uri' => GOOGLE_REDIRECT_URI,
        'response_type' => 'code',
        'scope' => implode(' ', $scopes),
        'access_type' => 'offline',
        'prompt' => 'consent'
    ]);

    return $auth_url;
}

// ========================================
// FUNÇÃO: Trocar código por token
// ========================================

function trocar_codigo_por_token($code) {
    $ch = curl_init(GOOGLE_TOKEN_URL);

    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'client_id' => GOOGLE_CLIENT_ID,
            'client_secret' => GOOGLE_CLIENT_SECRET,
            'code' => $code,
            'redirect_uri' => GOOGLE_REDIRECT_URI,
            'grant_type' => 'authorization_code'
        ]),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_TIMEOUT => 30
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200) {
        return json_decode($response, true);
    }

    return null;
}

// ========================================
// FUNÇÃO: Obter informações do usuário
// ========================================

function obter_info_usuario_google($accessToken) {
    $ch = curl_init(GOOGLE_USERINFO_URL);

    curl_setopt_array($ch, [
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $accessToken
        ],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_TIMEOUT => 30
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200) {
        return json_decode($response, true);
    }

    return null;
}

// ========================================
// FUNÇÃO: Processar login do Google
// ========================================

function processar_login_google($code) {
    try {
        // 1. Trocar código por token
        $tokenData = trocar_codigo_por_token($code);
        if (!$tokenData || !isset($tokenData['access_token'])) {
            throw new Exception('Erro ao obter token de acesso');
        }

        // 2. Obter informações do usuário
        $userInfo = obter_info_usuario_google($tokenData['access_token']);
        if (!$userInfo) {
            throw new Exception('Erro ao obter informações do usuário');
        }

        return [
            'success' => true,
            'usuario' => [
                'id' => $userInfo['id'] ?? null,
                'nome' => $userInfo['name'] ?? '',
                'email' => $userInfo['email'] ?? '',
                'foto' => $userInfo['picture'] ?? '',
                'verificado' => $userInfo['verified_email'] ?? false
            ],
            'token' => $tokenData['access_token'] ?? null,
            'refresh_token' => $tokenData['refresh_token'] ?? null,
            'expires_in' => $tokenData['expires_in'] ?? null
        ];

    } catch (Exception $e) {
        return [
            'success' => false,
            'erro' => $e->getMessage()
        ];
    }
}

?>
