<?php
$login=$_POST["login"];
$senha=$_POST["senha"];



    if ($login=='matheus' && $senha==145836){

    echo "Seja bem vindo ".$login;

    } else {
        echo "Senha e/ou Usuário Incorretos."
    }

?>...