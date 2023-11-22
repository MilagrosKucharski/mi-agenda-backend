const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Ejemplo de datos (simulando una base de datos en memoria)
let personas = [];
let empresas = [];

// Rutas
app.use('/api', require('./routes'));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
