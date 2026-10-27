<?php
require_once __DIR__ . '/../config/conexao.php';

class Pedido {
    public static function criar($nome, $email, $cep, $endereco, $subtotal, $frete, $total, $itens) {
        global $pdo;
        session_start();
        $cupom_id = null;
        if (!empty($_SESSION['cupom'])) {
            require_once __DIR__ . '/Cupom.php';
            $cupom = Cupom::validar($_SESSION['cupom'], $subtotal);
            if ($cupom) {
                $cupom_id = $cupom['id'];
            }
        }
        try {
            $pdo->beginTransaction();
            $stmt = $pdo->prepare('INSERT INTO pedidos (nome_cliente, email_cliente, cep, endereco, subtotal, frete, total, cupom_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
            $stmt->execute([$nome, $email, $cep, $endereco, $subtotal, $frete, $total, $cupom_id]);
            $pedido_id = $pdo->lastInsertId();
            foreach ($itens as $item) {
                $stmt = $pdo->prepare('INSERT INTO pedido_itens (pedido_id, produto_id, variacao, quantidade, preco_unitario) VALUES (?, ?, ?, ?, ?)');
                $stmt->execute([$pedido_id, $item['produto_id'], $item['variacao'], $item['quantidade'], self::buscarPreco($item['produto_id'])]);
                // Descontar estoque
                $stmt2 = $pdo->prepare('UPDATE estoque SET quantidade = quantidade - ? WHERE produto_id = ? AND variacao = ?');
                $stmt2->execute([$item['quantidade'], $item['produto_id'], $item['variacao']]);
            }
            $pdo->commit();
            return $pedido_id;
        } catch (Exception $e) {
            $pdo->rollBack();
            return false;
        }
    }
    private static function buscarPreco($produto_id) {
        global $pdo;
        $stmt = $pdo->prepare('SELECT preco FROM produtos WHERE id = ?');
        $stmt->execute([$produto_id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ? $row['preco'] : 0;
    }
    public static function remover($id) {
        global $pdo;
        $stmt = $pdo->prepare('DELETE FROM pedidos WHERE id = ?');
        return $stmt->execute([$id]);
    }
    public static function atualizarStatus($id, $status) {
        global $pdo;
        $stmt = $pdo->prepare('UPDATE pedidos SET status = ? WHERE id = ?');
        return $stmt->execute([$status, $id]);
    }
} 