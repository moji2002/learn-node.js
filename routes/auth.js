const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const jwtPrivateKey = "your-256-bit-secret"; // should be stored in env variable

router.post('/', (req, res) => {
    const token = jwt.sign({ name: req.body.name, id: "65489765" }, jwtPrivateKey);
    res.header('x-auth-token', token)
        .send({ message: 'key generated' });
});

module.exports = router;