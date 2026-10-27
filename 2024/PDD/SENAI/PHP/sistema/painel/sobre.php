<?php
@session_start();
require_once('../conexao.php');
if(@$_SESSION['nome'] == ""){	
	echo '<script>window.location="../index.php"</script>';
	saída();
}

require_once("cabecalho.php");
?>

<form id="form-config">
<div class="linha">
	<div class="col-md-4">
		<div class="mb-3">
			<label for="exampleFormControlInput1" class="form-label">Título</label>
			<input name="titulo" type="text" class="form-control" placeholder="Título Sobre" value="<?php echo $titulo_sobre ?>" obrigatório>
		</div>
	</div>

	<div class="col-md-8">
		<div class="mb-3">
			<label for="exampleFormControlInput1" class="form-label">Subtítulo</label>
			<input name="subtitulo" type="text" class="form-control" placeholder="Subtítulo se Houver" value="<?php echo $subtitulo_sobre ?>">
		</div>
	</div>


</div>


<div class="linha">
<div class="col-md-12">
		<div class="mb-3">
			<label for="exampleFormControlInput1" class="form-label">Descrição</label>
			<textarea class="form-control" name="descricao" id="area"><?php echo $descricao_sobre ?></textarea>
		</div>
	</div>
</div>



<div class="linha">
	
	<div class="col-md-4 col-8">
		<div class="mb-3">
			<label for="exampleFormControlInput1" class="form-label">Imagem</label>
			<input id="foto" name="foto" type="file" class="form-control" onchange="alterarImg('target', 'foto')">			
		</div>
	</div>
	<div class="col-md-2 col-4">
		<div><img id="target" src="../img/<?php echo $imagem_sobre ?>" width="110px" style="margin-top: 15px"></div>
	</div>

	<div class="col-md-4">
		<div class="mb-3">
			<label for="exampleFormControlInput1" class="form-label">Vídeo</label>
			<input name="video" type="text" class="form-control" placeholder="Url Incorporada do Vídeo" value="<?php echo $video_sobre ?>">
		</div>
	</div>

	<div class="col-md-2">
		<div class="mb-3">
			<label for="exampleFormControlInput1" class="form-label">Imagem / Vídeo</label>
			<select name="exibir" class="form-select">
				<option value="Imagem" <?php if($exibir_sobre == 'Imagem'){ ?> selecionado <?php } ?> >Imagem</option>
				<option value="Vídeo" <?php if($exibir_sobre == 'Vídeo'){ ?> selecionado <?php } ?>>Vídeo</option>
			</selecionar>
		</div>
	</div>


</div>


<div alinhar="direita">
 <button class="btn btn-primary" type="submit">Salvar</button>
</div>

<small><div id="mensagem" align="center"></div></small>

</form>

<br><br>
</div>


<script type="texto/javascript">
	

$("#form-config").submit(function(){
	$('#mensagem').text('...Carregando!')

    event.preventDefault();
    nicEditors.findEditor('area').saveContent();
    var formData = new FormData(este);

    $.ajax({
        url: "scripts/salvar-sobre.php",
        digite: 'POST',
        dados: formulárioData,

        sucesso: function (mensagem) {
            $('#mensagem').text('');
            $('#mensagem').removeClass()
            if (mensagem.trim() == "Salvo com sucesso") {                        
            	localização.reload();
            	$('#mensagem').addClass('texto-sucesso')
            	$('#mensagem').text(mensagem)
            } outro {
                $('#mensagem').addClass('text-danger')
                $('#mensagem').text(mensagem)
            }


        },

        cache: falso,
        contentType: falso,
        processData: falso,

    });

});


</script>




<script src="//js.nicedit.com/nicEdit-latest.js" type="text/javascript"></script>
<script type="text/javascript">bkLib.onDomLoaded(nicEditors.allTextAreas);</script>