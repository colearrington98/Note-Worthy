const router = require('express').Router(); // This is a built-in Node module that allows us to work with file paths
const store = require('../db/store');

router.get('/notes', (req, res) => { 
    store
        .getNotes()
        .then((notes) => {
            return res.json(notes);
        })
        .catch((err) => res.status(500).json(err));})

router.post('/notes', (req, res) => { 
    store
        .addNotes(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
});

router.delete('/notes/:id', (req, res) => { 
    store
        .removeNotes(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch((err) => res.status(500).json(err));
}
);

module.exports = router;