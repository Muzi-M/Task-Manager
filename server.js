const express = require("express");
const bodyParser = require("body-parser");
const path = require("path"); // Import the 'path' module
const candidatesRouter = require("./routes/candidates"); // Import the candidates router

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "pug");
app.set("views", "./views");

// Serve the 'weatherAPI.js' file
app.get("/js/weatherAPI.js", (req, res) => {
  res.sendFile(path.join(__dirname, "public/js/weatherAPI.js"));
});

// Use the candidatesRouter for all routes related to candidates
app.use("/", candidatesRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
