const express = require('express');
const logger = require('./middlewares/logger');
const app = express();
const bodyParser = express.json();
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const home = require('./routes/home');
const genres = require('./routes/genres');
// use "config" npm module to manage configuration in different env
// use "debug" npm module to manage debug logs

app.use(bodyParser);
// use custom middleware
app.use(logger);

// middleware to serve public files
app.use(express.static('public'));

// Routes
app.use('/', home);
app.use('/api/genres', genres);

// get env
const env = app.get('env');
console.log(env);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('listern', port);
});