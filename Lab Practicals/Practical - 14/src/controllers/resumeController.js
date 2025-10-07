const multer = require("multer");
const path = require("path");

// Multer storage (store in "uploads" folder)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Create "uploads" folder in root
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter (PDF only)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

// Upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: fileFilter,
}).single("resume");

exports.getUploadForm = (req, res) => {
  res.render("upload", { error: null, success: null });
};

exports.uploadResume = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.render("upload", { error: err.message, success: null });
    }
    if (!req.file) {
      return res.render("upload", { error: "Please upload a PDF file.", success: null });
    }
    res.render("upload", { error: null, success: "Resume uploaded successfully!" });
  });
};