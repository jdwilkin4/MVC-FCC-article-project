const express = require('express');
const router = express.Router();
const { coachSignup } = require('../controllers/user');

router.post('/signup', coachSignup)

module.exports = router