const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const { accounts, cards } = require("./data");
const logger = require("./logger");
const verifyToken = require("./verifyToken");
const jwt = require("jsonwebtoken");

const app = express();
const port = 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use(logger);

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

app.get("/login", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./login.html"));
});

// Login a user
app.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  const query = `SELECT * FROM users WHERE username = ?`;
  db.execute(query, [username], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).send("User not found");
    }

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign({ id: user.id }, "your_secret_key", {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({ auth: true, token });
  });
});

app.get("/register", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./register.html"));
});

// Register a new user
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
  db.execute(query, [username, hashedPassword], (err, results) => {
    if (err) {
      return res.status(500).send("Server error");
    }
    res.status(201).send("User registered");
  });
});

app.get("/accounts", (req, res) => {
  res.json(accounts);
});

app.get("/accounts/query", (req, res) => {
  console.log(req.query);

  let sortedAccounts = [...accounts];
  const { search, limit } = req.query;

  if (search) {
    sortedAccounts = sortedAccounts.filter((account) => {
      return account.name.startsWith(search);
    });
  }
  if (limit) {
    sortedAccounts = sortedAccounts.slice(0, Number(limit));
  }
  if (sortedAccounts.length < 1) {
    return res.status(200).send("No accounts found");
  }
  res.status(200).json(sortedAccounts);
});

app.get("/accounts/:accountID", (req, res) => {
  const { accountID } = req.params;
  const singleAccount = accounts.find(
    (account) => account.id === Number(accountID)
  );

  res.json(singleAccount);
});

// 

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
