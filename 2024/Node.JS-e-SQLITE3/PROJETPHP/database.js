const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:'); 

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    stock INTEGER
  )`);

  
  db.run("INSERT INTO products (name, price, stock) VALUES ('Cabo USB-A 3.0', 7.0, 100)");
  db.run("INSERT INTO products (name, price, stock) VALUES ('Torre de Tomada 5', 20.0, 50)");
  db.run("INSERT INTO products (name, price, stock) VALUES ('Cabo HDMI', 15.0, 30)");
  db.run("INSERT INTO products (name, price, stock) VALUES ('Câmera de Segurança FullHD+', 80.0, 50)");
  db.run("INSERT INTO products (name, price, stock) VALUES ('PenDrive 1TB', 25.0, 50)");
});

module.exports = db;
