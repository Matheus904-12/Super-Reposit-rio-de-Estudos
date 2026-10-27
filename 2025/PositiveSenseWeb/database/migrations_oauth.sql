-- ========================================
-- MIGRATIONS GOOGLE OAuth 2.0
-- PositiveSense - Adicionar suporte a login com Google
-- ========================================

-- Adicionar colunas para Google OAuth à tabela usuarios
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS login_google BOOLEAN DEFAULT FALSE;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS google_id VARCHAR(255);
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS avatar VARCHAR(255) DEFAULT 'img/default-avatar.png';
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Adicionar índice para google_id
ALTER TABLE usuarios ADD UNIQUE INDEX IF NOT EXISTS idx_google_id (google_id);

-- Renomear coluna foto_perfil para avatar se ela não existir como avatar
-- (comentado pois avatar já foi adicionado acima)

-- Atualizar logs_acesso para incluir novo tipo de ação
-- ALTER TABLE logs_acesso MODIFY acao ENUM('login_sucesso', 'login_falha', 'logout', 'registro', 'recuperacao_senha', 'login_google') NOT NULL;

-- Criar tabela de integração com provedores OAuth
CREATE TABLE IF NOT EXISTS oauth_integrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    provider VARCHAR(50) NOT NULL,
    provider_id VARCHAR(255) NOT NULL,
    provider_email VARCHAR(255),
    provider_name VARCHAR(100),
    access_token TEXT,
    refresh_token TEXT,
    token_expiration DATETIME,
    connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_used TIMESTAMP NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    UNIQUE KEY unique_provider (usuario_id, provider, provider_id),
    INDEX idx_provider (provider),
    INDEX idx_usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de auditoria para logins OAuth
CREATE TABLE IF NOT EXISTS oauth_login_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    provider VARCHAR(50) NOT NULL,
    ip_address VARCHAR(45),
    user_agent VARCHAR(255),
    sucesso BOOLEAN DEFAULT TRUE,
    mensagem_erro TEXT,
    data_tentativa TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    INDEX idx_usuario (usuario_id),
    INDEX idx_provider (provider),
    INDEX idx_data (data_tentativa)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
