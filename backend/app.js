require('dotenv').config();
const port = process.env.PORT || 8000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// need to setup mongo uri and check for connection

app.get('/', (req, res) => {
    res.send("This is the homepage!!!!!!!")
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});

