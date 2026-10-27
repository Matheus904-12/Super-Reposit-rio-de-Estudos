# RedaçãoProEnem

Plataforma para professores do SESI-SP avaliarem redações de alunos no formato ENEM, inspirada na Letrus.

## Funcionalidades
- Upload de redações em PDF, DOC e imagens (com OCR)
- Detecção de uso de IA (ChatGPT e similares)
- Avaliação automática das competências do ENEM
- Interface elegante e responsiva
- Fácil hospedagem gratuita no Netlify

## Estrutura do Projeto
- `frontend/` — Aplicação React (interface do usuário)
- `backend/` — Funções serverless Node.js para processamento de arquivos, OCR e detecção de IA

## Como rodar localmente
1. Instale Node.js (versão recomendada: 18+)
2. Instale as dependências do frontend e backend:
   ```sh
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
3. Execute o frontend:
   ```sh
   cd frontend
   npm start
   ```
4. Execute o backend (local serverless):
   ```sh
   cd backend
   npm run dev
   ```

## Deploy no Netlify
- O frontend pode ser publicado diretamente no Netlify.
- As funções do backend podem ser hospedadas como funções serverless (Netlify Functions).

## Tecnologias
- React + Vite
- Node.js (Express para API, serverless)
- OCR: Tesseract.js
- Detecção de IA: Algoritmos heurísticos e integração com APIs
- Design: Material UI

## Licença
MIT
