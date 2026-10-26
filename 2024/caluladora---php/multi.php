<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Multiplicação</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
    <h2>Calculadora Multiplicação</h2>
    <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
        Núm 1: <input type="text" name="num1"><br><br>
        <input type="submit" value="Multiplicar">
    </form>

    <?php
    // Verifica se os números foram enviados pelo formulário
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Verifica se os campos foram preenchidos
        if (!empty($_POST['num1'])) {
            $num1 = $_POST['num1'];
            

            // Realiza a multiplicação dos números (substitui a soma por multiplicação)
            $resultado = $num1 * 5;

            // Exibe o resultado da multiplicação
            echo "<h3>O resultado da multiplicação de $num1 por 5 é: $resultado</h3>";
        } else {
            // Caso algum campo não tenha sido preenchido, exibe uma mensagem de erro
            echo "<h3>Preencha todos os campos.</h3>";
        }
    }
    ?>
</body>
</html>
