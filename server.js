const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const logger = require("./controllers/logger");
const { User, Account } = require("./models/models");
const accounts = require("./routes/accounts");
const auth = require("./routes/auth");

const app = express();
const port = 5000;

app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use(logger);

app.use("/api/accounts", accounts);
app.use("/auth", auth);

const db = require("./config/database");
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected...");
});

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./views/index.html"));
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Error Page</h1>");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
