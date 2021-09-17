const express = require('express');
const router = express.Router();
const { tbTests } = require('../controllers/tb-tests');

router.post('/tbtests', tbTests)

module.exports = router;