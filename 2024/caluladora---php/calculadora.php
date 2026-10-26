<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adição</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
    <h2>Calculadora Soma</h2>
    <form method="post" action="<?php echo $_SERVER['PHP_SELF'];
    ?>">
        Núm 1; <input type="text" name="num1"><br><br>
        Núm 2; <input type="text" name="num2"><br><br>
        <input type="submit" value="Somar">
    </form>

    <?php
//Verifica se os números foram enviados pelo formuçário
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verifica se os campos foram preenchidos
    if (!empty($_POST['num1']) && !empty($_POST['num2'])) {
        $num1 = $_POST['num1'];
        $num2 = $_POST['num2'];

        // Realiza a soma dos números
        $soma = $num1 + $num2;

        // Exibe o resultado da soma
        echo "<h3>A soma de $num1 e $num2 é: $soma</h3>";
    } else {
        // Caso algum campo não tenha sido preenchido, exibe uma mensagem de erro
        echo "<h3>Preencha todos os campos.</h3>";
    }
}
?>
</body>
</html>