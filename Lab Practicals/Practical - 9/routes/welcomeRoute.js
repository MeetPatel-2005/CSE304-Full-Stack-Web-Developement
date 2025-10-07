
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index.ejs"); // renders views/index.ejs
});

module.exports = router;
