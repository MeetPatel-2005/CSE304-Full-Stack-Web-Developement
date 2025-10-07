const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

// View engine
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// Routes
const incomeRoutes = require("./routes/incomeRoutes");
app.use("/", incomeRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;