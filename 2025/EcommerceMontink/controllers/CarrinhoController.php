<?php
require_once __DIR__ . '/../models/Produto.php';
require_once __DIR__ . '/../models/Estoque.php';
require_once __DIR__ . '/../models/Cupom.php';

class CarrinhoController {
    public function adicionar() {
        session_start();
        $produto_id = $_GET['produto_id'] ?? null;
        $variacao = $_GET['variacao'] ?? null;
        $quantidade = 1;
        if (!$produto_id) {
            header('Location: /produtos');
            exit;
        }
        // Busca o estoque disponível
        $estoques = Estoque::porProduto($produto_id);
        if ($variacao) {
            $estoque = null;
            foreach ($estoques as $est) {
                if ($est['variacao'] === $variacao) {
                    $estoque = $est;
                    break;
                }
            }
        } else {
            $estoque = $estoques[0] ?? null;
        }
        if (!$estoque || $estoque['quantidade'] < $quantidade) {
            $_SESSION['erro'] = 'Estoque insuficiente.';
            header('Location: /produtos');
            exit;
        }
        // Adiciona ao carrinho na sessão
        if (!isset($_SESSION['carrinho'])) {
            $_SESSION['carrinho'] = [];
        }
        $key = $produto_id . '-' . ($variacao ?? 'padrao');
        if (isset($_SESSION['carrinho'][$key])) {
            $_SESSION['carrinho'][$key]['quantidade'] += $quantidade;
        } else {
            $_SESSION['carrinho'][$key] = [
                'produto_id' => $produto_id,
                'variacao' => $variacao,
                'quantidade' => $quantidade
            ];
        }
        header('Location: /carrinho');
        exit;
    }

    public function aplicarCupom() {
        session_start();
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $cupom = $_POST['cupom'] ?? '';
            $_SESSION['cupom'] = $cupom;
        }
        header('Location: /carrinho');
        exit;
    }

    public function index() {
        session_start();
        $itens = $_SESSION['carrinho'] ?? [];
        require __DIR__ . '/../views/carrinho/index.php';
    }
} 