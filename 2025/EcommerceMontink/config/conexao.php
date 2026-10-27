<?php
// Conexão com o banco de dados PostgreSQL (Supabase) usando PDO
$config = require __DIR__ . '/config.php';

try {
    $pdo = new PDO(
        'pgsql:host=' . $config['host'] .
        ';port=' . $config['porta'] .
        ';dbname=' . $config['banco'],
        $config['usuario'],
        $config['senha']
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Erro ao conectar ao banco de dados: ' . $e->getMessage());
} 