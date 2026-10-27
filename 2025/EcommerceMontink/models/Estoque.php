<?php
require_once __DIR__ . '/../config/conexao.php';

class Estoque {
    public static function porProduto($produto_id) {
        global $pdo;
        $stmt = $pdo->prepare('SELECT * FROM estoque WHERE produto_id = ?');
        $stmt->execute([$produto_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function criar($produto_id, $variacao, $quantidade) {
        global $pdo;
        $stmt = $pdo->prepare('INSERT INTO estoque (produto_id, variacao, quantidade) VALUES (?, ?, ?)');
        return $stmt->execute([$produto_id, $variacao, $quantidade]);
    }

    public static function atualizarOuCriar($produto_id, $variacao, $quantidade) {
        global $pdo;
        $stmt = $pdo->prepare('SELECT id FROM estoque WHERE produto_id = ? AND variacao = ?');
        $stmt->execute([$produto_id, $variacao]);
        $existe = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($existe) {
            $stmt = $pdo->prepare('UPDATE estoque SET quantidade = ? WHERE id = ?');
            return $stmt->execute([$quantidade, $existe['id']]);
        } else {
            return self::criar($produto_id, $variacao, $quantidade);
        }
    }
} 