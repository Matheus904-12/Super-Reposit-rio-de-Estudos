<?php
require_once __DIR__ . '/../../config/conexao.php';
require_once __DIR__ . '/../../models/Produto.php';
require_once __DIR__ . '/../../models/Cupom.php';

session_start();
// Lógica para adicionar produto ao carrinho
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Adicionar produto
    if (isset($_POST['adicionar_produto_id'])) {
        $produto_id = $_POST['adicionar_produto_id'];
        $variacao = $_POST['adicionar_variacao'] ?? '';
        $quantidade = 1;
        $key = $produto_id . '-' . $variacao;
        if (!isset($_SESSION['carrinho'])) {
            $_SESSION['carrinho'] = [];
        }
        if (isset($_SESSION['carrinho'][$key])) {
            $_SESSION['carrinho'][$key]['quantidade'] += $quantidade;
        } else {
            $_SESSION['carrinho'][$key] = [
                'produto_id' => $produto_id,
                'variacao' => $variacao,
                'quantidade' => $quantidade
            ];
        }
        header('Location: index.php');
        exit;
    }
    // Remover item
    if (isset($_POST['remover_key'])) {
        unset($_SESSION['carrinho'][$_POST['remover_key']]);
        header('Location: index.php');
        exit;
    }
    // Alterar quantidade
    if (isset($_POST['alterar_key'], $_POST['acao'])) {
        $key = $_POST['alterar_key'];
        if (isset($_SESSION['carrinho'][$key])) {
            if ($_POST['acao'] === 'mais') {
                $_SESSION['carrinho'][$key]['quantidade']++;
            } elseif ($_POST['acao'] === 'menos' && $_SESSION['carrinho'][$key]['quantidade'] > 1) {
                $_SESSION['carrinho'][$key]['quantidade']--;
            }
        }
        header('Location: index.php');
        exit;
    }
    // Aplicar cupom
    if (isset($_POST['cupom'])) {
        $_SESSION['cupom'] = $_POST['cupom'];
    }
}
$itens = $_SESSION['carrinho'] ?? [];
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Carrinho de Compras</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../public/estilo.css">
    <link rel="icon" href="../../public/favicon.ico" type="image/x-icon">
</head>
<body style="background: #f2f2f2;">
<div class="cart-container">
    <div class="cart-title">🛒 Carrinho de Compras</div>
    <?php if (empty($itens)) : ?>
        <div class="alert alert-info text-center">Seu carrinho está vazio.</div>
        <div class="cart-btns">
            <a href="../produtos/listar.php" class="btn btn-warning" style="color:#fff;font-weight:bold;">Voltar para Produtos</a>
        </div>
    <?php else : ?>
        <div class="table-responsive">
        <table class="table table-bordered cart-table">
            <thead class="table-light">
                <tr>
                    <th>Produto</th>
                    <th>Variação</th>
                    <th>Quantidade</th>
                    <th>Preço Unitário (R$)</th>
                    <th>Subtotal (R$)</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
            <?php 
            $subtotal = 0;
            foreach ($itens as $key => $item) :
                $produto = Produto::buscar($item['produto_id']);
                $preco = $produto['preco'];
                $linha_total = $preco * $item['quantidade'];
                $subtotal += $linha_total;
            ?>
                <tr>
                    <td><?php echo htmlspecialchars($produto['nome']); ?></td>
                    <td><?php echo htmlspecialchars($item['variacao'] ?? ''); ?></td>
                    <td style="min-width:120px;">
                        <form method="post" action="index.php" style="display:inline-flex;align-items:center;gap:4px;">
                            <input type="hidden" name="alterar_key" value="<?php echo htmlspecialchars($key); ?>">
                            <button type="submit" name="acao" value="menos" class="btn btn-secondary btn-sm" style="min-width:32px;padding:4px 0;">-</button>
                            <span style="display:inline-block;min-width:28px;text-align:center;font-weight:600;"> <?php echo $item['quantidade']; ?> </span>
                            <button type="submit" name="acao" value="mais" class="btn btn-secondary btn-sm" style="min-width:32px;padding:4px 0;">+</button>
                        </form>
                    </td>
                    <td><?php echo number_format($preco, 2, ',', '.'); ?></td>
                    <td><?php echo number_format($linha_total, 2, ',', '.'); ?></td>
                    <td>
                        <form method="post" action="index.php" style="display:inline;">
                            <input type="hidden" name="remover_key" value="<?php echo htmlspecialchars($key); ?>">
                            <button type="submit" class="btn btn-danger btn-sm">Remover</button>
                        </form>
                    </td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
        </div>
        <!-- Formulário de cupom -->
        <form method="post" class="row g-2 mb-3" action="index.php">
            <div class="col-auto">
                <input type="text" class="form-control" name="cupom" placeholder="Código do cupom" value="<?php echo $_SESSION['cupom'] ?? ''; ?>">
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-info">Aplicar Cupom</button>
            </div>
        </form>
        <?php
        // Regras de frete
        if ($subtotal >= 52 && $subtotal <= 166.59) {
            $frete = 15.00;
            $msg_frete = 'Frete: R$ 15,00 (para pedidos entre R$52,00 e R$166,59)';
        } elseif ($subtotal > 200) {
            $frete = 0.00;
            $msg_frete = 'Frete grátis para pedidos acima de R$200,00!';
        } else {
            $frete = 20.00;
            $msg_frete = 'Frete: R$ 20,00 (para outros valores)';
        }
        // Cupom
        $desconto = 0;
        $msg_cupom = '';
        if (!empty($_SESSION['cupom'])) {
            $cupom = Cupom::validar($_SESSION['cupom'], $subtotal);
            if ($cupom) {
                $desconto = $cupom['valor_desconto'];
                $msg_cupom = '<span class="text-success">Cupom aplicado: ' . htmlspecialchars($cupom['codigo']) . ' (-R$ ' . number_format($desconto, 2, ',', '.') . ')</span>';
            } else {
                $msg_cupom = '<span class="text-danger">Cupom inválido, expirado ou não atende o valor mínimo.</span>';
                unset($_SESSION['cupom']);
            }
        }
        $total = $subtotal + $frete - $desconto;
        if ($total < 0) $total = 0;
        ?>
        <div class="cart-summary">
            <strong>Subtotal:</strong> R$ <?php echo number_format($subtotal, 2, ',', '.'); ?><br>
            <strong><?php echo $msg_frete; ?></strong><br>
            <?php if ($msg_cupom) echo $msg_cupom . '<br>'; ?>
            <strong>Total:</strong> R$ <?php echo number_format($total, 2, ',', '.'); ?>
        </div>
        <div class="cart-btns">
            <a href="../produtos/listar.php" class="btn btn-warning" style="color:#fff;font-weight:bold;">Continuar Comprando</a>
            <a href="../pedido/finalizar.php" class="btn btn-success" style="font-weight:bold;">Finalizar Pedido</a>
        </div>
    <?php endif; ?>
</div>
</body>
</html> 