const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        // unique: true,
    },
    avatar: {
        type: Buffer
    },

});
// first argument shoud be singular
module.exports = new mongoose.model('User', schema);