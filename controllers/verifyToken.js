const jwt = require("jsonwebtoken");
const path = require("path");

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).sendFile(path.resolve(__dirname, "./login.html"));
  }

  jwt.verify(token, "your_secret_key", (err, decoded) => {
    if (err) {
      return res.status(500).send("Failed to authenticate token");
    }

    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
