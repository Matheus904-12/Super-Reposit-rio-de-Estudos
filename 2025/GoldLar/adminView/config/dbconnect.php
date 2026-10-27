<?php
// ====== CONFIGURAÇÕES DO SUPABASE (PostgreSQL) ======
$host = getenv('SUPABASE_DB_HOST') ?: '';
$port = getenv('SUPABASE_DB_PORT') ?: '5432';
$dbname = getenv('SUPABASE_DB_NAME') ?: '';
$username = getenv('SUPABASE_DB_USER') ?: '';
$password = getenv('SUPABASE_DB_PASSWORD') ?: '';

if ($host === '' || $dbname === '' || $username === '' || $password === '') {
    error_log('Supabase PostgreSQL environment variables are not fully configured.');
    http_response_code(500);
    die('Database configuration is missing.');
}

// ====== CONEXÃO VIA pg_connect (PostgreSQL) ======
$conn_string = "host={$host} port={$port} dbname={$dbname} user={$username} password={$password} sslmode=require";
$conn = pg_connect($conn_string);

if (!$conn) {
    die("Erro na conexão com o banco (pg_connect): " . pg_last_error());
} else {
    error_log("Conexão pg_connect estabelecida com sucesso.");
}

// ====== CONEXÃO PDO PARA POSTGRESQL (SUPABASE) ======
try {
    $dsn = "pgsql:host={$host};port={$port};dbname={$dbname};sslmode=require";

    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    $pdo = new PDO($dsn, $username, $password, $options);
    error_log("Conexão PDO com Supabase estabelecida com sucesso.");

    // Tentar reparar as sequências para evitar erros de chave duplicada
    $tablesResult = $pdo->query("SELECT tablename FROM pg_tables WHERE schemaname = 'public'");
    $tables = $tablesResult->fetchAll(PDO::FETCH_COLUMN);
    
    foreach ($tables as $table) {
        try {
            // Verificar se a tabela tem uma coluna ID com auto incremento
            $columnResult = $pdo->query("SELECT column_name, column_default 
                                        FROM information_schema.columns 
                                        WHERE table_name = '$table' 
                                        AND column_default LIKE '%nextval%'");
            
            if ($columnResult && $columnResult->rowCount() > 0) {
                $column = $columnResult->fetch(PDO::FETCH_ASSOC);
                $columnName = $column['column_name'];
                $seqName = null;
                
                // Extrair o nome da sequência a partir do valor padrão
                if (preg_match("/nextval\('([^']+)'/", $column['column_default'], $matches)) {
                    $seqName = $matches[1];
                    
                    // Obter o maior ID atual na tabela
                    $maxResult = $pdo->query("SELECT MAX($columnName) as max_id FROM \"$table\"");
                    $maxId = $maxResult->fetch(PDO::FETCH_ASSOC)['max_id'] ?? 0;
                    
                    // Definir o próximo valor da sequência para ser maior que o máximo ID atual
                    $nextId = $maxId + 1;
                    $pdo->exec("SELECT setval('$seqName', $nextId, false)");
                    
                    error_log("Sequência '$seqName' para tabela '$table' atualizada para $nextId");
                }
            }
        } catch (Exception $e) {
            error_log("Erro ao tentar reparar sequência para tabela $table: " . $e->getMessage());
            // Continuar com outras tabelas mesmo se falhar em uma
        }
    }

    // Camada de compatibilidade para emular mysqli usando PDO
    class MysqliCompatibility
    {
        private $pdo;

        public function __construct($pdo)
        {
            $this->pdo = $pdo;
        }

        public function query($sql)
        {
            // Adaptar sintaxe MySQL para PostgreSQL
            $sql = $this->convertMysqlToPostgres($sql);
            
            try {
                $stmt = $this->pdo->query($sql);
                if (!$stmt) return false;
                return new PDOResultCompatibility($stmt);
            } catch (PDOException $e) {
                error_log("Erro SQL: " . $e->getMessage() . " - SQL: $sql");
                throw $e;
            }
        }

        public function prepare($sql)
        {
            // Adaptar sintaxe MySQL para PostgreSQL
            $sql = $this->convertMysqlToPostgres($sql);
            
            try {
                $stmt = $this->pdo->prepare($sql);
                if (!$stmt) return false;
                return new PDOStatementCompatibility($stmt, $sql);
            } catch (PDOException $e) {
                error_log("Erro SQL (prepare): " . $e->getMessage() . " - SQL: $sql");
                throw $e;
            }
        }

        // Função para converter sintaxe MySQL para PostgreSQL
        private function convertMysqlToPostgres($sql)
        {
            // Verificar se é uma inserção e modificar para evitar problemas de ID
            if (preg_match('/INSERT\s+INTO\s+["`](\w+)["`]/i', $sql, $matches)) {
                $table_name = $matches[1];
                
                // Verificar se a consulta especifica explicitamente o ID
                $hasExplicitId = preg_match('/\([^)]*["` ]id["` ][^)]*\)/i', $sql);
                
                if ($hasExplicitId) {
                    // Se o ID está sendo especificado explicitamente, não precisamos modificar
                    // Apenas converter os delimitadores
                } else {
                    // Se não especifica ID, garantir que a inserção seja feita sem mencionar o campo ID
                    // permitindo que o PostgreSQL use a sequência apropriada
                    $sql = preg_replace(
                        '/INSERT\s+INTO\s+["`](\w+)["`]\s*\(([^)]*)\)/i',
                        'INSERT INTO "$1" ($2)',
                        $sql
                    );
                }
            }
            
            // Substituir backticks (`) por aspas duplas (")
            $sql = preg_replace('/`([^`]+)`/', '"$1"', $sql);
            
            // Substituir NOW() - INTERVAL X HOUR por NOW() - INTERVAL 'X HOURS'
            $sql = preg_replace('/NOW\(\)\s*-\s*INTERVAL\s+(\d+)\s+HOUR/i', "NOW() - INTERVAL '$1 HOURS'", $sql);
            
            // Remover espaços extras entre nome e aspas, como em `name `
            $sql = preg_replace('/"([^"]+)\s+"/i', '"$1"', $sql);
            
            return $sql;
        }

        public function real_escape_string($string)
        {
            return substr($this->pdo->quote($string), 1, -1);
        }

        public function set_charset($charset)
        {
            // Não é necessário para PDO/PostgreSQL
            return true;
        }

        public function insert_id()
        {
            // Obter o último ID inserido
            try {
                // Abordagem mais genérica para obter o último ID inserido
                return $this->pdo->lastInsertId();
            } catch (Exception $e) {
                error_log("Erro ao obter último ID inserido: " . $e->getMessage());
                return 0;
            }
        }
        
        public function close()
        {
            // Simula fechamento da conexão mysqli
            return true;
        }
    }

    class PDOResultCompatibility
    {
        private $stmt;
        private $rows = [];
        public $num_rows = 0;

        public function __construct($stmt)
        {
            $this->stmt = $stmt;
            $this->rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $this->num_rows = count($this->rows);
        }

        public function fetch_assoc()
        {
            $row = current($this->rows);
            next($this->rows);
            return $row !== false ? $row : null;
        }

        public function fetch_all($result_type = MYSQLI_ASSOC)
        {
            return $this->rows;
        }
    }

    class PDOStatementCompatibility
    {
        private $stmt;
        private $original_sql;
        private $result = null;
        public $num_rows = 0;
        private $is_executed = false;
        private $bound_params = [];
        private $bound_results = [];

        public function __construct($stmt, $sql = '')
        {
            $this->stmt = $stmt;
            $this->original_sql = $sql;
        }

        public function bind_param($types, &...$vars)
        {
            foreach ($vars as $i => &$var) {
                $param = $i + 1;
                $type = PDO::PARAM_STR;

                if (isset($types[$i])) {
                    if ($types[$i] === 'i') {
                        $type = PDO::PARAM_INT;
                    } elseif ($types[$i] === 'd') {
                        $type = PDO::PARAM_STR; // PDO não tem PARAM_FLOAT
                    } elseif ($types[$i] === 'b') {
                        $type = PDO::PARAM_LOB;
                    }
                }

                $this->bound_params[$i] = ['value' => &$var, 'type' => $type];
                $this->stmt->bindParam($param, $var, $type);
            }
            
            return true;
        }

        public function execute()
        {
            try {
                $this->is_executed = $this->stmt->execute();
                return $this->is_executed;
            } catch (PDOException $e) {
                error_log("Erro na execução de prepared statement: " . $e->getMessage() . " - SQL: " . $this->original_sql);
                throw $e;
            }
        }

        public function store_result()
        {
            // Não há um equivalente direto para store_result() em PDO
            // Esta função simula o comportamento para compatibilidade com mysqli
            if (!$this->is_executed) {
                $this->execute();
            }
            
            try {
                // Calcula o número de linhas afetadas/retornadas
                $this->num_rows = $this->stmt->rowCount();
                return $this;
            } catch (Exception $e) {
                error_log("Erro em store_result: " . $e->getMessage());
                return false;
            }
        }

        public function num_rows()
        {
            return $this->num_rows;
        }

        public function bind_result(&...$vars)
        {
            // Armazena as variáveis de resultado para uso posterior no fetch()
            $this->bound_results = &$vars;
            return true;
        }

        public function fetch()
        {
            // Busca uma linha de resultado e atribui aos parâmetros vinculados
            $row = $this->stmt->fetch(PDO::FETCH_NUM);
            
            if ($row === false) {
                return false;
            }
            
            // Atribui os valores do resultado às variáveis vinculadas
            foreach ($this->bound_results as $i => &$var) {
                if (isset($row[$i])) {
                    $var = $row[$i];
                }
            }
            
            return true;
        }

        public function get_result()
        {
            if (!$this->is_executed) {
                $this->execute();
            }
            return new PDOResultCompatibility($this->stmt);
        }

        public function close()
        {
            $this->stmt->closeCursor();
            return true;
        }
    }

    // Criar a conexão de compatibilidade
    $conn = new MysqliCompatibility($pdo);
    $GLOBALS['conn'] = $conn;
} catch (PDOException $e) {
    die("Erro ao conectar ao Supabase (PDO): " . $e->getMessage());
}

// ====== CONEXÃO ALTERNATIVA VIA API REST DO SUPABASE ======
$supabase_url = getenv('SUPABASE_URL') ?: '';
$supabase_key = getenv('SUPABASE_ANON_KEY') ?: '';

// Função para fazer requisições à API do Supabase
function supabaseRequest($endpoint, $method = 'GET', $data = null)
{
    global $supabase_url, $supabase_key;

    $url = $supabase_url . $endpoint;

    $headers = [
        'apikey: ' . $supabase_key,
        'Authorization: Bearer ' . $supabase_key,
        'Content-Type: application/json',
        'Prefer: return=representation'
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    if ($method !== 'GET') {
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        if ($data) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }
    }

    $response = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        return ['error' => $error];
    }

    return json_decode($response, true);
}

// Observação: mysqli não é compatível com PostgreSQL, por isso não está incluído
?>