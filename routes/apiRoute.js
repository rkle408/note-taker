// Need to have parentheses after Router, otherwise the whole thing breaks
const router = require('express').Router();
const store = require('../db/store');

// List of previous notes
router.get('/notes', (req, res) => {
    store.getNotes().then((notes) => {
        return res.json(notes)
    }).catch((err) => res.status(500).json(err))
});

// Can add your own new notes
router.post('/notes', (req, res) => {
    store.addNote(req.body).then((note) => res.json(note))
    .catch((err) => res.status(500).json(err))
});

// Able to delete old notes
router.delete('/notes/:id', (req, res) => {
    store.removeNote(req.params.id).then(() => res.json({ ok: true}))
    .catch((err) => res.status(500).json(err))
})

module.exports = router;