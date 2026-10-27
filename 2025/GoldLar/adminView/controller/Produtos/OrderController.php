<?php

class OrderController
{
    private $conn;

    public function __construct($dbConnection)
    {
        $this->conn = $dbConnection;
    }

    /**
     * Cria um novo pedido no banco de dados.
     *
     * @param array $orderData Dados do pedido. Espera chaves como 'user_id', 'total', 'subtotal', etc.
     * @return int|false O ID do pedido criado ou false em caso de erro.
     */
    public function createOrder(array $orderData)
    {
        // Colunas esperadas na tabela 'orders' (exceto id, order_date, updated_at)
        // Certifique-se que estas colunas existem na sua tabela 'orders' criada pelo SQL.
        $columns = [
            'user_id',
            'total',
            'subtotal',
            'shipping',
            'discount',
            'payment_method',
            'status',
            'shipping_address',
            'shipping_number',
            'shipping_cep',
            'shipping_complement',
            'card_last4',
            'tracking_code' // Adicionado tracking_code se for definido na criação
        ];

        $finalDataToInsert = [];
        $finalValuePlaceholders = [];
        $finalTypes = "";
        $allValuesForBindParam = [];

        foreach ($columns as $column) {
            if (isset($orderData[$column])) {
                // Campo foi fornecido no array $orderData
                $finalDataToInsert[$column] = $orderData[$column];
                $finalValuePlaceholders[] = '?';
                $allValuesForBindParam[] = $orderData[$column]; // Adiciona valor para bind

                // Define o tipo para bind_param
                if ($column === 'user_id') {
                    $finalTypes .= 'i';
                } elseif (in_array($column, ['total', 'subtotal', 'shipping', 'discount'])) {
                    $finalTypes .= 'd';
                } else {
                    $finalTypes .= 's';
                }
            } elseif (in_array($column, ['card_last4', 'shipping_complement', 'shipping_number', 'tracking_code', 'discount', 'shipping'])) {
                // Campo opcional não fornecido? Define como NULL explicitamente no SQL.
                // Nota: Se a coluna no DB tiver um DEFAULT, talvez não precise disso,
                // mas é mais seguro definir explicitamente.
                $finalDataToInsert[$column] = null; // Coluna será definida como NULL
                $finalValuePlaceholders[] = '?';
                $allValuesForBindParam[] = null; // Adiciona NULL para bind
                $finalTypes .= 's'; // Tipo 's' lida bem com NULL em bind_param
            }
            // Campos NOT NULL e sem DEFAULT (como total, subtotal, user_id, etc.)
            // DEVEM estar presentes em $orderData, senão o INSERT falhará.
            // O código assume que $orderData contém todos os campos obrigatórios.
        }

        // Verifica se há dados válidos para inserir
        if (empty($finalDataToInsert)) {
            error_log("OrderController::createOrder - Nenhum dado válido para inserir.");
            return false;
        }

        // Monta a query SQL dinamicamente
        $columnNames = "`" . implode('`, `', array_keys($finalDataToInsert)) . "`"; // Usa backticks
        $placeholderString = implode(', ', $finalValuePlaceholders);
        $sql = "INSERT INTO `orders` ($columnNames) VALUES ($placeholderString)";

        $stmt = $this->conn->prepare($sql);

        // Verifica se a preparação falhou
        if (!$stmt) {
            error_log("Erro ao preparar statement para criar pedido: " . $this->conn->error);
            error_log("SQL: " . $sql);
            return false;
        }

        // Monta os parâmetros para bind_param: string de tipos + valores
        $bindParameters = [$finalTypes];
        // Adiciona os valores (passados por referência)
        for ($i = 0; $i < count($allValuesForBindParam); $i++) {
            $bindParameters[] = &$allValuesForBindParam[$i];
        }

        // Chama bind_param
        if (!empty($finalTypes)) { // Só chama bind_param se houver tipos definidos
            call_user_func_array([$stmt, 'bind_param'], $bindParameters);
        } else {
            error_log("OrderController::createOrder - String de tipos vazia para bind_param.");
            $stmt->close();
            return false;
        }

        // Executa a query
        if ($stmt->execute()) {
            // FIX: Verifique e utilize o método apropriado para obter o ID inserido
            // Opção 1: Tente usar o método insert_id() como função
            if (method_exists($this->conn, 'insert_id')) {
                $orderId = $this->conn->insert_id();
            } 
            // Opção 2: Tente usar a propriedade insert_id diretamente
            elseif (property_exists($this->conn, 'insert_id')) {
                $orderId = $this->conn->insert_id;
            }
            // Opção 3: Use uma consulta extra para obter o último ID inserido
            else {
                $result = $this->conn->query("SELECT LAST_INSERT_ID() as last_id");
                if ($result && $row = $result->fetch_assoc()) {
                    $orderId = $row['last_id'];
                } else {
                    error_log("OrderController::createOrder - Não foi possível obter o ID do pedido inserido.");
                    $stmt->close();
                    return false;
                }
            }
            
            $stmt->close(); // Fecha o statement
            return $orderId; // Retorna o ID
        } else {
            error_log("Erro ao executar statement para criar pedido: " . $stmt->error);
            $stmt->close();
            return false;
        }
    }

    /**
     * Adiciona um item a um pedido existente.
     * Interage com a tabela 'order_items'.
     *
     * @param int $orderId ID do pedido (da tabela 'orders').
     * @param int $productId ID do produto (da tabela 'produtos').
     * @param int $quantity Quantidade do produto.
     * @param float $price Preço do produto no momento da compra.
     * @return bool True em sucesso, false em erro.
     */
    public function addOrderItem(int $orderId, int $productId, int $quantity, float $price)
    {
        $sql = "INSERT INTO `order_items` (`order_id`, `product_id`, `quantity`, `price_at_purchase`) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);

        if (!$stmt) {
            error_log("Erro ao preparar statement para adicionar item ao pedido: " . $this->conn->error);
            return false;
        }

        // Tipos: i = integer, d = double/decimal
        $stmt->bind_param("iiid", $orderId, $productId, $quantity, $price);

        if ($stmt->execute()) {
            $stmt->close();
            return true;
        } else {
            error_log("Erro ao executar statement para adicionar item ao pedido: " . $stmt->error);
            $stmt->close();
            return false;
        }
    }

    /**
     * Atualiza dados de um pedido existente na tabela 'orders'.
     * Útil para mudar status, adicionar código de rastreio, etc.
     *
     * @param int $orderId O ID do pedido a ser atualizado.
     * @param array $updateData Um array associativo ['nome_coluna' => 'novo_valor', ...].
     * @return bool True em sucesso, false em erro.
     */
    public function updateOrder(int $orderId, array $updateData)
    {
        if (empty($updateData)) {
            error_log("OrderController::updateOrder - Nenhum dado fornecido para atualizar o pedido ID: " . $orderId);
            return false; // Nada para atualizar
        }

        $setClauses = [];
        $values = [];
        $types = "";

        // Colunas permitidas para atualização (importante para segurança!)
        // Adicione ou remova colunas conforme necessário.
        $allowedColumns = [
            'status',
            'tracking_code',
            'card_last4',
            'shipping_address',
            'shipping_number',
            'shipping_cep',
            'shipping_complement',
            'payment_method',
            'total',
            'subtotal',
            'shipping',
            'discount'
            // Não inclua 'id' ou 'user_id' aqui geralmente.
        ];

        foreach ($updateData as $column => $value) {
            // Verifica se a coluna é permitida
            if (in_array($column, $allowedColumns)) {
                $setClauses[] = "`" . $column . "` = ?"; // Usa backticks
                $values[] = $value; // Adiciona valor para bind

                // Define o tipo para bind_param
                if (in_array($column, ['total', 'subtotal', 'shipping', 'discount'])) {
                    $types .= 'd';
                }
                // Adicione 'i' se alguma coluna numérica inteira for permitida (ex: um ID de referência)
                else {
                    $types .= 's';
                } // Default para string (lida bem com NULL também)

            } else {
                error_log("OrderController::updateOrder - Tentativa de atualizar coluna não permitida ('$column') no pedido ID: $orderId");
                // Ignora a coluna não permitida
            }
        }

        // Verifica se há cláusulas SET válidas
        if (empty($setClauses)) {
            error_log("OrderController::updateOrder - Nenhuma coluna válida encontrada para atualizar o pedido ID: " . $orderId);
            return false;
        }

        // Monta a query UPDATE
        $sql = "UPDATE `orders` SET " . implode(', ', $setClauses) . " WHERE `id` = ?";
        $stmt = $this->conn->prepare($sql);

        if (!$stmt) {
            error_log("Erro ao preparar statement para atualizar pedido (ID: $orderId): " . $this->conn->error);
            error_log("SQL: " . $sql);
            return false;
        }

        // Adiciona o ID do pedido ao final dos valores e 'i' aos tipos para o WHERE
        $values[] = $orderId;
        $types .= 'i'; // Tipo 'i' para o ID no WHERE

        // Monta parâmetros para bind_param
        $bindParameters = [$types];
        for ($i = 0; $i < count($values); $i++) {
            $bindParameters[] = &$values[$i]; // Passa por referência
        }

        // Chama bind_param
        if (!empty($types)) {
            call_user_func_array([$stmt, 'bind_param'], $bindParameters);
        } else {
            error_log("OrderController::updateOrder - String de tipos vazia para bind_param no pedido ID: $orderId");
            $stmt->close();
            return false;
        }

        // Executa a atualização
        if ($stmt->execute()) {
            $stmt->close();
            return true;
        } else {
            error_log("Erro ao executar statement para atualizar pedido (ID: $orderId): " . $stmt->error);
            $stmt->close();
            return false;
        }
    }

    /**
     * Obtém os detalhes de um pedido específico da tabela 'orders'.
     *
     * @param int $orderId O ID do pedido.
     * @return array|null Os dados do pedido ou null se não encontrado/erro.
     */
    public function getOrderById(int $orderId)
    {
        $sql = "SELECT * FROM `orders` WHERE `id` = ?";
        $stmt = $this->conn->prepare($sql);
        if (!$stmt) {
            error_log("Erro ao preparar statement para buscar pedido por ID ($orderId): " . $this->conn->error);
            return null;
        }
        $stmt->bind_param("i", $orderId);

        if (!$stmt->execute()) {
            error_log("Erro ao executar statement para buscar pedido por ID ($orderId): " . $stmt->error);
            $stmt->close();
            return null;
        }

        $result = $stmt->get_result();
        $order = $result->fetch_assoc();
        $stmt->close();
        return $order; // Retorna array do pedido ou null se não encontrado
    }

    /**
     * Obtém os itens de um pedido específico, juntando 'order_items' e 'produtos'.
     *
     * @param int $orderId O ID do pedido.
     * @return array Uma lista de itens do pedido (array de arrays associativos). Retorna array vazio em caso de erro.
     */
    public function getOrderItems(int $orderId)
    {
        // Junta com a tabela 'produtos' para obter nome e imagem atuais do produto.
        // Se precisar do nome/imagem *exatos* do momento da compra, teria que salvá-los em 'order_items'.
        $sql = "SELECT oi.*, p.nome as product_name, p.imagem as product_image
                FROM `order_items` oi
                JOIN `produtos` p ON oi.product_id = p.id
                WHERE oi.order_id = ?";
        $stmt = $this->conn->prepare($sql);
        if (!$stmt) {
            error_log("Erro ao preparar statement para buscar itens do pedido ($orderId): " . $this->conn->error);
            return []; // Retorna array vazio em caso de erro
        }
        $stmt->bind_param("i", $orderId);

        if (!$stmt->execute()) {
            error_log("Erro ao executar statement para buscar itens do pedido ($orderId): " . $stmt->error);
            $stmt->close();
            return [];
        }

        $result = $stmt->get_result();
        $items = $result->fetch_all(MYSQLI_ASSOC); // Pega todos os itens
        $stmt->close();
        return $items; // Retorna a lista de itens (pode ser vazia se não houver itens)
    }

    /**
     * Obtém todos os pedidos de um usuário específico da tabela 'orders'.
     *
     * @param int $userId O ID do usuário (da tabela 'usuarios').
     * @return array Uma lista de pedidos (array de arrays associativos). Retorna array vazio em caso de erro.
     */
    public function getOrdersByUserId(int $userId)
    {
        $sql = "SELECT * FROM `orders` WHERE `user_id` = ? ORDER BY `order_date` DESC";
        $stmt = $this->conn->prepare($sql);
        if (!$stmt) {
            error_log("Erro ao preparar statement para buscar pedidos por usuário ($userId): " . $this->conn->error);
            return []; // Retorna array vazio em caso de erro
        }
        $stmt->bind_param("i", $userId);

        if (!$stmt->execute()) {
            error_log("Erro ao executar statement para buscar pedidos por usuário ($userId): " . $stmt->error);
            $stmt->close();
            return [];
        }

        $result = $stmt->get_result();
        $orders = $result->fetch_all(MYSQLI_ASSOC); // Pega todos os pedidos
        $stmt->close();
        return $orders; // Retorna a lista de pedidos (pode ser vazia)
    }
} // Fim da classe OrderController