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
