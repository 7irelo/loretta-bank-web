const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/login", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../login.html"));
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
  res.status(200).sendFile(path.resolve(__dirname, "./register.html"));
});

// Register a new user
router.post("/register", (req, res) => {
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

module.exports = router;
