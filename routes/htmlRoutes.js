const path = require('path'); // This is a built-in Node module that allows us to work with file paths
const router = require('express').Router(); 

// This is the route that will be used to display the notes.html page
router.get ('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// This is the route that will be used to display the index.html page
router.get ('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
}
);

module.exports = router;
