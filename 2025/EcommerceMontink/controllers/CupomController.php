<?php
require_once __DIR__ . '/../models/Cupom.php';

class CupomController {
    public function listar() {
        $cupons = Cupom::todos();
        require __DIR__ . '/../views/cupons/listar.php';
    }
    public function criar() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $codigo = $_POST['codigo'] ?? '';
            $valor_desconto = $_POST['valor_desconto'] ?? 0;
            $valor_minimo = $_POST['valor_minimo'] ?? 0;
            $validade = $_POST['validade'] ?? '';
            Cupom::criar($codigo, $valor_desconto, $valor_minimo, $validade);
            header('Location: /cupons');
            exit;
        }
        require __DIR__ . '/../views/cupons/form.php';
    }
    public function editar($id) {
        $cupom = Cupom::buscar($id);
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $codigo = $_POST['codigo'] ?? '';
            $valor_desconto = $_POST['valor_desconto'] ?? 0;
            $valor_minimo = $_POST['valor_minimo'] ?? 0;
            $validade = $_POST['validade'] ?? '';
            Cupom::atualizar($id, $codigo, $valor_desconto, $valor_minimo, $validade);
            header('Location: /cupons');
            exit;
        }
        require __DIR__ . '/../views/cupons/form.php';
    }
    public function deletar($id) {
        Cupom::deletar($id);
        header('Location: /cupons');
        exit;
    }
} 