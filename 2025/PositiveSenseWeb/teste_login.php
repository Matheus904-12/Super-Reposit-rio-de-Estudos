<?php

/**
 * ========================================
 * TESTE DIRETO DE LOGIN
 * ========================================
 *
 * Simula um login para debug
 */

require_once __DIR__ . '/config/session.php';
require_once __DIR__ . '/config/database.php';

header('Content-Type: text/html; charset=utf-8');

echo "<!DOCTYPE html>
<html lang='pt-BR'>
<head>
    <meta charset='UTF-8'>
    <title>Teste de Login - Debug</title>
    <style>
        body { font-family: monospace; padding: 20px; background: #1e1e1e; color: #d4d4d4; }
        .success { color: #4ec9b0; }
        .error { color: #f48771; }
        .warning { color: #dcdcaa; }
        .info { color: #569cd6; }
        pre { background: #2d2d2d; padding: 10px; border-radius: 4px; }
        hr { border-color: #444; margin: 20px 0; }
    </style>
</head>
<body>
<h1>🔍 Teste Direto de Login - Debug Completo</h1>";

// ============================================
// TESTE 1: Verifica sessão atual
// ============================================
echo "<h2>1️⃣ Estado Atual da Sessão PHP</h2>";
echo "<pre>";
echo "session_id(): " . session_id() . "\n";
echo "session_status(): " . (session_status() === PHP_SESSION_ACTIVE ? 'ATIVA' : 'INATIVA') . "\n";
echo "\$_SESSION:\n";
print_r($_SESSION);
echo "\n\$_COOKIE:\n";
print_r($_COOKIE);
echo "</pre>";

// ============================================
// TESTE 2: Verifica função verificarSessao()
// ============================================
echo "<h2>2️⃣ Teste de verificarSessao()</h2>";
$logado = estaLogado();
echo $logado ? "<p class='success'>✅ Usuario está logado</p>" : "<p class='error'>❌ Usuario NÃO está logado</p>";

if ($logado) {
    echo "<pre>";
    print_r(getUsuarioLogado());
    echo "</pre>";
}

// ============================================
// TESTE 3: Tenta fazer login de teste
// ============================================
echo "<hr><h2>3️⃣ Formulário de Teste de Login</h2>";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['test_login'])) {
    echo "<h3>Processando login de teste...</h3>";

    $email = $_POST['email'] ?? '';
    $senha = $_POST['senha'] ?? '';

    echo "<pre>";
    echo "Email: $email\n";
    echo "Senha: " . str_repeat('*', strlen($senha)) . "\n\n";

    try {
        $db = getDB();
        echo "<span class='success'>✅ Conectado ao banco</span>\n\n";

        // Busca usuário
        $stmt = $db->prepare("SELECT * FROM usuarios WHERE email = ? AND status = 'ativo' LIMIT 1");
        $stmt->execute([$email]);
        $usuario = $stmt->fetch();

        if (!$usuario) {
            echo "<span class='error'>❌ Usuário não encontrado</span>\n";
        } else {
            echo "<span class='success'>✅ Usuário encontrado</span>\n";
            echo "ID: {$usuario['id']}\n";
            echo "Nome: {$usuario['nome']}\n";
            echo "Email: {$usuario['email']}\n";
            echo "Tipo: {$usuario['tipo_usuario']}\n\n";

            // Verifica senha
            if (password_verify($senha, $usuario['senha'])) {
                echo "<span class='success'>✅ Senha correta</span>\n\n";

                // Tenta definir sessão
                echo "Definindo variáveis de sessão...\n";
                $_SESSION['usuario_id'] = $usuario['id'];
                $_SESSION['usuario_nome'] = $usuario['nome'];
                $_SESSION['usuario_email'] = $usuario['email'];
                $_SESSION['usuario_tipo'] = $usuario['tipo_usuario'];
                $_SESSION['usuario_foto'] = $usuario['foto_perfil'];

                echo "<span class='success'>✅ Variáveis de sessão definidas</span>\n\n";

                // Salva sessão
                echo "Salvando sessão com session_write_close()...\n";
                session_write_close();
                echo "<span class='success'>✅ Sessão salva</span>\n\n";

                // Reinicia sessão para verificar
                echo "Reiniciando sessão para verificar...\n";
                @session_start();

                if (isset($_SESSION['usuario_id'])) {
                    echo "<span class='success'>✅ Sessão persistiu! Usuario ID: {$_SESSION['usuario_id']}</span>\n\n";
                } else {
                    echo "<span class='error'>❌ Sessão NÃO persistiu após session_write_close()</span>\n\n";
                }

                // Tenta criar token no banco
                echo "Criando token de sessão no banco...\n";
                $token = bin2hex(random_bytes(32));
                $expiracao = date('Y-m-d H:i:s', strtotime('+30 days'));

                $stmt = $db->prepare("
                    INSERT INTO sessoes (usuario_id, token_sessao, ip_address, user_agent, data_expiracao)
                    VALUES (?, ?, ?, ?, ?)
                ");
                $stmt->execute([
                    $usuario['id'],
                    $token,
                    $_SERVER['REMOTE_ADDR'] ?? 'unknown',
                    $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
                    $expiracao
                ]);

                echo "<span class='success'>✅ Token criado no banco</span>\n";
                echo "Token (preview): " . substr($token, 0, 20) . "...\n\n";

                // Tenta definir cookie
                echo "Definindo cookie sessao_token...\n";
                $isVercel = strpos($_SERVER['HTTP_HOST'] ?? '', 'vercel.app') !== false;

                $cookieSet = setcookie('sessao_token', $token, [
                    'expires' => time() + (30 * 24 * 60 * 60),
                    'path' => '/',
                    'domain' => '',
                    'secure' => $isVercel,
                    'httponly' => true,
                    'samesite' => 'Lax'
                ]);

                echo $cookieSet ? "<span class='success'>✅ Cookie definido com sucesso</span>\n" : "<span class='error'>❌ Falha ao definir cookie</span>\n";
                echo "Ambiente: " . ($isVercel ? 'VERCEL (HTTPS)' : 'LOCAL') . "\n\n";

                echo "<span class='success'>🎉 LOGIN DE TESTE CONCLUÍDO COM SUCESSO!</span>\n\n";
                echo "<a href='verificar_banco.php'>Ver banco de dados</a> | ";
                echo "<a href='debug_sessao.php'>Ver debug de sessão</a> | ";
                echo "<a href='inicial.php'>Ir para inicial.php</a>\n";
            } else {
                echo "<span class='error'>❌ Senha incorreta</span>\n";
            }
        }
    } catch (Exception $e) {
        echo "<span class='error'>❌ ERRO: " . $e->getMessage() . "</span>\n";
    }

    echo "</pre>";
}

?>

<form method="POST" style="background: #2d2d2d; padding: 20px; border-radius: 8px; max-width: 400px;">
    <h3>Teste Manual de Login</h3>
    <div style="margin: 10px 0;">
        <label>Email:</label><br>
        <input type="email" name="email" required style="width: 100%; padding: 8px; background: #1e1e1e; border: 1px solid #444; color: #d4d4d4;">
    </div>
    <div style="margin: 10px 0;">
        <label>Senha:</label><br>
        <input type="password" name="senha" required style="width: 100%; padding: 8px; background: #1e1e1e; border: 1px solid #444; color: #d4d4d4;">
    </div>
    <button type="submit" name="test_login" style="background: #4ec9b0; color: #000; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-weight: bold;">
        🔐 Testar Login
    </button>
</form>

<hr>
<p><a href="verificar_banco.php">📊 Ver Banco de Dados</a> | <a href="debug_sessao.php">🔍 Debug de Sessão</a> | <a href="index.php">🏠 Home</a></p>

</body>

</html>
