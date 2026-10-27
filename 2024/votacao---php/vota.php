<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Votação</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
    <h2>Sistema de Votação</h2>
    <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
        Idade: <input type="number" name="idade" required><br><br>
        <input type="submit" value="Votar">
    </form>

    <?php
    // Verifica se os dados foram enviados pelo formulário
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        if (!empty($_POST['idade'])) {
            $idade = $_POST['idade'];

            // Verifica a idade para permitir votação apenas se for maior ou igual a 16 anos
            if ($idade >= 16) {

                echo "<h3>Votação permitida!</h3>";

            } else {
                echo "<h3>Votação permitida apenas para maiores de 16 anos.</h3>";
            }
        } else {
            echo "<h3>Preencha o campo de idade.</h3>";
        }
    }
    ?>
</body>
</html>
