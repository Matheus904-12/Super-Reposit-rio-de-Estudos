<?php
date_default_timezone_set('America/Sao_Paulo'); // Define o fuso horário do Brasil

require_once '../adminView/config/dbconnect.php';
require_once '../adminView/controller/Produtos/UserCartController.php';
require_once '../adminView/controller/Produtos/ProductController.php';
require_once '../adminView/controller/Produtos/OrderController.php';
$userCartController = new UserCartController($conn);
$productController = new ProductController($conn);
$orderController = new OrderController($conn);

// Função para calcular o total do pedido (subtotal + frete - desconto)
function calculateOrderTotal($subtotal, $shipping, $discount = 0)
{
    return $subtotal + $shipping - $discount;
}

session_start();

// Verifica se o usuário está logado
if (!isset($_SESSION['user_id']) || $_SESSION['logged_in'] !== true) {
    header('Location: login_site.php?redirect=checkout');
    exit;
}

// Inicializa a variável $orderPlaced e $orderId
$orderPlaced = false;
$orderId = null;

// After the order is placed successfully, retrieve the order details
if ($orderPlaced) {
    // Get order details by ID
    $order = getOrderDetails($orderId);

    // If order details retrieval fails
    if (!$order) {
        // Log the error
        error_log("Failed to retrieve order details for ID: $orderId");

        // Create a minimal order array with the data we already have
        $order = [
            'subtotal' => $subtotal,
            'shipping' => $shipping,
            'discount' => $discount,
            'total' => $total,
            'payment_method' => $_POST['payment_method'] ?? 'unknown',
            'status' => $paymentMethod === 'pix' ? 'pending' : 'approved',
            'card_last4' => isset($last4) ? $last4 : ''
        ];
    }
}

// Obtém as informações do usuário da sessão
$userId = $_SESSION['user_id'];
$userName = $_SESSION['username'];
$userPicture = $_SESSION['user_picture'] ?? 'img/icons/perfil.png';
$userEmail = $_SESSION['user_email'] ?? '';

// Obter contagens reais de carrinho e favoritos usando os novos métodos
$orderCount = 0; // Mantido como 0 pois não temos um método específico para pedidos ainda
$cartItems = $userCartController->getCartItems($userId);
$cartCount = count($cartItems);

// Verifica se o usuário está logado
$isLoggedIn = isset($_SESSION['user_id']) && $_SESSION['logged_in'] === true;

if ($isLoggedIn) {
    $userName = strlen($userName) > 16 ? substr($userName, 0, 16) . "..." : $userName;

    // Verifica se a foto de perfil está no banco de dados ou na sessão
    require_once '../adminView/config/dbconnect.php';

    if (empty($_SESSION['user_picture']) || empty($_SESSION['user_email'])) { // Verifica se o email também está na sessão
        $query = "SELECT profile_picture, email, name, telefone, endereco, cep, numero_casa FROM usuarios WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($row = $result->fetch_assoc()) {
            $userPicture = $row['profile_picture'];
            $userEmail = $row['email'];
            $userNome = $row['name']; // Changed from 'nome' to 'name'
            $userTelefone = $row['telefone'];
            $userEndereco = $row['endereco'];
            $userCep = $row['cep'];
            $userNumeroCasa = $row['numero_casa'];

            $_SESSION['user_picture'] = $userPicture;
            $_SESSION['user_email'] = $userEmail;
        } else {
            $userPicture = 'img/icons/perfil.png';
            $userEmail = '';
            $userNome = '';
            $userTelefone = '';
            $userEndereco = '';
            $userCep = '';
            $userNumeroCasa = '';
        }
    } else {
        $userPicture = $_SESSION['user_picture'];
        $userEmail = $_SESSION['user_email']; // Obtém o email da sessão

        // Buscar dados adicionais do usuário
        require_once '../adminView/config/dbconnect.php';
        $query = "SELECT profile_picture, email, name, telefone, endereco, cep, numero_casa FROM usuarios WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($row = $result->fetch_assoc()) {
            $userNome = $row['name'];
            $userTelefone = $row['telefone'];
            $userEndereco = $row['endereco'];
            $userCep = $row['cep'];
            $userNumeroCasa = $row['numero_casa'];
        }
    }

    // Buscar notificações do usuário
    require_once '../adminView/config/dbconnect.php';
    $query = "SELECT id, titulo, mensagem, data_criacao, lida FROM notificacoes WHERE usuario_id = ? ORDER BY data_criacao DESC";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $notificacoes = $stmt->get_result();

    // Buscar as compras do usuário (itens rastreados)
    $queryCompras = "SELECT * FROM itens_rastreados WHERE usuario_id = ?";
    $stmtCompras = $conn->prepare($queryCompras);
    $stmtCompras->bind_param("i", $userId);
    $stmtCompras->execute();
    $resultCompras = $stmtCompras->get_result();
    $compras = $resultCompras->fetch_all(MYSQLI_ASSOC);

    // Converter os dados das compras para JSON
    $comprasJson = json_encode($compras);
}

/**
 * Processa o pedido e salva no banco de dados
 * 
 * @param array $userData Dados do usuário
 * @param array $cartItems Itens do carrinho
 * @param float $subtotal Valor subtotal
 * @param float $shipping Valor do frete
 * @param float $discount Valor do desconto
 * @param string $paymentMethod Método de pagamento
 * @return int ID do pedido criado
 */
function processOrder($userData, $cartItems, $subtotal, $shipping, $discount, $paymentMethod)
{
    global $conn;

    // Calcular o total incluindo o frete
    $total = calculateOrderTotal($subtotal, $shipping, $discount);

    // Gerar número do pedido único
    $orderNumber = 'ORD-' . date('YmdHis') . rand(100, 999);

    // Gerar código de rastreio fictício
    $trackingCode = 'TRK' . strtoupper(substr(md5(time()), 0, 10));

    // Definir status inicial do pedido
    $status = ($paymentMethod === 'credit_card') ? 'approved' : 'pending';

    // Preparar e executar a inserção do pedido
    $stmt = $conn->prepare("INSERT INTO orders (
        user_id, order_number, subtotal, shipping, discount, total, payment_method, 
        shipping_address, shipping_city, shipping_state, shipping_zipcode, 
        status, tracking_code, created_at
    ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW()
    )");

    $stmt->bind_param(
        "isddddssssss",
        $userData['user_id'],
        $orderNumber,
        $subtotal,
        $shipping,  // Armazena o valor do frete separadamente
        $discount,
        $total,     // Total já inclui o frete
        $paymentMethod,
        $userData['address'],
        $userData['city'],
        $userData['state'],
        $userData['cep'],
        $status,
        $trackingCode
    );

    $stmt->execute();

    if ($stmt->error) {
        // Log de erro
        error_log("Erro ao inserir pedido: " . $stmt->error);
        return false;
    }

    $orderId = $conn->insert_id;

    // Inserir itens do pedido
    foreach ($cartItems as $item) {
        $itemTotal = $item['preco'] * $item['quantity'];

        $stmt = $conn->prepare("INSERT INTO order_items (
            order_id, product_id, quantity, price, total
        ) VALUES (?, ?, ?, ?, ?)");

        $stmt->bind_param(
            "iidd",
            $orderId,
            $item['produto_id'],
            $item['quantity'],
            $item['preco'],
            $itemTotal
        );

        $stmt->execute();

        if ($stmt->error) {
            error_log("Erro ao inserir item do pedido: " . $stmt->error);
        }
    }

    return $orderId;
}

/**
 * Recupera informações do pedido do banco de dados
 * 
 * @param int $orderId ID do pedido
 * @return array Dados do pedido
 */
function getOrderDetails($orderId)
{
    global $conn;

    $stmt = $conn->prepare("
        SELECT o.*, 
               u.nome as user_name, u.email as user_email,
               SUM(oi.total) as items_total
        FROM orders o
        JOIN users u ON o.user_id = u.id
        LEFT JOIN order_items oi ON o.id = oi.order_id
        WHERE o.id = ?
        GROUP BY o.id
    ");

    $stmt->bind_param("i", $orderId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $order = $result->fetch_assoc();

        // Verificar se os valores estão consistentes
        if (abs($order['subtotal'] - $order['items_total']) > 0.01) {
            // Log de inconsistência
            error_log("Inconsistência nos valores do pedido #{$orderId}: subtotal={$order['subtotal']}, items_total={$order['items_total']}");
        }

        // Verificar se o total inclui o frete
        $calculatedTotal = calculateOrderTotal($order['subtotal'], $order['shipping'], $order['discount']);
        if (abs($calculatedTotal - $order['total']) > 0.01) {
            // Log de inconsistência no total
            error_log("Inconsistência no total do pedido #{$orderId}: calculado={$calculatedTotal}, armazenado={$order['total']}");

            // Atualizar o total no banco
            $updateStmt = $conn->prepare("UPDATE orders SET total = ? WHERE id = ?");
            $updateStmt->bind_param("di", $calculatedTotal, $orderId);
            $updateStmt->execute();

            // Atualizar o valor na resposta
            $order['total'] = $calculatedTotal;
        }

        return $order;
    }

    return null;
}

/**
 * Função para processar o pagamento
 * Em um ambiente real, esta função se conectaria a um gateway de pagamento
 * 
 * @param string $paymentMethod Método de pagamento
 * @param array $paymentData Dados do pagamento
 * @param float $total Valor total incluindo frete
 * @return array Resultado do processamento
 */
function processPayment($paymentMethod, $paymentData, $total)
{
    // Simulação de processamento de pagamento
    $result = [
        'success' => true,
        'transaction_id' => 'TXN' . strtoupper(substr(md5(time()), 0, 10)),
        'message' => '',
        'status' => ''
    ];

    // Lógica específica para cada método de pagamento
    if ($paymentMethod === 'credit_card') {
        // Em um ambiente real, aqui enviaria os dados para o gateway de cartão
        $result['status'] = 'approved';
        $result['message'] = 'Pagamento aprovado com sucesso';
    } elseif ($paymentMethod === 'pix') {
        // Gerar código PIX e responder com os dados para exibição
        $result['pix_code'] = 'PIX' . strtoupper(substr(md5($total . time()), 0, 20));
        $result['pix_expiration'] = date('Y-m-d H:i:s', strtotime('+30 minutes'));
        $result['status'] = 'pending';
        $result['message'] = 'Aguardando pagamento via PIX';
    } else {
        $result['success'] = false;
        $result['message'] = 'Método de pagamento não suportado';
    }

    return $result;
}

// Obter itens do carrinho
$cartItems = $userCartController->getCartItems($userId);
if (empty($cartItems)) {
    header('Location: compras.php');
    exit;
}

// Obter dados do usuário
require_once '../adminView/config/dbconnect.php';
$query = "SELECT profile_picture, email, name, telefone, endereco, cep, numero_casa FROM usuarios WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
if ($row = $result->fetch_assoc()) {
    $userNome = $row['name'];
    $userTelefone = $row['telefone'];
    $userEndereco = $row['endereco'];
    $userCep = $row['cep'];
    $userNumeroCasa = $row['numero_casa'];
}

// Preparar dados do usuário para o cálculo de frete
$userData = [
    'cep' => $userCep ?? '',
    'address' => $userEndereco ?? '',
    'number' => $userNumeroCasa ?? '',
    // Adicionar cidade e estado quando disponíveis
    'city' => '', // Esses campos precisam ser adicionados à tabela de usuários
    'state' => '' // Esses campos precisam ser adicionados à tabela de usuários
];

// Calcular totais
$subtotal = 0;
$shipping = 0;
$discount = 0;
$total = 0;
$distanceBasedShipping = false;

foreach ($cartItems as $item) {
    $subtotal += $item['preco'] * $item['quantity'];
}

// Definir endereço da loja como constante
$STORE_ADDRESS = "Rua Mário Bochetti 1102, Miguel Badra, Suzano, SP";

// Verificar se o CEP foi fornecido
if (!empty($userData['cep'])) {
    $distanceBasedShipping = true;

    // Se não tivermos um endereço completo, buscar através da API de CEP
    if (empty($userData['address']) || empty($userData['city']) || empty($userData['state'])) {
        // Buscar endereço pelo CEP
        $cep = preg_replace('/\D/', '', $userData['cep']);
        $url = "https://viacep.com.br/ws/{$cep}/json/";

        // Inicializar cURL
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);

        $addressData = json_decode($response, true);

        if (!isset($addressData['erro'])) {
            // Montar endereço completo
            $customerAddress = $addressData['logradouro'] . ", " .
                (isset($userData['number']) ? $userData['number'] : "s/n") . ", " .
                $addressData['bairro'] . ", " .
                $addressData['localidade'] . ", " .
                $addressData['uf'] . ", " .
                $userData['cep'];

            // Atualizar dados do usuário com informações do CEP
            $userData['city'] = $addressData['localidade'];
            $userData['state'] = $addressData['uf'];
            if (empty($userData['address'])) {
                $userData['address'] = $addressData['logradouro'];
            }
        } else {
            // Se não encontrar pelo CEP, usar um cálculo baseado no CEP
            $customerAddress = "";
            $distanceBasedShipping = false;
        }
    } else {
        // Se já tivermos o endereço completo, usar ele
        $customerAddress = $userData['address'] . ", " .
            $userData['number'] . ", " .
            (isset($userData['neighborhood']) ? $userData['neighborhood'] : "") . ", " .
            $userData['city'] . ", " .
            $userData['state'] . ", " .
            $userData['cep'];
    }

    // Calcular frete baseado na distância
    if ($distanceBasedShipping && !empty($customerAddress)) {
        // Esta função será implementada pelo lado do cliente em JavaScript
        // Aqui apenas definimos um valor padrão que será atualizado pelo JS
        $shipping = 30.00; // Valor mínimo

        // Armazenar endereço completo em um campo oculto para o JavaScript
        echo '<input type="hidden" id="full_shipping_address" value="' . htmlspecialchars($customerAddress) . '">';
    } else {
        // Cálculo simples baseado no CEP se não conseguirmos calcular por distância
        $cepBase = substr(preg_replace('/\D/', '', $userData['cep']), 0, 5);

        // Definir frete baseado em faixas de CEP
        if ($cepBase >= 8000 && $cepBase <= 8499) {
            // CEPs de Suzano e região próxima
            $shipping = 30.00;
        } elseif ($cepBase >= 8500 && $cepBase <= 8999) {
            // CEPs de Mogi das Cruzes e região
            $shipping = 45.00;
        } elseif ($cepBase >= 9000 && $cepBase <= 9999) {
            // Grande São Paulo
            $shipping = 60.00;
        } else {
            // Outras regiões
            $shipping = 100.00;
        }
    }
} else {
    // Se não tiver CEP, definir um valor padrão
    $shipping = 0.00;
}

// Calcular o total usando a função
$total = calculateOrderTotal($subtotal, $shipping, $discount);

// Verificar se o pedido foi enviado
$orderPlaced = false;
$orderId = null;
$orderError = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $paymentMethod = $_POST['payment_method'] ?? '';
    $cardNumber = $_POST['card_number'] ?? '';
    $cardExpiry = $_POST['card_expiry'] ?? '';
    $cardCvv = $_POST['card_cvv'] ?? '';
    $cardName = $_POST['card_name'] ?? '';
    $saveCard = isset($_POST['save_card']) && $_POST['save_card'] === 'on';

    $shippingAddress = $_POST['shipping_address'] ?? '';
    $shippingNumber = $_POST['shipping_number'] ?? '';
    $shippingCep = $_POST['shipping_cep'] ?? '';
    $shippingComplement = $_POST['shipping_complement'] ?? '';

    // Validar dados básicos
    if (empty($paymentMethod) || empty($shippingAddress) || empty($shippingCep)) {
        $orderError = "Por favor, preencha todos os campos obrigatórios.";
    } else {
        try {
            // Criar novo pedido
            $orderData = [
                'user_id' => $userId,
                'total' => $total,
                'subtotal' => $subtotal,
                'shipping' => $shipping,  // Garantir que o frete seja incluído
                'discount' => $discount,
                'payment_method' => $paymentMethod,
                'status' => $paymentMethod === 'pix' ? 'aguardando_pagamento' : 'processando',
                'shipping_address' => $shippingAddress,
                'shipping_number' => $shippingNumber,
                'shipping_cep' => $shippingCep,
                'shipping_complement' => $shippingComplement
            ];

            // Se for cartão, salvar últimos 4 dígitos (por segurança)
            if ($paymentMethod === 'credit_card' && !empty($cardNumber)) {
                $last4 = substr($cardNumber, -4);
                $orderData['card_last4'] = $last4;

                // Salvar cartão se solicitado (em uma tabela separada)
                if ($saveCard) {
                    // Aqui você implementaria o código para salvar o cartão em uma tabela segura
                    // IMPORTANTE: Nunca salve números de cartão inteiros, apenas os últimos 4 dígitos
                    // Para processamento real, use um gateway de pagamento como Stripe, Mercado Pago, etc.
                    $saveCardQuery = "INSERT INTO user_cards (user_id, card_last4, card_name, card_expiry) 
                                      VALUES (?, ?, ?, ?)";
                    $cardStmt = $conn->prepare($saveCardQuery);
                    $cardStmt->bind_param("isss", $userId, $last4, $cardName, $cardExpiry);
                    $cardStmt->execute();
                }
            }

            // Criar ordem no banco de dados
            $orderId = $orderController->createOrder($orderData);

            if ($orderId) {
                // Adicionar itens do pedido
                foreach ($cartItems as $item) {
                    $orderController->addOrderItem($orderId, $item['product_id'], $item['quantity'], $item['preco']);
                }

                // Limpar carrinho após o pedido
                $userCartController->clearCart($userId);

                // Gerar código de rastreamento fictício
                $trackingCode = 'CG' . strtoupper(substr(md5($orderId . time()), 0, 8));
                $orderController->updateOrder($orderId, ['tracking_code' => $trackingCode]);

                $orderPlaced = true;

                // Adicionar notificação para o usuário
                $notificationQuery = "INSERT INTO notificacoes (usuario_id, titulo, mensagem, data_criacao, lida) 
                                      VALUES (?, 'Pedido Confirmado', 'Seu pedido #$orderId foi confirmado e está em processamento.', NOW(), 0)";
                $notifStmt = $conn->prepare($notificationQuery);
                $notifStmt->bind_param("i", $userId);
                $notifStmt->execute();

                // Adicionar ao rastreamento de itens
                foreach ($cartItems as $item) {
                    $rastrearQuery = "INSERT INTO itens_rastreados (usuario_id, produto_id, nome, preco, quantidade, codigo_rastreio, status, data_compra, imagem) 
                                      VALUES (?, ?, ?, ?, ?, ?, 'processando', NOW(), ?)";
                    $rastrearStmt = $conn->prepare($rastrearQuery);
                    $rastrearStmt->bind_param(
                        "iisdiss",
                        $userId,
                        $item['product_id'],
                        $item['nome'],
                        $item['preco'],
                        $item['quantity'],
                        $trackingCode,
                        $item['imagem_path']
                    );
                    $rastrearStmt->execute();
                }

                // Opcional: enviar e-mail de confirmação (implementar depois)
            } else {
                $orderError = "Erro ao processar o pedido. Por favor, tente novamente.";
            }
        } catch (Exception $e) {
            $orderError = "Erro ao processar o pedido: " . $e->getMessage();
        }
    }
}

// Obter cartões salvos (se houver)
$savedCards = [];
$cardsQuery = "SELECT id, card_last4, card_name, card_expiry FROM user_cards WHERE user_id = ? ORDER BY id DESC";
$cardsStmt = $conn->prepare($cardsQuery);
$cardsStmt->bind_param("i", $userId);
$cardsStmt->execute();
$cardsResult = $cardsStmt->get_result();

while ($card = $cardsResult->fetch_assoc()) {
    $savedCards[] = $card;
}

// Processamento de filtros e busca de produtos
function fetchProducts($productController, $conn)
{
    // Sanitização de entradas
    $categoria = isset($_GET['categoria']) ? htmlspecialchars($_GET['categoria']) : '';
    $orderBy = isset($_GET['orderBy']) ? htmlspecialchars($_GET['orderBy']) : '';
    $search = isset($_GET['search']) ? htmlspecialchars($_GET['search']) : '';

    // Lógica de busca de produtos
    if (!empty($categoria)) {
        return $productController->getProductsByCategory($categoria);
    } elseif (!empty($orderBy)) {
        return $productController->getProductsOrderedBy($orderBy);
    } elseif (!empty($search)) {
        return $productController->searchProducts($search);
    } else {
        // Padrão: obter todos os produtos
        return $productController->getAllProducts();
    }
}

// Buscar produtos e adicionar o caminho da imagem
$produtosRaw = fetchProducts($productController, $conn);
$produtos = [];

// Adicionar o caminho correto das imagens
foreach ($produtosRaw as $produto) {
    // Certifique-se de que a imagem existe e não tem já o caminho completo
    if (!empty($produto['imagem'])) {
        // Adiciona o caminho apenas se a imagem não tiver o caminho completo
        if (strpos($produto['imagem'], '/') === false && strpos($produto['imagem'], '\\') === false) {
            $produto['imagem_path'] = '../adminView/uploads/produtos/' . $produto['imagem'];
        } else {
            // Se já for um caminho, apenas copie
            $produto['imagem_path'] = $produto['imagem'];
        }
    } else {
        // Imagem padrão se não existir
        $produto['imagem_path'] = '../adminView/uploads/produtos/placeholder.jpeg';
    }

    $produtos[] = $produto;
}

// Função auxiliar para obter o caminho da imagem do produto
function getProductImagePath($productId, $conn)
{
    $query = "SELECT imagem FROM produtos WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $productId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        if (!empty($row['imagem'])) {
            if (strpos($row['imagem'], '/') === false && strpos($row['imagem'], '\\') === false) {
                return '../adminView/uploads/produtos/' . $row['imagem'];
            } else {
                return $row['imagem'];
            }
        }
    }

    return '../adminView/uploads/produtos/placeholder.jpeg';
}


// Carregamento de configurações do site
function loadSiteConfig($configPath)
{
    if (!file_exists($configPath)) {
        throw new Exception("Erro ao carregar as configurações do site.");
    }

    $jsonContent = file_get_contents($configPath);
    if ($jsonContent === false) {
        throw new Exception("Erro ao carregar as configurações do site.");
    }

    $configData = json_decode($jsonContent, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Erro ao carregar as configurações do site.");
    }

    return $configData;
}

$siteConfigPath = __DIR__ . '/../adminView/config_site.json';
error_log("Caminho do arquivo de configuração: " . realpath($siteConfigPath));

if (!file_exists($siteConfigPath)) {
    error_log("Erro: Arquivo de configuração não encontrado.");
    echo "Erro ao carregar as configurações do site.";
    return;
}

$jsonContent = file_get_contents($siteConfigPath);
if ($jsonContent === false) {
    error_log("Erro ao ler o arquivo config_site.json.");
    echo "Erro ao carregar as configurações do site.";
    return;
} else {
    error_log("Conteúdo do config_site.json: $jsonContent");
}

$configData = json_decode($jsonContent, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    error_log("Erro ao decodificar JSON: " . json_last_error_msg());
    echo "Erro ao carregar as configurações do site.";
    return;
} else {
    error_log("Dados decodificados: " . print_r($configData, true));
}

$getConfigValue = function ($config, $keys, $default = '') {
    $value = $config;
    foreach ($keys as $key) {
        if (!isset($value[$key])) {
            return $default;
        }
        $value = $value[$key];
    }
    return is_string($value) ? htmlspecialchars($value) : $value;
};

$sobreMidia = $getConfigValue($configData, ['pagina_inicial', 'sobre', 'midia']);
$whatsapp = $getConfigValue($configData, ['contato', 'whatsapp']);
$instagram = $getConfigValue($configData, ['contato', 'instagram'], '#');
$facebook = $getConfigValue($configData, ['contato', 'facebook'], '#');
$email = $getConfigValue($configData, ['contato', 'email'], '#');
$footerTexto = $getConfigValue($configData, ['rodape', 'texto']);
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../adminView/assets/images/logo.png" type="image/x-icon">
    <title>Finalizar Compra - Cristais Gold Lar</title>
    <link rel="stylesheet" href="css/profile/profile.css">
    <link rel="stylesheet" href="css/elements.css">
    <link rel="stylesheet" href="css/index/index-responsivo.css">
    <link rel="stylesheet" href="css/profile/profile-responsivo.css">
    <link rel="stylesheet" href="css/checkout/checkout.css">
    <link rel="stylesheet" href="css/checkout/checkout-responsivo.css">
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body>
    <div id="loading-screen">
        <div class="loader"></div>
    </div>

    <div class="notification-bar">
        <div class="message active" id="message1">Até 5x Sem Juros</div>
        <div class="message" id="message2">Frete Grátis para São Paulo!</div>
    </div>
    <header class="navbar">
        <nav>
            <div class="menu-hamburguer" id="menu-btn">
                <label class="hamburger">
                    <input type="checkbox" id="toggle-menu" />
                    <svg viewBox="0 0 32 32">
                        <path class="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22">
                        </path>
                        <path class="line" d="M7 16 27 16"></path>
                    </svg>
                </label>
            </div>
            <ul class="nav-links">
                <li><a href="index.php">Início</a></li>
                <li><a href="index.php">Sobre</a></li>
                <li><a href="index.php">Arranjos</a></li>
                <li><a href="galeria.php">Galeria</a></li>
            </ul>
            <div class="logo">
                <img src="img/logo.png" alt="Logo">
            </div>
            <div class="nav-icons">
                <ul class="nav-links">
                    <li><a href="blog.php">Blog</a></li>
                    <li><a href="compras.php">Loja</a></li>
                </ul>
                <div class="dropdown">
                    <a href="#" id="profile-btn">
                        <img src="includes/configuracoes/image_proxy.php?url=<?= urlencode($userPicture) ?>" alt="Foto de Perfil" id="profile-pic">
                        <span class="profile-toggle">
                            <span id="username-display"><?= htmlspecialchars($userName) ?></span>
                            <img src="img/icons/seta.png" alt="Seta" class="arrow">
                        </span>
                    </a>
                    <div class="dropdown-menu">
                        <a href="includes/configuracoes/logout.php" class="logout-btn">Sair</a>
                        <a href="profile.php" class="config-btn">Configurações</a>
                    </div>
                </div>
            </div>
        </nav>
        <!-- Menu Mobile (Escondido por padrão) -->
        <div class="mobile-menu" id="mobile-menu">
            <button class="close-btn" id="close-btn">×</button>
            <div class="dropdown">
                <a href="<?= $isLoggedIn ? 'profile.php' : 'login_site.php' ?>" id="mobile-profile-btn">
                    <img src="<?= $isLoggedIn ? htmlspecialchars($userPicture) : 'img/icons/perfil.png' ?>" alt="Entrar/Cadastrar-se" alt="Foto de Perfil" id="profile-pic">
                    <span class="profile-toggle">
                        <?= $isLoggedIn ? htmlspecialchars($userName) : 'Entrar/Cadastre-se' ?>
                        <img src="img/icons/seta.png" alt="Seta" class="arrow">
                    </span>
                </a>
                <div class="dropdown-menu">
                    <?php if ($isLoggedIn) : ?>
                        <a href="includes/configuracoes/logout.php" class="logout-btn">Sair</a>
                        <a href="profile.php" class="config-btn">Configurações</a>
                    <?php else : ?>
                        <button class="google-login" onclick="location.href='google_login.php'">Entrar com Google</button>
                        <a href="profile.php" class="facebook-login">Configurações</a>
                    <?php endif; ?>
                </div>
            </div>
            <ul class="mobile-nav-links">
                <li><a href="index.php">Início</a></li>
                <li><a href="compras.php">Loja</a></li>
                <li><a href="galeria.php">Galeria</a></li>
                <li><a href="blog.php">Blog</a></li>
            </ul>
        </div>
    </header>

    <section class="hero2" id="inicio"></section>

    <div class="background-container">
        <br>
        <?php if ($orderPlaced): ?>
            <!-- Confirmação de Pedido -->
            <div class="checkout-container">
                <div class="order-confirmation">
                    <div class="confirmation-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h1>Pedido Confirmado!</h1>
                    <p>Seu pedido foi processado com sucesso. Obrigado pela compra!</p>

                    <div class="order-details">
                        <h3>Detalhes do Pedido:</h3>
                        <div class="detail-row">
                            <span>Número do Pedido:</span>
                            <span>#<?= htmlspecialchars($orderId) ?></span>
                        </div>
                        <div class="detail-row">
                            <span>Data:</span>
                            <span><?= date('d/m/Y H:i', time()) // Usar o timestamp atual 
                                    ?></span>
                        </div>
                        <div class="detail-row">
                            <span>Total:</span>
                            <span>R$<?= number_format(calculateOrderTotal($subtotal, $shipping, $discount), 2, ',', '.') ?></span>
                        </div>
                        <div class="detail-row">
                            <span>Método de Pagamento:</span>
                            <span class="payment-method-display">
                                <?php
                                if ($_POST['payment_method'] === 'credit_card') {
                                    echo '<i class="fas fa-credit-card"></i> Cartão de Crédito';
                                    if (!empty($_POST['card_number'])) {
                                        echo ' <span class="card-number">(final ' . substr($_POST['card_number'], -4) . ')</span>';
                                    }
                                } elseif ($_POST['payment_method'] === 'pix') {
                                    echo '<i class="fas fa-qrcode"></i> PIX';
                                }
                                ?>
                            </span>
                        </div>
                        <div class="detail-row">
                            <span>Status:</span>
                            <span>
                                <?php
                                if ($_POST['payment_method'] === 'credit_card') {
                                    echo '<span style="color: #4e8d7c;">Pagamento Aprovado</span>';
                                } elseif ($_POST['payment_method'] === 'pix') {
                                    echo '<span style="color: #f0ad4e;">Aguardando Pagamento</span>';
                                }
                                ?>
                            </span>
                        </div>
                    </div>

                    <div class="tracking-section">
                        <h3>Acompanhe seu Pedido</h3>
                        <p>Código de Rastreio: <strong><?= $trackingCode ?></strong></p>

                        <div class="confirmation-buttons">
                            <a href="compras.php" class="btn-continue-shopping">Continuar Comprando</a>
                            <a href="profile.php?tab=orders" class="btn-view-order">Ver Meus Pedidos</a>
                        </div>
                    </div>
                </div>
            <?php else: ?>
                <!-- Formulário de Checkout -->
                <div class="checkout-container">
                    <div class="checkout-header">
                        <h1>Finalizar Compra</h1>
                        <div class="checkout-progress">
                            <div class="progress-step">
                                <div class="step-circle completed"></div>
                                <div class="step-line active"></div>
                                <div class="step-label">Carrinho</div>
                            </div>
                            <div class="progress-step">
                                <div class="step-circle active"></div>
                                <div class="step-line"></div>
                                <div class="step-label">Pagamento</div>
                            </div>
                            <div class="progress-step">
                                <div class="step-circle"></div>
                                <div class="step-line"></div>
                                <div class="step-label">Confirmação</div>
                            </div>
                            <div class="progress-step">
                                <div class="step-circle"></div>
                                <div class="step-label">Entrega</div>
                            </div>
                        </div>
                    </div>

                    <div class="checkout-content">
                        <div class="checkout-section">
                            <h2 class="section-title">Informações de Entrega</h2>

                            <form id="checkout-form" method="POST" action="">
                                <div class="form-group">
                                    <label for="shipping_address">Endereço de Entrega</label>
                                    <input type="text" id="shipping_address" name="shipping_address" class="form-control" value="<?= htmlspecialchars($userData['endereco'] ?? '') ?>" required>
                                </div>

                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="shipping_number">Número</label>
                                        <input type="text" id="shipping_number" name="shipping_number" class="form-control" value="<?= htmlspecialchars($userData['numero_casa'] ?? '') ?>" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="shipping_complement">Complemento</label>
                                        <input type="text" id="shipping_complement" name="shipping_complement" class="form-control" value="<?= htmlspecialchars($userData['complemento'] ?? '') ?>">
                                    </div>
                                </div>

                                <!-- Cálculo do frete em tempo real -->
                                <div class="form-group">
                                    <label for="shipping_cep">CEP</label>
                                    <div class="cep-finder">
                                        <input type="text" id="shipping_cep" name="shipping_cep" class="form-control" value="<?= htmlspecialchars($userData['cep'] ?? '') ?>" maxlength="9" placeholder="00000-000" required>
                                        <button type="button" id="btn-find-cep" class="btn-find-cep">Buscar</button>
                                    </div>
                                    <small class="shipping-info text-muted">Frete grátis para todo o estado de São Paulo ou compras acima de R$350,00</small>
                                </div>

                                <div class="form-group">
                                    <label for="shipping_phone">Telefone para Contato</label>
                                    <input type="tel" id="shipping_phone" name="shipping_phone" class="form-control" value="<?= htmlspecialchars($userData['telefone'] ?? '') ?>" placeholder="(00) 00000-0000" required>
                                </div>

                                <h2 class="section-title">Método de Pagamento</h2>

                                <div class="payment-methods">
                                    <div class="payment-method" data-method="credit_card">
                                        <i class="fas fa-credit-card"></i>
                                        <div>Cartão de Crédito</div>
                                    </div>
                                    <div class="payment-method" data-method="pix">
                                        <i class="fas fa-qrcode"></i>
                                        <div>PIX</div>
                                    </div>
                                </div>

                                <input type="hidden" name="payment_method" id="payment_method" value="">

                                <!-- Formulário de Cartão de Crédito -->
                                <div class="payment-details" id="credit_card_details">
                                    <?php if (!empty($savedCards)): ?>
                                        <div class="saved-cards">
                                            <h3>Cartões Salvos</h3>
                                            <?php foreach ($savedCards as $card): ?>
                                                <div class="saved-card" data-card-id="<?= $card['id'] ?>">
                                                    <i class="fas fa-credit-card card-icon"></i>
                                                    <span class="card-last4">•••• <?= $card['card_last4'] ?></span>
                                                    <span class="card-expiry"><?= $card['card_expiry'] ?></span>
                                                </div>
                                            <?php endforeach; ?>
                                            <div class="saved-card new-card">
                                                <i class="fas fa-plus-circle card-icon"></i>
                                                <span>Usar novo cartão</span>
                                            </div>
                                        </div>
                                    <?php endif; ?>

                                    <div class="credit-card-form" id="new_card_form" <?= !empty($savedCards) ? 'style="display:none;"' : '' ?>>
                                        <div class="form-group">
                                            <label for="card_number">Número do Cartão</label>
                                            <div class="card-input-container">
                                                <input type="text" id="card_number" name="card_number" class="form-control" placeholder="0000 0000 0000 0000" maxlength="19">
                                                <span class="card-type-icon"><i class="fas fa-credit-card"></i></span>
                                            </div>
                                        </div>

                                        <div class="form-row">
                                            <div class="form-group">
                                                <label for="card_name">Nome no Cartão</label>
                                                <input type="text" id="card_name" name="card_name" class="form-control" placeholder="Como aparece no cartão">
                                            </div>
                                        </div>

                                        <div class="form-row">
                                            <div class="form-group">
                                                <label for="card_expiry">Validade</label>
                                                <input type="text" id="card_expiry" name="card_expiry" class="form-control" placeholder="MM/AA" maxlength="5">
                                            </div>
                                            <div class="form-group">
                                                <label for="card_cvv">CVV</label>
                                                <input type="text" id="card_cvv" name="card_cvv" class="form-control" placeholder="000" maxlength="4">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="checkbox-container">
                                                <input type="checkbox" name="save_card" id="save_card">
                                                <span class="checkbox-text">Salvar cartão para futuras compras</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Detalhes do PIX -->
                                <div class="payment-details" id="pix_details">
                                    <div class="pix-container">
                                        <p>Ao finalizar a compra, você receberá um QR Code para pagamento via PIX.</p>
                                        <p>O prazo para pagamento é de 30 minutos. Após este período, o pedido será cancelado automaticamente.</p>
                                    </div>
                                </div>

                                <?php if ($orderError): ?>
                                    <div class="error-message">
                                        <?= htmlspecialchars($orderError) ?>
                                    </div>
                                <?php endif; ?>

                                <button type="submit" class="btn-checkout">Finalizar Compra</button>
                            </form>
                        </div>

                        <div class="cart-summary">
                            <h2 class="section-title">Resumo do Pedido</h2>

                            <div class="cart-items">
                                <?php foreach ($cartItems as $item): ?>
                                    <div class="cart-item">
                                        <img src="<?= !empty($item['imagem_path']) ? htmlspecialchars($item['imagem_path']) :
                                                        getProductImagePath($item['product_id'], $conn) ?>"
                                            alt="<?= htmlspecialchars($item['nome']) ?>" class="cart-item-image">
                                        <div class="cart-item-details">
                                            <div class="cart-item-name"><?= htmlspecialchars($item['nome']) ?></div>
                                            <div class="cart-item-price">R$<?= number_format($item['preco'], 2, ',', '.') ?></div>
                                            <div class="cart-item-quantity">Quantidade: <?= $item['quantity'] ?></div>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>

                            <div class="price-details">
                                <div class="price-row">
                                    <span>Subtotal</span>
                                    <span>R$<?= number_format($subtotal, 2, ',', '.') ?></span>
                                </div>
                                <div class="price-row">
                                    <span>Frete</span>
                                    <span class="shipping-cost">R$ <?= number_format($shipping, 2, ',', '.') ?></span>
                                    <input type="hidden" id="shipping_cost" name="shipping_cost" value="<?= $shipping ?>">
                                </div>
                                <?php if ($discount > 0): ?>
                                    <div class="price-row">
                                        <span>Desconto</span>
                                        <span>-R$<?= number_format($discount, 2, ',', '.') ?></span>
                                    </div>
                                <?php endif; ?>
                                <div class="price-row price-total">
                                    <span>Total</span>
                                    <span>R$<?= number_format($total, 2, ',', '.') ?></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endif; ?>

            <!-- Overlay de processamento -->
            <div id="processing-overlay" class="processing-overlay" style="display: none;">
                <div class="processing-spinner"></div>
                <div class="processing-message">Processando seu pedido...</div>
            </div>

            <!-- Modal PIX para pagamento -->
            <div id="pix-modal" class="modal-overlay" style="display: none;">
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <h2>Pagamento via PIX</h2>
                    <br>
                    <div class="pix-qrcode">
                        <?php
                        // Criar payload do PIX
                        $pixPayload = "00020126490014BR.GOV.BCB.PIX0127cristaisgoldlar@outlook.com5204000053039865802BR5925TWO BROTHERSCOMER DE ART6006SUZANO62070503***63045D11";
                        // O payload acima é um exemplo. Em produção, você deve gerar um dinamicamente com os dados da transação

                        $encodedPayload = urlencode($pixPayload);
                        $qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?data=" . $encodedPayload . "&size=200x200";
                        echo '<img id="pix-qrcode-img" src="' . $qrCodeUrl . '" alt="QR Code PIX">';
                        ?>
                    </div>
                    <div class="pix-container">
                        <div class="pix-code">
                            <span id="pix-code-text"><?= htmlspecialchars($pixPayload) ?></span>
                        </div>
                    </div>
                    <p class="pix-instructions">
                        Escaneie o QR Code com o aplicativo do seu banco ou copie o código PIX.
                        <br>
                    </p>
                    <button class="copy-button" id="copy-pix-code">Copiar Código do PIX</button>
                    <button class="pix-confirm-btn" id="pix-confirm-payment">Confirmar Pagamento</button>
                </div>
            </div>

            <footer>
                <div id="content">
                    <div id="contacts">
                        <div class="logo2">
                            <img src="img/logo2.png" alt="Logo">
                        </div>
                        <p>Transformando ambientes com beleza natural.</p>
                        <p><?= htmlspecialchars($footerTexto) ?></p>
                        <div id="social_media">
                            <a href="<?= htmlspecialchars($instagram) ?>" class="link" id="instagram">
                                <i class="fa-brands fa-instagram"></i>
                            </a>
                            <a href="<?= htmlspecialchars($facebook) ?>" class="link" id="facebook">
                                <i class="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="mailto:<?= htmlspecialchars($email) ?>" class="link" id="whatsapp">
                                <i class="fa-regular fa-envelope"></i>
                            </a>
                        </div>
                    </div>
                    <ul class="list">
                        <li>
                            <h3>Blog</h3>
                        </li>
                        <li><a href="blog.php" class="link">Cuidados com Flores</a></li>
                        <li><a href="blog.php" class="link">Manutenção de Aquários</a></li>
                        <li><a href="blog.php" class="link">Dicas de Decoração</a></li>
                    </ul>
                    <ul class="list">
                        <li>
                            <h3>Produtos</h3>
                        </li>
                        <li><a href="compras.php" class="link">Arranjos Florais</a></li>
                        <li><a href="compras.php" class="link">Aquários Personalizados</a></li>
                        <li><a href="compras.php" class="link">Acessórios</a></li>
                    </ul>
                    <div id="subscribe">
                        <h3>Fique de Olho!</h3>
                        <p>Receba nossas novidades e promoções exclusivas diretamente no seu WhatsApp</p>
                    </div>
                </div>
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        const currentYear = new Date().getFullYear();
                        const copyrightDiv = document.getElementById('copyright');

                        if (copyrightDiv) {
                            copyrightDiv.innerHTML = `Copyright © ${currentYear} Cristais Gold Lar. Todos os direitos reservados`;
                        }
                    });
                </script>
            </footer>
            </div>

            <!-- No cabeçalho ou antes do fechamento do body -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
            <script src="js/checkout/checkout.js"></script>
            <script src="js/elementos/element.js"></script>
            <script>
                // Esconder loading
                window.addEventListener('load', function() {
                    document.getElementById('loading-screen').style.display = 'none';
                });

                // Máscaras (pode ficar aqui ou no arquivo externo)
                document.addEventListener('DOMContentLoaded', function() {
                    if (document.getElementById('shipping_cep')) {
                        $(document.getElementById('shipping_cep')).mask('00000-000');
                    }
                });
            </script>
            

            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    const goldenOverlay = document.createElement('div');
                    goldenOverlay.className = 'golden-overlay';
                    document.body.appendChild(goldenOverlay);

                    const leafCount = 30;
                    let windowWidth = window.innerWidth;
                    let windowHeight = window.innerHeight;
                    const leafTypes = ['leaf-1', 'leaf-2', 'leaf-3'];

                    for (let i = 0; i < leafCount; i++) {
                        createLeaf();
                    }

                    setInterval(function() {
                        const oldLeaves = document.querySelectorAll('.leaf');
                        if (oldLeaves.length > 40) {
                            for (let i = 0; i < 3; i++) {
                                if (oldLeaves[i]) oldLeaves[i].remove();
                            }
                        }
                        for (let i = 0; i < 3; i++) {
                            createLeaf();
                        }
                    }, 5000);

                    function createLeaf() {
                        const leaf = document.createElement('div');
                        const leafClass = leafTypes[Math.floor(Math.random() * leafTypes.length)];
                        leaf.className = `leaf ${leafClass}`;

                        leaf.style.left = `-50px`;
                        leaf.style.top = `${Math.random() * windowHeight}px`;
                        leaf.dataset.scale = `${0.6 + Math.random() * 0.8}`;
                        leaf.dataset.sway = 5 + Math.random() * 15;
                        leaf.dataset.speed = 30 + Math.random() * 60;
                        leaf.dataset.rotationSpeed = 2 + Math.random() * 4;
                        leaf.dataset.swayValue = 0;
                        leaf.dataset.swayDirection = Math.random() > 0.5 ? 1 : -1;
                        leaf.dataset.rotation = Math.random() * 360;
                        leaf.dataset.yBase = leaf.style.top.replace('px', '');

                        leaf.style.opacity = 0.3 + Math.random() * 0.4;
                        leaf.style.transform = `scale(${leaf.dataset.scale})`;

                        document.body.appendChild(leaf);

                        animateLeaf(leaf);
                    }

                    function animateLeaf(leaf) {
                        let xPos = -50;
                        const scale = leaf.dataset.scale;
                        const swayAmount = parseFloat(leaf.dataset.sway);
                        const speed = parseFloat(leaf.dataset.speed);
                        const rotationSpeed = parseFloat(leaf.dataset.rotationSpeed);
                        let swayValue = parseFloat(leaf.dataset.swayValue);
                        let swayDirection = parseInt(leaf.dataset.swayDirection);
                        let rotation = parseFloat(leaf.dataset.rotation);
                        const yBase = parseFloat(leaf.dataset.yBase);

                        function updatePosition() {
                            windowWidth = window.innerWidth;

                            xPos += speed / 60;
                            swayValue += 0.05 * swayDirection;
                            if (Math.abs(swayValue) > 1) {
                                swayDirection *= -1;
                            }
                            const newYPos = yBase + (swayValue * swayAmount);
                            rotation += rotationSpeed / 10;

                            leaf.style.left = `${xPos}px`;
                            leaf.style.top = `${newYPos}px`;
                            leaf.style.transform = `rotate(${rotation}deg) scale(${scale})`;

                            if (xPos < windowWidth + 150) {
                                requestAnimationFrame(updatePosition);
                            } else {
                                leaf.remove();
                            }
                        }

                        requestAnimationFrame(updatePosition);
                    }

                    window.addEventListener('resize', function() {
                        windowWidth = window.innerWidth;
                        windowHeight = window.innerHeight;
                    });

                    // EFEITO 1: Mouse passando perto - Folhas se assustam
                    document.addEventListener('mousemove', function(e) {
                        const mouseX = e.clientX;
                        const mouseY = e.clientY;

                        document.querySelectorAll('.leaf').forEach(leaf => {
                            const rect = leaf.getBoundingClientRect();
                            const leafX = rect.left + rect.width / 2;
                            const leafY = rect.top + rect.height / 2;

                            const dist = Math.hypot(mouseX - leafX, mouseY - leafY);

                            if (dist < 100) { // Distância de "susto"
                                const angle = Math.atan2(leafY - mouseY, leafX - mouseX);
                                const jumpX = Math.cos(angle) * 100;
                                const jumpY = Math.sin(angle) * 100;

                                // Faz a folha "pular" para longe
                                leaf.style.left = `${parseFloat(leaf.style.left) + jumpX}px`;
                                leaf.style.top = `${parseFloat(leaf.style.top) + jumpY}px`;
                            }
                        });
                    });

                    // EFEITO 2: Toque na tela - folhas trocam de rota
                    document.addEventListener('touchstart', function() {
                        document.querySelectorAll('.leaf').forEach(leaf => {
                            // Muda aleatoriamente a direção de sway e rotação
                            leaf.dataset.sway = 10 + Math.random() * 20;
                            leaf.dataset.speed = 40 + Math.random() * 80;
                            leaf.dataset.swayDirection = Math.random() > 0.5 ? 1 : -1;
                            leaf.dataset.rotationSpeed = 1 + Math.random() * 5;
                        });
                    });

                });
            </script>


</body>

</html>