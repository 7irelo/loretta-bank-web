const express = require("express")
const router = express.Router();
const { registerUser, loginUser, getCurrentUser } = require("../controllers/authController");
const verifyToken = require('../middlewares/verifyToken');

router.use(verifyToken);

router.post("/register", registerUser);
router.post("/login", loginUser)
router.get("/me", verifyToken, getCurrentUser);

module.exports = router;
