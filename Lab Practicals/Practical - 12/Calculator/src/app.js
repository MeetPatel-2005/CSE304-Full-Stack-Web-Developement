
const express = require("express");
const path = require("path");
const calculatorRoutes = require("./routes/calculatorRoutes");

const app = express();

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.static(path.join(__dirname, "../public")));

app.use("/calc", calculatorRoutes);

module.exports = app;