const express = require('express');
const router = express.Router();

const tatuagemController = require('../controllers/tatuagem.controller');
const upload = require('../uploads');

router.get(
  '/',
  tatuagemController.listarTatuagens
);

router.post(
  '/',
  upload.single('imagem'),
  tatuagemController.criarTatuagem
);

router.delete(
  '/:id',
  tatuagemController.deletarTatuagem
);

module.exports = router;