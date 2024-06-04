const express = require("express");
const { accounts, cards } = require("../data");
const verifyToken = require("../controllers/verifyToken");
const {
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
  queryAccounts,
  getBalance,
  makeDeposit,
  makeWithdrawal,
} = require("../controllers/accounts");

const router = express.Router();

router.get("/", getAccounts);

router.get("/query", queryAccounts);

// Account
router.get("/:accountID", getAccount);
router.put("/:accountID", updateAccount);
router.delete("/:accountID", deleteAccount);
router.get("/accountID/balance", getBalance);
router.post("/accountID/deposit", makeDeposit);
router.post("/accountID/withdraw", makeWithdrawal);

/*
router
  .route("/:accountID")
  .get(getAccount)
  .put(updateAccount)
  .delete(deleteAccount);
*/

module.exports = router;
