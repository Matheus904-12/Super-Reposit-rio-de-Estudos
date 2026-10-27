<?php

/**
 * ========================================
 * CRIAR TABELA SESSOES NO TIDB CLOUD
 * ========================================
 *
 * Execute este arquivo UMA VEZ para criar a tabela sessoes
 */

require_once __DIR__ . '/config/database.php';

header('Content-Type: text/html; charset=utf-8');

echo "<!DOCTYPE html>
<html lang='pt-BR'>
<head>
    <meta charset='UTF-8'>
    <title>Criar Tabela Sessoes</title>
    <style>
        body { font-family: monospace; padding: 20px; background: #1e1e1e; color: #d4d4d4; }
        .success { color: #4ec9b0; font-weight: bold; }
        .error { color: #f48771; font-weight: bold; }
        .warning { color: #dcdcaa; font-weight: bold; }
        pre { background: #2d2d2d; padding: 15px; border-radius: 8px; overflow-x: auto; }
        h1 { color: #569cd6; }
        hr { border-color: #444; margin: 20px 0; }
    </style>
</head>
<body>
<h1>🔧 Criar Tabela 'sessoes' no TiDB Cloud</h1>";

try {
    $db = getDB();
    echo "<p class='success'>✅ Conectado ao banco: " . DB_NAME . "</p>";
    echo "<p>Host: " . DB_HOST . "</p>";
    echo "<p>Ambiente: " . DB_ENV . "</p>";
    echo "<hr>";

    // Verifica se a tabela já existe
    echo "<h2>1️⃣ Verificando se tabela 'sessoes' existe...</h2>";
    try {
        $stmt = $db->query("SELECT COUNT(*) FROM sessoes");
        echo "<p class='warning'>⚠️ Tabela 'sessoes' JÁ EXISTE no banco!</p>";
        $count = $stmt->fetchColumn();
        echo "<p>Total de registros: $count</p>";
    } catch (PDOException $e) {
        echo "<p class='error'>❌ Tabela 'sessoes' NÃO EXISTE. Criando agora...</p>";
        echo "<hr>";

        // SQL para criar a tabela
        $sql = "
CREATE TABLE sessoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    token_sessao VARCHAR(255) NOT NULL UNIQUE,
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_expiracao TIMESTAMP NOT NULL,
    INDEX idx_usuario_id (usuario_id),
    INDEX idx_token_sessao (token_sessao),
    INDEX idx_data_expiracao (data_expiracao),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

        echo "<h2>2️⃣ Executando SQL...</h2>";
        echo "<pre>" . htmlspecialchars($sql) . "</pre>";

        $db->exec($sql);

        echo "<p class='success'>✅ Tabela 'sessoes' criada com SUCESSO!</p>";
        echo "<hr>";

        // Verifica a estrutura da tabela criada
        echo "<h2>3️⃣ Estrutura da Tabela 'sessoes':</h2>";
        $stmt = $db->query("DESCRIBE sessoes");
        echo "<pre>";
        echo str_pad("Campo", 20) . str_pad("Tipo", 25) . str_pad("Nulo", 10) . str_pad("Chave", 10) . "Padrão\n";
        echo str_repeat("-", 80) . "\n";
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            echo str_pad($row['Field'], 20) .
                str_pad($row['Type'], 25) .
                str_pad($row['Null'], 10) .
                str_pad($row['Key'], 10) .
                ($row['Default'] ?? 'NULL') . "\n";
        }
        echo "</pre>";
    }

    echo "<hr>";
    echo "<h2>✅ PRONTO! Tabela 'sessoes' está disponível!</h2>";
    echo "<p>Agora você pode:</p>";
    echo "<ul>";
    echo "<li><a href='teste_login.php' style='color: #4ec9b0;'>🔐 Testar Login novamente</a></li>";
    echo "<li><a href='login.php' style='color: #4ec9b0;'>🚀 Fazer Login normal</a></li>";
    echo "<li><a href='verificar_banco.php' style='color: #4ec9b0;'>📊 Verificar Banco de Dados</a></li>";
    echo "</ul>";
} catch (PDOException $e) {
    echo "<p class='error'>❌ ERRO ao conectar ou criar tabela:</p>";
    echo "<pre>" . htmlspecialchars($e->getMessage()) . "</pre>";
    echo "<pre>" . htmlspecialchars($e->getTraceAsString()) . "</pre>";
}

echo "</body></html>";
