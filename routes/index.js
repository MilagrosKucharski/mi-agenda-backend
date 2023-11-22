const express = require('express');
const router = express.Router();

// Rutas de autenticación
router.use('/auth', require('../controllers/authController'));

// Rutas protegidas que requieren autenticación
router.use('/personas', require('../controllers/personasController'));
router.use('/empresas', require('../controllers/empresasController'));

module.exports = router;
