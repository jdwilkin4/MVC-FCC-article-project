const express = require('express');
const router = express.Router();
const { covidTests } = require('../controllers/covid-tests');

router.post('/covidtests', covidTests)

module.exports = router;