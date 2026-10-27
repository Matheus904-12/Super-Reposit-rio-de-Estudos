<?php
/**
 * Configurações do Google OAuth 2.0.
 * Credenciais devem ser configuradas no ambiente, nunca no código versionado.
 */
return [
    'client_id' => getenv('GOOGLE_CLIENT_ID') ?: ($_ENV['GOOGLE_CLIENT_ID'] ?? ''),
    'client_secret' => getenv('GOOGLE_CLIENT_SECRET') ?: ($_ENV['GOOGLE_CLIENT_SECRET'] ?? ''),
    'redirect_uri' => getenv('GOOGLE_REDIRECT_URI') ?: ($_ENV['GOOGLE_REDIRECT_URI'] ?? 'http://localhost:8000/processar_login_google.php'),
    'auth_uri' => 'https://accounts.google.com/o/oauth2/auth',
    'token_uri' => 'https://oauth2.googleapis.com/token',
    'userinfo_uri' => 'https://www.googleapis.com/oauth2/v2/userinfo',
    'scopes' => [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
    ],
];
