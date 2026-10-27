<?php
session_start();
include 'config/dbconnect.php'; // Agora inclui a conexão PDO com o Supabase

// Protege a página para administradores logados
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: login.php");
    exit();
}

// Mensagem de feedback
$msg = "";
$error = "";

// 📌 Criar novo administrador
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['create_admin'])) {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);
    $role = $_POST['role'];
    
    // Validação básica
    if (empty($username) || empty($password)) {
        $error = "Usuário e senha são obrigatórios.";
    } else {
        try {
            // Verifica se o usuário já existe
            $check_sql = "SELECT * FROM admins WHERE username = :username";
            $check_stmt = $pdo->prepare($check_sql);
            $check_stmt->bindParam(':username', $username);
            $check_stmt->execute();
            
            if ($check_stmt->rowCount() > 0) {
                $error = "Este nome de usuário já existe. Escolha outro.";
            } else {
                // Hash da senha
                $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                
                // Insere o novo administrador
                $sql = "INSERT INTO admins (username, password, role) VALUES (:username, :password, :role)";
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':username', $username);
                $stmt->bindParam(':password', $hashed_password);
                $stmt->bindParam(':role', $role);
                
                if ($stmt->execute()) {
                    $msg = "Novo administrador <strong>$username</strong> criado com sucesso!";
                } else {
                    $error = "Erro ao criar administrador.";
                }
            }
        } catch (PDOException $e) {
            $error = "Erro no banco de dados: " . $e->getMessage();
        }
    }
}

// 📌 Salvar link da index.php do site
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['save_site_link'])) {
    $site_link = $_POST['site_link'];
    
    // Verificar se o diretório existe
    $config_dir = "../config";
    if (!is_dir($config_dir)) {
        mkdir($config_dir, 0755, true);
    }
    
    if (file_put_contents("$config_dir/site_link.txt", $site_link) !== false) {
        $msg = "Link atualizado com sucesso!";
    } else {
        $error = "Erro ao salvar o link. Verifique as permissões de escrita.";
    }
}

// 📌 Carregar link salvo
$site_link = file_exists("../config/site_link.txt") ? file_get_contents("../config/site_link.txt") : "";

// 📌 Listar administradores existentes
$admins = [];
try {
    $list_sql = "SELECT id, username, role FROM admins ORDER BY id DESC";
    $list_stmt = $pdo->query($list_sql);
    if ($list_stmt) {
        $admins = $list_stmt->fetchAll();
    }
} catch (PDOException $e) {
    $error = "Erro ao listar administradores: " . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configurações</title>
    <link href="/dist/styles.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
</head>
<body class="bg-gray-900 text-white">
    <div class="container mx-auto p-6">
        <h2 class="text-3xl font-bold text-indigo-400 mb-6">Configurações do Painel</h2>
        
        <!-- Mensagens de feedback -->
        <?php if ($msg): ?>
            <div class="bg-green-500 text-white p-3 rounded mb-4">
                <?= $msg ?>
            </div>
        <?php endif; ?>
        
        <?php if ($error): ?>
            <div class="bg-red-500 text-white p-3 rounded mb-4">
                <?= $error ?>
            </div>
        <?php endif; ?>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Criar novo administrador -->
            <div class="bg-gray-800 p-6 rounded-lg">
                <h3 class="text-xl text-indigo-300 mb-4">Criar Novo Administrador</h3>
                <form method="POST" action="<?= $_SERVER['PHP_SELF']; ?>">
                    <div class="mb-3">
                        <label for="username" class="block text-sm mb-1">Nome de Usuário</label>
                        <input type="text" id="username" name="username" placeholder="Usuário" required 
                               class="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    </div>
                    
                    <div class="mb-3">
                        <label for="password" class="block text-sm mb-1">Senha</label>
                        <input type="password" id="password" name="password" placeholder="Senha" required 
                               class="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    </div>
                    
                    <div class="mb-4">
                        <label for="role" class="block text-sm mb-1">Função</label>
                        <select id="role" name="role" required 
                                class="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            <option value="admin">Administrador</option>
                            <option value="editor">Editor</option>
                        </select>
                    </div>
                    
                    <button type="submit" name="create_admin" 
                            class="w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white font-medium transition duration-200">
                        Criar Administrador
                    </button>
                </form>
            </div>

            <!-- Configurar link para a página do site -->
            <div class="bg-gray-800 p-6 rounded-lg">
                <h3 class="text-xl text-indigo-300 mb-4">Definir Link para o Site</h3>
                <form method="POST" action="<?= $_SERVER['PHP_SELF']; ?>">
                    <div class="mb-4">
                        <label for="site_link" class="block text-sm mb-1">URL da Página Inicial</label>
                        <input type="url" id="site_link" name="site_link" value="<?= htmlspecialchars($site_link) ?>" 
                               placeholder="https://seusite.com" required 
                               class="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    </div>
                    
                    <button type="submit" name="save_site_link" 
                            class="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium transition duration-200">
                        Salvar Link
                    </button>
                </form>
                
                <?php if ($site_link): ?>
                    <div class="mt-3 p-3 bg-gray-700 rounded">
                        <p>Link salvo: <a href="<?= htmlspecialchars($site_link) ?>" target="_blank" 
                                         class="text-blue-300 underline hover:text-blue-200">
                            <?= htmlspecialchars($site_link) ?>
                        </a></p>
                    </div>
                <?php endif; ?>
            </div>
        </div>
        
        <!-- Lista de administradores -->
        <div class="mt-8 bg-gray-800 p-6 rounded-lg">
            <h3 class="text-xl text-indigo-300 mb-4">Administradores Cadastrados</h3>
            
            <?php if (empty($admins)): ?>
                <p class="text-gray-400">Nenhum administrador encontrado.</p>
            <?php else: ?>
                <div class="overflow-x-auto">
                    <table class="min-w-full bg-gray-700 rounded-lg overflow-hidden">
                        <thead class="bg-gray-600">
                            <tr>
                                <th class="px-4 py-2 text-left">ID</th>
                                <th class="px-4 py-2 text-left">Usuário</th>
                                <th class="px-4 py-2 text-left">Função</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($admins as $admin): ?>
                                <tr class="border-t border-gray-600">
                                    <td class="px-4 py-2"><?= $admin['id'] ?></td>
                                    <td class="px-4 py-2"><?= htmlspecialchars($admin['username']) ?></td>
                                    <td class="px-4 py-2">
                                        <?php if ($admin['role'] == 'admin'): ?>
                                            <span class="bg-indigo-500 text-xs px-2 py-1 rounded">Administrador</span>
                                        <?php else: ?>
                                            <span class="bg-blue-500 text-xs px-2 py-1 rounded">Editor</span>
                                        <?php endif; ?>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>