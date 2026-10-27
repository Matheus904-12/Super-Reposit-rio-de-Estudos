<?php $id = $_GET['id'] ?? null; ?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Pedido Realizado</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../public/estilo.css">
    <link rel="icon" href="../../public/favicon.ico" type="image/x-icon">
</head>
<body>
<div class="container mt-5">
    <div class="alert alert-success text-center">
        <h2>Pedido realizado com sucesso!</h2>
        <p>Seu pedido foi registrado e está sendo processado.</p>
        <?php if ($id): ?>
            <p><strong>Número do Pedido:</strong> <?php echo htmlspecialchars($id); ?></p>
        <?php endif; ?>
        <a href="../produtos/listar.php" class="btn btn-primary mt-3">Voltar para Produtos</a>
    </div>
</div>
</body>
</html> 