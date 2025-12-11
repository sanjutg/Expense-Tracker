const mongoose = require("mongoose");
const express = require("express");
const app = express();
mongoose
  .connect("mongodb://localhost:27017/Expenses")
  .then(() => {
    console.log("MongoDB connected 🎊");
  })
  .catch((err) => {
    console.log("MongoDB not connected 🥀", err);
  });

  const ExpenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;
