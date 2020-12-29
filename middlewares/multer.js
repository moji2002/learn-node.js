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

        // filter using array
        // const validTypes = ["image/jpeg", "jpg", "image/png", "png"];
        // const isTypeValid = validTypes.find(type => type === file.mimetype);

        // filter using regex
        const validTypes = /(jpg|png|image\/png|image\/jpeg)/;
        const isTypeValid = validTypes.test(file.mimetype);
        if (!isTypeValid) callback(new Error("File must be a JPG or PNG"));

        return callback(null, true);
    }
});


module.exports = uploadImage;