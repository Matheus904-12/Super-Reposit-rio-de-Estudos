const express = require('express');
const cors = require('cors'); // Middleware para habilitar CORS
const app = express();

// Use a porta fornecida pelo ambiente do Replit ou 3000 para ambientes locais
const port = process.env.PORT;

// Defina uma chave de API de exemplo
const API_KEY = '1234567890abcdef';

// Middleware para permitir o parsing de JSON nas requisições
app.use(express.json());

// Habilita o CORS para todas as rotas, permitindo o acesso do localhost
app.use(cors());

// Middleware de autenticação de chave de API
const authenticateAPIKey = (req, res, next) => {
  const apiKey = req.header('x-api-key');

  if (!apiKey) {
    return res.status(401).json({ message: 'Chave de API ausente.' });
  }

  if (apiKey !== API_KEY) {
    return res.status(403).json({ message: 'Chave de API inválida.' });
  }

  next();
};

// Aplicando o middleware de autenticação em todas as rotas da API
app.use('/api', authenticateAPIKey);

// Endpoint para obter uma lista de itens
app.get('/api/items', (req, res) => {
  try {
    const items = [
      { id: 1, nome: 'Item 1' },
      { id: 2, nome: 'Item 2' },
      { id: 3, nome: 'Item 3' }
    ];
    res.status(200).json(items); // Retorna a lista de itens com status 200 (sucesso)
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' }); // Resposta em caso de erro
  }
});

// Endpoint para criar um novo item (mesmo que o frontend não o utilize)
app.post('/api/items', (req, res) => {
  try {
    const newItem = req.body;
    // Aqui poderia adicionar a lógica para salvar o item em um banco de dados
    res.status(201).json(newItem); // Retorna o item criado com status 201 (sucesso)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar item' }); // Resposta em caso de erro
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando`);
});
