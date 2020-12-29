const express = require('express');
const router = express.Router();
const multer = require('multer');

const megaByte = mb => mb * 1000000;
const uploadImage = multer({
    dest: 'images',
    limits: {
        fileSize: megaByte(2)
    },
    fileFilter(req, file, callback) {
        // callback(new Error("File must be a image")); // reject with error
        // callback(null, true); // Accept the file without error
        // callback(null, false); // Reject the file without error

        const validTypes = ["image/jpeg", "jpg", "image/png", "png"];
        const isTypeValid = validTypes.find(type => type === file.mimetype);
        if (!isTypeValid) callback(new Error("File must be a JPG or PNG"));

        return callback(null, true);
    }
});

router.post('/', uploadImage.single('upload'), (req, res) => {
    res.send(req.body);
});

module.exports = router;