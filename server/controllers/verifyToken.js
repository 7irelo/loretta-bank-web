const jwt = require("jsonwebtoken");
const path = require("path");

function verifyToken(req, res, next) {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(200).send("No token");
  }

  try {
    const verified = jwt.verify(token, "token_secret");
    req.user = verified;
    next();
  } catch (error) {
    return res.status(500).send("Failed to authenticate token");
  }
  // jwt.verify(token, "token_secret", (err, decoded) => {
  //   if (err) {
  //     return res.status(500).send("Failed to authenticate token");
  //   }

  //   req.userId = decoded.id;
  //   next();
  // });
}

module.exports = verifyToken;
