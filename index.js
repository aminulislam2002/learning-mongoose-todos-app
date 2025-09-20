const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ quiet: true });
const app = express();
const port = process.env.PORT || 5000;

// Importing routes
const todoRoutes = require("./routers/todo.router");

// Middleware
app.use(express.json());

// Mongoose connection
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.fsd9z3z.mongodb.net/testTodos`
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes setup
app.use("/todo", todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
