<?php
header('Content-Type: application/json');
require_once('../../../adminView/config/dbconnect.php');
require_once('../includes/compras/cart_functions.php');

// Verificar se o usuário está logado
if (!isset($_SESSION['user_id'])) {
    // Processar carrinho baseado em sessão para usuários não logados
    processSessionCartQuantity();
} else {
    // Processar carrinho baseado em banco de dados para usuários logados
    processDatabaseCartQuantity($_SESSION['user_id']);
}

function processSessionCartQuantity() {
    // Verificar se recebemos um ID de produto válido
    if (!isset($_POST['product_id']) || empty($_POST['product_id']) || !isset($_POST['quantity'])) {
        echo json_encode(['success' => false, 'message' => 'Parâmetros incompletos']);
        exit;
    }

    $productId = $_POST['product_id'];
    $quantity = (int)$_POST['quantity'];
    $action = isset($_POST['action']) ? $_POST['action'] : 'update';

    // Inicializar o carrinho de sessão se não existir
    if (!isset($_SESSION['session_cart'])) {
        $_SESSION['session_cart'] = [];
    }

    // Executar ação apropriada
    switch ($action) {
        case 'add':
            // Verificar se o produto já existe no carrinho
            $found = false;
            foreach ($_SESSION['session_cart'] as &$item) {
                if ($item['product_id'] == $productId) {
                    $item['quantity'] += $quantity;
                    $found = true;
                    break;
                }
            }
            
            // Se não encontrou, adicionar ao carrinho
            if (!$found) {
                $_SESSION['session_cart'][] = [
                    'product_id' => $productId,
                    'quantity' => $quantity
                ];
            }
            
            echo json_encode(['success' => true, 'message' => 'Produto adicionado ao carrinho']);
            break;
            
        case 'update':
            // Atualizar quantidade do produto
            foreach ($_SESSION['session_cart'] as &$item) {
                if ($item['product_id'] == $productId) {
                    $item['quantity'] = $quantity;
                    break;
                }
            }
            
            echo json_encode(['success' => true, 'message' => 'Quantidade atualizada']);
            break;
            
        default:
            echo json_encode(['success' => false, 'message' => 'Ação não reconhecida']);
    }
}

function processDatabaseCartQuantity($userId) {
    global $conn;
    
    // Verificar se recebemos um ID de produto válido
    if (!isset($_POST['product_id']) || empty($_POST['product_id'])) {
        echo json_encode(['success' => false, 'message' => 'ID do produto não fornecido']);
        exit;
    }

    $productId = $_POST['product_id'];
    $quantity = (int)$_POST['quantity'];
    $action = isset($_POST['action']) ? $_POST['action'] : 'update';
    
    try {
        // Executar ação apropriada
        switch ($action) {
            case 'add':
                // Verificar se o produto já existe no carrinho
                $stmt = $conn->prepare("SELECT id, quantity FROM carrinho WHERE user_id = ? AND product_id = ?");
                $stmt->bind_param("ii", $userId, $productId);
                $stmt->execute();
                $result = $stmt->get_result();
                
                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $newQuantity = $row['quantity'] + $quantity;
                    
                    // Atualizar quantidade
                    $updateStmt = $conn->prepare("UPDATE carrinho SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
                    $updateStmt->bind_param("ii", $newQuantity, $row['id']);
                    $updateStmt->execute();
                    
                    echo json_encode(['success' => true, 'message' => 'Quantidade atualizada']);
                } else {
                    // Inserir novo item
                    $insertStmt = $conn->prepare("INSERT INTO carrinho (user_id, product_id, quantity) VALUES (?, ?, ?)");
                    $insertStmt->bind_param("iii", $userId, $productId, $quantity);
                    $insertStmt->execute();
                    
                    echo json_encode(['success' => true, 'message' => 'Produto adicionado ao carrinho']);
                }
                break;
                
            case 'update':
                // Atualizar quantidade
                $stmt = $conn->prepare("UPDATE carrinho SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ? AND product_id = ?");
                $stmt->bind_param("iii", $quantity, $userId, $productId);
                $stmt->execute();
                
                // Verificar se a atualização foi bem-sucedida
                if ($stmt->affected_rows > 0) {
                    echo json_encode(['success' => true, 'message' => 'Quantidade atualizada']);
                } else {
                    // Se o produto não existir no carrinho, insira-o
                    $insertStmt = $conn->prepare("INSERT INTO carrinho (user_id, product_id, quantity) VALUES (?, ?, ?)");
                    $insertStmt->bind_param("iii", $userId, $productId, $quantity);
                    $insertStmt->execute();
                    
                    echo json_encode(['success' => true, 'message' => 'Produto adicionado ao carrinho']);
                }
                break;
                
            default:
                echo json_encode(['success' => false, 'message' => 'Ação não reconhecida']);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Erro: ' . $e->getMessage()]);
    }
}
?>