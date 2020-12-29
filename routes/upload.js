const express = require('express');
const router = express.Router();
const uploadImage = require('../middlewares/multer')

router.post('/', uploadImage.single('upload'), (req, res) => {
    res.send(req.body);
});

module.exports = router;