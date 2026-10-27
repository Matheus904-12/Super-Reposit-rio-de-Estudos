<?php
class GaleriaModel
{
    private $conn;
    private $pdo;

    public function __construct()
    {
        // Recuperando a conexão PDO do arquivo de configuração
        require_once __DIR__ . '/../../config/dbconnect.php';
        
        // Usando a conexão PDO global definida em dbconnect.php
        $this->pdo = $pdo;
        
        // Mantendo a compatibilidade com código existente que pode usar mysqli
        // Esta propriedade não será mais usada nos novos métodos
        // mas mantemos para não quebrar código legado que acesse esta propriedade
        $this->conn = null;
    }

    public function getGaleria()
    {
        try {
            $query = "SELECT * FROM gallery";
            $stmt = $this->pdo->query($query);
            
            if ($stmt) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
        } catch (PDOException $e) {
            error_log("Erro ao buscar galeria: " . $e->getMessage());
        }
        
        return [];
    }

    public function adicionarImagem($caminho, $categoria)
    {
        try {
            $sql = "INSERT INTO gallery (image_url, category) VALUES (:caminho, :categoria)";
            $stmt = $this->pdo->prepare($sql);
            
            if (!$stmt) {
                error_log("Erro na preparação da query de adição de imagem");
                return false;
            }
            
            $stmt->bindParam(':caminho', $caminho, PDO::PARAM_STR);
            $stmt->bindParam(':categoria', $categoria, PDO::PARAM_STR);
            
            return $stmt->execute();
        } catch (PDOException $e) {
            error_log("Erro ao adicionar imagem na galeria: " . $e->getMessage());
            return false;
        }
    }
    
    // Método auxiliar para verificar se a tabela gallery existe
    // e criá-la se necessário (útil para migração inicial)
    public function verificarECriarTabela()
    {
        try {
            // Verificar se a tabela existe
            $checkTable = "SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public'
                AND table_name = 'gallery'
            )";
            
            $result = $this->pdo->query($checkTable)->fetch(PDO::FETCH_ASSOC);
            
            // Se a tabela não existir, cria
            if (!$result['exists']) {
                $createTable = "CREATE TABLE gallery (
                    id SERIAL PRIMARY KEY,
                    image_url TEXT NOT NULL,
                    category VARCHAR(100),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )";
                
                $this->pdo->exec($createTable);
                error_log("Tabela 'gallery' criada com sucesso no PostgreSQL");
            }
            
            return true;
        } catch (PDOException $e) {
            error_log("Erro ao verificar/criar tabela gallery: " . $e->getMessage());
            return false;
        }
    }
}