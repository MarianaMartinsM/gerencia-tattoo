const connection = require('../database/connection');

exports.listarTatuagens = (req, res) => {
  const sql = 'SELECT * FROM tatuagem';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        error: 'Erro ao buscar tatuagens'
      });
    }

    res.status(200).json(results);
  });
};

exports.criarTatuagem = (req, res) => {
  const {
    titulo,
    descricao,
    preco_base,
    estilo,
    tatuador_id
  } = req.body;

  const imagem_url = req.file
    ? req.file.filename
    : null;

  const sql = `
    INSERT INTO tatuagem
    (
      titulo,
      descricao,
      preco_base,
      estilo,
      imagem_url,
      tatuador_id
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [
      titulo,
      descricao,
      preco_base,
      estilo,
      imagem_url,
      tatuador_id
    ],
    (err, result) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          error: 'Erro ao criar tatuagem'
        });
      }

      res.status(201).json({
        message: 'Tatuagem criada com sucesso',
        id: result.insertId
      });
    }
  );
};

exports.deletarTatuagem = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM tatuagem WHERE id = ?';

  connection.query(sql, [id], (err) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        error: 'Erro ao deletar tatuagem'
      });
    }

    res.status(200).json({
      message: 'Tatuagem deletada com sucesso'
    });
  });
};