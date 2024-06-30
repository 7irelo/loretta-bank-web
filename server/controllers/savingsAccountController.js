const { SavingsAccount } = require('../models/associations');

// Fetch all savings accounts
const getSavingsAccounts = async (req, res) => {
  try {
    const savingsAccounts = await SavingsAccount.findAll();
    res.status(200).json(savingsAccounts);
  } catch (error) {
    console.error("Error fetching savings accounts:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Fetch a single savings account by ID
const getSavingsAccount = async (req, res) => {
  const { accountID } = req.params;
  try {
    const savingsAccount = await SavingsAccount.findByPk(accountID);
    if (!savingsAccount) {
      return res.status(404).json({ success: false, message: "Savings account not found" });
    }
    res.status(200).json(savingsAccount);
  } catch (error) {
    console.error(`Error fetching savings account with ID ${accountID}:`, error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Create a new savings account
const createSavingsAccount = async (req, res) => {
  const { userId, balance } = req.body;
  try {
    const savingsAccount = await SavingsAccount.create({ userId, balance });
    res.status(201).json({ success: true, message: "Savings account created successfully", savingsAccount });
  } catch (error) {
    console.error("Error creating savings account:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Update a savings account
const updateSavingsAccount = async (req, res) => {
  const { accountID } = req.params;
  const { balance } = req.body;
  try {
    const savingsAccount = await SavingsAccount.findByPk(accountID);
    if (!savingsAccount) {
      return res.status(404).json({ success: false, message: "Savings account not found" });
    }
    savingsAccount.balance = balance;
    await savingsAccount.save();
    res.status(200).json({ success: true, message: "Savings account updated successfully", savingsAccount });
  } catch (error) {
    console.error(`Error updating savings account with ID ${accountID}:`, error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Delete a savings account
const deleteSavingsAccount = async (req, res) => {
  const { accountID } = req.params;
  try {
    const savingsAccount = await SavingsAccount.findByPk(accountID);
    if (!savingsAccount) {
      return res.status(404).json({ success: false, message: "Savings account not found" });
    }
    await savingsAccount.destroy();
    res.status(200).json({ success: true, message: "Savings account deleted successfully" });
  } catch (error) {
    console.error(`Error deleting savings account with ID ${accountID}:`, error);
    res.status(500).json({ success: false, message
