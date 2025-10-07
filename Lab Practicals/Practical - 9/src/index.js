
const app = require("./app.js");

// Import routes
const welcomeRoute = require("../routes/welcomeRoute");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Root");
});

// Use route
app.use("/api/welcome", welcomeRoute);

app.listen(port, (req, res) => {
    console.log(`server is running on port ${port}`);
});