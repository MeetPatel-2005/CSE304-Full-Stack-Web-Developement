const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

// View engine
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// Routes
const resumeRoutes = require("./routes/resumeRoutes");
app.use("/", resumeRoutes);

module.exports = app;