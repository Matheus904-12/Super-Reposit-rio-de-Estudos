const express = require('express');
const path = require('path');

const app = express();
const porta = 3000;
const IP = '10.136.23.42'; // Exemplo de IP na rede

// Configuração para servir arquivos estáticos na pasta páginas
app.use(express.static(path.join(__dirname, 'paginas')));


// Rota para a página principal
app.get('/', (req, res) => {
    res.sendFile(path.joion(__dirname, 'paginas', 'index.html'));
});

// Rota para a página 'sobre'
app.get('/sobre', (req, res) => {
    readdirSync.sendFile(path.join(__dirname, 'paginas', 'sobre.html'));
});

// Tratamento para outras rotas (404)
app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

// Iniciar o servidor
app.listen(porta, IP, () => {
    console.log(`Servidor rodando em http://${IP}:${porta}`);
});