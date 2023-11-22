const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const data = require('../data/data');

// Rutas protegidas que requieren autenticación

// Ingresar personas
router.post('/', authenticateToken, (req, res) => {
  const nuevaPersona = req.body;

  // Verificar si la empresa asociada existe
  const empresaAsociada = data.empresas.find(empresa => empresa.id === nuevaPersona.empresa);
  if (!empresaAsociada) {
    return res.status(400).json({ message: 'La empresa asociada no existe' });
  }

  // Verificar si ya existe una persona con el mismo ID
  const personaExistente = data.personas.find(persona => persona.id === nuevaPersona.id);
  if (personaExistente) {
    return res.status(400).json({ message: 'Ya existe una persona con el mismo ID' });
  }

  data.personas.push(nuevaPersona);
  res.json({ message: 'Persona agregada correctamente' });
});

// Eliminar personas
router.delete('/:id', authenticateToken, (req, res) => {
  const id = req.params.id;

  // Verificar si existe una persona con el ID proporcionado
  const personaExistente = data.personas.find(persona => persona.id === id);
  if (!personaExistente) {
    return res.status(404).json({ message: 'No existe una persona con el ID proporcionado' });
  }

  data.personas = data.personas.filter(persona => persona.id !== id);
  res.json({ message: 'Persona eliminada correctamente' });
});

// Buscar personas por nombre y apellido
router.get('/buscar', authenticateToken, (req, res) => {
    const { nombre, apellido } = req.query;
    const resultado = data.personas.filter(persona => persona.nombre === nombre && persona.apellido === apellido);
  
    if (resultado.length === 0) {
      return res.status(404).json({ message: 'No se encontraron personas con los criterios proporcionados' });
    }
  
    res.json(resultado);
});

// Listar todas las personas de la agenda
router.get('/', authenticateToken, (req, res) => {
  res.json(data.personas);
});

module.exports = router;
