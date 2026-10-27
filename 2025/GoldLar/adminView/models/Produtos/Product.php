<?php
// Caminho: adminView/model/Product.php
class Product
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function getConnection()
    {
        return $this->pdo;
    }

    // Criar um novo produto
    public function createProduct($nome, $descricao, $imagem, $preco, $categoria)
    {
        // Adicionando o campo quantidade para atender o requisito not-null
        $quantidade = 0; // Definindo um valor padrão para a quantidade
        
        // No PostgreSQL, é melhor especificar explicitamente todos os campos
        // incluindo campos com valores padrão como 'data_cadastro' se existir
        $query = "INSERT INTO produtos (nome, descricao, imagem, preco, categoria, quantidade, ativo, data_cadastro) 
                  VALUES (?, ?, ?, ?, ?, ?, TRUE, CURRENT_TIMESTAMP)
                  RETURNING id"; // PostgreSQL suporta RETURNING para obter o ID inserido

        $stmt = $this->pdo->prepare($query);

        if ($stmt === false) {
            error_log("Erro ao preparar a consulta");
            return false;
        }

        // Executar com array de parâmetros
        if ($stmt->execute([$nome, $descricao, $imagem, $preco, $categoria, $quantidade])) {
            // Como não temos fetchAll, precisamos tentar outra abordagem para obter o ID
            // Uma opção é usar lastInsertId se disponível
            if (method_exists($this->pdo, 'lastInsertId')) {
                return $this->pdo->lastInsertId();
            }
            
            // Outra opção é buscar o ID com uma consulta separada
            $selectQuery = "SELECT id FROM produtos WHERE nome = ? AND descricao = ? ORDER BY id DESC LIMIT 1";
            $selectStmt = $this->pdo->prepare($selectQuery);
            if ($selectStmt->execute([$nome, $descricao])) {
                // Precisamos processar o resultado manualmente
                // Vamos tentar com query direta como último recurso
                $selectDirectQuery = "SELECT id FROM produtos WHERE nome = '" . 
                    $this->pdo->real_escape_string($nome) . "' ORDER BY id DESC LIMIT 1";
                $result = $this->pdo->query($selectDirectQuery);
                
                // Tentar extrair o ID do resultado
                if ($result) {
                    // Tentar diferentes maneiras de acessar o resultado
                    if (method_exists($result, 'fetch_assoc')) {
                        $row = $result->fetch_assoc();
                        return $row['id'];
                    } else {
                        // Se não pudermos extrair diretamente, pelo menos retornamos true
                        return true;
                    }
                }
            }
            
            // Se chegamos aqui, a inserção foi bem-sucedida, mas não conseguimos obter o ID
            return true;
        } else {
            error_log("Erro ao executar a inserção");
            return false;
        }
    }

    // Obter todos os produtos (incluindo apenas produtos ativos)
    public function getAllProducts()
    {
        $query = "SELECT * FROM produtos WHERE ativo = TRUE ORDER BY data_cadastro DESC";
        $result = $this->pdo->query($query);
        
        if ($result === false) {
            error_log("Erro ao executar a consulta");
            return [];
        }
        
        // Processar resultados manualmente já que não temos fetchAll
        $products = [];
        
        // Tentar diferentes maneiras de acessar os resultados
        if (method_exists($result, 'fetch_all')) {
            return $result->fetch_all(MYSQLI_ASSOC);
        } else if (method_exists($result, 'fetch_assoc')) {
            while ($row = $result->fetch_assoc()) {
                $products[] = $row;
            }
        } else {
            // Se nenhum método fetch estiver disponível, tentar propriedades do objeto
            try {
                $reflection = new ReflectionObject($result);
                $props = $reflection->getProperties();
                
                foreach ($props as $prop) {
                    $propName = $prop->getName();
                    if ($propName === 'rows' || $propName === 'data') {
                        $products = $result->{$propName};
                        break;
                    }
                }
            } catch (Exception $e) {
                error_log("Erro ao extrair resultados: " . $e->getMessage());
            }
        }
        
        return $products;
    }

    // Obter produtos por categoria
    public function getProductsByCategory($categoria)
    {
        // Usando consulta direta para evitar problemas com prepared statements
        $escapedCategoria = $this->pdo->real_escape_string($categoria);
        $query = "SELECT * FROM produtos WHERE categoria = '$escapedCategoria' AND ativo = TRUE ORDER BY data_cadastro DESC";
        
        $result = $this->pdo->query($query);
        
        if ($result === false) {
            error_log("Erro ao executar a consulta");
            return [];
        }
        
        // Processar resultados manualmente
        $products = [];
        
        if (method_exists($result, 'fetch_all')) {
            return $result->fetch_all(MYSQLI_ASSOC);
        } else if (method_exists($result, 'fetch_assoc')) {
            while ($row = $result->fetch_assoc()) {
                $products[] = $row;
            }
        }
        
        return $products;
    }

    // Obter produtos ordenados
    public function getProductsOrderedBy($orderBy = 'destaque')
    {
        $query = "SELECT * FROM produtos WHERE ativo = TRUE";

        switch ($orderBy) {
            case 'vendidos':
                $query .= " ORDER BY data_cadastro DESC";
                break;
            case 'promocao':
                $query .= " AND categoria = 'promocao' ORDER BY data_cadastro DESC";
                break;
            case 'baratos':
                $query .= " ORDER BY preco ASC";
                break;
            case 'caros':
                $query .= " ORDER BY preco DESC";
                break;
            default: // destaque
                $query .= " ORDER BY data_cadastro DESC";
                break;
        }

        $result = $this->pdo->query($query);
        
        if ($result === false) {
            error_log("Erro ao executar a consulta");
            return [];
        }
        
        // Processar resultados manualmente
        $products = [];
        
        if (method_exists($result, 'fetch_all')) {
            return $result->fetch_all(MYSQLI_ASSOC);
        } else if (method_exists($result, 'fetch_assoc')) {
            while ($row = $result->fetch_assoc()) {
                $products[] = $row;
            }
        }
        
        return $products;
    }

    // Obter um produto por ID
    public function getProductById($id)
    {
        if (!is_numeric($id) || $id <= 0) {
            return false;
        }

        // Usando consulta direta para evitar problemas com prepared statements
        $id = intval($id); // Sanitize para garantir segurança
        $query = "SELECT * FROM produtos WHERE id = $id";
        
        $result = $this->pdo->query($query);
        
        if ($result === false) {
            error_log("Erro ao executar a consulta");
            return false;
        }
        
        // Tentar diferentes métodos para obter o resultado
        if (method_exists($result, 'fetch_assoc')) {
            return $result->fetch_assoc();
        } else if (method_exists($result, 'fetch')) {
            return $result->fetch();
        }
        
        return false;
    }

    // Atualizar um produto
    public function updateProduct($id, $nome, $descricao, $imagem, $preco, $categoria)
    {
        if (!is_numeric($id) || $id <= 0) {
            return false;
        }

        // Se a imagem não for atualizada
        if (empty($imagem)) {
            $query = "UPDATE produtos SET nome = ?, descricao = ?, preco = ?, categoria = ? WHERE id = ?";
            $params = [$nome, $descricao, $preco, $categoria, $id];
        } else {
            $query = "UPDATE produtos SET nome = ?, descricao = ?, imagem = ?, preco = ?, categoria = ? WHERE id = ?";
            $params = [$nome, $descricao, $imagem, $preco, $categoria, $id];
        }

        $stmt = $this->pdo->prepare($query);

        if ($stmt === false) {
            error_log("Erro ao preparar a consulta");
            return false;
        }

        return $stmt->execute($params);
    }

    // Método 1: Exclusão lógica (recomendado)
    public function deleteProduct($id)
    {
        if (!is_numeric($id) || $id <= 0) {
            return false;
        }

        // Em vez de excluir, marcamos como inativo
        $query = "UPDATE produtos SET ativo = FALSE WHERE id = ?";
        $stmt = $this->pdo->prepare($query);

        if ($stmt === false) {
            error_log("Erro ao preparar a consulta");
            return false;
        }

        return $stmt->execute([$id]);
    }

    // Método 2: Exclusão com remoção de dependências (use com cuidado)
    public function forceDeleteProduct($id)
    {
        if (!is_numeric($id) || $id <= 0) {
            return false;
        }

        // Iniciar transação
        if (method_exists($this->pdo, 'beginTransaction')) {
            $this->pdo->beginTransaction();
        }

        try {
            // Primeiro, remover todas as referências em order_items
            $query1 = "DELETE FROM order_items WHERE product_id = ?";
            $stmt1 = $this->pdo->prepare($query1);
            
            if ($stmt1 === false) {
                throw new Exception("Erro ao preparar a consulta");
            }
            
            $stmt1->execute([$id]);
            
            // Depois, remover o produto
            $query2 = "DELETE FROM produtos WHERE id = ?";
            $stmt2 = $this->pdo->prepare($query2);
            
            if ($stmt2 === false) {
                throw new Exception("Erro ao preparar a consulta");
            }
            
            $result = $stmt2->execute([$id]);
            
            // Confirmar a transação
            if (method_exists($this->pdo, 'commit')) {
                $this->pdo->commit();
            }
            
            return $result;
        } catch (Exception $e) {
            // Reverter em caso de erro
            if (method_exists($this->pdo, 'rollBack')) {
                $this->pdo->rollBack();
            }
            error_log("Erro na exclusão do produto: " . $e->getMessage());
            return false;
        }
    }

    // Buscar produtos
    public function searchProducts($termo)
    {
        // No PostgreSQL, usamos ILIKE para busca case-insensitive
        $termoEscaped = $this->pdo->real_escape_string("%$termo%");
        $query = "SELECT * FROM produtos WHERE (nome ILIKE '$termoEscaped' OR descricao ILIKE '$termoEscaped' OR categoria ILIKE '$termoEscaped') AND ativo = TRUE";

        $result = $this->pdo->query($query);
        
        if ($result === false) {
            error_log("Erro ao executar a consulta");
            return [];
        }
        
        // Processar resultados manualmente
        $products = [];
        
        if (method_exists($result, 'fetch_all')) {
            return $result->fetch_all(MYSQLI_ASSOC);
        } else if (method_exists($result, 'fetch_assoc')) {
            while ($row = $result->fetch_assoc()) {
                $products[] = $row;
            }
        }
        
        return $products;
    }
}