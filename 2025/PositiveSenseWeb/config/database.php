<?php

/**
 * ========================================
 * CONFIGURAÇÃO DE BANCO DE DADOS
 * PositiveSense - Dual Environment
 * ========================================
 */

// Detectar ambiente automaticamente
$isVercel = (
    isset($_ENV['VERCEL']) ||
    isset($_SERVER['VERCEL']) ||
    isset($_ENV['VERCEL_ENV']) ||
    strpos($_SERVER['HTTP_HOST'] ?? '', 'vercel.app') !== false
);

$isLocal = (
    !$isVercel &&
    (
        !isset($_SERVER['HTTP_HOST']) ||
        $_SERVER['HTTP_HOST'] === 'localhost:8000' ||
        $_SERVER['HTTP_HOST'] === 'localhost' ||
        $_SERVER['HTTP_HOST'] === '127.0.0.1' ||
        strpos($_SERVER['HTTP_HOST'], 'localhost') !== false
    )
);

if ($isVercel) {
    // ========================================
    // AMBIENTE VERCEL (TiDB Cloud)
    // ========================================
    define('DB_HOST', getenv('DB_HOST') ?: ($_ENV['DB_HOST'] ?? 'gateway01.us-east-1.prod.aws.tidbcloud.com'));
    define('DB_PORT', getenv('DB_PORT') ?: ($_ENV['DB_PORT'] ?? '4000'));
    define('DB_NAME', getenv('DB_NAME') ?: ($_ENV['DB_NAME'] ?? 'positivesense'));
    define('DB_USER', getenv('DB_USER') ?: ($_ENV['DB_USER'] ?? ''));
    define('DB_PASS', getenv('DB_PASS') ?: ($_ENV['DB_PASS'] ?? ''));
    define('DB_CHARSET', 'utf8mb4');
    define('DB_ENV', 'PRODUCTION-VERCEL-TIDB');
    define('USE_SSL', true);
    define('SSL_CA_CONTENT', getenv('SSL_CA_CONTENT') ?: ($_ENV['SSL_CA_CONTENT'] ?? ''));
} elseif ($isLocal) {
    // ========================================
    // AMBIENTE LOCAL (XAMPP)
    // ========================================
    define('DB_HOST', 'localhost');
    define('DB_PORT', '3306');
    define('DB_NAME', 'positivesense');
    define('DB_USER', 'root');
    define('DB_PASS', getenv('DB_PASS') ?: ($_ENV['DB_PASS'] ?? '')); // Altere se tiver senha no MySQL
    define('DB_CHARSET', 'utf8mb4');
    define('DB_ENV', 'LOCAL-XAMPP');
    define('USE_SSL', false);
} else {
    // ========================================
    // AMBIENTE PRODUÇÃO (INFINITYFREE)
    // ========================================
    define('DB_HOST', getenv('DB_HOST') ?: ($_ENV['DB_HOST'] ?? ''));
    define('DB_PORT', '3306');
    define('DB_NAME', getenv('DB_NAME') ?: ($_ENV['DB_NAME'] ?? ''));
    define('DB_USER', getenv('DB_USER') ?: ($_ENV['DB_USER'] ?? ''));
    define('DB_PASS', getenv('DB_PASS') ?: ($_ENV['DB_PASS'] ?? ''));
    define('DB_CHARSET', 'utf8mb4');
    define('DB_ENV', 'PRODUCTION-INFINITYFREE');
    define('USE_SSL', false);
}

// Classe de conexão com banco de dados
class Database
{
    private static $instance = null;
    private $conn;

    /**
     * Construtor privado (Singleton)
     */
    private function __construct()
    {
        try {
            // Construir DSN baseado no ambiente
            $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;

            // Opções base de conexão
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES " . DB_CHARSET,
                PDO::ATTR_TIMEOUT            => 10,
            ];

            // Adicionar SSL para TiDB Cloud
            if (USE_SSL) {
                // Vercel: usar certificado de variável de ambiente
                if (defined('SSL_CA_CONTENT') && !empty(SSL_CA_CONTENT)) {
                    $tmpCertPath = '/tmp/isrgrootx1.pem';
                    file_put_contents($tmpCertPath, SSL_CA_CONTENT);
                    $options[PDO::MYSQL_ATTR_SSL_CA] = $tmpCertPath;
                    $options[PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT] = false;
                } else {
                    // Local: usar certificado de arquivo
                    $caCertPath = __DIR__ . '/isrgrootx1.pem';
                    if (file_exists($caCertPath)) {
                        $options[PDO::MYSQL_ATTR_SSL_CA] = $caCertPath;
                        $options[PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT] = false;
                    }
                }
            }

            $this->conn = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            // Log do erro com ambiente
            error_log("❌ Erro ao conectar [" . DB_ENV . "]: " . $e->getMessage());

            // Retornar erro em formato JSON para requisições AJAX
            if (
                !empty($_SERVER['HTTP_X_REQUESTED_WITH']) &&
                strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'
            ) {
                header('Content-Type: application/json');
                echo json_encode([
                    'success' => false,
                    'message' => 'Erro de conexão com o banco de dados. Tente novamente.',
                    'error' => $e->getMessage(),
                    'environment' => DB_ENV
                ]);
                exit;
            }

            // Para requisições que esperam JSON (como processar_registro.php)
            if (php_sapi_name() !== 'cli' && !headers_sent()) {
                $acceptHeader = $_SERVER['HTTP_ACCEPT'] ?? '';
                if (
                    strpos($acceptHeader, 'application/json') !== false ||
                    strpos($_SERVER['REQUEST_URI'] ?? '', 'processar_') !== false
                ) {
                    header('Content-Type: application/json');
                    echo json_encode([
                        'success' => false,
                        'message' => 'Erro de conexão com banco de dados. Verifique as credenciais.',
                        'error' => $e->getMessage(),
                        'code' => $e->getCode()
                    ]);
                    exit;
                }
            }

            // Mensagem HTML amigável baseada no ambiente
            $envInfo = (DB_ENV === 'LOCAL-TIDB') ? 'TiDB Cloud (desenvolvimento)' : 'InfinityFree MySQL (produção)';
            $troubleshooting = (DB_ENV === 'LOCAL-TIDB')
                ? "<li>Verifique sua conexão com a internet</li>
                   <li>Certificado SSL está correto?</li>
                   <li>Credenciais do TiDB estão corretas?</li>"
                : "<li>Verifique se o banco foi importado no phpMyAdmin</li>
                   <li>As credenciais do InfinityFree estão corretas?</li>
                   <li>Senha do banco pode estar incorreta</li>
                   <li>IP do servidor pode não estar autorizado</li>";

            die("
                <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; border: 2px solid #dc3545; border-radius: 10px; background-color: #f8d7da;'>
                    <h2 style='color: #721c24; margin-top: 0;'>❌ Erro de Conexão com Banco de Dados</h2>
                    <p style='color: #721c24;'><strong>Ambiente:</strong> {$envInfo}</p>
                    <p style='color: #721c24;'><strong>Host:</strong> " . DB_HOST . "</p>
                    <p style='color: #721c24;'><strong>Database:</strong> " . DB_NAME . "</p>
                    <p style='color: #721c24;'>Não foi possível conectar. Verifique:</p>
                    <ol style='color: #721c24;'>
                        {$troubleshooting}
                    </ol>
                    <hr style='border-color: #dc3545;'>
                    <p style='font-size: 12px; color: #721c24;'><strong>Erro técnico:</strong> " . htmlspecialchars($e->getMessage()) . "</p>
                    <p style='font-size: 12px; color: #721c24;'><strong>Código:</strong> " . $e->getCode() . "</p>
                </div>
            ");
        }
    }

    /**
     * Retorna instância única da conexão (Singleton)
     */
    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Retorna a conexão PDO
     */
    public function getConnection()
    {
        return $this->conn;
    }

    /**
     * Previne clonagem da instância
     */
    private function __clone() {}

    /**
     * Previne deserialização da instância
     */
    public function __wakeup()
    {
        throw new Exception("Não é possível deserializar singleton");
    }
}

/**
 * Função helper para obter conexão
 */
function getDB()
{
    return Database::getInstance()->getConnection();
}
