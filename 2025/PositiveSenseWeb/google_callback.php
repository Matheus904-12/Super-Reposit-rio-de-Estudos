<?php

/**
 * ========================================
 * GOOGLE OAUTH - CALLBACK
 * PositiveSense - Processamento de Login com Google
 * ========================================
 */

require_once __DIR__ . '/config/session.php';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/config/google_oauth.php';

header('Content-Type: application/json; charset=utf-8');

try {
    // Verificar se recebeu o código
    $code = $_GET['code'] ?? null;
    $error = $_GET['error'] ?? null;

    if ($error) {
        throw new Exception('Erro do Google: ' . htmlspecialchars($error));
    }

    if (!$code) {
        throw new Exception('Código de autorização não fornecido');
    }

    // Processar login com Google
    $resultado = processar_login_google($code);

    if (!$resultado['success']) {
        throw new Exception($resultado['erro']);
    }

    $usuario = $resultado['usuario'];

    // ========================================
    // INTEGRAR COM BANCO DE DADOS
    // ========================================

    try {
        $pdo = getDB();

        // Verificar se usuário já existe
        $stmt = $pdo->prepare('SELECT id, nome, email, foto_perfil FROM usuarios WHERE email = ? LIMIT 1');
        $stmt->execute([$usuario['email']]);
        $usuarioExistente = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuarioExistente) {
            // Usuário já existe - fazer login
            $_SESSION['usuario_id'] = $usuarioExistente['id'];
            $_SESSION['usuario_nome'] = $usuarioExistente['nome'];
            $_SESSION['usuario_email'] = $usuarioExistente['email'];
            $_SESSION['usuario_foto'] = $usuarioExistente['foto_perfil'];
            $_SESSION['autenticacao_google'] = true;

            echo json_encode([
                'success' => true,
                'mensagem' => 'Login realizado com sucesso!',
                'redirect' => 'perfil.php',
                'novo_usuario' => false
            ]);
        } else {
            // Novo usuário - criar conta
            $senha_temp = bin2hex(random_bytes(16)); // Senha temporária para Google users
            $data_criacao = date('Y-m-d H:i:s');

            $stmt = $pdo->prepare('
                INSERT INTO usuarios (
                    nome, email, senha, foto_perfil, data_cadastro, status, participa_ranking
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            ');

            $stmt->execute([
                $usuario['nome'],
                $usuario['email'],
                password_hash($senha_temp, PASSWORD_BCRYPT),
                $usuario['foto'],
                $data_criacao,
                'ativo',
                true
            ]);

            // Pegar o ID do usuário recém-criado
            $id_usuario = $pdo->lastInsertId();

            // Iniciar sessão
            $_SESSION['usuario_id'] = $id_usuario;
            $_SESSION['usuario_nome'] = $usuario['nome'];
            $_SESSION['usuario_email'] = $usuario['email'];
            $_SESSION['usuario_foto'] = $usuario['foto'];
            $_SESSION['autenticacao_google'] = true;

            echo json_encode([
                'success' => true,
                'mensagem' => 'Conta criada e login realizado com sucesso!',
                'redirect' => 'perfil.php',
                'novo_usuario' => true
            ]);
        }
    } catch (Exception $dbError) {
        error_log('Erro ao processar usuário Google: ' . $dbError->getMessage());
        throw new Exception('Erro ao processar cadastro: ' . $dbError->getMessage());
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'erro' => $e->getMessage(),
        'timestamp' => date('Y-m-d H:i:s')
    ]);

    // Log do erro
    error_log('Google OAuth Error: ' . $e->getMessage());
}
