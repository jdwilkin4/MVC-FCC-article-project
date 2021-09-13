const express = require('express');
const router = express.Router();
const { applications } = require('../controllers/applications');

router.post('/applications', applications)

module.exports = router;