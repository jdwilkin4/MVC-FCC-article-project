require('dotenv').config();
const port = process.env.PORT || 8000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoUri = process.env.MONGO_URI;
const users = require('./routes/user');
const cookieParser = require('cookie-parser');
const cors = require('cors');

mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true });

// check for proper connection
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error: '));
database.once('open', () => {
    console.log('mongo database connected')
});


//middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());

//routes
app.use(users);


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});

