const express = require('express');
const logger = require('./middlewares/logger');
const app = express();
const bodyParser = express.json();

const home = require('./routes/home');
const genres = require('./routes/genres');
// use "config" npm module to manage configuration in different env
// use "debug" npm module to manage debug logs

app.use(bodyParser);
// use custom middleware
app.use(logger);

// middle ware to serve public files
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