<?php
// Script para obter o access_token do Bling via OAuth2 Client Credentials e salvar no bling_api.json

$clientId = 'REMOVIDO_CLIENT_ID';
$clientSecret = 'REMOVIDO_CLIENT_SECRET';
$url = 'https://auth.bling.com.br/oauth/token';

$data = [
    'grant_type' => 'client_credentials',
    'client_id' => $clientId,
    'client_secret' => $clientSecret
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/x-www-form-urlencoded'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
if (curl_errno($ch)) {
    die('Erro cURL: ' . curl_error($ch));
}
curl_close($ch);

$result = json_decode($response, true);
if ($httpCode >= 400 || empty($result['access_token'])) {
    die('Erro ao obter token: ' . ($result['error_description'] ?? $response));
}

$token = $result['access_token'];

// Salva o token no arquivo bling_api.json
$configPath = __DIR__ . '/bling_api.json';
$config = [ 'api_token' => $token ];
file_put_contents($configPath, json_encode($config, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

echo "Token salvo com sucesso em bling_api.json!\n";
