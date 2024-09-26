const accountService = require('../service/accountService');
const { logResponse } = require("../middleware/logger");


const createAccount = async (req, res) => {
  try {
    const { accountType } = req.body;
    const userId = req.user.id;

    // Delegate the logic to the service layer
    const accountData = await accountService.createAccount(userId, accountType);

    const response = {
      success: true,
      message: "Account created successfully",
      account: accountData, // Structured account data
    };

    logResponse(201, "Account created successfully", response);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating account:", error);
    logResponse(500, "Server error", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const getAccounts = async (req, res) => {
  try {
    const userId = req.user.id;

    // Delegate the logic to the service layer
    const accountsData = await accountService.getAccounts(userId);

    res.status(200).json({
      success: true,
      message: "Accounts fetched successfully",
      accounts: accountsData,
    });
  } catch (error) {
    console.error("Error fetching accounts:", error);
    logResponse(500, "Server error", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const getAccount = async (req, res) => {
  const { id: accountId } = req.params;
  const userId = req.user.id;

  try {
    // Delegate the logic to the service layer
    const accountData = await accountService.getAccount(accountId, userId);

    if (!accountData) {
      const response = { success: false, message: "Account not found" };
      logResponse(404, "Account not found", response);
      return res.status(404).json(response);
    }

    res.status(200).json({
      success: true,
      message: "Account retrieved successfully",
      account: accountData,
    });
  } catch (error) {
    console.error(`Error fetching account with ID ${accountId}:`, error);
    logResponse(500, "Server error", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const updateAccount = async (req, res) => {
  const { id: accountId } = req.params;
  const { accountType, balance, accountStatus } = req.body;
  const userId = req.user.id;

  try {
    // Delegate logic to the service layer
    const accountData = await accountService.updateAccount(accountId, userId, accountType, balance, accountStatus);

    if (!accountData) {
      const response = { success: false, message: "Account not found" };
      logResponse(404, "Account not found", response);
      return res.status(404).json(response);
    }

    const response = {
      success: true,
      message: "Account updated successfully",
      account: accountData,
    };
    logResponse(200, "Account updated successfully", response);
    return res.status(200).json(response);
  } catch (error) {
    console.error(`Error updating account with ID ${accountId}:`, error);
    logResponse(500, "Server error", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};

const patchAccount = async (req, res) => {
  const { id: accountId } = req.params;
  const updates = req.body;
  const userId = req.user.id;

  try {
    // Delegate logic to the service layer
    const accountData = await accountService.patchAccount(accountId, userId, updates);

    if (!accountData) {
      const response = { success: false, message: "Account not found" };
      logResponse(404, "Account not found", response);
      return res.status(404).json(response);
    }

    const response = {
      success: true,
      message: "Account updated successfully",
      account: accountData,
    };
    logResponse(200, "Account updated successfully", response);
    return res.status(200).json(response);
  } catch (error) {
    console.error(`Error patching account with ID ${accountId}:`, error);
    logResponse(500, "Server error", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};

const deleteAccount = async (req, res) => {
  const { id: accountId } = req.params;
  const userId = req.user.id;

  try {
    // Delegate logic to the service layer
    const isDeleted = await accountService.deleteAccount(accountId, userId);

    if (!isDeleted) {
      const response = { success: false, message: "Account not found" };
      logResponse(404, "Account not found", response);
      return res.status(404).json(response);
    }

    const response = { success: true, message: "Account deleted successfully" };
    logResponse(200, "Account deleted successfully", response);
    return res.status(200).json(response);
  } catch (error) {
    console.error(`Error deleting account with ID ${accountId}:`, error);
    logResponse(500, "Server error", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  createAccount,
  getAccounts,
  getAccount,
  updateAccount,
  patchAccount,
  deleteAccount,
};
