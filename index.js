const express = require('express');
const logger = require('./src/logger')
const app = express();
const bodyParser = express.json();

// use "config" npm module to manage configuration in different env

app.use(bodyParser)
// use custom middleware
app.use(logger)

const genres = [
    { id: 1, name: "comedy" },
    { id: 2, name: "family" },
    { id: 3, name: "horor" },
    { id: 4, name: "documentry" },
];

// get env
const env = app.get('env')
console.log(env);

// middle ware to serve public files
app.use(express.static('public'))

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("the genres with the given id not found");
    res.send(genre);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('listern', port);
});