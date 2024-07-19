const express = require("express")
const router = express.Router();
const authController = require("../controller/authController");
const verifyToken = require('../middleware/verifyToken');

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser)
router.get("/me", verifyToken, authController.getCurrentUser);

module.exports = router;
