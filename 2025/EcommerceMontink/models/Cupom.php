<?php
require_once __DIR__ . '/../config/conexao.php';

class Cupom {
    public static function todos() {
        global $pdo;
        $stmt = $pdo->query('SELECT * FROM cupons ORDER BY validade DESC');
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public static function criar($codigo, $valor_desconto, $valor_minimo, $validade) {
        global $pdo;
        $stmt = $pdo->prepare('INSERT INTO cupons (codigo, valor_desconto, valor_minimo, validade) VALUES (?, ?, ?, ?)');
        return $stmt->execute([$codigo, $valor_desconto, $valor_minimo, $validade]);
    }
    public static function buscar($id) {
        global $pdo;
        $stmt = $pdo->prepare('SELECT * FROM cupons WHERE id = ?');
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    public static function atualizar($id, $codigo, $valor_desconto, $valor_minimo, $validade) {
        global $pdo;
        $stmt = $pdo->prepare('UPDATE cupons SET codigo = ?, valor_desconto = ?, valor_minimo = ?, validade = ? WHERE id = ?');
        return $stmt->execute([$codigo, $valor_desconto, $valor_minimo, $validade, $id]);
    }
    public static function deletar($id) {
        global $pdo;
        $stmt = $pdo->prepare('DELETE FROM cupons WHERE id = ?');
        return $stmt->execute([$id]);
    }
    public static function validar($codigo, $subtotal) {
        global $pdo;
        $stmt = $pdo->prepare('SELECT * FROM cupons WHERE codigo = ? AND validade >= CURRENT_DATE AND valor_minimo <= ?');
        $stmt->execute([$codigo, $subtotal]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
} 