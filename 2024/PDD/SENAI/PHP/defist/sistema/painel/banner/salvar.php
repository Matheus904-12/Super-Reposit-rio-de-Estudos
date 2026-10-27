<?php
require_once("../../conexao.php");
$tabela = 'banner';
$id = $_POST['id'];
$título = $_POST['título'];
$subtitulo = $_POST['subtitulo'];

$query = $pdo->query("SELECT * FROM $tabela where id = '$id'");
$res = $query->fetchAll(PDO::FETCH_ASSOC);
if(@contagem($res) > 0){
	$foto = $res[0]['imagem'];
}outro{
	$foto = "img/sem-foto.jpg";
}


//SCRIPT PARA SUBIR FOTO NO SERVIDOR
$nome_img = data('dmY H:i:s') .'-'.@$_FILES['foto']['nome'];
$nome_img = preg_replace('/[ :]+/' , '-' , $nome_img);

$caminho = '../../img/banners/' .$nome_img;

$imagem_temp = @$_FILES['foto']['tmp_name'];

if(@$_FILES['foto']['nome'] != ""){
	$ext = pathinfo($nome_img, PATHINFO_EXTENSION);   
	if($ext == 'png' ou $ext == 'jpg' ou $ext == 'jpeg' ou $ext == 'gif' ou $ext == 'webp'){
	
			//EXCLUI A FOTO ANTERIOR
			if($foto != "sem-foto.jpg"){
				@unlink('../../img/banners/'.$foto);
			}

			$foto = $nome_img;
		
		move_uploaded_file($imagem_temp, $caminho);
	}outro{
		echo 'Extensão de imagem não permitida!';
		saída();
	}
}

if($id == ""){
	$pdo->query("INSERT INTO $tabela SET titulo = '$titulo', subtitulo = '$subtitulo', imagem = '$foto'");
}outro{
	$pdo->query("UPDATE $tabela SET titulo = '$titulo', subtitulo = '$subtitulo', imagem = '$foto' WHERE id = '$id'");
}



echo 'Salvo com Sucesso';

 ?>