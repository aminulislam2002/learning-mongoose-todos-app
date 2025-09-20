const express = require("express");
const router = express.Router();
const Todo = require("../models/todo.model"); // Import the Todo model
const { newTodo } = require("../controllers/todo.controller");

// Define routes for /todo

// Insert a new todo
router.post("/", newTodo);

module.exports = router;
