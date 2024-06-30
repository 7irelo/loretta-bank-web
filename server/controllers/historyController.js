const { Transaction, Account } = require('../models/associations');

const getTransactionHistory = async (req, res) => {
  const { accountId } = req.params;
  try {
    const transactions = await Transaction.findAll({ where: { accountId } });
    if (!transactions) {
      return res.status(404).json({ success: false, message: "No transactions found for this account" });
    }
    res.status(200).json({ success: true, transactions });
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const getAccountHistory = async (req, res) => {
  const { userId } = req.params;
  try {
    const accounts = await Account.findAll({ where: { userId }, include: [Transaction] });
    if (!accounts) {
      return res.status(404).json({ success: false, message: "No accounts found for this user" });
    }
    res.status(200).json({ success: true, accounts });
  } catch (error) {
    console.error("Error fetching account history:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  getTransactionHistory,
  getAccountHistory,
};
