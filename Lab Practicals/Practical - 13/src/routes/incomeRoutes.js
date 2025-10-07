const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/incomeController");

// GET → render form
router.get("/", incomeController.getForm);

// POST → calculate income
router.post("/calculate", incomeController.calculateIncome);

module.exports = router;