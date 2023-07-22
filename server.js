const express = require("express");
const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "pug");

app.get("/index", (req, res) => {
  res.render(__dirname + "/views/index");
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
