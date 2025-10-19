const express = require('express')
const { createNotes, getNotes, deleteNote, updateNote  } = require('../controllers/noteController')
const router = express.Router()



router.get('/', getNotes)

router.post('/', createNotes)
router.delete('/:id' , deleteNote)
router.put('/:id' , updateNote)

module.exports = router