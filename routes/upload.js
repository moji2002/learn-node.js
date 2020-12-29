const express = require('express');
const error = require('../middlewares/error');
const router = express.Router();
const uploadImage = require('../middlewares/multer');

router.post('/', uploadImage.single('upload'), (req, res) => {
    res.send(req.body);
}, error);

module.exports = router;