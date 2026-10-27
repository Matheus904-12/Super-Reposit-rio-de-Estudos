<?php
class UserCartController
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function addToCart($userId, $productId, $quantity = 1)
    {
        try {
            $stmt = $this->conn->prepare("
            INSERT INTO user_cart (user_id, produto_id, quantity)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE quantity = quantity + ?
        ");
            $stmt->bind_param("iiii", $userId, $productId, $quantity, $quantity);
            $result = $stmt->execute();

            return $result ? true : false;
        } catch (Exception $e) {
            error_log("Erro ao adicionar ao carrinho: " . $e->getMessage());
            return false;
        }
    }


    public function clearCart($userId)
    {
        try {
            $stmt = $this->conn->prepare("DELETE FROM user_cart WHERE user_id = ?");
            $stmt->bind_param("i", $userId);
            $result = $stmt->execute();

            return $result ? true : false;
        } catch (Exception $e) {
            error_log("Erro ao limpar carrinho: " . $e->getMessage());
            return false;
        }
    }

    public function removeFromCart($userId, $productId)
    {
        try {
            $stmt = $this->conn->prepare("DELETE FROM user_cart WHERE user_id = ? AND produto_id = ?");
            $stmt->bind_param("ii", $userId, $productId);
            $result = $stmt->execute();

            return $result ? true : false;
        } catch (Exception $e) {
            error_log("Erro ao remover do carrinho: " . $e->getMessage());
            return false;
        }
    }

    public function updateCartItemQuantity($userId, $productId, $quantityChange)
    {
        try {
            $stmt = $this->conn->prepare("
            UPDATE user_cart
            SET quantity = quantity + ?
            WHERE user_id = ? AND produto_id = ?
        ");
            $stmt->bind_param("iii", $quantityChange, $userId, $productId);
            $result = $stmt->execute();

            return $result ? true : false;
        } catch (Exception $e) {
            error_log("Erro ao atualizar quantidade: " . $e->getMessage());
            return false;
        }
    }

    public function getDetailedCartItems($userId)
    {
        $query = "SELECT c.id, c.produto_id, c.quantity, 
                         p.nome, p.preco, p.imagem, 
                         p.descricao, p.categoria
                  FROM user_cart c
                  JOIN produtos p ON c.produto_id = p.id
                  WHERE c.user_id = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        $items = [];
        while ($row = $result->fetch_assoc()) {
            // Map produto_id to product_id for consistency in the application
            $row['product_id'] = $row['produto_id'];
            $row['imagem_path'] = $this->getImagePath($row['imagem']);
            $items[] = $row;
        }

        return $items;
    }


    private function getImagePath($image)
    {
        if (empty($image)) {
            return '../adminView/uploads/produtos/placeholder.jpeg';
        }

        if (strpos($image, '/') === false && strpos($image, '\\') === false) {
            return '../adminView/uploads/produtos/' . $image;
        }

        return $image;
    }

    // Novo método para buscar itens do carrinho
    public function getCartItems($userId)
    {
        try {
            $stmt = $this->conn->prepare("
                SELECT uc.produto_id, uc.quantity, p.nome, p.preco, p.imagem
                FROM user_cart uc
                JOIN produtos p ON uc.produto_id = p.id
                WHERE uc.user_id = ?
            ");
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $result = $stmt->get_result();

            $cartItems = $result->fetch_all(MYSQLI_ASSOC);
            // Map produto_id to product_id in each item
            foreach ($cartItems as &$item) {
                $item['product_id'] = $item['produto_id'];
            }

            error_log("Itens do carrinho para o usuário " . $userId . ": " . print_r($cartItems, true));
            return $cartItems;
        } catch (Exception $e) {
            error_log("Erro ao buscar itens do carrinho: " . $e->getMessage());
            return [];
        }
    }
}
