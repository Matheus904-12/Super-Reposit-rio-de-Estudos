<?php
// api/update_favorites.php
session_start();
header('Content-Type: application/json');
require_once('../../../adminView/config/dbconnect.php');

// Verificar se o usuário está logado
if (!isset($_SESSION['user_id'])) {
    // Processar favoritos baseado em sessão para usuários não logados
    processSessionFavorites();
} else {
    // Processar favoritos baseado em banco de dados para usuários logados
    processDatabaseFavorites($_SESSION['user_id']);
}

function processSessionFavorites() {
    // Verificar se recebemos um ID de produto válido
    if (!isset($_POST['product_id']) || empty($_POST['product_id'])) {
        echo json_encode(['success' => false, 'message' => 'ID do produto não fornecido']);
        exit;
    }

    $productId = $_POST['product_id'];
    $action = isset($_POST['action']) ? $_POST['action'] : '';

    // Inicializar lista de favoritos na sessão se não existir
    if (!isset($_SESSION['session_favorites'])) {
        $_SESSION['session_favorites'] = [];
    }

    // Executar ação apropriada
    switch ($action) {
        case 'add':
            // Verificar se o produto já existe nos favoritos
            if (!in_array($productId, $_SESSION['session_favorites'])) {
                $_SESSION['session_favorites'][] = $productId;
            }
            
            echo json_encode(['success' => true, 'message' => 'Produto adicionado aos favoritos']);
            break;
            
        case 'remove':
            // Remover produto dos favoritos
            $key = array_search($productId, $_SESSION['session_favorites']);
            if ($key !== false) {
                unset($_SESSION['session_favorites'][$key]);
                // Reindexar array
                $_SESSION['session_favorites'] = array_values($_SESSION['session_favorites']);
            }
            
            echo json_encode(['success' => true, 'message' => 'Produto removido dos favoritos']);
            break;
            
        case 'check':
            // Verificar se o produto está nos favoritos
            $isFavorite = in_array($productId, $_SESSION['session_favorites']);
            echo json_encode(['success' => true, 'isFavorite' => $isFavorite]);
            break;
            
        default:
            echo json_encode(['success' => false, 'message' => 'Ação não reconhecida']);
    }
}

function processDatabaseFavorites($userId) {
    global $conn;
    
    // Verificar se recebemos um ID de produto válido
    if (!isset($_POST['product_id']) || empty($_POST['product_id'])) {
        echo json_encode(['success' => false, 'message' => 'ID do produto não fornecido']);
        exit;
    }

    $productId = $_POST['product_id'];
    $action = isset($_POST['action']) ? $_POST['action'] : '';
    
    // Executar ação apropriada
    switch ($action) {
        case 'add':
            // Verificar se o produto já existe nos favoritos
            $stmt = $conn->prepare("SELECT id FROM favoritos WHERE user_id = ? AND product_id = ?");
            $stmt->bind_param("ii", $userId, $productId);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows == 0) {
                // Inserir novo favorito
                $insertStmt = $conn->prepare("INSERT INTO favoritos (user_id, product_id) VALUES (?, ?)");
                $insertStmt->bind_param("ii", $userId, $productId);
                $insertStmt->execute();
                
                // Registrar ação do usuário
                $actionDetails = "Produto ID: $productId adicionado aos favoritos";
                logUserAction($userId, "add_favorite", $actionDetails);
                
                echo json_encode(['success' => true, 'message' => 'Produto adicionado aos favoritos']);
            } else {
                echo json_encode(['success' => true, 'message' => 'Produto já está nos favoritos']);
            }
            break;
            
        case 'remove':
            // Remover dos favoritos
            $stmt = $conn->prepare("DELETE FROM favoritos WHERE user_id = ? AND product_id = ?");
            $stmt->bind_param("ii", $userId, $productId);
            $stmt->execute();
            
            // Registrar ação do usuário
            $actionDetails = "Produto ID: $productId removido dos favoritos";
            logUserAction($userId, "remove_favorite", $actionDetails);
            
            echo json_encode(['success' => true, 'message' => 'Produto removido dos favoritos']);
            break;
            
        case 'check':
            // Verificar se o produto está nos favoritos
            $stmt = $conn->prepare("SELECT id FROM favoritos WHERE user_id = ? AND product_id = ?");
            $stmt->bind_param("ii", $userId, $productId);
            $stmt->execute();
            $result = $stmt->get_result();
            
            $isFavorite = ($result->num_rows > 0);
            echo json_encode(['success' => true, 'isFavorite' => $isFavorite]);
            break;
            
        default:
            echo json_encode(['success' => false, 'message' => 'Ação não reconhecida']);
    }
}

// Função para registrar ações do usuário
function logUserAction($userId, $action, $details = null) {
    global $conn;
    
    $stmt = $conn->prepare("INSERT INTO user_actions_log (user_id, action, details) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $userId, $action, $details);
    $stmt->execute();
}
?>