const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

const courses = [
    { id: 1, name: "course-1" },
    { id: 2, name: "course-2" },
    { id: 3, name: "course-3" },
    { id: 4, name: "course-4" },
];

// validation with joi
app.post('/api/courses', (req, res) => {
    // for start with joi first we need to define a schema ,it defines the shape of object
    const courseSchema = Joi.object({
        name: Joi.string().min(3).required(),
        author: Joi.string().min(3).required()
    });

    // we can validate the body with this method
    const validationResult = courseSchema.validate(req.body);
    if (validationResult.error) return res.status(400).send(validationResult.error.details[0].message);

    const newCourse = {
        id: courses.length + 1,
        name: req.body.name,
        author: req.body.author
    };

    courses.push(newCourse);
    res.send({ newCourse, length: courses.length });
});

app.put('/api/courses/:id', (req, res) => {
    // Look up the course with the given id
    // If not existing, return 404 ,means not found
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send('The course with the given ID was not found!');

    // If founded we should validate
    // If invalid we should return 400 ,means Bad request
    const courseSchema = Joi.object({
        name: Joi.string().min(3).required(),
        author: Joi.string().min(3).required()
    });

    const validationResult = courseSchema.validate(req.body);
    if (validationResult.error)
        return res.status(400).send(validationResult.error.details[0].message);

    // If it is valid we should update the course 
    course.name = req.body.name;
    course.author = req.body.author;

    // Then return updated course to client
    res.send(course);
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});