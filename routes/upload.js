const express = require('express');
const auth = require('../middlewares/auth');
const error = require('../middlewares/error');
const router = express.Router();
const uploadImage = require('../middlewares/multer');
const User = require('../models/user');

router.post('/', auth, uploadImage, async (req, res) => {
    if (!req.file) return res.status(400).send({ error: 'You must provide an image' });
    const { buffer } = req.file;
    const { name } = req.body;
    try {
        const user = await User.create({ name, avatar: buffer });
        res.status(201).send({ message: "User Created", name: user.name });

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}, error);

module.exports = router;