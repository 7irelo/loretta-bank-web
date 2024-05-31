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

// Miidleware
const authorise = (req, res, next) => {
  const { user } = req.query;
  if (user === "eric") {
    req.user = { name: "eric", id: 7 };
    console.log(req.query);
    next();
  } else {
    res.status(404).send("Unauthorised");
  }
};

app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./index.html"));
});

// View balance
app.get("/balance", verifyToken, (req, res) => {
  const query = "SELECT balance FROM users WHERE id = ?";
  db.execute(query, [req.userId], (err, results) => {
    if (err) {
      return res.status(500).send("Server error");
    }
    res.status(200).send({ balance: results[0].balance });
  });
});

// Deposit money
app.post("/deposit", verifyToken, (req, res) => {
  const { amount } = req.body;

  const updateBalance = "UPDATE users SET balance = balance + ? WHERE id = ?";
  const addTransaction =
    'INSERT INTO transactions (user_id, amount, type) VALUES (?, ?, "credit")';

  db.execute(updateBalance, [amount, req.userId], (err) => {
    if (err) {
      return res.status(500).send("Server error");
    }

    db.execute(addTransaction, [req.userId, amount], (err) => {
      if (err) {
        return res.status(500).send("Server error");
      }
      res.status(200).send("Deposit successful");
    });
  });
});

// Withdraw money
app.post("/withdraw", verifyToken, (req, res) => {
  const { amount } = req.body;

  const updateBalance =
    "UPDATE users SET balance = balance - ? WHERE id = ? AND balance >= ?";
  const addTransaction =
    'INSERT INTO transactions (user_id, amount, type) VALUES (?, ?, "debit")';

  db.execute(updateBalance, [amount, req.userId, amount], (err, results) => {
    if (err || results.affectedRows === 0) {
      return res.status(400).send("Insufficient funds");
    }

    db.execute(addTransaction, [req.userId, amount], (err) => {
      if (err) {
        return res.status(500).send("Server error");
      }
      res.status(200).send("Withdrawal successful");
    });
  });
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Error Page</h1>");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
