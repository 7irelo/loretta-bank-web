const User = require("../models/models");
const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("/login", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../views/login.html"));
});

// Login a user
router.post("/login", (req, res) => {
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

router.get("/register", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../views/register.html"));
});

// Register a new user
router.post("/register", (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  const userData = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    dateOfBirth: req.body.dateOfBirth,
    idNumber: req.body.idNumber,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  };

  const user = User.build(userData);

  user.save().then(() => {
    console.log("User created successfully");
  });

  // const { username, password } = req.body;
  // const hashedPassword = bcrypt.hashSync(password, 8);

  // const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
  // db.execute(query, [username, hashedPassword], (err, results) => {
  //   if (err) {
  //     return res.status(500).send("Server error");
  //   }
  //   res.status(201).send("User registered");
  // });
});

module.exports = router;
