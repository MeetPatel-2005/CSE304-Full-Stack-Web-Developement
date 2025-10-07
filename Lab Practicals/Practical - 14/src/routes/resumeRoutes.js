const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumeController");

// Routes
router.get("/", resumeController.getUploadForm);
router.post("/upload", resumeController.uploadResume);

module.exports = router;