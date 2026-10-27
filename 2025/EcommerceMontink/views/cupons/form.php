<?php
require_once __DIR__ . '/../../config/conexao.php';
require_once __DIR__ . '/../../models/Cupom.php';

$cupom = null;
if (isset($_GET['id'])) {
    $cupom = Cupom::buscar($_GET['id']);
}
// Salvar cupom (criar ou editar)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $codigo = $_POST['codigo'] ?? '';
    $valor_desconto = $_POST['valor_desconto'] ?? 0;
    $valor_minimo = $_POST['valor_minimo'] ?? 0;
    $validade = $_POST['validade'] ?? '';
    if ($cupom) {
        Cupom::atualizar($cupom['id'], $codigo, $valor_desconto, $valor_minimo, $validade);
    } else {
        Cupom::criar($codigo, $valor_desconto, $valor_minimo, $validade);
    }
    header('Location: listar.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title><?php echo isset($cupom) ? 'Editar Cupom' : 'Novo Cupom'; ?></title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../public/estilo.css">
    <link rel="icon" href="../../public/favicon.ico" type="image/x-icon">
</head>
<body>
<div class="container mt-4">
    <h2><?php echo isset($cupom) ? 'Editar Cupom' : 'Novo Cupom'; ?></h2>
    <form method="post">
        <div class="mb-3">
            <label for="codigo" class="form-label">Código</label>
            <input type="text" class="form-control" id="codigo" name="codigo" value="<?php echo $cupom['codigo'] ?? ''; ?>" required>
        </div>
        <div class="mb-3">
            <label for="valor_desconto" class="form-label">Valor do Desconto (R$)</label>
            <input type="number" step="0.01" class="form-control" id="valor_desconto" name="valor_desconto" value="<?php echo $cupom['valor_desconto'] ?? ''; ?>" required>
        </div>
        <div class="mb-3">
            <label for="valor_minimo" class="form-label">Valor Mínimo do Pedido (R$)</label>
            <input type="number" step="0.01" class="form-control" id="valor_minimo" name="valor_minimo" value="<?php echo $cupom['valor_minimo'] ?? ''; ?>" required>
        </div>
        <div class="mb-3">
            <label for="validade" class="form-label">Validade</label>
            <input type="date" class="form-control" id="validade" name="validade" value="<?php echo $cupom['validade'] ?? ''; ?>" required>
        </div>
        <button type="submit" class="btn btn-primary">Salvar</button>
        <a href="listar.php" class="btn btn-secondary">Voltar</a>
    </form>
</div>
</body>
</html> 