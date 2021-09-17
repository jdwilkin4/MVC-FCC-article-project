const express = require('express');
const router = express.Router();
const { backgroundChecks } = require('../controllers/background-checks');

router.post('/backgroundchecks', backgroundChecks)

module.exports = router;