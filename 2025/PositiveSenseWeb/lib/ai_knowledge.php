<?php

/**
 * Loader simples para o conhecimento usado pela IA (arquivo JSON em data/ai_knowledge_autismo.json)
 * Retorna array decodificado pronto para uso em conversas ou para alimentar um modelo local.
 */

function load_ai_knowledge()
{
    $path = __DIR__ . '/../data/ai_knowledge_autismo.json';
    if (!file_exists($path)) {
        return null;
    }

    $json = file_get_contents($path);
    $data = json_decode($json, true);
    return $data;
}

// Função auxiliar para buscar informações de um jogo pelo slug
function ai_get_game_info($slug)
{
    $data = load_ai_knowledge();
    if (!$data || !isset($data['jogos'])) return null;

    $slug = strtolower($slug);
    $slug = str_replace([' ', '_'], '-', $slug);

    return $data['jogos'][$slug] ?? null;
}
