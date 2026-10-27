<?php
require_once("../../conexao.php");
$tabela = 'banner';

$query = $pdo->query("SELECT * FROM $tabela ordenar por id desc");
$res = $query->fetchAll(PDO::FETCH_ASSOC);
$total_reg = @contagem($res);
if($total_reg > 0){

eco <<<HTML
	<pequeno>
	<table class="table table-hover" id="tabela">
	<thead>
	<tr>
	<th>Título</th>	
	<th class="esc">Subtítulo</th> 		
	<th class="esc">Imagem</th>		
	<th>Ações</th>
	</tr>
	</thead>
	<corpo>	
HTML;

for($i=0; $i < $total_reg; $i++){
		$id = $res[$i]['id'];
		$titulo = $res[$i]['titulo'];		
		$subtitulo = $res[$i]['subtitulo'];		
		$imagem = $res[$i]['imagem'];
	
		$subtituloF = mb_strimwidth($subtitulo, 0, 80, "...");	

		
eco <<<HTML
<tr>
<td>{$título}</td>
<td class="esc">{$subtituloF}</td>
<td class="esc"><img src="./img/banners/{$imagem}" width="30px"></td>
<td>
	<big><a href="#" onclick="editar('{$id}','{$titulo}', '{$subtitulo}', '{$imagem}')" title="Editar Dados" ><i class="bi bi-pencil-square text-primary"></i></a></big>

	<big><a href="#" onclick="excluir('{$id}','{$titulo}')" title="Excluir Registro"><i class="bi bi-trash text-danger" </i></a></big>



</td>
</tr>
HTML;

}

eco <<<HTML
	</tbody>
	<small><div align="center" id="mensagem-excluir"></div></small>
	</tabela>
	</small>
HTML;


}outro{
	echo 'Não possui registros cadastrados!';
}


 ?>





<script type="texto/javascript">
	function editar(id, título, subtitulo, foto){
		$('#id').val(id);
		$('#título').val(título);
		$('#subtitulo').val(subtitulo);	
		
		$('#titulo_inserir').text('Editar Registro');
		$('#modalForm').modal('mostrar');
		$('#foto').val('');
		$('#target').attr('src','../img/banners/' + foto);
	}

		function excluir(id, titulo){
		$('#id-excluir').val(id);
		$('#titulo-excluir').text(titulo);				
		
		$('#modalExcluir').modal('mostrar');		
	}



	function limparCampos(){
		$('#id').val('');
		$('#subtítulo').val('');
		$('#título').val('');		
		$('#foto').val('');
		$('#target').attr('src','../img/banners/sem-foto.jpg');
	}

</script>