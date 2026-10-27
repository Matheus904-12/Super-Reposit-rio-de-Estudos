<?php
// cart_operations.php
session_start();
require_once '../../../adminView/config/dbconnect.php';

// Função para log (facilita a depuração)
function logAction($action, $data) {
    $logFile = __DIR__ . '../../cart_log.txt';
    $logData = date('Y-m-d H:i:s') . " | " . $action . " | " . json_encode($data) . "\n";
    file_put_contents($logFile, $logData, FILE_APPEND);
}

// Função de resposta padronizada
function sendResponse($status, $message = '', $data = null) {
    header('Content-Type: application/json');
    echo json_encode([
        'status' => $status,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

// Verifica se o usuário está logado
$isLoggedIn = isset($_SESSION['user_id']) && isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true;
$user_id = $isLoggedIn ? intval($_SESSION['user_id']) : null;

// Aceitar dados JSON do frontend
$requestData = json_decode(file_get_contents('php://input'), true);
if ($requestData) {
    $_POST = array_merge($_POST, $requestData);
}

// Verifica se é um pedido de verificação de login
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['check_login'])) {
    $response = [
        'isLoggedIn' => $isLoggedIn,
        'userId' => $user_id
    ];
    echo json_encode($response);
    exit;
}

// Endpoint para checar status de login
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'check_login') {
    sendResponse('success', '', [
        'isLoggedIn' => $isLoggedIn,
        'userId' => $user_id
    ]);
}

// Validar action para todas as operações
if (!isset($_POST['action'])) {
    sendResponse('error', 'Ação não especificada');
}

$action = $_POST['action'];
logAction('operation', ['action' => $action, 'data' => $_POST, 'isLoggedIn' => $isLoggedIn, 'userId' => $user_id]);

// Para operações que necessitam de login
$requiresLogin = [
    'add_to_cart', 'remove_from_cart', 'update_cart_quantity',
    'add_to_favorites', 'remove_from_favorites', 'move_to_cart',
    'move_all_to_cart'
];

if (in_array($action, $requiresLogin) && !$isLoggedIn) {
    sendResponse('error', 'Usuário não autenticado');
}

try {
    switch ($action) {
        case 'get_cart':
            if (!$isLoggedIn) {
                sendResponse('success', '', ['items' => []]);
            }
            
            // Get cart items with product details - CORRIGIDO: product_id -> produto_id
            $stmt = $pdo->prepare("
                SELECT c.produto_id AS id, p.nome AS name, p.preco AS price, 
                       p.imagem AS image, c.quantity, p.descricao AS description
                FROM user_cart c
                JOIN produtos p ON c.produto_id = p.id
                WHERE c.user_id = :user_id
            ");
            $stmt->execute(['user_id' => $user_id]);
            
            $cart_items = [];
            $upload_path = '../adminView/uploads/produtos/';
            
            while ($row = $stmt->fetch()) {
                // Add full image path
                $row['image'] = '../adminView/uploads/produtos/' . $row['image']; // Corrige o caminho da imagem
                $cart_items[] = $row;
            }
            
            sendResponse('success', '', ['items' => $cart_items]);
            break;

        case 'get_favorites':
            if (!$isLoggedIn) {
                sendResponse('success', '', ['items' => []]);
            }
            
            // Get favorite items with product details - CORRIGIDO: product_id -> produto_id
            $stmt = $pdo->prepare("
                SELECT f.produto_id AS id, p.nome AS name, p.preco AS price, 
                       p.imagem AS image, p.descricao AS description
                FROM user_favorites f
                JOIN produtos p ON f.produto_id = p.id
                WHERE f.user_id = :user_id
            ");
            $stmt->execute(['user_id' => $user_id]);
            
            $favorite_items = [];
            $upload_path = '../adminView/uploads/produtos/';
            
            while ($row = $stmt->fetch()) {
                // Add full image path
                $row['image'] = $upload_path . $row['image'];
                $favorite_items[] = $row;
            }
            
            sendResponse('success', '', ['items' => $favorite_items]);
            break;

        case 'add_to_cart':
            if (!isset($_POST['product_id'])) {
                sendResponse('error', 'ID do produto não fornecido');
            }
            
            $product_id = intval($_POST['product_id']);
            $quantity = isset($_POST['quantity']) ? intval($_POST['quantity']) : 1;
            
            if ($quantity <= 0) {
                sendResponse('error', 'Quantidade inválida');
            }

            // Check if product exists
            $stmt = $pdo->prepare("SELECT id FROM produtos WHERE id = :product_id");
            $stmt->execute(['product_id' => $product_id]);
            if ($stmt->rowCount() === 0) {
                sendResponse('error', 'Produto não encontrado');
            }

            // Check if product already exists in cart - CORRIGIDO: product_id -> produto_id
            $stmt = $pdo->prepare("SELECT quantity FROM user_cart WHERE user_id = :user_id AND produto_id = :product_id");
            $stmt->execute([
                'user_id' => $user_id,
                'product_id' => $product_id
            ]);
            
            if ($stmt->rowCount() > 0) {
                // Update existing item - CORRIGIDO: product_id -> produto_id
                $row = $stmt->fetch();
                $new_quantity = $row['quantity'] + $quantity;
                
                $update_stmt = $pdo->prepare("UPDATE user_cart SET quantity = :quantity WHERE user_id = :user_id AND produto_id = :product_id");
                $affected = $update_stmt->execute([
                    'quantity' => $new_quantity,
                    'user_id' => $user_id,
                    'product_id' => $product_id
                ]);
            } else {
                // Insert new item - CORRIGIDO: product_id -> produto_id
                $insert_stmt = $pdo->prepare("INSERT INTO user_cart (user_id, produto_id, quantity) VALUES (:user_id, :product_id, :quantity)");
                $affected = $insert_stmt->execute([
                    'user_id' => $user_id,
                    'product_id' => $product_id,
                    'quantity' => $quantity
                ]);
            }

            if ($affected) {
                sendResponse('success', 'Produto adicionado ao carrinho');
            } else {
                sendResponse('error', 'Erro ao adicionar ao carrinho');
            }
            break;

        case 'remove_from_cart':
            if (!isset($_POST['product_id'])) {
                sendResponse('error', 'ID do produto não fornecido');
            }
            
            $product_id = intval($_POST['product_id']);
            
            // CORRIGIDO: product_id -> produto_id
            $stmt = $pdo->prepare("DELETE FROM user_cart WHERE user_id = :user_id AND produto_id = :product_id");
            $stmt->execute([
                'user_id' => $user_id,
                'product_id' => $product_id
            ]);

            if ($stmt->rowCount() > 0) {
                sendResponse('success', 'Produto removido do carrinho');
            } else {
                sendResponse('error', 'Produto não encontrado no carrinho');
            }
            break;

        case 'update_cart_quantity':
            if (!isset($_POST['product_id']) || !isset($_POST['quantity'])) {
                sendResponse('error', 'Parâmetros inválidos');
            }
            
            $product_id = intval($_POST['product_id']);
            $quantity = intval($_POST['quantity']);
            
            if ($quantity <= 0) {
                // Remove item if quantity is 0 or less - CORRIGIDO: product_id -> produto_id
                $stmt = $pdo->prepare("DELETE FROM user_cart WHERE user_id = :user_id AND produto_id = :product_id");
                $stmt->execute([
                    'user_id' => $user_id,
                    'product_id' => $product_id
                ]);
                
                if ($stmt->rowCount() > 0) {
                    sendResponse('success', 'Produto removido do carrinho');
                } else {
                    sendResponse('error', 'Produto não encontrado no carrinho');
                }
            } else {
                // Update quantity - CORRIGIDO: product_id -> produto_id
                $stmt = $pdo->prepare("UPDATE user_cart SET quantity = :quantity WHERE user_id = :user_id AND produto_id = :product_id");
                $stmt->execute([
                    'quantity' => $quantity,
                    'user_id' => $user_id,
                    'product_id' => $product_id
                ]);
                
                if ($stmt->rowCount() > 0) {
                    sendResponse('success', 'Quantidade atualizada');
                } else {
                    // Check if item exists first - CORRIGIDO: product_id -> produto_id
                    $check_stmt = $pdo->prepare("SELECT id FROM user_cart WHERE user_id = :user_id AND produto_id = :product_id");
                    $check_stmt->execute([
                        'user_id' => $user_id,
                        'product_id' => $product_id
                    ]);
                    
                    if ($check_stmt->rowCount() === 0) {
                        // Insert new item if it doesn't exist - CORRIGIDO: product_id -> produto_id
                        $insert_stmt = $pdo->prepare("INSERT INTO user_cart (user_id, produto_id, quantity) VALUES (:user_id, :product_id, :quantity)");
                        $affected = $insert_stmt->execute([
                            'user_id' => $user_id,
                            'product_id' => $product_id,
                            'quantity' => $quantity
                        ]);
                        
                        if ($affected) {
                            sendResponse('success', 'Produto adicionado ao carrinho');
                        } else {
                            sendResponse('error', 'Erro ao adicionar ao carrinho');
                        }
                    } else {
                        sendResponse('success', 'Nenhuma alteração foi necessária');
                    }
                }
            }
            break;

        case 'add_to_favorites':
            if (!isset($_POST['product_id'])) {
                sendResponse('error', 'ID do produto não fornecido');
            }
            
            $product_id = intval($_POST['product_id']);
            
            // Check if product exists
            $stmt = $pdo->prepare("SELECT id FROM produtos WHERE id = :product_id");
            $stmt->execute(['product_id' => $product_id]);
            if ($stmt->rowCount() === 0) {
                sendResponse('error', 'Produto não encontrado');
            }

            // Check if already in favorites - CORRIGIDO: product_id -> produto_id
            $check_stmt = $pdo->prepare("SELECT id FROM user_favorites WHERE user_id = :user_id AND produto_id = :product_id");
            $check_stmt->execute([
                'user_id' => $user_id,
                'product_id' => $product_id
            ]);
            
            if ($check_stmt->rowCount() > 0) {
                // Already in favorites
                sendResponse('success', 'Produto já está nos favoritos');
            }

            // Insert into favorites - CORRIGIDO: product_id -> produto_id
            $stmt = $pdo->prepare("INSERT INTO user_favorites (user_id, produto_id) VALUES (:user_id, :product_id)");
            $affected = $stmt->execute([
                'user_id' => $user_id,
                'product_id' => $product_id
            ]);

            if ($affected) {
                sendResponse('success', 'Produto adicionado aos favoritos');
            } else {
                sendResponse('error', 'Erro ao adicionar aos favoritos');
            }
            break;

        case 'remove_from_favorites':
            if (!isset($_POST['product_id'])) {
                sendResponse('error', 'ID do produto não fornecido');
            }
            
            $product_id = intval($_POST['product_id']);
            
            // CORRIGIDO: product_id -> produto_id
            $stmt = $pdo->prepare("DELETE FROM user_favorites WHERE user_id = :user_id AND produto_id = :product_id");
            $stmt->execute([
                'user_id' => $user_id,
                'product_id' => $product_id
            ]);

            if ($stmt->rowCount() > 0) {
                sendResponse('success', 'Produto removido dos favoritos');
            } else {
                sendResponse('error', 'Produto não encontrado nos favoritos');
            }
            break;

        case 'move_to_cart':
            if (!isset($_POST['product_id'])) {
                sendResponse('error', 'ID do produto não fornecido');
            }
            
            $product_id = intval($_POST['product_id']);
            
            // Inicia uma transação
            $pdo->beginTransaction();
            
            try {
                // Verifica se está nos favoritos - CORRIGIDO: product_id -> produto_id
                $stmt = $pdo->prepare("SELECT 1 FROM user_favorites WHERE user_id = :user_id AND produto_id = :product_id");
                $stmt->execute([
                    'user_id' => $user_id,
                    'product_id' => $product_id
                ]);
                $inFavorites = $stmt->rowCount() > 0;
                
                if (!$inFavorites) {
                    $pdo->rollBack();
                    sendResponse('error', 'Produto não encontrado nos favoritos');
                }
                
                // Verifica se já existe no carrinho - CORRIGIDO: product_id -> produto_id
                $stmt = $pdo->prepare("SELECT quantity FROM user_cart WHERE user_id = :user_id AND produto_id = :product_id");
                $stmt->execute([
                    'user_id' => $user_id,
                    'product_id' => $product_id
                ]);
                
                if ($stmt->rowCount() > 0) {
                    // Atualiza quantidade - CORRIGIDO: product_id -> produto_id
                    $row = $stmt->fetch();
                    $new_quantity = $row['quantity'] + 1;
                    
                    $update_stmt = $pdo->prepare("UPDATE user_cart SET quantity = :quantity WHERE user_id = :user_id AND produto_id = :product_id");
                    $update_stmt->execute([
                        'quantity' => $new_quantity,
                        'user_id' => $user_id,
                        'product_id' => $product_id
                    ]);
                } else {
                    // Adiciona ao carrinho com quantidade 1 - CORRIGIDO: product_id -> produto_id
                    $quantity = 1;
                    $insert_stmt = $pdo->prepare("INSERT INTO user_cart (user_id, produto_id, quantity) VALUES (:user_id, :product_id, :quantity)");
                    $insert_stmt->execute([
                        'user_id' => $user_id,
                        'product_id' => $product_id,
                        'quantity' => $quantity
                    ]);
                }
                
                // Remove dos favoritos - CORRIGIDO: product_id -> produto_id
                $delete_stmt = $pdo->prepare("DELETE FROM user_favorites WHERE user_id = :user_id AND produto_id = :product_id");
                $delete_stmt->execute([
                    'user_id' => $user_id,
                    'product_id' => $product_id
                ]);
                
                $pdo->commit();
                sendResponse('success', 'Produto movido para o carrinho');
            } catch (Exception $e) {
                $pdo->rollBack();
                sendResponse('error', 'Erro ao mover produto: ' . $e->getMessage());
            }
            break;

        case 'move_all_to_cart':
            // Get all favorited items - CORRIGIDO: product_id -> produto_id
            $stmt = $pdo->prepare("
                SELECT produto_id FROM user_favorites WHERE user_id = :user_id
            ");
            $stmt->execute(['user_id' => $user_id]);
            
            $moved_count = 0;
            
            // Start transaction
            $pdo->beginTransaction();
            
            try {
                while ($row = $stmt->fetch()) {
                    $fav_product_id = $row['produto_id'];
                    
                    // Check if product already exists in cart - CORRIGIDO: product_id -> produto_id
                    $check_stmt = $pdo->prepare("SELECT quantity FROM user_cart WHERE user_id = :user_id AND produto_id = :product_id");
                    $check_stmt->execute([
                        'user_id' => $user_id,
                        'product_id' => $fav_product_id
                    ]);
                    
                    if ($check_stmt->rowCount() > 0) {
                        // Update existing cart item - CORRIGIDO: product_id -> produto_id
                        $cart_row = $check_stmt->fetch();
                        $new_quantity = $cart_row['quantity'] + 1;
                        
                        $update_stmt = $pdo->prepare("UPDATE user_cart SET quantity = :quantity WHERE user_id = :user_id AND produto_id = :product_id");
                        $update_stmt->execute([
                            'quantity' => $new_quantity,
                            'user_id' => $user_id,
                            'product_id' => $fav_product_id
                        ]);
                    } else {
                        // Insert new cart item - CORRIGIDO: product_id -> produto_id
                        $quantity = 1;
                        $insert_stmt = $pdo->prepare("INSERT INTO user_cart (user_id, produto_id, quantity) VALUES (:user_id, :product_id, :quantity)");
                        $insert_stmt->execute([
                            'user_id' => $user_id,
                            'product_id' => $fav_product_id,
                            'quantity' => $quantity
                        ]);
                    }
                    $moved_count++;
                }
                
                // Remove all favorites after adding to cart
                if ($moved_count > 0) {
                    $delete_stmt = $pdo->prepare("DELETE FROM user_favorites WHERE user_id = :user_id");
                    $delete_stmt->execute(['user_id' => $user_id]);
                }
                
                $pdo->commit();
                
                if ($moved_count > 0) {
                    sendResponse('success', 'Produtos movidos para o carrinho', ['count' => $moved_count]);
                } else {
                    sendResponse('error', 'Nenhum produto foi movido para o carrinho');
                }
            } catch (Exception $e) {
                $pdo->rollBack();
                sendResponse('error', 'Erro ao mover produtos: ' . $e->getMessage());
            }
            break;

        default:
            sendResponse('error', 'Ação inválida');
    }
} catch (Exception $e) {
    sendResponse('error', 'Erro interno: ' . $e->getMessage());
}
?>