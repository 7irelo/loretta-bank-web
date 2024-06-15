const path = require("path");

const indexPage = (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../views/index.html"));
};

const errorPage = (req, res) => {
  res.status(404).send("<h1>Error Page</h1>");
};

module.exports = {
  indexPage,
  errorPage,
};
