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
router.get("/:accountID", verifyToken, getAccount);
router.put("/:accountID", verifyToken, updateAccount);
router.delete("/:accountID", verifyToken, deleteAccount);
router.get("/accountID/balance", verifyToken, getBalance);
router.post("/accountID/deposit", verifyToken, makeDeposit);
router.post("/accountID/withdraw", verifyToken, makeWithdrawal);

/*
router
  .route("/:accountID")
  .get(getAccount)
  .put(updateAccount)
  .delete(deleteAccount);
*/

module.exports = router;
