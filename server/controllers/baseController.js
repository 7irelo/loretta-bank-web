const path = require("path");

const indexPage = (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../views/index.html"));
};

const errorPage = async (req, res) {
  res.const indexPage = (req, res) => {
  res.status(200).json({ message: "Welcome to the index page" });
};

const errorPage = (req, res) => {
  res.status(404).json({ error: "404 - Not Found" });
};

module.exports = {
  indexPage,
  errorPage,
};
(404).send("404 - Not Found");
}

module.exports = {
  indexPage,
  errorPage,
};
