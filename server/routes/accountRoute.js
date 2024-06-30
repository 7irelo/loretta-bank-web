const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
  queryAccounts,
  getBalance,
  makeDeposit,
  makeWithdrawal,
} = require("../controllers/accountsController");

const router = express.Router();

// Apply verifyToken middleware to all routes except the ones listed explicitly
router.use(verifyToken);

// Public routes
router.get("/", getAccounts);
router.get("/query", queryAccounts);

// Protected routes
router.get("/:accountID", getAccount);
router.put("/:accountID", updateAccount);
router.delete("/:accountID", deleteAccount);
router.get("/:accountID/balance", getBalance);
router.post("/:accountID/deposit", makeDeposit);
router.post("/:accountID/withdraw", makeWithdrawal);

module.exports = router;
