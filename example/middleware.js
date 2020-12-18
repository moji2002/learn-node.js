// middleware is a function that takes a request and either response to client or passes the control to another middleware function 
// In request processing pipeline we have one or multiple middleware functions

const express = require('express');
const app = express();

// simple custom middleware function 
app.use((req, res, next) => {
    console.log('logging...');
    next(); // pass the controll to the next middleware function
});

// middleware function calls in sequence
app.use((req, res, next) => {
    console.log('Authenticating...');
    next();
});

// We should put every middleware in a seprate module

app.get('/', (req, res) => {
    res.send('hello word');
});

// express.urlencoded({extended:true}) return a middleware that parses incoming request with url encoded payload
// express.static() return a middleware to serve static files 
app.use(express.static('public'));

// Third party middlewares =>
// Helmet for security
// Morgan for logging
// debug for debugging

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('listern', port);
});