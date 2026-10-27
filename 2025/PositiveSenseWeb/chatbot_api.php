<?php

/**
 * ========================================
 * CHATBOT API - PROCESSAMENTO DE PERGUNTAS
 * PositiveSense - Sistema de IA para TEA
 * ========================================
 */

// Headers para CORS e JSON
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Responde a requisições OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Apenas aceita POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Método não permitido. Use POST.'
    ]);
    exit;
}

// Obtém a pergunta do usuário
$input = json_decode(file_get_contents('php://input'), true);
$question = $input['question'] ?? '';

if (empty($question)) {
    echo json_encode([
        'success' => false,
        'message' => 'Pergunta não fornecida'
    ]);
    exit;
}

/**
 * Função para gerar resposta usando IA
 * Integra com base de conhecimento expandida sobre TEA e jogos
 */
function generateAIResponse($question)
{
    $question_lower = mb_strtolower(trim($question), 'UTF-8');

    // Carrega base de conhecimento do JSON
    $kb = loadKnowledgeBase();

    // Base de conhecimento básica (fallback)
    $knowledgeBase = [
        // Informações sobre TEA
        'tea' => $kb['autismo']['descricao'] ?? 'O Transtorno do Espectro Autista (TEA) é uma condição de desenvolvimento neurológico que afeta a comunicação, interação social e comportamento.',

        'autismo' => $kb['autismo']['descricao'] ?? 'O autismo é uma condição neurológica que faz parte do neurodesenvolvimento. Pessoas autistas têm uma forma diferente de processar informações.',

        'caracteristicas' => 'Características do TEA incluem: ' . implode(', ', $kb['autismo']['caracteristicas'] ?? []),

        'sintomas' => 'Os sintomas do TEA incluem: dificuldades na comunicação verbal e não-verbal, dificuldade em interações sociais, comportamentos repetitivos, interesses restritos, sensibilidade sensorial, e dificuldade com mudanças na rotina.',

        'mitos' => 'Mitos sobre autismo: ' . implode('. ', $kb['autismo']['mitos'] ?? []),

        'vacina' => 'IMPORTANTE: Vacinas NÃO causam autismo! Este é um mito completamente desmentido pela ciência. Estudos extensivos provam que não há relação entre vacinas e autismo.',

        'causas' => 'As causas do TEA são multifatoriais, envolvendo fatores genéticos e ambientais. Não há uma causa única conhecida. Vacinas NÃO causam autismo.',

        'tratamento' => 'Apoios para TEA incluem: ' . implode(', ', $kb['autismo']['apoio'] ?? ['terapia comportamental', 'terapia ocupacional', 'fonoaudiologia']),

        'terapia' => 'As terapias para TEA incluem: ABA (Applied Behavior Analysis), terapia ocupacional, fonoaudiologia, psicoterapia, e em alguns casos, medicamentos para sintomas específicos. A intervenção precoce é fundamental.',

        'escola' => 'Crianças com TEA têm direito à educação inclusiva. É importante que a escola ofereça suporte adequado, com profissionais capacitados, adaptações necessárias e um ambiente acolhedor.',

        'familia' => 'Para famílias: busquem informação confiável, conectem-se com outras famílias, cuidem da saúde mental de todos, celebrem as conquistas, e lembrem-se que cada pessoa com TEA tem talentos únicos.',

        'comunicação' => 'Pessoas com TEA podem se comunicar de diferentes formas: verbalmente, com apoio visual, linguagem de sinais, comunicação alternativa (CAA), ou outras formas. O importante é respeitar cada um.',

        'adultos' => 'Adultos com TEA podem ter vidas plenas e independentes. Muitos trabalham, estudam, têm relacionamentos e contribuem significativamente para a sociedade.',

        'sensorial' => 'Muitas pessoas com TEA têm sensibilidades sensoriais diferentes. Podem ser hipersensíveis (reagem fortemente) ou hipossensíveis (buscam mais estímulos). Respeitar essas diferenças é importante!',

        'rotina' => 'Rotinas previsíveis são muito importantes para muitas pessoas com TEA, pois trazem segurança e reduzem ansiedade. Mudanças podem ser desafiadoras, mas com preparação, podem ser gerenciadas.',

        // Informações sobre a plataforma
        'positivesense' => 'A PositiveSense é uma plataforma que oferece jogos educativos especialmente desenvolvidos para ajudar no desenvolvimento de crianças com TEA. Nossos jogos trabalham memória, emoções, lógica e muito mais!',

        'site' => 'Nosso site oferece diversos jogos: Jogo da Memória, Jogo da Velha, Genius (Sequência), Caça Palavras, Fruit Ninja e Quebra-Cabeça. Todos com interface amigável e desenvolvidos pensando em crianças com TEA.',

        'jogos' => 'Oferecemos 6 jogos educativos: 🧠 Jogo da Memória, ⭕ Jogo da Velha, 🎵 Genius, 🔤 Caça Palavras, 🍎 Fruit Ninja, e 🧩 Quebra-Cabeça. Cada um trabalha habilidades específicas!',
    ];

    // Adiciona informações específicas de cada jogo
    if (isset($kb['jogos']) && is_array($kb['jogos'])) {
        foreach ($kb['jogos'] as $slug => $gameData) {
            $normalizedSlug = str_replace('-', '', strtolower($slug));

            // Resposta completa sobre o jogo
            $gameInfo = "🎮 **{$gameData['titulo']}**\n\n";
            $gameInfo .= "📝 {$gameData['descricao']}\n\n";
            $gameInfo .= "📊 Dificuldade: {$gameData['nivel_dificuldade']}\n\n";

            if (isset($gameData['habilidades_trabalhadas'])) {
                $gameInfo .= "💪 Habilidades trabalhadas:\n";
                foreach ($gameData['habilidades_trabalhadas'] as $hab) {
                    $gameInfo .= "• $hab\n";
                }
                $gameInfo .= "\n";
            }

            if (isset($gameData['beneficios'])) {
                $gameInfo .= "✨ Benefícios para TEA:\n";
                foreach ($gameData['beneficios'] as $ben) {
                    $gameInfo .= "• $ben\n";
                }
                $gameInfo .= "\n";
            }

            if (isset($gameData['adaptacoes_tea'])) {
                $gameInfo .= "🔧 Dicas de adaptação:\n";
                foreach ($gameData['adaptacoes_tea'] as $adap) {
                    $gameInfo .= "• $adap\n";
                }
                $gameInfo .= "\n";
            }

            if (isset($gameData['quando_usar'])) {
                $gameInfo .= "⏰ Quando usar: {$gameData['quando_usar']}";
            }

            $knowledgeBase[$normalizedSlug] = $gameInfo;

            // Adiciona variações do nome
            $knowledgeBase[strtolower($gameData['titulo'])] = $gameInfo;
        }
    }

    // Adiciona dicas gerais
    if (isset($kb['dicas_uso_plataforma'])) {
        $knowledgeBase['dicas'] = "📚 Dicas de uso:\n\n" .
            "👩‍🏫 Para professores: " . implode(', ', $kb['dicas_uso_plataforma']['professores']) . "\n\n" .
            "🩺 Para terapeutas: " . implode(', ', $kb['dicas_uso_plataforma']['terapeutas']) . "\n\n" .
            "👨‍👩‍👧 Para famílias: " . implode(', ', $kb['dicas_uso_plataforma']['familias']);
    }

    // Perguntas sobre jogos específicos
    $gameKeywords = [
        'memoria' => 'jogomemoria',
        'velha' => 'jogodavelha',
        'sequencia' => 'jogodasequencia',
        'genius' => 'jogodasequencia',
        'caca' => 'cacapalavras',
        'palavras' => 'cacapalavras',
        'fruit' => 'fruitninja',
        'ninja' => 'fruitninja',
        'quebra' => 'quebracabeca',
        'puzzle' => 'quebracabeca'
    ];

    foreach ($gameKeywords as $keyword => $gameSlug) {
        if (strpos($question_lower, $keyword) !== false && isset($knowledgeBase[$gameSlug])) {
            return $knowledgeBase[$gameSlug];
        }
    }

    // Perguntas gerais e conversas casuais
    $casualResponses = [
        'oi' => 'Olá! 👋 Sou o assistente virtual da PositiveSense! Como posso ajudá-lo hoje?',

        'ola' => 'Olá! 😊 Estou aqui para responder suas dúvidas sobre TEA e nossos jogos educativos!',

        'quem' => 'Sou o assistente virtual da PositiveSense! 🤖 Estou aqui para ajudar com dúvidas sobre TEA (Transtorno do Espectro Autista) e nossos jogos educativos. Posso explicar sobre cada jogo, dar dicas de uso e responder perguntas sobre autismo!',

        'nome' => 'Pode me chamar de Assistente TEA! 😊 Estou aqui para ajudar você. O que gostaria de saber?',

        'idade' => 'Sou um assistente virtual, então não tenho idade como humanos! Mas estou sempre aprendendo e me atualizando para ajudar melhor. 🤖',

        'legal' => 'Que bom que você gostou! 😊 Estou aqui para ajudar sempre que precisar!',

        'obrigado' => 'Por nada! 🌟 Fico feliz em ajudar! Se tiver mais perguntas, estou aqui!',

        'ajuda' => 'Posso ajudar com:\n\n🧠 Informações sobre TEA e autismo\n🎮 Explicações sobre nossos jogos\n💡 Dicas de uso e adaptações\n📚 Benefícios de cada atividade\n👨‍👩‍👧 Orientações para famílias e educadores\n\nSobre o que você gostaria de saber?',

        'conversar' => 'Claro! Adoro conversar! 💬 Sobre o que você gostaria de falar? Posso falar sobre TEA, autismo, os jogos da PositiveSense ou dar dicas educacionais!',

        'bom dia' => 'Bom dia! ☀️ Como posso ajudá-lo hoje?',

        'boa tarde' => 'Boa tarde! 🌤️ Em que posso ser útil?',

        'boa noite' => 'Boa noite! 🌙 Como posso ajudar?',
    ];

    // Busca em respostas casuais primeiro
    foreach ($casualResponses as $keyword => $response) {
        if (strpos($question_lower, $keyword) !== false) {
            return $response;
        }
    }

    // Busca na base de conhecimento
    foreach ($knowledgeBase as $keyword => $response) {
        if (strpos($question_lower, $keyword) !== false) {
            return $response;
        }
    }

    // Respostas para perguntas sobre benefícios
    if (strpos($question_lower, 'beneficio') !== false || strpos($question_lower, 'ajuda') !== false) {
        if (isset($kb['beneficios_gerais_jogos'])) {
            return "🌟 Benefícios gerais dos jogos para crianças com TEA:\n\n" .
                "🧠 Cognitivos: " . implode(', ', $kb['beneficios_gerais_jogos']['cognitivos']) . "\n\n" .
                "❤️ Socioemocionais: " . implode(', ', $kb['beneficios_gerais_jogos']['socioemocionais']) . "\n\n" .
                "👁️ Sensoriais: " . implode(', ', $kb['beneficios_gerais_jogos']['sensoriais']);
        }
    }

    // Se não encontrar correspondência exata
    if (strlen($question_lower) < 5) {
        return 'Hmm, não entendi muito bem. Pode reformular sua pergunta? 🤔 Estou aqui para responder sobre TEA, autismo e os recursos da PositiveSense!';
    }

    // Resposta padrão mais amigável e útil
    return "🤔 Essa é uma ótima pergunta! Embora eu não tenha informações específicas sobre isso, posso ajudá-lo com:\n\n" .
        "📖 **Sobre TEA:**\n" .
        "• O que é autismo e suas características\n" .
        "• Mitos e verdades sobre TEA\n" .
        "• Terapias e apoios disponíveis\n" .
        "• Educação inclusiva\n\n" .
        "🎮 **Sobre nossos jogos:**\n" .
        "• Jogo da Memória - memória e atenção\n" .
        "• Jogo da Velha - lógica e turnos\n" .
        "• Genius - sequências e padrões\n" .
        "• Caça Palavras - vocabulário\n" .
        "• Fruit Ninja - coordenação motora\n" .
        "• Quebra-Cabeça - resolução de problemas\n\n" .
        "💡 **Dicas e orientações:**\n" .
        "• Como usar os jogos\n" .
        "• Adaptações para TEA\n" .
        "• Benefícios de cada atividade\n\n" .
        "Pergunte sobre qualquer um desses tópicos! 😊";
}

/**
 * Carrega base de conhecimento do arquivo JSON
 */
function loadKnowledgeBase()
{
    $kb_file = __DIR__ . '/data/ai_knowledge_autismo.json';

    if (file_exists($kb_file)) {
        $content = file_get_contents($kb_file);
        $kb = json_decode($content, true);

        if ($kb && json_last_error() === JSON_ERROR_NONE) {
            return $kb;
        }
    }

    // Retorna estrutura vazia se não conseguir carregar
    return [
        'autismo' => ['descricao' => '', 'caracteristicas' => [], 'mitos' => [], 'apoio' => []],
        'jogos' => [],
        'beneficios_gerais_jogos' => [],
        'dicas_uso_plataforma' => []
    ];
}

try {
    // Gera resposta
    $response = generateAIResponse($question);

    // Registra a pergunta (opcional - para análise futura)
    logQuestion($question, $response);

    echo json_encode([
        'success' => true,
        'response' => $response
    ]);
} catch (Exception $e) {
    error_log("Erro no chatbot: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Desculpe, não consegui processar sua pergunta no momento.'
    ]);
}

/**
 * Registra perguntas para análise (opcional)
 */
function logQuestion($question, $response)
{
    $logFile = __DIR__ . '/logs/chatbot_questions.log';
    $logDir = dirname($logFile);

    if (!file_exists($logDir)) {
        mkdir($logDir, 0777, true);
    }

    $timestamp = date('Y-m-d H:i:s');
    $logEntry = sprintf(
        "[%s] Pergunta: %s | Resposta: %s\n",
        $timestamp,
        $question,
        substr($response, 0, 100) . '...'
    );

    file_put_contents($logFile, $logEntry, FILE_APPEND);
}
