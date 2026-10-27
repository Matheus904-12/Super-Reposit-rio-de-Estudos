# Painel de Gastos Mensais

## Descrição
Sistema para controle de despesas mensais domésticas, com lembretes automáticos via Google Calendar, gráficos, exportação e interface intuitiva.

## Tecnologias
- Vue.js
- Node.js (backend simples para integração Google Calendar)
- Jest (testes)

## Funcionalidades
- Cadastro, edição e exclusão de gastos
- Gráficos por categoria
- Lembretes automáticos no Google Calendar
- Exportação de relatórios
- Testes unitários

## Instalação
```bash
npm install
npm run serve
```

## Testes
```bash
npm run test
```

## Documentação
Todo o código é comentado e cada função explicada. Veja os arquivos `src/` para detalhes.

---

# Estrutura Inicial
- src/
  - components/
  - views/
  - services/
  - tests/
- public/
- package.json
- README.md

---

# Como funciona a integração com Google Calendar?
O sistema utiliza a API do Google Calendar para criar lembretes automáticos dos gastos cadastrados. Basta conectar sua conta Google na primeira utilização.

---

# Contato
Dúvidas? Veja os comentários no código ou entre em contato pelo LinkedIn.
