const mongoose = require('mongoose');

const genresSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    tags: [String], // array of strings
    isPublished: Boolean
});
// first argument shoud be singular
module.exports = new mongoose.model('Genre', genresSchema);