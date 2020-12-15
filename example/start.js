const express = require('express');
const app = express();

app.use(express.json()); // Parse the body and add req.body


//get request
const courses = [
    { id: 1, name: "course-1" },
    { id: 2, name: "course-2" },
    { id: 3, name: "course-3" },
    { id: 4, name: "course-4" },
];

app.get('/api/courses', (req, res) => {
    res.send("courses");
});

//parameters
app.get('/api/courses/:id', (req, res) => {
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


// post request 
// by convention when we post an object to the server,
// when the server create new resourse we should return that object in the body of response
// maybe the client needs to know the id of new object or new resourse

// we should post somthing like this in the body of request
//    {"name":"new course"}
//
// As a security best practice  you should never trust what the client send you , you should always validate the input
// simple validation 
app.post('/api/courses', (req, res) => {
    if (!req.body.name)
        return res.status(400).send('Name is reqired.');
    if (req.body.name.length < 3)
        return res.status(400).send('Name should be minimum 3 characters.');

    const newCourse = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(newCourse);
    res.send({ newCourse, length: courses.length });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});