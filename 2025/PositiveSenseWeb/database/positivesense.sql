-- ========================================
-- BANCO DE DADOS POSITIVESENSE
-- Sistema de Login e Registro de Usuários
-- ========================================

-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS positivesense
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE positivesense;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE,
    telefone VARCHAR(20),
    foto_perfil VARCHAR(255) DEFAULT 'img/default-avatar.png',
    tipo_usuario ENUM('aluno', 'professor', 'responsavel', 'admin') DEFAULT 'aluno',
    status ENUM('ativo', 'inativo', 'pendente') DEFAULT 'ativo',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acesso TIMESTAMP NULL,
    token_recuperacao VARCHAR(100),
    token_expiracao DATETIME,
    INDEX idx_email (email),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de sessões (para controle de login)
CREATE TABLE IF NOT EXISTS sessoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    token_sessao VARCHAR(255) NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    user_agent VARCHAR(255),
    data_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_expiracao DATETIME NULL,
    ativo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_token (token_sessao),
    INDEX idx_usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de logs de acesso
CREATE TABLE IF NOT EXISTS logs_acesso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    acao ENUM('login_sucesso', 'login_falha', 'logout', 'registro', 'recuperacao_senha') NOT NULL,
    ip_address VARCHAR(45),
    user_agent VARCHAR(255),
    detalhes TEXT,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    INDEX idx_usuario (usuario_id),
    INDEX idx_acao (acao),
    INDEX idx_data (data_hora)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir usuário administrador padrão
-- Senha: REMOVIDA_SENHA (em produção, alterar imediatamente!)
INSERT IGNORE INTO usuarios (nome, email, senha, tipo_usuario) VALUES
('Administrador', 'admin@positivesense.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- View para estatísticas de usuários
CREATE OR REPLACE VIEW estatisticas_usuarios AS
SELECT
    COUNT(*) as total_usuarios,
    COUNT(CASE WHEN tipo_usuario = 'aluno' THEN 1 END) as total_alunos,
    COUNT(CASE WHEN tipo_usuario = 'professor' THEN 1 END) as total_professores,
    COUNT(CASE WHEN tipo_usuario = 'responsavel' THEN 1 END) as total_responsaveis,
    COUNT(CASE WHEN status = 'ativo' THEN 1 END) as usuarios_ativos,
    COUNT(CASE WHEN DATE(data_cadastro) = CURDATE() THEN 1 END) as cadastros_hoje,
    COUNT(CASE WHEN DATE(ultimo_acesso) = CURDATE() THEN 1 END) as acessos_hoje
FROM usuarios;
