const mongoose = require('mongoose');

const genresSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        unique: true,
    },
    time: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = new mongoose.model('genres', genresSchema);