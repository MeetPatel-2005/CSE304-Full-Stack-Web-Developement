const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "../public/stylesheets")));
app.use(express.static(path.join(__dirname, "../public/javascripts")));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/counter", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
        res.json(data); // Send { count: X } to frontend
    } catch (err) {
        console.error("Failed to read counter file:", err);
        res.status(500).json({ count: 0 });
    }
});

app.post("/counter", (req, res) => {
    const { count } = req.body;
    fs.writeFileSync('data.json', JSON.stringify({ count }), 'utf8');
    res.json({ message: "Updated Successfully" });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
