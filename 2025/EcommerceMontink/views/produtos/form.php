<?php
require_once __DIR__ . '/../../config/conexao.php';
require_once __DIR__ . '/../../models/Produto.php';
require_once __DIR__ . '/../../models/Estoque.php';

$produto = null;
$estoques = [];
$mensagem = '';
$erro = '';
if (isset($_GET['id'])) {
    $produto = Produto::buscar($_GET['id']);
    $estoques = Estoque::porProduto($_GET['id']);
}
// Lógica de salvar (inserir/atualizar)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = trim($_POST['nome'] ?? '');
    $preco = floatval($_POST['preco'] ?? 0);
    $variacoes = $_POST['variacoes'] ?? [];
    $qtds = $_POST['estoques'] ?? [];
    // Validação
    if ($nome === '' || $preco <= 0) {
        $erro = 'Preencha o nome e o preço corretamente!';
    } elseif (empty($variacoes) || empty($qtds)) {
        $erro = 'Adicione pelo menos uma variação e estoque!';
    } elseif (count(array_unique($variacoes)) < count($variacoes)) {
        $erro = 'Não é permitido variações duplicadas!';
    } else {
        if ($produto) {
            Produto::atualizar($produto['id'], $nome, $preco);
            foreach ($variacoes as $i => $variacao) {
                $qtd = intval($qtds[$i] ?? 0);
                Estoque::atualizarOuCriar($produto['id'], $variacao, $qtd);
            }
            $mensagem = 'Produto atualizado com sucesso!';
        } else {
            $produto_id = Produto::criar($nome, $preco);
            foreach ($variacoes as $i => $variacao) {
                $qtd = intval($qtds[$i] ?? 0);
                Estoque::criar($produto_id, $variacao, $qtd);
            }
            $mensagem = 'Produto cadastrado com sucesso!';
        }
        header('Location: listar.php?msg=' . urlencode($mensagem));
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Cadastro de Produto</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../public/estilo.css">
    <link rel="icon" href="../../public/favicon.ico" type="image/x-icon">
</head>
<body>
<div class="container mt-4">
    <h2><?php echo isset($produto) && $produto ? 'Editar Produto' : 'Cadastrar Produto'; ?></h2>
    <?php if ($erro): ?>
        <div class="alert alert-danger"><?php echo $erro; ?></div>
    <?php endif; ?>
    <form method="post" autocomplete="off">
        <div class="mb-3">
            <label for="nome" class="form-label">Nome do Produto</label>
            <input type="text" class="form-control" id="nome" name="nome" value="<?php echo htmlspecialchars($produto['nome'] ?? ($_POST['nome'] ?? '')); ?>" required>
        </div>
        <div class="mb-3">
            <label for="preco" class="form-label">Preço (R$)</label>
            <input type="number" step="0.01" class="form-control" id="preco" name="preco" value="<?php echo htmlspecialchars($produto['preco'] ?? ($_POST['preco'] ?? '')); ?>" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Variações e Estoque</label>
            <div id="variacoes-lista">
                <?php 
                $varList = !empty($estoques) ? $estoques : [];
                if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($variacoes)) {
                    $varList = [];
                    foreach ($variacoes as $i => $v) {
                        $varList[] = [
                            'variacao' => $v,
                            'quantidade' => $qtds[$i] ?? ''
                        ];
                    }
                }
                if (!empty($varList)) :
                    foreach ($varList as $i => $est) : ?>
                        <div class="row mb-2 variacao-row">
                            <div class="col">
                                <input type="text" class="form-control" name="variacoes[]" placeholder="Variação" value="<?php echo htmlspecialchars($est['variacao']); ?>" required>
                            </div>
                            <div class="col">
                                <input type="number" class="form-control" name="estoques[]" placeholder="Estoque" value="<?php echo htmlspecialchars($est['quantidade']); ?>" required>
                            </div>
                            <div class="col-auto">
                                <button type="button" class="btn btn-danger btn-sm" onclick="removerVariacao(this)">Remover</button>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php else : ?>
                    <div class="row mb-2 variacao-row">
                        <div class="col">
                            <input type="text" class="form-control" name="variacoes[]" placeholder="Variação" required>
                        </div>
                        <div class="col">
                            <input type="number" class="form-control" name="estoques[]" placeholder="Estoque" required>
                        </div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-danger btn-sm" onclick="removerVariacao(this)">Remover</button>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
            <button type="button" class="btn btn-secondary btn-sm mt-2" onclick="adicionarVariacao()">Adicionar Variação</button>
        </div>
        <button type="submit" class="btn btn-primary">Salvar</button>
        <a href="listar.php" class="btn btn-secondary">Voltar</a>
    </form>
</div>
<script>
function adicionarVariacao() {
    const lista = document.getElementById('variacoes-lista');
    const div = document.createElement('div');
    div.className = 'row mb-2 variacao-row';
    div.innerHTML = `
        <div class="col">
            <input type="text" class="form-control" name="variacoes[]" placeholder="Variação" required>
        </div>
        <div class="col">
            <input type="number" class="form-control" name="estoques[]" placeholder="Estoque" required>
        </div>
        <div class="col-auto">
            <button type="button" class="btn btn-danger btn-sm" onclick="removerVariacao(this)">Remover</button>
        </div>
    `;
    lista.appendChild(div);
}
function removerVariacao(btn) {
    btn.closest('.variacao-row').remove();
}
</script>
</body>
</html> 