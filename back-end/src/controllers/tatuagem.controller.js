const connection = require('../database/connection');

exports.listarTatuagens = (req, res) => {
  connection.query('SELECT * FROM tatuagem', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar tatuagens' });
    }
    res.json(results);
  });
};

exports.deletarTatuagem = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM tatuagem WHERE id = ?';

  connection.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar tatuagem' });
    }

    res.json({ message: 'Tatuagem deletada com sucesso' });
  });
};
exports.criarTatuagem = (req, res) => {
  const { titulo, descricao, preco_base, estilo, tatuador_id } = req.body;

  const sql = `
    INSERT INTO tatuagem (titulo, descricao, preco_base, estilo, tatuador_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [titulo, descricao, preco_base, estilo, tatuador_id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao criar tatuagem' });
      }

      res.status(201).json({
        message: 'Tatuagem criada com sucesso',
        id: result.insertId
      });
    }
  );
};
