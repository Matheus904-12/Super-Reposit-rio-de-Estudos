<?php
// Iniciar sessão
session_start();

// Verificar se o usuário está logado
if (!isset($_SESSION['user_id'])) {
    header('Location: login_site.php');
    exit;
}

// Configurações do banco de dados
require_once '../adminView/config/dbconnect.php';
require_once '../adminView/controller/Produtos/UserCartController.php';
require_once '../adminView/controller/Produtos/UserFavoritesController.php';
require_once '../adminView/controller/Produtos/ProductController.php';
$userCartController = new UserCartController($pdo);
$UserFavoritesController = new UserFavoritesController($pdo);
$productController = new ProductController($pdo);

// Verificar se o ID do pedido foi fornecido
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    header('Location: profile.php');
    exit;
}

$orderId = (int)$_GET['id'];
$userId = $_SESSION['user_id'];

// Buscar informações do pedido
$orderQuery = "SELECT * FROM orders WHERE id = :order_id AND user_id = :user_id";
$stmt = $pdo->prepare($orderQuery);
$stmt->bindParam(':order_id', $orderId, PDO::PARAM_INT);
$stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
$stmt->execute();
$order = $stmt->fetch(PDO::FETCH_ASSOC);

// Verificar se o pedido existe e pertence ao usuário
if (!$order) {
    header('Location: profile.php');
    exit;
}

// Buscar os itens do pedido
$itemsQuery = "SELECT oi.*, p.nome, p.imagem, oi.price_at_purchase 
              FROM order_items oi 
              JOIN produtos p ON oi.product_id = p.id 
              WHERE oi.order_id = :order_id";
$stmtItems = $pdo->prepare($itemsQuery);
$stmtItems->bindParam(':order_id', $orderId, PDO::PARAM_INT);
$stmtItems->execute();
$orderItems = $stmtItems->fetchAll(PDO::FETCH_ASSOC);

// Adicionar o caminho da imagem para cada item do pedido
foreach ($orderItems as &$item) {
    if (!empty($item['imagem'])) {
        // Adiciona o caminho apenas se a imagem não tiver o caminho completo
        if (strpos($item['imagem'], '/') === false && strpos($item['imagem'], '\\') === false) {
            $item['imagem_path'] = '../adminView/uploads/produtos/' . $item['imagem'];
        } else {
            // Se já for um caminho, apenas copie
            $item['imagem_path'] = $item['imagem'];
        }
    } else {
        // Imagem padrão se não existir
        $item['imagem_path'] = '../adminView/uploads/produtos/placeholder.jpeg';
    }
}

// Incluir cabeçalho
$pageTitle = "Detalhes do Pedido #" . $orderId;

/**
 * Fetches products using the ProductController
 * 
 * @param ProductController $productController The product controller instance
 * @param PDO $pdo The database connection
 * @return array Array of products
 */
function fetchProducts($productController, $pdo) {
    // Using the controller to get all products
    $products = $productController->getAllProducts();
    
    // If the controller's method doesn't return products, fallback to direct query
    if (empty($products)) {
        // Check if status column exists in produtos table
        $checkColumnQuery = "SELECT column_name FROM information_schema.columns 
                            WHERE table_name = 'produtos' AND column_name = 'status'";
        $columnStmt = $pdo->query($checkColumnQuery);
        $statusColumnExists = $columnStmt && $columnStmt->fetch(PDO::FETCH_ASSOC);
        
        // Adjust query based on whether status column exists
        if ($statusColumnExists) {
            $query = "SELECT * FROM produtos WHERE status = 1";
        } else {
            $query = "SELECT * FROM produtos";
        }
        
        $stmt = $pdo->query($query);
        
        if ($stmt) {
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $products = [];
        }
    }
    
    return $products;
}

// Não precisamos buscar todos os produtos aqui, pois só usamos os itens do pedido
// Remover essa linha
// $produtosRaw = fetchProducts($productController, $pdo);

?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../adminView/assets/images/logo.png" type="image/x-icon">
    <title>Cristais Gold Lar - Detalhes do Produto</title>
    <link rel="stylesheet" href="css/elements.css">
    <link rel="stylesheet" href="css/detalhes/detalhes.css">
    <link rel="stylesheet" href="css/index/index-responsivo.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
<main class="container mt-4">
    <div class="row">
        <div class="col-md-12">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.php">Início</a></li>
                    <li class="breadcrumb-item"><a href="profile.php">Minha Conta</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Pedido #<?php echo $orderId; ?></li>
                </ol>
            </nav>
        </div>
    </div>

    <div class="pedido-detalhes">
        <div class="pedido-cabecalho">
            <h1>Detalhes do Pedido #<?php echo $orderId; ?></h1>
            <div class="pedido-data">
                Realizado em: <?php echo date('d/m/Y H:i', strtotime($order['order_date'])); ?>
            </div>
            
            <?php
            // Determinar o status em português
            $statusTexto = '';
            switch($order['status']) {
                case 'processando':
                    $statusTexto = 'Processando';
                    $statusClass = 'status-processando';
                    break;
                case 'aguardando_pagamento':
                    $statusTexto = 'Aguardando Pagamento';
                    $statusClass = 'status-aguardando';
                    break;
                case 'enviado':
                    $statusTexto = 'Enviado';
                    $statusClass = 'status-enviado';
                    break;
                case 'entregue':
                    $statusTexto = 'Entregue';
                    $statusClass = 'status-entregue';
                    break;
                case 'cancelado':
                    $statusTexto = 'Cancelado';
                    $statusClass = 'status-cancelado';
                    break;
                default:
                    $statusTexto = ucfirst($order['status']);
                    $statusClass = 'status-padrao';
            }
            ?>
            
            <div class="pedido-status-atual">
                Status: <span class="<?php echo $statusClass; ?>"><?php echo $statusTexto; ?></span>
            </div>
        </div>

        <div class="pedido-secoes">
            <!-- Seção de Informações do Pedido -->
            <div class="pedido-secao informacoes">
                <h2>Informações do Pedido</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Método de Pagamento:</span>
                        <span class="info-valor">
                            <?php 
                            switch($order['payment_method']) {
                                case 'credit_card':
                                    echo 'Cartão de Crédito';
                                    if (!empty($order['card_last4'])) {
                                        echo ' (Final ' . $order['card_last4'] . ')';
                                    }
                                    break;
                                case 'pix':
                                    echo 'PIX';
                                    break;
                                default:
                                    echo ucfirst($order['payment_method']);
                            }
                            ?>
                        </span>
                    </div>
                    
                    <div class="info-item">
                        <span class="info-label">Data do Pedido:</span>
                        <span class="info-valor"><?php echo date('d/m/Y H:i', strtotime($order['order_date'])); ?></span>
                    </div>
                    
                    <?php if (!empty($order['tracking_code'])): ?>
                    <div class="info-item">
                        <span class="info-label">Código de Rastreio:</span>
                        <span class="info-valor rastreio-code"><?php echo htmlspecialchars($order['tracking_code']); ?></span>
                    </div>
                    <?php endif; ?>
                </div>
            </div>
            
            <!-- Seção de Endereço de Entrega -->
            <div class="pedido-secao endereco">
                <h2>Endereço de Entrega</h2>
                <address>
                    <?php echo htmlspecialchars($order['shipping_address']); ?>, 
                    <?php echo htmlspecialchars($order['shipping_number']); ?>
                    <?php if (!empty($order['shipping_complement'])): ?>
                        - <?php echo htmlspecialchars($order['shipping_complement']); ?>
                    <?php endif; ?>
                    <br>
                    CEP: <?php echo htmlspecialchars($order['shipping_cep']); ?>
                </address>
            </div>
            
            <!-- Seção de Itens do Pedido -->
            <div class="pedido-secao itens">
                <h2>Itens do Pedido</h2>
                
                <div class="itens-lista">
                    <?php if (count($orderItems) > 0): ?>
                        <?php foreach ($orderItems as $item): ?>
                            <div class="item-pedido">
                                <div class="item-imagem">
                                    <img src="<?php echo htmlspecialchars($item['imagem_path']); ?>" alt="<?php echo htmlspecialchars($item['nome']); ?>">
                                </div>
                                <div class="item-detalhes">
                                    <h3><?php echo htmlspecialchars($item['nome']); ?></h3>
                                    <div class="item-meta">
                                        <span class="item-quantidade">Quantidade: <?php echo $item['quantity']; ?></span>
                                        <span class="item-preco">
                                            Preço unitário: R$ <?php echo number_format($item['price_at_purchase'], 2, ',', '.'); ?>
                                        </span>
                                    </div>
                                    <div class="item-subtotal">
                                        Subtotal: <strong>R$ <?php echo number_format($item['price_at_purchase'] * $item['quantity'], 2, ',', '.'); ?></strong>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <p class="sem-itens">Nenhum item encontrado para este pedido.</p>
                    <?php endif; ?>
                </div>
            </div>
            
            <!-- Seção de Resumo do Pedido -->
            <div class="pedido-secao resumo">
                <h2>Resumo do Pedido</h2>
                <div class="resumo-valores">
                    <div class="resumo-linha">
                        <span>Subtotal:</span>
                        <span>R$ <?php echo number_format($order['subtotal'], 2, ',', '.'); ?></span>
                    </div>
                    
                    <?php if ($order['shipping'] > 0): ?>
                    <div class="resumo-linha">
                        <span>Frete:</span>
                        <span>R$ <?php echo number_format($order['shipping'], 2, ',', '.'); ?></span>
                    </div>
                    <?php endif; ?>
                    
                    <?php if ($order['discount'] > 0): ?>
                    <div class="resumo-linha desconto">
                        <span>Desconto:</span>
                        <span>-R$ <?php echo number_format($order['discount'], 2, ',', '.'); ?></span>
                    </div>
                    <?php endif; ?>
                    
                    <div class="resumo-linha total">
                        <span>Total:</span>
                        <span>R$ <?php echo number_format($order['total'], 2, ',', '.'); ?></span>
                    </div>
                </div>
            </div>
            
            <!-- Seção de Ações -->
            <div class="pedido-secao acoes">
                <?php if ($order['status'] == 'aguardando_pagamento'): ?>
                    <button class="btn-fazer-pagamento">Efetuar Pagamento</button>
                <?php endif; ?>
                
                <?php if (!empty($order['tracking_code']) && ($order['status'] == 'enviado' || $order['status'] == 'entregue')): ?>
                    <a href="rastreio.php?code=<?php echo urlencode($order['tracking_code']); ?>" class="btn-rastrear">Rastrear Pedido</a>
                <?php endif; ?>
                
                <a href="profile.php" class="btn-voltar">Voltar para Minha Conta</a>
            </div>
        </div>
    </div>
</main>
</body>
</html>