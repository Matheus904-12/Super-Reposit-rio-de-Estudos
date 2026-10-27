<?php
include './config/dbconnect.php'; // Caminho para o arquivo de conexão

function getClientes() {
    global $pdo;
    
    if (!$pdo) {
        die("Erro na conexão com o banco de dados.");
    }

    try {
        $sql = "SELECT * FROM usuarios"; 
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        
        // Usando fetchAll para obter todos os resultados de uma vez
        $clientes = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $clientes;
        
        // Alternativamente, se você preferir o método de loop:
        /*
        $clientes = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $clientes[] = $row;
        }
        return $clientes;
        */
    } catch (PDOException $e) {
        die("Erro ao consultar clientes: " . $e->getMessage());
    }
}
?>