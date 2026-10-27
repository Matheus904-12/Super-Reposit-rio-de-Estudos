<?php
$servername = "REMOVIDO_HOST";
$username = "REMOVIDO_BANCO";
$password = "REMOVIDA_SENHA";
$database = "REMOVIDO_BANCO";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Erro na conexão com o banco (mysqli): " . $conn->connect_error);
} else {
    error_log("Conexão mysqli estabelecida com sucesso."); // Adicione esta linha
    // Conexão bem-sucedida
}

try {
    $usuario = 'REMOVIDO_BANCO'; // Seu usuário do MySQL
    $senha = 'REMOVIDA_SENHA'; // Sua senha do MySQL
    $banco = 'REMOVIDO_BANCO'; // Nome do banco de dados
    $servidor = 'REMOVIDO_HOST'; // Servidor do banco de dados

    $pdo = new PDO("mysql:dbname=$banco;host=$servidor;charset=utf8", $usuario, $senha);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    error_log("Conexão PDO estabelecida com sucesso."); // Adicione esta linha
} catch (PDOException $e) {
    die("Erro ao conectar (PDO): " . $e->getMessage());
}
?>