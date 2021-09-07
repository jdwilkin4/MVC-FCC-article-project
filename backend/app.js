require('dotenv').config();
const port = process.env.PORT || 8000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./controllers/user');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// need to setup mongo uri and check for connection

app.use('/', router);
app.use(cookieParser());
app.use(cors());


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});

