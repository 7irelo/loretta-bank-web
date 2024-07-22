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
    const query = `
      SELECT t.*, a.id AS account_id, a.account_number, a.name, a.account_type, a.available_balance, a.latest_balance, a.account_status, a.image_url, a.user_id
      FROM transactions t
      JOIN accounts a ON t.account_id = a.id
      WHERE t.id = $1 AND a.user_id = $2;
    `;
    const { rows } = await pool.query(query, [id, req.user.id]);
    const transactionRow = rows[0];

    if (!transactionRow) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    const transaction = {
      id: transactionRow.id,
      type: transactionRow.type,
      amount: transactionRow.amount,
      date: transactionRow.date,
      description: transactionRow.description,
      journal_type: transactionRow.journal_type,
      account: {
        id: transactionRow.account_id,
        account_number: transactionRow.account_number,
        name: transactionRow.name,
        account_type: transactionRow.account_type,
        available_balance: transactionRow.available_balance,
        latest_balance: transactionRow.latest_balance,
        account_status: transactionRow.account_status,
        image_url: transactionRow.image_url,
        user_id: transactionRow.user_id
      }
    };

    res.status(200).json({ success: true, transaction });
  } catch (error) {
    console.error(`Error fetching transaction with ID ${id}:`, error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Fetch all transactions for the logged-in user
const getTransactions = async (req, res) => {
  try {
    const query = `
      SELECT t.*, a.id AS account_id, a.account_number, a.name, a.account_type, a.available_balance, a.latest_balance, a.account_status, a.image_url, a.user_id
      FROM transactions t
      JOIN accounts a ON t.account_id = a.id
      WHERE a.user_id = $1;
    `;
    const { rows } = await pool.query(query, [req.user.id]);

    const transactions = rows.map(transactionRow => ({
      id: transactionRow.id,
      type: transactionRow.type,
      amount: transactionRow.amount,
      date: transactionRow.date,
      description: transactionRow.description,
      journal_type: transactionRow.journal_type,
      account: {
        id: transactionRow.account_id,
        account_number: transactionRow.account_number,
        name: transactionRow.name,
        account_type: transactionRow.account_type,
        available_balance: transactionRow.available_balance,
        latest_balance: transactionRow.latest_balance,
        account_status: transactionRow.account_status,
        image_url: transactionRow.image_url,
        user_id: transactionRow.user_id
      }
    }));

    res.status(200).json({ success: true, transactions });
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
