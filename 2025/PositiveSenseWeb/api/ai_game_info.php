<?php

/**
 * API simples para expor informações da base de conhecimento da IA
 * Parâmetros:
 *  - slug (opcional): slug do jogo (ex: jogo-memoria). Se ausente, retorna toda a base.
 */
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../lib/ai_knowledge.php';

$slug = $_GET['slug'] ?? null;

$data = load_ai_knowledge();
if (!$data) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Knowledge base not found']);
    exit;
}

if ($slug) {
    $norm = strtolower(str_replace(['_', ' '], '-', $slug));
    // tentativa direta
    $info = ai_get_game_info($norm);

    // tentativa com variações (ex: jogo-memoria -> jogo-da-memoria)
    if (!$info) {
        if (strpos($norm, 'jogo-') === 0) {
            $candidate = str_replace('jogo-', 'jogo-da-', $norm);
            $info = ai_get_game_info($candidate);
            if ($info) $norm = $candidate;
        }
    }

    // busca por aproximação: procura chave que contenha o slug ou vice-versa
    if (!$info && isset($data['jogos']) && is_array($data['jogos'])) {
        foreach ($data['jogos'] as $key => $g) {
            if (strpos($key, $norm) !== false || strpos($norm, $key) !== false) {
                $info = $g;
                $norm = $key;
                break;
            }
        }
    }

    if (!$info) {
        echo json_encode(['success' => false, 'message' => 'Game info not found for slug: ' . $slug]);
        exit;
    }

    echo json_encode(['success' => true, 'slug' => $norm, 'data' => $info]);
    exit;
}

// return full dataset
echo json_encode(['success' => true, 'data' => $data]);
