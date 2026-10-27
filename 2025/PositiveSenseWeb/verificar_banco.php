<?php

/**
 * ========================================
 * VERIFICAÇÃO DO BANCO DE DADOS
 * ========================================
 *
 * Script para verificar estrutura e dados do banco
 */

require_once __DIR__ . '/config/database.php';

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <title>Verificação do Banco - PositiveSense</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f5f5f5;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
        }

        h1,
        h2 {
            color: #333;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background: #4CAF50;
            color: white;
        }

        tr:nth-child(even) {
            background: #f9f9f9;
        }

        .success {
            color: green;
            font-weight: bold;
        }

        .error {
            color: red;
            font-weight: bold;
        }

        .info {
            background: #e3f2fd;
            padding: 10px;
            border-radius: 4px;
            margin: 10px 0;
        }

        pre {
            background: #f5f5f5;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>🔍 Verificação do Banco de Dados - PositiveSense</h1>

        <?php
        try {
            $db = getDB();
            echo "<p class='success'>✅ Conexão com banco estabelecida com sucesso!</p>";

            // Informações de conexão
            echo "<div class='info'>";
            echo "<strong>Ambiente:</strong> " . DB_ENV . "<br>";
            echo "<strong>Host:</strong> " . DB_HOST . "<br>";
            echo "<strong>Banco:</strong> " . DB_NAME . "<br>";
            echo "<strong>Usuário:</strong> " . DB_USER . "<br>";
            echo "</div>";

            // Verifica tabela usuarios
            echo "<h2>📋 Tabela: usuarios</h2>";
            $stmt = $db->query("SELECT COUNT(*) as total FROM usuarios");
            $total = $stmt->fetch()['total'];
            echo "<p>Total de usuários: <strong>$total</strong></p>";

            if ($total > 0) {
                echo "<h3>Últimos 10 usuários cadastrados:</h3>";
                $stmt = $db->query("
                    SELECT id, nome, email, tipo_usuario, status,
                           DATE_FORMAT(data_cadastro, '%d/%m/%Y %H:%i') as cadastro,
                           DATE_FORMAT(ultimo_acesso, '%d/%m/%Y %H:%i') as ultimo_acesso
                    FROM usuarios
                    ORDER BY id DESC
                    LIMIT 10
                ");

                echo "<table>";
                echo "<tr><th>ID</th><th>Nome</th><th>Email</th><th>Tipo</th><th>Status</th><th>Cadastro</th><th>Último Acesso</th></tr>";
                while ($row = $stmt->fetch()) {
                    echo "<tr>";
                    echo "<td>{$row['id']}</td>";
                    echo "<td>{$row['nome']}</td>";
                    echo "<td>{$row['email']}</td>";
                    echo "<td>{$row['tipo_usuario']}</td>";
                    echo "<td>{$row['status']}</td>";
                    echo "<td>{$row['cadastro']}</td>";
                    echo "<td>{$row['ultimo_acesso']}</td>";
                    echo "</tr>";
                }
                echo "</table>";
            }

            // Verifica tabela sessoes
            echo "<h2>🔐 Tabela: sessoes</h2>";
            $stmt = $db->query("SELECT COUNT(*) as total FROM sessoes");
            $total_sessoes = $stmt->fetch()['total'];
            echo "<p>Total de sessões: <strong>$total_sessoes</strong></p>";

            $stmt = $db->query("
                SELECT COUNT(*) as total
                FROM sessoes
                WHERE data_expiracao > NOW()
            ");
            $sessoes_ativas = $stmt->fetch()['total'];
            echo "<p>Sessões ativas (não expiradas): <strong>$sessoes_ativas</strong></p>";

            if ($sessoes_ativas > 0) {
                echo "<h3>Sessões ativas:</h3>";
                $stmt = $db->query("
                    SELECT s.id, s.usuario_id, u.nome, u.email,
                           DATE_FORMAT(s.data_criacao, '%d/%m/%Y %H:%i') as criacao,
                           DATE_FORMAT(s.data_expiracao, '%d/%m/%Y %H:%i') as expiracao,
                           s.ip_address,
                           SUBSTRING(s.token_sessao, 1, 10) as token_preview
                    FROM sessoes s
                    INNER JOIN usuarios u ON s.usuario_id = u.id
                    WHERE s.data_expiracao > NOW()
                    ORDER BY s.data_criacao DESC
                    LIMIT 10
                ");

                echo "<table>";
                echo "<tr><th>ID</th><th>Usuário ID</th><th>Nome</th><th>Email</th><th>Criação</th><th>Expiração</th><th>IP</th><th>Token (preview)</th></tr>";
                while ($row = $stmt->fetch()) {
                    echo "<tr>";
                    echo "<td>{$row['id']}</td>";
                    echo "<td>{$row['usuario_id']}</td>";
                    echo "<td>{$row['nome']}</td>";
                    echo "<td>{$row['email']}</td>";
                    echo "<td>{$row['criacao']}</td>";
                    echo "<td>{$row['expiracao']}</td>";
                    echo "<td>{$row['ip_address']}</td>";
                    echo "<td>{$row['token_preview']}...</td>";
                    echo "</tr>";
                }
                echo "</table>";
            }

            // Verifica tabela logs_acesso
            echo "<h2>📊 Tabela: logs_acesso</h2>";
            $stmt = $db->query("SELECT COUNT(*) as total FROM logs_acesso");
            $total_logs = $stmt->fetch()['total'];
            echo "<p>Total de logs: <strong>$total_logs</strong></p>";

            if ($total_logs > 0) {
                echo "<h3>Últimos 20 logs de acesso:</h3>";
                $stmt = $db->query("
                    SELECT l.id, l.usuario_id, u.nome, l.acao,
                           DATE_FORMAT(l.data_hora, '%d/%m/%Y %H:%i:%s') as data_hora,
                           l.ip_address, l.detalhes
                    FROM logs_acesso l
                    LEFT JOIN usuarios u ON l.usuario_id = u.id
                    ORDER BY l.id DESC
                    LIMIT 20
                ");

                echo "<table>";
                echo "<tr><th>ID</th><th>Usuário</th><th>Ação</th><th>Data/Hora</th><th>IP</th><th>Detalhes</th></tr>";
                while ($row = $stmt->fetch()) {
                    $nome = $row['nome'] ?? 'N/A';
                    echo "<tr>";
                    echo "<td>{$row['id']}</td>";
                    echo "<td>{$nome}</td>";
                    echo "<td>{$row['acao']}</td>";
                    echo "<td>{$row['data_hora']}</td>";
                    echo "<td>{$row['ip_address']}</td>";
                    echo "<td>{$row['detalhes']}</td>";
                    echo "</tr>";
                }
                echo "</table>";
            }

            // Estrutura das tabelas
            echo "<h2>🏗️ Estrutura das Tabelas</h2>";

            $tabelas = ['usuarios', 'sessoes', 'logs_acesso'];
            foreach ($tabelas as $tabela) {
                echo "<h3>Tabela: $tabela</h3>";
                $stmt = $db->query("DESCRIBE $tabela");
                echo "<table>";
                echo "<tr><th>Campo</th><th>Tipo</th><th>Nulo</th><th>Chave</th><th>Padrão</th><th>Extra</th></tr>";
                while ($row = $stmt->fetch()) {
                    echo "<tr>";
                    echo "<td>{$row['Field']}</td>";
                    echo "<td>{$row['Type']}</td>";
                    echo "<td>{$row['Null']}</td>";
                    echo "<td>{$row['Key']}</td>";
                    echo "<td>" . ($row['Default'] ?? 'NULL') . "</td>";
                    echo "<td>{$row['Extra']}</td>";
                    echo "</tr>";
                }
                echo "</table>";
            }
        } catch (PDOException $e) {
            echo "<p class='error'>❌ Erro ao conectar com banco de dados:</p>";
            echo "<pre>" . htmlspecialchars($e->getMessage()) . "</pre>";
        }
        ?>

        <hr>
        <p><a href="debug_sessao.php">🔍 Ver Debug de Sessão</a> | <a href="index.php">🏠 Voltar para Home</a></p>
    </div>
</body>

</html>
