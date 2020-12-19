const express = require("express");
const router = express.Router();
const log = require("../middlewares/logger");
// models should be in Pascal naming convention
const Genres = require("../models/genres");

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

router.get("/", async (req, res) => {
  const result = await Genres.find();

  res.send({ result });
});

router.get("/:id", async (req, res) => {
  // Comparison Query Operators
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // in
  // nin (not in)

  // logical operators
  // or
  // and

  // Regular Expressions (more control over strings)
  // /^john/ starts with john
  // /john$/ ends with john
  // /john$/i append an (i) to the end to make it case insensitive
  // /.*john.*/i contains john

  // ==================================
  // Updating a Document

  // Approach: Query First
  // findById()
  // Modify its properties
  // save()

  const course = await course.findById(id);
  if (!course) return;
  course.isPublished = true;
  course.author = "another author";
  //or use set method
  course.set({
    isPublished: true,
    author: "another",
  });

  course.save();

  // Approach : Update first
  // Update directly
  // Optionally: get the updated document

  const genres = await Genres
    // .find({author:"john"})
    // .find({ price: { $gt: 10 } }) // find all documents that their price is higher than 10
    // .find({ price: { $in: [10, 20, 15] } }) // find all documents that their price 10,20,15
    .find()
    // .or([{ author: "john" }, { isPublished: true }]) // get all documents that matches logical operator
    // .and([])
    // .find({author:/^john/}) // all documents that starts with john
    // .find({ author: /john$/ }) // all documents that ends with john
    // .skip((pageNumber - 1) * pageSize) // use this method for pagination
    // .limit(pageSize)
    // .sort({ name: 1 })
    // .sort({ name: -1 })
    // .select({ name: 1, tags: 1 })
    // .sort("name") another aproach
    // .sort("-name") another aproach
    // .select("name author") another aproach
    .count(); // will only return the counts of documents
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { name, category, isPublished } = req.body;
  try {
    const newGenre = await Genres.create({ name, category, isPublished });
    res.send({ result: newGenre, msg: "hey" });
  } catch (error) {
    res.status(400).send({ result: error.message });
  }
});

module.exports = router;
