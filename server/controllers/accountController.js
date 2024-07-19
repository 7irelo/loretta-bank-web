const { pool } = require('../config/database');

// Create Account
const createAccount = async (req, res) => {
  try {
    const query = `
      INSERT INTO accounts (user_id, account_type)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [req.user.id, req.body.account_type];

    const { rows } = await pool.query(query, values);
    const user = rows[0];

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user,
    });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Fetch all accounts for the logged-in user
const getAccounts = async (req, res) => {
  try {
    const query = 'SELECT * FROM accounts WHERE user_id = $1';
    const { rows } = await pool.query(query, [req.user.id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Fetch a single account by ID
const getAccount = async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'SELECT * FROM accounts WHERE id = $1 AND user_id = $2';
    const { rows } = await pool.query(query, [id, req.user.id]);
    const account = rows[0];

    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }
    res.status(200).json(account);
  } catch (error) {
    console.error(`Error fetching account with ID ${id}:`, error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Update account details
const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { accountType, balance, accountStatus } = req.body;
  try {
    const query = `
      UPDATE accounts SET accountType = $1, balance = $2, accountStatus = $3, updatedAt = CURRENT_TIMESTAMP
      WHERE id = $4 AND user_id = $5
      RETURNING *;
    `;
    const values = [accountType, balance, accountStatus, id, req.user.id];
    const { rows } = await pool.query(query, values);
    const account = rows[0];

    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

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
    const query = 'DELETE FROM accounts WHERE id = $1 AND user_id = $2 RETURNING *';
    const { rows } = await pool.query(query, [id, req.user.id]);
    const account = rows[0];

    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

    res.status(200).json({ success: true, message: 'Account deleted successfully' });
  } catch (error) {
    console.error(`Error deleting account with ID ${id}:`, error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

module.exports = {
  createAccount,
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
};
