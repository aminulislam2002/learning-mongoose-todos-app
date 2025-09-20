const Todo = require("../models/todo.model"); // Import the Todo model

// Insert a new todo
const newTodo = async (req, res) => {
  const todoDocument = new Todo(req.body);
  await todoDocument
    .save()
    .then((result) => {
      return res.status(201).json({
        success: true,
        message: "New todo created successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "There was a server-side error",
        error: err.message || err,
      });
    });
};

module.exports = { newTodo };
