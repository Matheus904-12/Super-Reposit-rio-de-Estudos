const express = require('express');
const cors = require('cors'); 
const crypto = require('crypto'); 
const app = express();

// Porta padrão ou ambiente
const port = process.env.PORT;

// Chave de API para autenticação
const API_KEY = 'matheuslzinn';

// Chave de criptografia (use uma chave fixa para facilitar a descriptografia)
const ENCRYPTION_KEY = crypto.randomBytes(32); // Chave de 32 bytes
const IV_LENGTH = 16; // Comprimento do vetor de inicialização (IV)

// Função para criptografar a mensagem
function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Função para descriptografar a mensagem
function decrypt(text) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// Middleware para tratar requisições JSON
app.use(express.json());
app.use(cors());

// Autenticação de chave de API
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

// Aplica a autenticação em todas as rotas
app.use('/api', authenticateAPIKey);

// Rota para criptografar a mensagem
app.post('/api/encrypt', (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: 'Mensagem ausente.' });
    }
    const encryptedMessage = encrypt(message);
    res.status(200).json({ encryptedMessage });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criptografar a mensagem.' });
  }
});

// Rota para descriptografar a mensagem
app.post('/api/decrypt', (req, res) => {
  try {
    const { encryptedMessage } = req.body;
    if (!encryptedMessage) {
      return res.status(400).json({ message: 'Mensagem criptografada ausente.' });
    }
    const decryptedMessage = decrypt(encryptedMessage);
    res.status(200).json({ decryptedMessage });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao descriptografar a mensagem.' });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando`);
});
