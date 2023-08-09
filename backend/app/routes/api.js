const express = require('express');
const router = express.Router();

const noteActions = require('../actions/api/noteActions');
  
//pobieranie wszystkich notatek
router.get('/notes', noteActions.getAllNotes);
//pobieranie notatki
router.get('/notes/:id', noteActions.getNote);
//zapisaywanie notatek
router.post('/notes', noteActions.saveNote);
//edytowanie notatek
router.put('/notes/:id', noteActions.updateNote);
//usuwanie notatki
router.delete('/notes/:id', noteActions.deleteNote);
//usuwanie wszystkich notatek
router.delete('/notes/', noteActions.deleteNotes);

module.exports = router;