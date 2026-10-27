<!-- Loading Screen Component -->
<!-- Adicione em todas as páginas PHP dentro da tag <head> -->
<!-- CSS Link -->
<link rel="stylesheet" href="<?php echo (strpos($_SERVER['REQUEST_URI'], '/tcc/') !== false ? '' : '/tcc/'); ?>css/loading.css">

<!-- Script no final antes do </body> -->
<script src="<?php echo (strpos($_SERVER['REQUEST_URI'], '/tcc/') !== false ? '' : '/tcc/'); ?>js/loading.js"></script>
