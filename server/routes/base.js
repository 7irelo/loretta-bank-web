const express = require("express")
const router = express.Router();
const { indexPage, errorPage } = require("../controllers/authController");

router.get("/", indexPage);
router.all("*", errorUser);

module.exports = router;
