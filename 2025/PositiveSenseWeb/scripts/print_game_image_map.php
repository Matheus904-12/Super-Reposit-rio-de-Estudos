<?php
// script para imprimir qual arquivo de imagem será escolhido para cada jogo
// Execução: php scripts/print_game_image_map.php

$games = [
    ['title' => 'Jogo da Memória', 'url' => 'jogo-memoria.php'],
    ['title' => 'Jogo da Velha', 'url' => 'jogodavelha.php'],
    ['title' => 'Sequência', 'url' => 'jogodasequencia.php'],
    ['title' => 'Caça Palavras', 'url' => 'cacapalavras.php'],
    ['title' => 'Fruit Ninja', 'url' => 'fruitninja.php'],
    ['title' => 'Quebra-Cabeça', 'url' => 'quebracabeca.php']
];

$dir = __DIR__ . '/../img/games/';
$fallback = 'img/mascote.gif';
$exts = ['.jpeg', '.jpg', '.png', '.svg'];

$generate_slug_variants = function ($s) {
    $variants = [];
    $variants[] = $s;
    $variants[] = str_replace('-', '', $s);
    $variants[] = str_replace('-', '_', $s);
    $ascii = @iconv('UTF-8', 'ASCII//TRANSLIT', $s);
    if ($ascii && $ascii !== $s) {
        $variants[] = $ascii;
        $variants[] = str_replace('-', '', $ascii);
        $variants[] = str_replace('-', '_', $ascii);
    }
    $variants = array_map('trim', $variants);
    $variants = array_values(array_unique($variants));
    return $variants;
};

// Mesmo mapa explícito usado em jogo.php — se você alterar o mapa aí, atualize aqui também
$explicit_image_map = [
    'jogo-memoria' => 'img/games/jogomemoria.jpeg',
    'jogodavelha' => 'img/games/jogodavelha.jpeg',
    'jogodasequencia' => 'img/games/sequencia.jpeg',
    'cacapalavras' => 'img/games/caçapalavras.jpeg',
    'fruitninja' => 'img/games/fruitninja.svg',
    'quebracabeca' => 'img/games/quebracabeca.svg'
];

foreach ($games as $g) {
    $slug = pathinfo($g['url'], PATHINFO_FILENAME);
    // Primeiro verifica mapa explícito
    $found = null;
    if (isset($explicit_image_map[$slug]) && file_exists(__DIR__ . '/../' . $explicit_image_map[$slug])) {
        $found = $explicit_image_map[$slug];
    } else {
        $variants = $generate_slug_variants($slug);
        foreach ($variants as $v) {
            foreach ($exts as $ext) {
                $candidate = $dir . $v . $ext;
                if (file_exists($candidate)) {
                    $found = 'img/games/' . $v . $ext;
                    break 2;
                }
            }
        }
        if (!$found) $found = $fallback;
    }

    echo str_pad($slug, 20) . " -> " . $found . PHP_EOL;
}
