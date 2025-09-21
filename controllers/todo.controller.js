const mongoose = require("mongoose");
const Todo = require("../models/todo.model"); // Import the Todo model

// Get all todos
const getAllTodos = async (req, res) => {
  try {
    const data = await Todo.find();
    return res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "There was a server-side error",
      error: error.message || error,
    });
  }
};

// Get a todo by ID
const getTodoById = async (req, res) => {
  const id = req?.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid id format" });
  }

  try {
    const query = { _id: id };
    const data = await Todo.findOne(query);
    return res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "There was a server-side error",
      error: error.message || error,
    });
  }
};

// Insert a new todo
const newTodo = async (req, res) => {
  const todo = req?.body;

  try {
    const data = new Todo(todo);
    await data.save();

    return res.status(201).json({
      success: true,
      message: "New todo created successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "There was a server-side error",
      error: error.message || error,
    });
  }
};

// Update a todo by ID
const updateTodoById = async (req, res) => {
  const id = req?.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid id format" });
  }

  try {
    const query = { _id: id };

    const result = await Todo.findByIdAndUpdate(
      query,
      {
        $set: req?.body,
      },
      { new: true, runValidators: true, context: "query" }
    );
    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "There was a server-side error",
      error: error.message || error,
    });
  }
};

// Delete a todo by ID
const deleteTodoById = async (req, res) => {
  const id = req?.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid id format" });
  }

  try {
    const query = { _id: id };
    const result = await Todo.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "There was a server-side error",
      error: error.message || error,
    });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  newTodo,
  updateTodoById,
  deleteTodoById,
};
