

const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personaController');

// CRUD
router.post('/persona', personaController.createPersona);
router.get('/personas', personaController.getPersonas);
router.get('/persona/:id', personaController.getPersonaById);
router.put('/persona/:id', personaController.updatePersona);
router.delete('/persona/:id', personaController.deletePersona);

module.exports = router;
