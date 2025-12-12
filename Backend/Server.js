const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();

app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/Expenses")
  .then(() => console.log("MongoDB connected 🎊"))
  .catch((err) => console.log("MongoDB not connected 🥀", err));

// Schema
const ExpenseSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }, // hashed password
  age: Number,
  address: String,
});

const Expense = mongoose.model("Expense", ExpenseSchema);

// SIGNUP Route
app.post("/signup", async (req, res) => {
  try {
    const { email, password, age, address } = req.body;

    const existingUser = await Expense.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists 😅");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = new Expense({
      email,
      password: hashedPassword,
      age,
      address,
    });

    await userData.save();
    res.send("User signed up successfully! 🎉");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error signing up user");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Expense.findOne({ email });
    if (!user) {
      return res.send("User not found 😢");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send("Incorrect password 😅");
    }

    res.send(`Login successful ✨ Welcome back, ${email}!`);
  } catch (err) {
    console.log(err);
    res.send("Error logging in");
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await Expense.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.send("Error fetching users");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
