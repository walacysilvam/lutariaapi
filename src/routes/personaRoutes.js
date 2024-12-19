

const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personaController');

// CRUD - PERSONA: basico
router.post('/persona', personaController.createPersona);            // criar personagem
router.get('/personas', personaController.getPersonas);              // listar personagens
router.get('/gtpersona/:id', personaController.getPersonaById);      // listar personagem por id
router.put('/uppersona/:id', personaController.updatePersona);       // atualizar personagem
router.delete('/dlpersona/:id', personaController.deletePersona);    // deletar personagem

module.exports = router;
