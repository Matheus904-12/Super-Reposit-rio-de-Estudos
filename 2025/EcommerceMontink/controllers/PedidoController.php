<?php
require_once __DIR__ . '/../models/Produto.php';
require_once __DIR__ . '/../models/Estoque.php';
require_once __DIR__ . '/../models/Pedido.php';

class PedidoController {
    public function finalizar() {
        session_start();
        $itens = $_SESSION['carrinho'] ?? [];
        if (empty($itens)) {
            header('Location: /carrinho');
            exit;
        }
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $nome = $_POST['nome'] ?? '';
            $email = $_POST['email'] ?? '';
            $cep = $_POST['cep'] ?? '';
            $endereco = $_POST['endereco'] ?? '';
            $subtotal = 0;
            foreach ($itens as $item) {
                $produto = Produto::buscar($item['produto_id']);
                $subtotal += $produto['preco'] * $item['quantidade'];
            }
            // Regras de frete
            if ($subtotal >= 52 && $subtotal <= 166.59) {
                $frete = 15.00;
            } elseif ($subtotal > 200) {
                $frete = 0.00;
            } else {
                $frete = 20.00;
            }
            // Cupom
            $desconto = 0;
            $cupom_codigo = '';
            if (!empty($_SESSION['cupom'])) {
                require_once __DIR__ . '/../models/Cupom.php';
                $cupom = Cupom::validar($_SESSION['cupom'], $subtotal);
                if ($cupom) {
                    $desconto = $cupom['valor_desconto'];
                    $cupom_codigo = $cupom['codigo'];
                }
            }
            $total = $subtotal + $frete - $desconto;
            if ($total < 0) $total = 0;
            $pedido_id = Pedido::criar($nome, $email, $cep, $endereco, $subtotal, $frete, $total, $itens);
            if ($pedido_id) {
                // Envio de e-mail
                $assunto = "Confirmação do Pedido #$pedido_id";
                $mensagem = "Olá, $nome!\n\nSeu pedido foi realizado com sucesso.\n\nResumo do pedido:\n";
                foreach ($itens as $item) {
                    $produto = Produto::buscar($item['produto_id']);
                    $mensagem .= "- " . $produto['nome'] .
                        ' (' . ($item['variacao'] ?? '') . ') x ' . $item['quantidade'] .
                        ' = R$ ' . number_format($produto['preco'] * $item['quantidade'], 2, ',', '.') . "\n";
                }
                $mensagem .= "\nSubtotal: R$ " . number_format($subtotal, 2, ',', '.') .
                    "\nFrete: R$ " . number_format($frete, 2, ',', '.');
                if ($desconto > 0) {
                    $mensagem .= "\nCupom ($cupom_codigo): -R$ " . number_format($desconto, 2, ',', '.');
                }
                $mensagem .= "\nTotal: R$ " . number_format($total, 2, ',', '.');
                $mensagem .= "\n\nEndereço de entrega: $endereco, CEP: $cep";
                $headers = "From: no-reply@seusite.com\r\nContent-Type: text/plain; charset=UTF-8";
                @mail($email, $assunto, $mensagem, $headers);
                unset($_SESSION['carrinho']);
                unset($_SESSION['cupom']);
                header('Location: /pedido/sucesso?id=' . $pedido_id);
                exit;
            } else {
                $erro = 'Erro ao salvar pedido.';
            }
        }
        require __DIR__ . '/../views/pedido/finalizar.php';
    }
    public function sucesso() {
        $id = $_GET['id'] ?? null;
        require __DIR__ . '/../views/pedido/sucesso.php';
    }
} 