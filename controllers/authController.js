const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = 'secreto'; // Reemplaza 'tu_secreto' con una clave secreta más segura
const { users } = require('../data/data');

// Ruta para autenticarse y obtener un token
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Busca al usuario en la lista (simulado, en un entorno real usarías una base de datos)
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Genera un token JWT válido por 1 hora
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

module.exports = router;
