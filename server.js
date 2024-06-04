const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./controllers/logger");
const { User, Account } = require("./models/models");
const accounts = require("./routes/accounts");

const {
  registerPage,
  registerUser,
  loginPage,
  loginUser,
  indexPage,
  errorPage,
} = require("./controllers/base");

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use(logger);
app.use("/api/accounts", accounts);

// Routes
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get("/register", registerPage);

// Register a new user
app.post("/register", registerUser);

app.get("/login", loginPage);

// Login a user
app.post("/login", loginUser);

app.get("/", indexPage);

// app.all("*", errorPage);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
