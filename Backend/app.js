// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect("mongodb://127.0.0.1:27017/expenseTracker")
//     .then(() => console.log("MongoDB Connected"))
//     .catch(err => console.log("DB Error:", err));

// const expenseSchema = new mongoose.Schema({
//     title: String,
//     amount: Number,
//     date: { type: Date, default: Date.now }
// });

// const Expense = mongoose.model("Expense", expenseSchema);

// app.post("/add-expense", async (req, res) => {
//     try {
//         const { title, amount } = req.body;

//         const expense = new Expense({
//             title,
//             amount
//         });

//         await expense.save();
//         res.json({ success: true, message: "Expense Added!" });

//     } catch (err) {
//         res.json({ success: false, error: err });
//     }
// });

// app.get("/expenses", async (req, res) => {
//     try {
//         const data = await Expense.find().sort({ date: -1 });
//         res.json({ success: true, data });
//     } catch (err) {
//         res.json({ success: false, error: err });
//     }
// });

// app.listen(5000, () => {
//     console.log("Server running on http://localhost:5000");
// });


// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const app = express();     
// app.use(cors());
// app.use(express.json());

// mongoose.connect("mongodb://localhost:27017/ExpenseDB")
//   .then(() => console.log("MongoDB Connected ✔"))
//   .catch(err => console.log("MongoDB Error ❌", err));

// const ExpenseSchema = new mongoose.Schema({
//   title: String,
//   amount: Number
// });

// const Expense = mongoose.model("Expense", ExpenseSchema);

// app.post("/add-expense", async (req, res) => {
//   try {
//     const { title, amount } = req.body;
//     const newExpense = new Expense({ title, amount });

//     await newExpense.save();
//     res.send({ message: "Expense added to DB ✔" });
//   } catch (err) {
//     res.send({ message: "Error adding expense ❌" });
//   }
// });

// app.get("/expenses", async (req, res) => {
//   try {
//     const data = await Expense.find();
//     res.send(data);
//   } catch (err) {
//     res.send({ message: "Error fetching expenses ❌" });
//   }
// });
// app.delete("/delete/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedItem = await Expense.findByIdAndDelete(id);

//     if (!deletedItem) {
//       return res.status(404).send("Item not found ❌");
//     }

//     res.send("Item deleted successfully 🗑️");
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Error deleting item");
//   }
// });

// app.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });



const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/ExpenseDB")
  .then(() => console.log("MongoDB Connected ✔"))
  .catch((err) => console.log("MongoDB Error ❌", err));

const ExpenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
});

const Expense = mongoose.model("Expense", ExpenseSchema);

app.post("/add-expense", async (req, res) => {
  try {
    const { title, amount } = req.body;
    const newExpense = new Expense({ title, amount });

    const saved = await newExpense.save();
    res.send(saved);   
  } catch (err) {
    res.status(500).send({ message: "Error adding expense ❌" });
  }
});

app.get("/expenses", async (req, res) => {
  try {
    const data = await Expense.find();
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: "Error fetching expenses ❌" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Expense.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).send("Item not found ❌");
    }

    res.send("Item deleted successfully 🗑️");
  } catch (err) {
    res.status(500).send("Error deleting item ❌");
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
