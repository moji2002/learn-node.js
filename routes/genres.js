const express = require("express");
const router = express.Router();
const log = require("../middlewares/logger");
// models should be in Pascal naming convention
const Genre = require("../models/genre");

// middleware that is specific to this router
// router.use((req, res, next) => {
//     console.log('middleware', "time:", Date.now());
//     next();
// });

router.get("/", async (req, res) => {
  const result = await Genre.find();


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
  // first arqument is query selector and the secound is update object
  // const course = await course.update({ _id: id });
  // we can use some generic property to update multiple document in on go 
  const result = await course.update({ isPublished: false }, {
    // search for mongodb update operators
    // we dont need to save it
    // we be return the result 
    $set: {
      author: "david",
      isPublished: false
    }
  });
  /*
    const course = await course.findByIdAndUpdate(id, {
      // we be return the document before the update operation
      // if you pass { new:true } as third argument you will get the updated document
  
      $set: {
        author: 'jack',
        isPublished: true
      }
    });
  */
  // ==================================
  // remove a Document
  /*
  const result = Course.deleteOne({ _id });
  const result = Course.deleteMany({ isPublished });
  const course = Course.findByIdAndRemove(id);
*/
  const genres = await Genre
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
    const newGenre = await Genre.create({ name, category, isPublished });
    res.send({ result: newGenre, message: "hey" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
