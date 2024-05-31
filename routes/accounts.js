const express = require("express");
const { accounts, cards } = require("../data");
const {
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
  queryAccounts,
} = require("../controllers/accounts");

const router = express.Router();

router.get("/", getAccounts);

router.get("/query", queryAccounts);

// Account
router.get("/:accountID", getAccount);
router.put("/:accountID", updateAccount);
router.delete("/:accountID", deleteAccounts);

/*
router
  .route("/:accountID")
  .get(getAccount)
  .put(updateAccount)
  .delete(deleteAccount);
*/

module.exports = router;
