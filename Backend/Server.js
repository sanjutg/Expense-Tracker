const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.json()); 

mongoose
  .connect("mongodb://localhost:27017/Expenses")
  .then(() => {
    console.log("MongoDB connected 🎊");
  })
  .catch((err) => {
    console.log("MongoDB not connected 🥀", err);
  });

const ExpenseSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  address: {
    type: String,
  },
});

const Expense = mongoose.model("Expense", ExpenseSchema);

app.post("/signup", async (req, res) => {
  try {
    const { email, password, age, address } = req.body;

    const userData = new Expense({
      email,
      password,
      age,
      address,
    });

    await userData.save(); 

    res.send("User signed up successfully!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error signing up user");
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000 🚀");
});
