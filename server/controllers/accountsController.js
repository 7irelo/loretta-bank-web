const jwt = require("jsonwebtoken");
const Account = require('../models/models');
const { Op } = require('sequelize');

const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.json(accounts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const getAccount = async (req, res) => {
  const { accountID } = req.params;
  try {
    const account = await Account.findByPk(accountID);
    if (!account) {
      return res.status(404).json({ success: false, msg: "Account not found" });
    }
    res.json(account);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const account = await Account.findByPk(id);
    if (!account) {
      return res.status(404).json({ success: false, msg: "Account not found" });
    }
    account.name = name;
    await account.save();
    res.status(200).json({ success: true, msg: "Account updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const deleteAccount = async (req, res) => {
  const { id } = req.params;
  try {
    const account = await Account.findByPk(id);
    if (!account) {
      return res.status(404).json({ success: false, msg: "Account not found" });
    }
    await account.destroy();
    res.status(200).json({ success: true, msg: "Account deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const queryAccounts = async (req, res) => {
  const { search, limit } = req.query;
  try {
    let queryOptions = {};
    if (search) {
      queryOptions = {
        where: {
          name: { [Op.startsWith]: search }
        }
      };
    }
    if (limit) {
      queryOptions.limit = Number(limit);
    }
    const accounts = await Account.findAll(queryOptions);
    if (accounts.length === 0) {
      return res.status(200).send("No accounts found");
    }
    res.status(200).json(accounts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getAccounts
  getAccount,
  updateAccount,
  deleteAccount,
  queryAccounts,
};
