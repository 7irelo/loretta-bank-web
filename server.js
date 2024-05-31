const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const logger = require("./logger");
const verifyToken = require("./verifyToken");
const jwt = require("jsonwebtoken");

const app = express();
const port = 5000;

const accounts = require("./routes/accounts");
const auth = require("./routes/auth");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use(logger);
app.use("/api/accounts", accounts);
app.use("/auth", auth);

/*
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "lorettabank",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected...");
});
*/

app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./index.html"));
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Error Page</h1>");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
