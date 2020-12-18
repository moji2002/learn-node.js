const mongoose = require('mongoose');

const genresSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        unique: true,
    },
    category: {
        required: true,
        type: String,
        enum: ["web", "mobile", "network"]
    },
    date: {
        type: Date,
        default: Date.now()
    },
    price: {
        type: Number,
        required: function () { return this.isPublished; }
    },
    tags: [String], // array of strings
    isPublished: {
        type: Boolean,
        default: false
    }
});
// first argument shoud be singular
module.exports = new mongoose.model('Genre', genresSchema);