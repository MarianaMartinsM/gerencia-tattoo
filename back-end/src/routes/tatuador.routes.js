const express = require('express');
const router = express.Router();

const tatuadorController = require('../controllers/tatuador.controller');

router.get('/', tatuadorController.listarTatuadores);

module.exports = router;
