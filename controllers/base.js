const path = require("path");
const { User, Account } = require("../models/models");

const registerPage = (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../views/register.html"));
};

const registerUser = (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
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
  res.status(200).sendFile(path.resolve(__dirname, "../views/index.html"));

  // const { username, password } = req.body;
  // const hashedPassword = bcrypt.hashSync(password, 8);

  // const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
  // db.execute(query, [username, hashedPassword], (err, results) => {
  //   if (err) {
  //     return res.status(500).send("Server error");
  //   }
  //   res.status(201).send("User registered");
  // });
};

const loginPage = (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../views/login.html"));
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  await User.findOne({ where: { username } }).then((user) => {
    if (user) {
      console.log(user.toJSON);
    } else {
      console.log("User not found");
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign({ id: user.id }, "password", {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({ auth: true, token });
  });
};

const indexPage = (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../views/index.html"));
};

const errorPage = (req, res) => {
  res.status(404).send("<h1>Error Page</h1>");
};

module.exports = {
  registerPage,
  registerUser,
  loginPage,
  loginUser,
  indexPage,
  errorPage,
};
