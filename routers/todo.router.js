const express = require("express");
const router = express.Router();
const Todo = require("../models/todo.model"); // Import the Todo model
const {
  newTodo,
  updateTodoById,
  deleteTodoById,
} = require("../controllers/todo.controller");

// Define routes for /todo

// Insert a new todo
router.post("/", newTodo);

// Update a todo by ID
router.put("/:id", updateTodoById);

// Delete a todo by ID
router.delete("/:id", deleteTodoById);

module.exports = router;
