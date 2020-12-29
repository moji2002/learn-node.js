const express = require('express');
const logger = require('./middlewares/logger');
const app = express();
// const bodyParser = ;
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/myapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('connected to db'))
    .catch(err => console.log('could not connect to MongoDB'));


const homeRoute = require('./routes/home');
const genresRoute = require('./routes/genres');
const authRoute = require('./routes/auth');
const uploadRoute = require('./routes/upload');
// use "config" npm module to manage configuration in different env
// use "debug" npm module to manage debug logs

app.use(express.json());
// use custom middleware
app.use(logger);

// middleware to serve public files
// app.use(express.static('public'));

// Routes
app.use('/', homeRoute);
app.use('/api/genres', genresRoute);
app.use('/api/auth', authRoute);
app.use('/api/upload', uploadRoute);

// get env
const env = app.get('env');
console.log(env);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('listern', port);
});