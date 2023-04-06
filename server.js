const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Tells node that we are creating an "express" server
const PORT = process.env.PORT || 3001; // This is the port that the server will listen to
const app = express(); // This is the actual server

// This is the middleware that will allow us to parse JSON and string or array data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// This is the code that starts the server on the port defined above
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
    });

