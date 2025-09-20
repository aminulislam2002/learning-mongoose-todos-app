const express = require("express");
const router = express.Router();
const Todo = require("../models/todo.model"); // Import the Todo model

// Define routes for /todo

// Insert a new todo
router.post("/", async (req, res) => {
  console.log(req.body);
  const newTodo = new Todo(req.body);

  await newTodo
    .save()
    .then((result) => {
      res
        .status(201)
        .json({ message: "Todo created successfully", todo: result });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "There was a server side error!", error: err });
    });
});

module.exports = router;
