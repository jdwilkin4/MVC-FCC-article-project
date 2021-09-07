const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('created new API')
});

module.exports = router