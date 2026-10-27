<?php
/**
 * Processa login com Google OAuth 2.0
 * PositiveSense
 */

session_start();

// Carrega configurações
$google_config = require_once __DIR__ . '/config/google-oauth.php';
require_once __DIR__ . '/config/database.php';

// Função para gerar CSRF token
function generateCSRFToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

// Verifica se é uma ação de login (redireciona para Google)
if ($_GET['action'] === 'login') {
    // Gera state para proteger contra CSRF
    $_SESSION['oauth_state'] = bin2hex(random_bytes(16));

    // Constrói URL de autorização
    $auth_url = $google_config['auth_uri'] . '?' . http_build_query([
        'client_id' => $google_config['client_id'],
        'redirect_uri' => $google_config['redirect_uri'],
        'response_type' => 'code',
        'scope' => implode(' ', $google_config['scopes']),
        'state' => $_SESSION['oauth_state'],
        'access_type' => 'offline',
        'prompt' => 'consent'
    ]);

    header('Location: ' . $auth_url);
    exit;
}

// Processa callback do Google
if (isset($_GET['code'])) {
    // Verifica state (protação contra CSRF)
    if (!isset($_GET['state']) || $_GET['state'] !== $_SESSION['oauth_state']) {
        die(json_encode(['success' => false, 'message' => 'Erro de validação de segurança']));
    }

    try {
        // Troca código por token
        $ch = curl_init($google_config['token_uri']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
            'code' => $_GET['code'],
            'client_id' => $google_config['client_id'],
            'client_secret' => $google_config['client_secret'],
            'redirect_uri' => $google_config['redirect_uri'],
            'grant_type' => 'authorization_code'
        ]));

        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($http_code !== 200) {
            throw new Exception('Erro ao trocar código por token');
        }

        $token_data = json_decode($response, true);
        if (!isset($token_data['access_token'])) {
            throw new Exception('Token de acesso não recebido');
        }

        // Busca informações do usuário
        $ch = curl_init($google_config['userinfo_uri']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $token_data['access_token']
        ]);

        $user_response = curl_exec($ch);
        curl_close($ch);

        $user_data = json_decode($user_response, true);

        if (!isset($user_data['email'])) {
            throw new Exception('Erro ao obter dados do usuário');
        }

        // Busca ou cria usuário no banco
        $email = $user_data['email'];
        $nome = $user_data['name'] ?? 'Usuário';
        $picture = $user_data['picture'] ?? '';
        $google_id = $user_data['id'];

        // Query para verificar se usuário existe
        $query = "SELECT id, nome, email, status FROM usuarios WHERE email = ? LIMIT 1";
        $stmt = $connection->prepare($query);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // Usuário existe
            $usuario = $result->fetch_assoc();

            if ($usuario['status'] === 'bloqueado') {
                echo json_encode([
                    'success' => false,
                    'message' => 'Sua conta foi bloqueada. Entre em contato com o suporte.'
                ]);
                exit;
            }

            $usuario_id = $usuario['id'];
        } else {
            // Cria novo usuário
            $senha_padrao = password_hash(bin2hex(random_bytes(16)), PASSWORD_BCRYPT);
            $data_criacao = date('Y-m-d H:i:s');

            $insert_query = "INSERT INTO usuarios (nome, email, senha, avatar, data_criacao, login_google, google_id, status)
                           VALUES (?, ?, ?, ?, ?, 1, ?, 'ativo')";
            $insert_stmt = $connection->prepare($insert_query);
            $insert_stmt->bind_param("ssssss", $nome, $email, $senha_padrao, $picture, $data_criacao, $google_id);

            if (!$insert_stmt->execute()) {
                throw new Exception('Erro ao criar usuário');
            }

            $usuario_id = $connection->insert_id;
        }

        // Define sessão
        $_SESSION['usuario_id'] = $usuario_id;
        $_SESSION['usuario_email'] = $email;
        $_SESSION['usuario_nome'] = $nome;
        $_SESSION['usuario_autenticado'] = true;

        // Registra login
        $ip_usuario = $_SERVER['REMOTE_ADDR'];
        $user_agent = $_SERVER['HTTP_USER_AGENT'];
        $log_query = "INSERT INTO logs_acesso (usuario_id, ip, user_agent, data_acesso) VALUES (?, ?, ?, NOW())";
        $log_stmt = $connection->prepare($log_query);
        $log_stmt->bind_param("iss", $usuario_id, $ip_usuario, $user_agent);
        $log_stmt->execute();

        // Retorna sucesso
        header('Content-Type: application/json');
        echo json_encode([
            'success' => true,
            'message' => 'Login realizado com sucesso!',
            'redirect' => 'inicial.php'
        ]);
        exit;

    } catch (Exception $e) {
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'message' => 'Erro ao processar login: ' . $e->getMessage()
        ]);
        exit;
    }
}

// Se chegou aqui sem ação válida
header('Location: login.php');
exit;
?>
