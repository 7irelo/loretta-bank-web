const { pool } = require('../config/database');

// Fetch all accounts
const getAccounts = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM accounts');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Fetch a single account by ID
const getAccount = async (req, res) => {
  const { accountId } = req.params;
  try {
    const query = 'SELECT * FROM accounts WHERE id = $1';
    const { rows } = await pool.query(query, [accountId]);
    const account = rows[0];

    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }
    res.status(200).json(account);
  } catch (error) {
    console.error(`Error fetching account with ID ${accountId}:`, error);
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
      WHERE id = $4
      RETURNING *;
    `;
    const values = [accountType, balance, accountStatus, id];
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
    const query = 'DELETE FROM accounts WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
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
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
};
