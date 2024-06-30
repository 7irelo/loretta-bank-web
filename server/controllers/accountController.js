const { Op } = require('sequelize');
const { Account, Transaction } = require('../models/associations');

// Fetch all accounts
const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.status(200).json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Fetch a single account by ID
const getAccount = async (req, res) => {
  const { accountID } = req.params;
  try {
    const account = await Account.findByPk(accountID);
    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }
    res.status(200).json(account);
  } catch (error) {
    console.error(`Error fetching account with ID ${accountID}:`, error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Update account details
const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const account = await Account.findByPk(id);
    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }
    account.name = name;
    await account.save();
    res.status(200).json({ success: true, message: 'Account updated successfully', account });
  } catch (error) {
    console.error(`Error updating account with ID ${id}:`, error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Delete an account
const deleteAccount = async (req, res) => {
  const { id } = req.params;
  try {
    const account = await Account.findByPk(id);
    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }
    await account.destroy();
    res.status(200).json({ success: true, message: 'Account deleted successfully' });
  } catch (error) {
    console.error(`Error deleting account with ID ${id}:`, error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Query accounts with search and limit
const queryAccounts = async (req, res) => {
  const { search, limit } = req.query;
  try {
    const queryOptions = {};
    if (search) {
      queryOptions.where = {
        name: { [Op.startsWith]: search },
      };
    }
    if (limit) {
      queryOptions.limit = parseInt(limit, 10);
    }
    const accounts = await Account.findAll(queryOptions);
    if (accounts.length === 0) {
      return res.status(200).json({ success: false, message: 'No accounts found' });
    }
    res.status(200).json(accounts);
  } catch (error) {
    console.error('Error querying accounts:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Fetch transactions for CPJ
const getCPJTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ where: { journalType: 'CPJ' } });
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching CPJ transactions:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Fetch transactions for CRJ
const getCRJTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ where: { journalType: 'CRJ' } });
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching CRJ transactions:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

module.exports = {
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
  queryAccounts,
  getCPJTransactions,
  getCRJTransactions,
};
