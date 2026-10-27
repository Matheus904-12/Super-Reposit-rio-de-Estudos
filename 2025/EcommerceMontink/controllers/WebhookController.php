<?php
require_once __DIR__ . '/../models/Pedido.php';

class WebhookController {
    public function receber() {
        // Recebe dados JSON
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        if (!isset($data['id']) || !isset($data['status'])) {
            http_response_code(400);
            echo json_encode(['erro' => 'Dados inválidos']);
            exit;
        }
        $id = $data['id'];
        $status = $data['status'];
        if (strtolower($status) === 'cancelado') {
            Pedido::remover($id);
        } else {
            Pedido::atualizarStatus($id, $status);
        }
        echo json_encode(['sucesso' => true]);
    }
} 