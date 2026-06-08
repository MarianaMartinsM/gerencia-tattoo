const express = require('express');
const router = express.Router();

const tatuadorController = require('../controllers/tatuador.controller');

router.get('/', tatuadorController.listarTatuadores);

router.post('/cadastro', tatuadorController.criarTatuador);

router.post('/login', tatuadorController.login);

module.exports = router;