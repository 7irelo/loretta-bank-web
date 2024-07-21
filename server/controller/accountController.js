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
    const account = rows[0];

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      account,
    });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Fetch all accounts for the logged-in user
const getAccounts = async (req, res) => {
  try {
    const query = `
      SELECT a.*, u.id as user_id, u.first_name, u.last_name, u.email, u.date_of_birth, u.address, u.occupation, u.phone, u.username
      FROM accounts a
      JOIN users u ON a.user_id = u.id
      WHERE a.user_id = $1;
    `;
    const { rows: accountRows } = await pool.query(query, [req.user.id]);

    const accounts = await Promise.all(accountRows.map(async (accountRow) => {
      const transactionsQuery = 'SELECT * FROM transactions WHERE account_id = $1';
      const { rows: transactions } = await pool.query(transactionsQuery, [accountRow.id]);

      const cardsQuery = 'SELECT * FROM cards WHERE account_id = $1';
      const { rows: cards } = await pool.query(cardsQuery, [accountRow.id]);

      const loansQuery = 'SELECT * FROM loans WHERE account_id = $1';
      const { rows: loans } = await pool.query(loansQuery, [accountRow.id]);

      return {
        id: accountRow.id,
        name: accountRow.name,
        user_id: accountRow.user_id,
        account_type: accountRow.account_type,
        available_balance: accountRow.available_balance,
        latest_balance: accountRow.latest_balance,
        account_status: accountRow.account_status,
        image_url: accountRow.image_url,
        created_at: accountRow.created_at,
        updated_at: accountRow.updated_at,
        account_number: accountRow.account_number,
        user: {
          id: accountRow.user_id,
          first_name: accountRow.first_name,
          last_name: accountRow.last_name,
          email: accountRow.email,
          date_of_birth: accountRow.date_of_birth,
          address: accountRow.address,
          occupation: accountRow.occupation,
          phone: accountRow.phone,
          username: accountRow.username
        },
        transactions,
        cards,
        loans
      };
    }));

    res.status(200).json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Fetch a single account by ID
const getAccount = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT a.*, u.id as user_id, u.first_name, u.last_name, u.email, u.date_of_birth, u.address, u.occupation, u.phone, u.username
      FROM accounts a
      JOIN users u ON a.user_id = u.id
      WHERE a.id = $1 AND a.user_id = $2;
    `;
    const { rows } = await pool.query(query, [id, req.user.id]);
    const accountRow = rows[0];

    if (!accountRow) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

    const transactionsQuery = 'SELECT * FROM transactions WHERE account_id = $1';
    const { rows: transactions } = await pool.query(transactionsQuery, [id]);

    const cardsQuery = 'SELECT * FROM cards WHERE account_id = $1';
    const { rows: cards } = await pool.query(cardsQuery, [id]);

    const loansQuery = 'SELECT * FROM loans WHERE account_id = $1';
    const { rows: loans } = await pool.query(loansQuery, [id]);

    const account = {
      id: accountRow.id,
      name: accountRow.name,
      user_id: accountRow.user_id,
      account_type: accountRow.account_type,
      available_balance: accountRow.available_balance,
      latest_balance: accountRow.latest_balance,
      account_status: accountRow.account_status,
      image_url: accountRow.image_url,
      created_at: accountRow.created_at,
      updated_at: accountRow.updated_at,
      account_number: accountRow.account_number,
      user: {
        id: accountRow.user_id,
        first_name: accountRow.first_name,
        last_name: accountRow.last_name,
        email: accountRow.email,
        date_of_birth: accountRow.date_of_birth,
        address: accountRow.address,
        occupation: accountRow.occupation,
        phone: accountRow.phone,
        username: accountRow.username
      },
      transactions,
      cards,
      loans
    };

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
