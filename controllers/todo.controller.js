const Todo = require("../models/todo.model"); // Import the Todo model

// Get all todos
const getAllTodos = async (req, res) => {
  await Todo.find()
    .then((data) => {
      return res.status(200).json({
        success: true,
        message: "Todos fetched successfully",
        data,
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

// Insert a new todo
const newTodo = async (req, res) => {
  await new Todo(req.body)
    .save()
    .then(() => {
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

// Update a todo by ID
const updateTodoById = async (req, res) => {
  const query = { _id: req?.params.id };

  await Todo.updateOne(
    query,
    {
      $set: req?.body,
    },
    { new: true, runValidators: true }
  )
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Todo updated successfully",
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

// Delete a todo by ID
const deleteTodoById = async (req, res) => {
  const query = { _id: req?.params.id };

  await Todo.deleteOne(query)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Todo deleted successfully",
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

module.exports = { getAllTodos, newTodo, updateTodoById, deleteTodoById };
