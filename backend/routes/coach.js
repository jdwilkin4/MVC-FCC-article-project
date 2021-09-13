const express = require('express');
const router = express.Router();
const Coach = require('../models/coach');

router.get('/coaches', (req, res) => {
    Coach.find((err, data) => {
        err ? console.log(`Error loading data: ${err}`) : res.json(data)
    })
})
module.exports = router