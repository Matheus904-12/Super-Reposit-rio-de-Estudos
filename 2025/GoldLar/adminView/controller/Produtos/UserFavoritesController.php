<?php
class UserFavoritesController
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function addToFavorites($userId, $productId)
    {
        try {
            $stmt = $this->conn->prepare("
                INSERT IGNORE INTO user_favorites (user_id, product_id)
                VALUES (?, ?)
            ");
            $stmt->bind_param("ii", $userId, $productId);
            $result = $stmt->execute();

            return $result ? true : false;
        } catch (Exception $e) {
            error_log("Erro ao adicionar aos favoritos: " . $e->getMessage());
            return false;
        }
    }

    public function removeFromFavorites($userId, $productId)
    {
        try {
            $stmt = $this->conn->prepare("DELETE FROM user_favorites WHERE user_id = ? AND product_id = ?");
            $stmt->bind_param("ii", $userId, $productId);
            $result = $stmt->execute();

            return $result ? true : false;
        } catch (Exception $e) {
            error_log("Erro ao remover dos favoritos: " . $e->getMessage());
            return false;
        }
    }

    public function getDetailedFavoriteItems($userId)
    {
        $query = "SELECT f.id, f.produto_id, 
                         p.nome, p.preco, p.imagem, 
                         p.descricao, p.categoria
                  FROM user_favorites f
                  JOIN produtos p ON f.produto_id = p.id
                  WHERE f.user_id = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        $items = [];
        while ($row = $result->fetch_assoc()) {
            // Map produto_id to product_id for consistency
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

    // Novo método para buscar favoritos
    public function getFavoriteItems($userId)
    {
        try {
            $stmt = $this->conn->prepare("
                SELECT p.*
                FROM user_favorites uf
                JOIN produtos p ON uf.produto_id = p.id
                WHERE uf.user_id = ?
            ");
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $result = $stmt->get_result();

            $favoriteItems = $result->fetch_all(MYSQLI_ASSOC);
            error_log("Itens favoritos para o usuário " . $userId . ": " . print_r($favoriteItems, true));
            return $favoriteItems;
        } catch (Exception $e) {
            error_log("Erro ao buscar favoritos: " . $e->getMessage());
            return [];
        }
    }
}
