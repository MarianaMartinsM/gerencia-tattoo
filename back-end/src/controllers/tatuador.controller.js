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
