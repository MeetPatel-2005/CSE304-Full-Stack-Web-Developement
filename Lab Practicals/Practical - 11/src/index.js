
const app = require("./app.js");

// Import routes
const homeRoute = require("../routes/homeRoute");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Root");
});

// Use route
app.use("/home", homeRoute);

app.listen(port, (req, res) => {
    console.log(`server is running on port ${port}`);
});