
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "../public/stylesheets")));
app.use(express.static(path.join(__dirname, "../public/javascripts")));
app.use(express.json());

module.exports = app;

