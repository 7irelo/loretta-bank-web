const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const { User, Account } = require("../models/models");

// Register page
const registerPage = (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../views/register.html"));
};

// Register user
const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = await User.build({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    idNumber: req.body.idNumber,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    user.save().then(() => {
      console.log("User created successfully");
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Login page
const loginPage = (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../views/login.html"));
};

// Login user
const loginUser = async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  if (user) {
    console.log(user.toJSON);
  } else {
    console.log("User not found");
  }
  const passwordIsValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!passwordIsValid) {
    return res.status(401).send("Invalid password");
  }

  const token = jwt.sign({ id: user.idNumber }, "token_secret", {
    expiresIn: 86400, // 24 hours
  });
  res.header("auth-key", token).status(200).send({ auth: true, token });
};

module.exports = {
  registerPage,
  registerUser,
  loginPage,
  loginUser,
};
