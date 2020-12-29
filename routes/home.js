const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({ message: 'hello world' });
});

module.exports = router;