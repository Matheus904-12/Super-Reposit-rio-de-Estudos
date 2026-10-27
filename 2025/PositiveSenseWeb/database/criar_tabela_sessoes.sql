-- ========================================
-- CRIAR TABELA SESSOES - TiDB Cloud
-- ========================================
-- Execute este script no TiDB Cloud para criar a tabela de sessões
-- Criar tabela de sessões
CREATE TABLE IF NOT EXISTS sessoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    token_sessao VARCHAR(255) NOT NULL UNIQUE,
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_expiracao TIMESTAMP NOT NULL,
    INDEX idx_usuario_id (usuario_id),
    INDEX idx_token_sessao (token_sessao),
    INDEX idx_data_expiracao (data_expiracao),
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Verificar se a tabela foi criada
SELECT
    'Tabela sessoes criada com sucesso!' as status;

-- Mostrar estrutura da tabela
DESCRIBE sessoes;
