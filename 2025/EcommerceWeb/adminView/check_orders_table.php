<?php
// Configurações de conexão
$servername = "REMOVIDO_HOST";
$username = "REMOVIDO_BANCO";
$password = "REMOVIDA_SENHA";
$database = "REMOVIDO_BANCO";

// Cria a conexão
$conn = new mysqli($servername, $username, $password, $database);

// Verifica a conexão
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

echo "Conexão bem-sucedida!\n";

// Consulta a estrutura da tabela orders
$sql = "SHOW COLUMNS FROM orders";
$result = $conn->query($sql);

if ($result === false) {
    echo "Erro ao consultar a tabela: " . $conn->error;
} else {
    if ($result->num_rows > 0) {
        echo "Estrutura da tabela 'orders':\n";
        while($row = $result->fetch_assoc()) {
            echo "Campo: " . $row["Field"] . ", Tipo: " . $row["Type"] . ", Nulo: " . $row["Null"] . "\n";
        }
    } else {
        echo "Nenhum resultado encontrado";
    }
}

// Fecha a conexão
$conn->close();
?>