/*create database bibliotecaLivros*/
/*use bibliotecaLivros*/
/*create table livraria (
livro  varchar(25),
autores varchar(20),
categoria varchar(25)
);*/
/*insert into livraria (livro, autores, categoria) values ("Vingadores - Ultimato Art" ,"Peter Jordan","Aventura")*/
select*from livraria


/*2*/

-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS FIRMA_PRODUTOS;

-- Usar o banco de dados criado
USE FIRMA_PRODUTOS;

-- Criar a tabela "PRODUTO"
CREATE TABLE IF NOT EXISTS PRODUTO (
    codigo VARCHAR(10) PRIMARY KEY,
    nome VARCHAR(255),
    categoria VARCHAR(50),
    preco DECIMAL(10, 2)
);

-- Criar a tabela "CLIENTE"
CREATE TABLE IF NOT EXISTS CLIENTE (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    endereco VARCHAR(255),
    telefone VARCHAR(15),
    status VARCHAR(10),
    limite_credito DECIMAL(10, 2)
);

-- Criar a tabela "PEDIDO"
CREATE TABLE IF NOT EXISTS PEDIDO (
    numero INT AUTO_INCREMENT PRIMARY KEY,
    data_elaboracao DATE
);

-- Criar tabela de relacionamento entre pedido e produto (muitos para muitos)
CREATE TABLE IF NOT EXISTS PEDIDO_PRODUTO (
    numero_pedido INT,
    produto_codigo VARCHAR(10),
    quantidade INT,
    PRIMARY KEY (numero_pedido, produto_codigo),
    FOREIGN KEY (numero_pedido) REFERENCES PEDIDO(numero),
    FOREIGN KEY (produto_codigo) REFERENCES PRODUTO(codigo)
);

-- Inserir dados na tabela "PRODUTO"
INSERT INTO PRODUTO (codigo, nome, categoria, preco) VALUES
('P001', 'Detergente', 'Limpeza', 5.99),
('P002', 'Sabão em Pó', 'Limpeza', 8.99);

-- Inserir dados na tabela "CLIENTE"
INSERT INTO CLIENTE (nome, endereco, telefone, status, limite_credito) VALUES
('Cliente 1', 'Rua A, 123', '123456789', 'Bom', 100.00),
('Cliente 2', 'Rua B, 456', '987654321', 'Médio', 50.00);

-- Inserir dados na tabela "PEDIDO"
INSERT INTO PEDIDO (data_elaboracao) VALUES
('2024-01-31'),
('2024-02-01');

-- Inserir relacionamento entre pedido e produto
INSERT INTO PEDIDO_PRODUTO (numero_pedido, produto_codigo, quantidade) VALUES
(1, 'P001', 3),
(1, 'P002', 2),
(2, 'P001', 1);

-- Mostrar como está a tabela "PRODUTO"
SELECT * FROM PRODUTO;