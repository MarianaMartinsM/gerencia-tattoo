const express = require('express');
const router = express.Router();
const tatuagemController = require('../controllers/tatuagem.controller');

router.get('/', tatuagemController.listarTatuagens);
router.post('/', tatuagemController.criarTatuagem);
router.delete('/:id', tatuagemController.deletarTatuagem);

module.exports = router;