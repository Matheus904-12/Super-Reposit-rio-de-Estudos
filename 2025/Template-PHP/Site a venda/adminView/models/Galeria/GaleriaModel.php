<?php
class GaleriaModel
{
    private $conn;

    public function __construct()
    {
        $this->conn = new mysqli('REMOVIDO_HOST', 'REMOVIDO_BANCO', 'REMOVIDA_SENHA', 'REMOVIDO_BANCO');

        if ($this->conn->connect_error) {
            die("Conexão falhou: " . $this->conn->connect_error);
        }
    }

    public function getGaleria()
    {
        $query = "SELECT * FROM gallery";
        $result = $this->conn->query($query);

        return ($result) ? $result->fetch_all(MYSQLI_ASSOC) : [];
    }

    public function adicionarImagem($caminho, $categoria)
    {
        $sql = "INSERT INTO gallery (image_url, category) VALUES (?, ?)";
        $stmt = $this->conn->prepare($sql);

        if (!$stmt) {
            die("Erro na preparação da query: " . $this->conn->error);
        }

        $stmt->bind_param("ss", $caminho, $categoria);
        return $stmt->execute();
    }
}
