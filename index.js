const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const courses = [
    { id: 1, name: "course-1" },
    { id: 2, name: "course-2" },
    { id: 3, name: "course-3" },
    { id: 4, name: "course-4" },
];

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/courses', (req, res) => {
    res.send("courses");
});

//parameters
app.get('/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) res.status(404)
        .send('The course with the given ID was not found!');
    res.send(course);
});

//multiple parameters  => for require values
app.get('/blog/:year/:month', (req, res) => {
    res.send(req.params);
});

//query data parameters  => for optional values => for example => http://localhost:3000/query?sort=name
app.get('/query', (req, res) => {
    res.send(req.query);
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});