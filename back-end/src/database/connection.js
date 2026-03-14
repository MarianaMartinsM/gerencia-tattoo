const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'vanessa',
  password: '123456',
  database: 'mydb'
});

connection.connect(err => {
  if (err) {
    console.error('❌ Erro ao conectar no MySQL:', err.message);
    return;
  }
  console.log('✅ Conectado ao MySQL com sucesso!');
});

module.exports = connection;
