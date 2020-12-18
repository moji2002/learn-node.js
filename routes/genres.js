const express = require('express');
const router = express.Router();
const log = require('../middlewares/logger');
const Genres = require('../models/genres');

const genres = [
    { id: 1, name: "comedy" },
    { id: 2, name: "family" },
    { id: 3, name: "horor" },
    { id: 4, name: "documentry" },
];

// middleware that is specific to this router
// router.use((req, res, next) => {
//     console.log('middleware', "time:", Date.now());
//     next();
// });

router.get('/', async (req, res) => {
    const result = await Genres.find();

    res.send({ result });
});

router.get('/:id', (req, res) => {
    const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("the genres with the given id not found");
    res.send(genre);
});

router.post('/', async (req, res) => {
    const { name } = req.body;

    try {
        const newGenre = await Genres.create({ name });
        res.send({ result: newGenre, msg: "hey" });
    } catch (error) {
        res.send({ result: error, msg: "hey" });
    }

});

module.exports = router;