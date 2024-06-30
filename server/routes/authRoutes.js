const express = require("express")
const router = express.Router();
const { registerUser, registerPage, loginPage, loginUser } = require("../controllers/auth");

router.get("/register", registerPage);
router.post("/register", registerUser);
router.get("/login", loginPage);
router.post("/login", loginUser)

module.exports = router;
