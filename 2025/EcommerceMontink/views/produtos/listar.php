<?php
require_once __DIR__ . '/../../config/conexao.php';
require_once __DIR__ . '/../../models/Produto.php';
require_once __DIR__ . '/../../models/Estoque.php';

$produtos = Produto::todos();
$adicionado = isset($_GET['adicionado']) && $_GET['adicionado'] == '1';
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Produtos</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../public/estilo.css">
    <link rel="icon" href="../../public/favicon.ico" type="image/x-icon">
    <style>
    .ios-toast {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        background: rgba(255,255,255,0.2);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        pointer-events: all;
    }
    .ios-toast-content {
        background: rgba(255,255,255,0.95);
        border-radius: 24px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        padding: 32px 32px 24px 32px;
        text-align: center;
        min-width: 300px;
        max-width: 90vw;
        animation: popIn 0.5s cubic-bezier(.4,0,.2,1);
    }
    .ios-toast-content h4 {
        margin-bottom: 18px;
        font-weight: 600;
    }
    .ios-toast-content button {
        margin-top: 10px;
        border-radius: 16px;
        font-size: 1.1rem;
        padding: 8px 24px;
    }
    </style>
</head>
<body>
<?php if ($adicionado): ?>
<div class="ios-toast" id="toast">
    <div class="ios-toast-content">
        <h4>Produto adicionado ao carrinho!</h4>
        <button class="btn btn-primary" onclick="window.location.href='../carrinho/index.php'">Finalizar Compra</button>
    </div>
</div>
<script>
setTimeout(() => {
    document.getElementById('toast').style.display = 'none';
}, 3000);
</script>
<?php endif; ?>
<div class="container mt-4">
    <h2>Produtos</h2>
    <a href="form.php" class="btn btn-success mb-3">Novo Produto</a>
    <a href="../carrinho/index.php" class="btn btn-warning mb-3" style="color:#fff;font-weight:bold;">Meu Carrinho</a>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Preço (R$)</th>
                <th>Variações e Estoque</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($produtos as $produto): ?>
            <tr>
                <td><?php echo htmlspecialchars($produto['nome']); ?></td>
                <td><?php echo number_format($produto['preco'], 2, ',', '.'); ?></td>
                <td>
                    <?php 
                    $estoques = Estoque::porProduto($produto['id']);
                    foreach ($estoques as $est) {
                        echo htmlspecialchars($est['variacao']) . ': ' . $est['quantidade'] . '<br>';
                    }
                    ?>
                </td>
                <td>
                    <a href="form.php?id=<?php echo $produto['id']; ?>" class="btn btn-primary btn-sm">Editar</a>
                    <?php if (!empty($estoques)) : ?>
                        <form method="post" action="../carrinho/index.php" style="display:inline;" onsubmit="return adicionarCarrinho(this);">
                            <input type="hidden" name="adicionar_produto_id" value="<?php echo $produto['id']; ?>">
                            <input type="hidden" name="adicionar_variacao" value="<?php echo htmlspecialchars($estoques[0]['variacao']); ?>">
                            <button type="submit" class="btn btn-success btn-sm">Adicionar ao Carrinho</button>
                        </form>
                    <?php endif; ?>
                </td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
</div>
<script>
function adicionarCarrinho(form) {
    // Envia o form via AJAX e mostra o toast
    var xhr = new XMLHttpRequest();
    xhr.open('POST', form.action, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            window.location.href = window.location.pathname + '?adicionado=1';
        }
    };
    var data = '';
    for (var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].name) {
            data += encodeURIComponent(form.elements[i].name) + '=' + encodeURIComponent(form.elements[i].value) + '&';
        }
    }
    xhr.send(data);
    return false;
}
</script>
</body>
</html> 