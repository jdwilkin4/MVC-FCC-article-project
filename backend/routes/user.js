const express = require('express');
const router = express.Router();
const { coachSignup } = require('../controllers/user');
const Coach = require('../models/coach');

router.post('/signup', coachSignup)
router.get('/signup', (req, res) => {
    Coach.find((err, data) => {
        err ? console.log(`Error loading data: ${err}`) : res.json(data)
    })
})
module.exports = router