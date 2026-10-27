<?php
require_once __DIR__ . '/../models/Produto.php';
require_once __DIR__ . '/../models/Estoque.php';

class ProdutoController {
    public function listar() {
        $produtos = Produto::todos();
        require __DIR__ . '/../views/produtos/listar.php';
    }

    public function criar() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $nome = $_POST['nome'] ?? '';
            $preco = $_POST['preco'] ?? 0;
            $variacoes = $_POST['variacoes'] ?? [];
            $estoques = $_POST['estoques'] ?? [];
            $produto_id = Produto::criar($nome, $preco);
            if ($produto_id && !empty($variacoes)) {
                foreach ($variacoes as $i => $variacao) {
                    $qtd = $estoques[$i] ?? 0;
                    Estoque::criar($produto_id, $variacao, $qtd);
                }
            }
            header('Location: /produtos');
            exit;
        }
        require __DIR__ . '/../views/produtos/form.php';
    }

    public function editar($id) {
        $produto = Produto::buscar($id);
        $estoques = Estoque::porProduto($id);
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $nome = $_POST['nome'] ?? '';
            $preco = $_POST['preco'] ?? 0;
            Produto::atualizar($id, $nome, $preco);
            // Atualizar estoques/variações
            if (isset($_POST['variacoes'], $_POST['estoques'])) {
                foreach ($_POST['variacoes'] as $i => $variacao) {
                    $qtd = $_POST['estoques'][$i] ?? 0;
                    Estoque::atualizarOuCriar($id, $variacao, $qtd);
                }
            }
            header('Location: /produtos');
            exit;
        }
        require __DIR__ . '/../views/produtos/form.php';
    }
} 