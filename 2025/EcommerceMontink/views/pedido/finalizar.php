<?php
require_once __DIR__ . '/../../vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require_once __DIR__ . '/../../config/conexao.php';
require_once __DIR__ . '/../../models/Produto.php';
require_once __DIR__ . '/../../models/Cupom.php';

session_start();
$itens = $_SESSION['carrinho'] ?? [];
$erro = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';
    $assunto = "Confirmação do Pedido";
    $mensagem = "Olá, $nome!\n\nSeu pedido foi realizado com sucesso.";
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Username = '5df3532a7fad83';
        $mail->Password = '****fec0';
        $mail->Port = 2525;
        $mail->setFrom('no-reply@seudominio.com', 'ERP Ecommerce');
        $mail->addAddress($email, $nome);
        $mail->isHTML(false);
        $mail->Subject = $assunto;
        $mail->Body    = $mensagem;
        $mail->send();
    } catch (Exception $e) {
        // Você pode logar o erro se quiser
    }
    unset($_SESSION['carrinho']);
    unset($_SESSION['cupom']);
    header('Location: sucesso.php?id=' . rand(1000,9999));
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Finalizar Pedido</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../public/estilo.css">
    <link rel="icon" href="../../public/favicon.ico" type="image/x-icon">
</head>
<body>
<div class="container mt-4">
    <h2>Finalizar Pedido</h2>
    <?php if (!empty($erro)) : ?>
        <div class="alert alert-danger"><?php echo $erro; ?></div>
    <?php endif; ?>
    <form method="post">
        <div class="mb-3">
            <label for="nome" class="form-label">Nome Completo</label>
            <input type="text" class="form-control" id="nome" name="nome" required>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input type="email" class="form-control" id="email" name="email" required>
        </div>
        <div class="mb-3">
            <label for="cep" class="form-label">CEP</label>
            <input type="text" class="form-control" id="cep" name="cep" maxlength="9" required onblur="buscarEndereco()">
        </div>
        <div class="mb-3">
            <label for="endereco" class="form-label">Endereço</label>
            <input type="text" class="form-control" id="endereco" name="endereco" required>
        </div>
        <h5>Resumo do Pedido</h5>
        <ul class="list-group mb-3">
            <?php 
            $subtotal = 0;
            foreach ($itens as $item) {
                $produto = Produto::buscar($item['produto_id']);
                $preco = $produto['preco'];
                $linha_total = $preco * $item['quantidade'];
                $subtotal += $linha_total;
                echo '<li class="list-group-item">' . htmlspecialchars($produto['nome']) .
                    ' (' . htmlspecialchars($item['variacao'] ?? '') . ') x ' . $item['quantidade'] .
                    ' = R$ ' . number_format($linha_total, 2, ',', '.') . '</li>';
            }
            // Regras de frete
            if ($subtotal >= 52 && $subtotal <= 166.59) {
                $frete = 15.00;
                $msg_frete = 'Frete: R$ 15,00';
            } elseif ($subtotal > 200) {
                $frete = 0.00;
                $msg_frete = 'Frete grátis!';
            } else {
                $frete = 20.00;
                $msg_frete = 'Frete: R$ 20,00';
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
            <li class="list-group-item"><strong>Subtotal:</strong> R$ <?php echo number_format($subtotal, 2, ',', '.'); ?></li>
            <li class="list-group-item"><strong><?php echo $msg_frete; ?></strong></li>
            <?php if ($msg_cupom) echo '<li class="list-group-item">' . $msg_cupom . '</li>'; ?>
            <li class="list-group-item"><strong>Total:</strong> R$ <?php echo number_format($total, 2, ',', '.'); ?></li>
        </ul>
        <button type="submit" class="btn btn-success">Finalizar Pedido</button>
        <a href="../carrinho/index.php" class="btn btn-secondary">Voltar ao Carrinho</a>
    </form>
</div>
<script>
function buscarEndereco() {
    var cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length === 8) {
        fetch('https://viacep.com.br/ws/' + cep + '/json/')
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('endereco').value = data.logradouro + ', ' + (data.bairro || '') + ', ' + (data.localidade || '') + ' - ' + (data.uf || '');
                }
            });
    }
}
</script>
</body>
</html> 