const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const data = require('../data/data');

// Rutas protegidas que requieren autenticación

// Ingresar empresas
router.post('/', authenticateToken, (req, res) => {
  const nuevaEmpresa = req.body;

  // Verificar si ya existe una empresa con el mismo ID
  const empresaExistente = data.empresas.find(empresa => empresa.id === nuevaEmpresa.id);
  if (empresaExistente) {
    return res.status(400).json({ message: 'Ya existe una empresa con el mismo ID' });
  }

  data.empresas.push(nuevaEmpresa);
  res.json({ message: 'Empresa agregada correctamente' });
});

// Eliminar empresas (solo si no tiene personas asociadas)
router.delete('/:id', authenticateToken, (req, res) => {
  const id = req.params.id;

  // Verificar si existe una empresa con el ID proporcionado
  const empresaExistente = data.empresas.find(empresa => empresa.id === id);
  if (!empresaExistente) {
    return res.status(404).json({ message: 'No existe una empresa con el ID proporcionado' });
  }

  // Verificar si la empresa tiene personas asociadas
  const empresaConPersonas = data.personas.some(persona => persona.empresa === id);
  if (empresaConPersonas) {
    return res.status(400).json({ message: 'No se puede eliminar la empresa porque tiene personas asociadas' });
  }

  data.empresas = data.empresas.filter(empresa => empresa.id !== id);
  res.json({ message: 'Empresa eliminada correctamente' });
});

// Listar todas las empresas de la agenda
router.get('/', authenticateToken, (req, res) => {
  res.json(data.empresas);
});

// Ver los datos de una empresa específica por su ID
router.get('/:id', authenticateToken, (req, res) => {
    const id = req.params.id;
    const empresa = data.empresas.find(empresa => empresa.id === id);
  
    if (!empresa) {
      return res.status(404).json({ message: 'No existe una empresa con el ID proporcionado' });
    }
  
    res.json(empresa);
  });

module.exports = router;
