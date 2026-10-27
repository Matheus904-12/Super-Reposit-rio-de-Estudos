<?php
require_once __DIR__ . '/../config/conexao.php';

class Produto {
    public static function todos() {
        global $pdo;
        $stmt = $pdo->query('SELECT * FROM produtos');
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function criar($nome, $preco) {
        global $pdo;
        $stmt = $pdo->prepare('INSERT INTO produtos (nome, preco) VALUES (?, ?)');
        $stmt->execute([$nome, $preco]);
        return $pdo->lastInsertId();
    }

    public static function buscar($id) {
        global $pdo;
        $stmt = $pdo->prepare('SELECT * FROM produtos WHERE id = ?');
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function atualizar($id, $nome, $preco) {
        global $pdo;
        $stmt = $pdo->prepare('UPDATE produtos SET nome = ?, preco = ? WHERE id = ?');
        return $stmt->execute([$nome, $preco, $id]);
    }
} 