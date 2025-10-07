
const express = require("express");
const router = express.Router();
const { calculate } = require("../controllers/calculatorController");

router.post("/", calculate);

module.exports = router;