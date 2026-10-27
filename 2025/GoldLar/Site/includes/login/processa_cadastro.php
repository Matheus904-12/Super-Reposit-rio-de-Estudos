<?php
// processa_cadastro.php

// Definir cabeçalho para JSON
header('Content-Type: application/json');

require_once '../../../adminView/config/dbconnect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = trim($_POST['nome']);
    $email = trim($_POST['email']);
    $senha = password_hash(trim($_POST['senha']), PASSWORD_BCRYPT);
    $endereco = $_POST['endereco'] ?? '';
    $cep = $_POST['cep'] ?? '';
    $numero_casa = $_POST['numero_casa'] ?? '';
    $telefone = $_POST['telefone'] ?? '';

    // Verificações de dados
    if (empty($nome) || empty($email) || empty($_POST['senha'])) {
        echo json_encode(["status" => "error", "message" => "Preencha todos os campos obrigatórios!"]);
        exit;
    }

    // Validar email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Email inválido!"]);
        exit;
    }

    // Verificar se email já existe - usando PDO
    $query = "SELECT id FROM usuarios WHERE email = :email";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();
    
    // Verificar se o email já existe
    if ($stmt->rowCount() > 0) {
        echo json_encode(["status" => "error", "message" => "Email já cadastrado!"]);
        exit;
    }

    // Inserir novo usuário - usando PDO
    $query = "INSERT INTO usuarios (name, email, password, endereco, cep, numero_casa, telefone) VALUES (:nome, :email, :senha, :endereco, :cep, :numero_casa, :telefone)";
    $stmt = $pdo->prepare($query);
    
    // Vincular parâmetros
    $stmt->bindParam(':nome', $nome, PDO::PARAM_STR);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':senha', $senha, PDO::PARAM_STR);
    $stmt->bindParam(':endereco', $endereco, PDO::PARAM_STR);
    $stmt->bindParam(':cep', $cep, PDO::PARAM_STR);
    $stmt->bindParam(':numero_casa', $numero_casa, PDO::PARAM_STR);
    $stmt->bindParam(':telefone', $telefone, PDO::PARAM_STR);

    // Executar a consulta
    try {
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Conta criada com sucesso!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Erro ao cadastrar usuário"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Erro ao cadastrar usuário: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Método de requisição inválido."]);
}
?>