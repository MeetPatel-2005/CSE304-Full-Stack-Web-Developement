const express = require("express");
const router = express.Router();

// GET /home
router.get("/", (req, res) => {
    res.render("home", { message: "Welcome to the Dashboard!" });
});

module.exports = router;
