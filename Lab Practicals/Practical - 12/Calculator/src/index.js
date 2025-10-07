
require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.render("index", { result: null, error: null });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});