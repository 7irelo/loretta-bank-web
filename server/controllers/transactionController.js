const { pool } = require('../config/database');

// Create a transaction
const createTransaction = async (req, res) => {
  const { accountId, type, amount, description, journalType } = req.body;
  try {
    const query = `
      INSERT INTO transactions (account_id, type, amount, description, journal_type)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [accountId, type, amount, description, journalType];
    const { rows } = await pool.query(query, values);
    const transaction = rows[0];

    res.status(201).json({ success: true, transaction });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Fetch a single transaction by ID
const getTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'SELECT * FROM transactions WHERE id = $1 AND account_id IN (SELECT id FROM accounts WHERE user_id = $2)';
    const { rows } = await pool.query(query, [id, req.user.id]);
    const transaction = rows[0];

    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }
    res.status(200).json({ success: true, transaction });
  } catch (error) {
    console.error(`Error fetching transaction with ID ${id}:`, error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Fetch all transactions for the logged-in user
const getTransactions = async (req, res) => {
  try {
    const query = 'SELECT * FROM transactions WHERE account_id IN (SELECT id FROM accounts WHERE user_id = $1)';
    const { rows } = await pool.query(query, [req.user.id]);
    res.status(200).json({ success: true, transactions: rows });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM transactions WHERE id = $1 AND account_id IN (SELECT id FROM accounts WHERE user_id = $2) RETURNING *';
    const { rows } = await pool.query(query, [id, req.user.id]);
    const transaction = rows[0];

    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    res.status(200).json({ success: true, message: "Transaction deleted successfully" });
  } catch (error) {
    console.error(`Error deleting transaction with ID ${id}:`, error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  createTransaction,
  getTransaction,
  getTransactions,
  deleteTransaction,
};
