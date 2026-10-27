const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');

const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.render('index', { products: rows });
    }
  });
});

app.post('/products', (req, res) => {
  const { name, price, stock } = req.body;
  db.run("INSERT INTO products (name, price, stock) VALUES (?, ?, ?)", [name, price, stock], (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.redirect('/');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
