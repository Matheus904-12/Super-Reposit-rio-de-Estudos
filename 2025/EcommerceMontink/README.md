# Mini ERP Ecommerce

<p align="center">
  <img src="https://img.shields.io/badge/PHP-7.4%2B-blue?logo=php" />
  <img src="https://img.shields.io/badge/Responsivo-100%25-success?logo=apple" />
  <img src="https://img.shields.io/badge/UX-Apple--like-lightgrey?logo=apple" />
  <img src="https://img.shields.io/badge/DB-PostgreSQL%20%7C%20MySQL-blue" />
</p>

## 🚀 Sobre o Projeto

Este é um mini ERP desenvolvido para o teste técnico da Montink, totalmente em **PHP puro**, com banco de dados relacional, MVC, código limpo e visual moderno. O sistema cobre todos os requisitos do desafio e traz diferenciais de UX e responsividade.

---

## ✨ **Diferenciais**
- **Visual Apple-like:** UX premium, flat, minimalista, elegante e moderno.
- **100% Responsivo:** Perfeito em mobile, tablet, desktop e telas grandes.
- **Notificações animadas e feedback visual** (toast, blur, transições).
- **Controle de estoque por variação** (bônus do teste).
- **Carrinho com ajuste de quantidade e remoção de itens**.
- **Código limpo, MVC, fácil manutenção e sem overengineering.**
- **CSS centralizado** em `public/estilo.css` para fácil personalização.

---

## 🖥️ **Demonstração Visual**

> **Sugestão:** Adicione prints ou GIFs das principais telas aqui para impressionar o recrutador!

- Tela de produtos (cadastro, listagem, variações)
- Carrinho responsivo com ajuste de quantidade
- Finalização de pedido com ViaCEP
- CRUD de cupons
- Notificação de produto adicionado ao carrinho

---

## 🛠️ **Tecnologias Utilizadas**
- PHP 7.4+
- PostgreSQL (ou MySQL, fácil adaptação)
- Bootstrap 5 (CDN)
- HTML5, CSS3 (Apple-like, responsivo)
- JavaScript (toasts, AJAX, UX)

---

## ⚙️ **Instalação e Uso**

1. **Clone o repositório:**
   ```bash
   git clone <seu-repo-github> Ecommerce
   ```
2. **Crie o banco de dados no Supabase ou MySQL:**
   - Execute o script SQL abaixo:

```sql
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco NUMERIC(10,2) NOT NULL
);

CREATE TABLE estoque (
    id SERIAL PRIMARY KEY,
    produto_id INTEGER NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
    variacao VARCHAR(255),
    quantidade INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE cupons (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    valor_desconto NUMERIC(10,2) NOT NULL,
    valor_minimo NUMERIC(10,2) NOT NULL,
    validade DATE NOT NULL
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    data_pedido TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    subtotal NUMERIC(10,2) NOT NULL,
    frete NUMERIC(10,2) NOT NULL,
    total NUMERIC(10,2) NOT NULL,
    cupom_id INTEGER REFERENCES cupons(id),
    status VARCHAR(50) NOT NULL DEFAULT 'Pendente',
    nome_cliente VARCHAR(255) NOT NULL,
    email_cliente VARCHAR(255) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    endereco VARCHAR(255) NOT NULL
);

CREATE TABLE pedido_itens (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    produto_id INTEGER NOT NULL REFERENCES produtos(id),
    variacao VARCHAR(255),
    quantidade INTEGER NOT NULL,
    preco_unitario NUMERIC(10,2) NOT NULL
);
```

3. **Configure o acesso ao banco:**
   - Edite o arquivo `config/config.php` com os dados do Supabase ou MySQL:
```php
return [
    'host' => 'SEU_HOST_SUPABASE',
    'usuario' => 'postgres',
    'senha' => 'SUA_SENHA',
    'banco' => 'postgres',
    'porta' => 5432
];
```

4. **Acesse o sistema:**
   - Coloque o projeto em seu servidor web e acesse pelo navegador.

---

## 🧩 **Funcionalidades**
- Cadastro, edição e listagem de produtos (com variações e estoque)
- Carrinho de compras com ajuste de quantidade, remoção e controle de estoque
- Cálculo de frete conforme regras do teste
- Integração com ViaCEP para endereço
- CRUD de cupons e aplicação no carrinho/pedido
- Finalização do pedido, salvando tudo no banco
- Envio de e-mail de confirmação para o cliente
- Webhook para atualização/cancelamento de pedidos

---

## 🎨 **Design e Responsividade**
- Visual Apple-like, flat, minimalista e elegante
- 100% responsivo: mobile, tablet, desktop, ultrawide
- Botões, inputs, tabelas e containers harmônicos
- Notificações animadas e blur
- CSS centralizado em `public/estilo.css` para fácil customização

---

## 🔗 **Webhook**
- **Endpoint:** `/webhook/receber`
- **Método:** POST
- **Payload exemplo:**
```json
{
  "id": 1,
  "status": "cancelado"
}
```
- Se status for `cancelado`, o pedido é removido. Para outros status, apenas atualiza o campo `status`.

---

## 🧪 **Testes Sugeridos**
- Cadastre produtos e variações.
- Cadastre cupons.
- Adicione produtos ao carrinho, aplique cupons, finalize pedidos.
- Teste o envio de e-mail (pode usar Mailtrap para ambiente de testes).
- Teste o webhook com Postman ou Insomnia.
- Teste em diferentes dispositivos e tamanhos de tela para ver a responsividade.

---

## 💡 **Dicas para o Recrutador**
- O sistema cobre todos os requisitos obrigatórios e bônus do teste.
- O visual é moderno, responsivo e agradável (diferencial!).
- O código é limpo, organizado e fácil de manter.
- O sistema é seguro, prático e pronto para produção/teste.
- Fácil de migrar para CodeIgniter 3 ou Laravel se desejado.

---

## 📸 **Prints Sugeridos**
> Adicione aqui prints ou GIFs das principais telas para valorizar ainda mais sua entrega!

---

## 📬 **Contato**
Dúvidas ou sugestões? Abra uma issue ou entre em contato! 