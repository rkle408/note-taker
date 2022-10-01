const path = require('path');
const router = require('express').Router();

// Will lead to the notes
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

// * just in case user types anything else in, it will lead to the index.html
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

module.exports = router;