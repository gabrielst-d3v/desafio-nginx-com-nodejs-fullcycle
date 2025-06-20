const express = require('express');
const mysql = require('mysql');

const config = {
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'nodedb'
};

const connection = mysql.createConnection(config);

const createTable = `
  CREATE TABLE IF NOT EXISTS people (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    PRIMARY KEY (id)
  )
`;

connection.query(createTable);

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const name = 'Full Cycle User ' + Math.floor(Math.random() * 1000);
  connection.query(`INSERT INTO people(name) VALUES(?)`, [name], (err) => {
    if (err) throw err;

    connection.query('SELECT name FROM people', (err, results) => {
      if (err) throw err;

      let list = '<ul>';
      results.forEach(row => {
        list += `<li>${row.name}</li>`;
      });
      list += '</ul>';

      res.send(`<h1>Full Cycle Rocks!</h1>${list}`);
    });
  });
});

app.listen(port, () => {
  console.log('Rodando na porta ' + port);
});