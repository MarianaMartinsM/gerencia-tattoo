const connection = require('../database/connection');

exports.listarTatuadores = (req, res) => {
  const sql = 'SELECT * FROM tatuador';

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: 'Erro ao buscar tatuadores'
      });
    }

    res.status(200).json(results);
  });
};

exports.criarTatuador = (req, res) => {
  const {
    nome,
    email,
    senha,
    especialidade
  } = req.body;

  const sql = `
    INSERT INTO tatuador
    (nome, email, senha, especialidade)
    VALUES (?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [nome, email, senha, especialidade],
    (err, result) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          error: 'Erro ao criar tatuador'
        });
      }

      res.status(201).json({
        message: 'Tatuador criado com sucesso'
      });
    }
  );
};

exports.login = (req, res) => {
  const { email, senha } = req.body;

  const sql = `
    SELECT *
    FROM tatuador
    WHERE email = ? AND senha = ?
  `;

  connection.query(
    sql,
    [email, senha],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          error: 'Erro ao fazer login'
        });
      }

      if (results.length === 0) {
        return res.status(401).json({
          error: 'Email ou senha inválidos'
        });
      }

      res.status(200).json({
        message: 'Login realizado com sucesso',
        tatuador: results[0]
      });
    }
  );
};