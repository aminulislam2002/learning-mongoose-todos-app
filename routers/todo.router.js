const express = require("express");
const router = express.Router();
const Todo = require("../models/todo.model"); // Import the Todo model
const { newTodo, updateTodoById } = require("../controllers/todo.controller");

// Define routes for /todo

// Insert a new todo
router.post("/", newTodo);

// Update a todo by ID
router.put("/:id", updateTodoById);

module.exports = router;
