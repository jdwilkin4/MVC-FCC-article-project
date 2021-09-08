require('dotenv').config();
const port = process.env.PORT || 8000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/user');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// need to setup mongo uri and check for connection
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
    console.log("database connected")
}

app.use('/', router);
app.use(cookieParser());
app.use(cors());


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});

