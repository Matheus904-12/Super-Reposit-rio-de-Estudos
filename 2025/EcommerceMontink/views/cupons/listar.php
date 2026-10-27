<?php
require_once __DIR__ . '/../../config/conexao.php';
require_once __DIR__ . '/../../models/Cupom.php';

$cupons = Cupom::todos();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Cupons</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../public/estilo.css">
    <link rel="icon" href="../../public/favicon.ico" type="image/x-icon">
</head>
<body>
<div class="container mt-4">
    <h2>Cupons</h2>
    <a href="form.php" class="btn btn-success mb-3">Novo Cupom</a>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Código</th>
                <th>Desconto (R$)</th>
                <th>Valor Mínimo (R$)</th>
                <th>Validade</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($cupons as $cupom): ?>
            <tr>
                <td><?php echo htmlspecialchars($cupom['codigo']); ?></td>
                <td><?php echo number_format($cupom['valor_desconto'], 2, ',', '.'); ?></td>
                <td><?php echo number_format($cupom['valor_minimo'], 2, ',', '.'); ?></td>
                <td><?php echo htmlspecialchars($cupom['validade']); ?></td>
                <td>
                    <a href="form.php?id=<?php echo $cupom['id']; ?>" class="btn btn-primary btn-sm">Editar</a>
                    <!-- Excluir pode ser implementado aqui -->
                </td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
</div>
</body>
</html> 