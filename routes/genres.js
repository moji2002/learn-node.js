const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: "comedy" },
    { id: 2, name: "family" },
    { id: 3, name: "horor" },
    { id: 4, name: "documentry" },
];

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('time', Date.now());
    next();
});

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("the genres with the given id not found");
    res.send(genre);
});

module.exports = router;