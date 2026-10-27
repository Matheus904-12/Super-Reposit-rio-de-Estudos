<?php

/**
 * Teste end-to-end: verifica jogo.php, chatbot_api.php e api/ai_game_info.php
 * Executar: php scripts/test_c_and_d.php
 */

function http_get($url)
{
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $body = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);
    return ['code' => $code, 'body' => $body, 'error' => $err];
}

function http_post_json($url, $data)
{
    $ch = curl_init($url);
    $payload = json_encode($data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    $body = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);
    return ['code' => $code, 'body' => $body, 'error' => $err];
}

$base = 'http://localhost:8000';

echo "Teste C e D - iniciando...\n";

$all_ok = true;

// 1) Verificar jogo.php (deve carregar e conter 'Central de Jogos' ou '🎮 Central de Jogos')
echo "1) Verificando /jogo.php ...\n";
$res = http_get($base . '/jogo.php');
if ($res['code'] !== 200) {
    echo "  ERRO: /jogo.php retornou HTTP {$res['code']}\n";
    $all_ok = false;
} else {
    if (strpos($res['body'], 'Central de Jogos') !== false || strpos($res['body'], '🎮 Central de Jogos') !== false) {
        echo "  OK: Conteúdo esperado encontrado em /jogo.php\n";
    } else {
        echo "  AVISO: Texto esperado não encontrado em /jogo.php (verifique visualmente)\n";
        $all_ok = false;
    }
}

// 2) Consultar chatbot_api.php
echo "2) Chamando /chatbot_api.php com pergunta sobre Jogo da Memória...\n";
$question = 'Como o Jogo da Memória ajuda pessoas com autismo?';
$res2 = http_post_json($base . '/chatbot_api.php', ['question' => $question]);
if ($res2['code'] !== 200) {
    echo "  ERRO: chatbot_api retornou HTTP {$res2['code']} (err: {$res2['error']})\n";
    $all_ok = false;
} else {
    $json = json_decode($res2['body'], true);
    if (!$json || !isset($json['success'])) {
        echo "  ERRO: resposta inválida do chatbot_api.php\n";
        $all_ok = false;
    } else {
        if ($json['success']) {
            echo "  OK: chatbot_api respondeu com sucesso. Resposta (trecho): " . substr($json['response'], 0, 140) . "\n";
        } else {
            echo "  ERRO: chatbot_api devolveu success=false: " . ($json['message'] ?? '') . "\n";
            $all_ok = false;
        }
    }
}

// 3) Consultar nosso endpoint api/ai_game_info.php
echo "3) Consultando endpoint /api/ai_game_info.php?slug=jogo-memoria ...\n";
$res3 = http_get($base . '/api/ai_game_info.php?slug=jogo-memoria');
if ($res3['code'] !== 200) {
    echo "  ERRO: endpoint AI retornou HTTP {$res3['code']}\n";
    $all_ok = false;
} else {
    $j = json_decode($res3['body'], true);
    if (!$j || empty($j['success'])) {
        echo "  ERRO: resposta inválida do endpoint AI\n";
        $all_ok = false;
    } else {
        echo "  OK: endpoint retornou dados para slug 'jogo-memoria'. Título: " . ($j['data']['titulo'] ?? '(sem título)') . "\n";
    }
}

if ($all_ok) {
    echo "\nTODOS OS TESTES PASSARAM ✅\n";
    exit(0);
} else {
    echo "\nALGUNS TESTES FALHARAM ❌ - verifique as mensagens acima e corrija os problemas\n";
    exit(1);
}
