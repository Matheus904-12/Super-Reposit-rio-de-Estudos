<?php 
    if($_POST) {

    $destino = $_POST['destino'];
    $distancia = $_POST['distancia'];
    $autonomia = $_POST['autonomia'];

    $valorGasolina = 5.09;
    $valorAlcool = 4.59;
    $valorDiesel = 4.99;

    $mensagem = "";

    if(is_numeric($autonomia) && is_numeric($distancia)){
        if(($distancia > 0) && ($autonomia > 0)){
            
            $consumoGasolina = ($distancia / $autonomia) * $valorGasolina;
            $consumoGasolina = number_format($consumoGasolina, 2, ',','.');

            $consumoAlcool = ($distancia / $autonomia) * $valorAlcool;
            $consumoAlcool = number_format($consumoAlcool, 2, ',','.');

            $consumoDiesel = ($distancia / $autonomia) * $valorDiesel;
            $consumoDiesel = number_format($consumoDiesel, 2, ',','.');

            $mensagem.= "<div class='sucesso'>";
            $mensagem.= "O valor total gasto para ".$destino." é:";
            $mensagem.= "<ul>";
            $mensagem.= "<li><b>Gasolina</b>: R$ ".$consumoGasolina."</li>";
            $mensagem.= "<li><b>Álcool</b>: R$ ".$consumoAlcool."</li>";
            $mensagem.= "<li><b>Diesel</b>: R$ ".$consumoDiesel."</li>";
            $mensagem.= "</ul>";
            $mensagem.= "</div>";
        } else {
            $mensagem.= "<div class='erro'>";
            $mensagem.= "<b>O valor da distância e da autonomia deve ser maior que zero.</b>";
            $mensagem.= "</div>";
        }
    } else {
        $mensagem.= "<div class='erro'>";
        $mensagem.= "<b>O valor recebido não é numérico</b>";
        $mensagem.= "</div>";
    }
    } else {
        $mensagem.= "<div class='erro'>";
        $mensagem.= "<b>Nenhum dado foi recebido pelo formulário</b>";
        $mensagem.= "</div>";
    } 
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculo de consumo de combustível</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
    <main>
        <div class="painel">
            <h2>Resultado do calculo de consumo</h2>
            <div class="conteudo-painel">
                <?php
                echo $mensagem;
                ?>
                <a class="botao" href="index.php">Voltar</a>
            </div>
        </div>
    </main>
</body>
</html>