const AccountDTO = require('../dtos/AccountDto');
const UserDTO = require('../dtos/UserDto');
const AccountSerializer = require('../serializers/AccountSerializer');
const { logResponse } = require('../middleware/logger');
const { pool } = require('../config/database');

const createAccount = async (req, res) => {
  try {
    const { accountType } = req.body;
    const query = `
      INSERT INTO accounts (user_id, account_type)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [req.user.id, accountType];

    const { rows } = await pool.query(query, values);
    const account = rows[0];

    const userQuery = 'SELECT * FROM users WHERE id = $1';
    const { rows: userRows } = await pool.query(userQuery, [req.user.id]);
    const user = userRows[0];

    const accountDTO = new AccountDTO({
      ...account,
      user,
    });

    const response = {
      success: true,
      message: "Account created successfully",
      account: AccountSerializer.serialize(accountDTO),
    };

    logResponse(201, "Account created successfully", response); // Log response

    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating account:", error);
    logResponse(500, "Server error", error); // Log error response
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

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

      const accountDTO = new AccountDTO({
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
        transactions,
        cards,
        loans,
        user: {
          id: accountRow.user_id,
          first_name: accountRow.first_name,
          last_name: accountRow.last_name,
          email: accountRow.email,
          date_of_birth: accountRow.date_of_birth,
          address: accountRow.address,
          occupation: accountRow.occupation,
          phone: accountRow.phone,
          username: accountRow.username,
        },
      });
      console.log(accountDTO)
      return accountDTO;
    }));

    const response = accounts;

    // logResponse(200, "Accounts fetched successfully", response); // Log response

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    logResponse(500, "Server error", error); // Log error response
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

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
      const response = { success: false, message: 'Account not found' };
      logResponse(404, "Account not found", response); // Log response
      return res.status(404).json(response);
    }

    const transactionsQuery = 'SELECT * FROM transactions WHERE account_id = $1';
    const { rows: transactions } = await pool.query(transactionsQuery, [id]);

    const cardsQuery = 'SELECT * FROM cards WHERE account_id = $1';
    const { rows: cards } = await pool.query(cardsQuery, [id]);

    const loansQuery = 'SELECT * FROM loans WHERE account_id = $1';
    const { rows: loans } = await pool.query(loansQuery, [id]);

    const accountDTO = new AccountDTO({
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
      transactions,
      cards,
      loans,
      user: {
        id: accountRow.user_id,
        first_name: accountRow.first_name,
        last_name: accountRow.last_name,
        email: accountRow.email,
        date_of_birth: accountRow.date_of_birth,
        address: accountRow.address,
        occupation: accountRow.occupation,
        phone: accountRow.phone,
        username: accountRow.username,
      },
    });

    const response = accountDTO;

    // logResponse(200, "Account fetched successfully", response); // Log response

    res.status(200).json(response);
  } catch (error) {
    console.error(`Error fetching account with ID ${id}:`, error);
    logResponse(500, "Server error", error); // Log error response
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { accountType, balance, accountStatus } = req.body;
  try {
    const query = `
      UPDATE accounts SET account_type = $1, available_balance = $2, account_status = $3, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4 AND user_id = $5
      RETURNING *;
    `;
    const values = [accountType, balance, accountStatus, id, req.user.id];
    const { rows } = await pool.query(query, values);
    const account = rows[0];

    if (!account) {
      const response = { success: false, message: 'Account not found' };
      logResponse(404, "Account not found", response); // Log response
      return res.status(404).json(response);
    }

    const userQuery = 'SELECT * FROM users WHERE id = $1';
    const { rows: userRows } = await pool.query(userQuery, [req.user.id]);
    const user = userRows[0];

    const accountDTO = new AccountDTO({
      ...account,
      user,
    });

    const response = { success: true, message: 'Account updated successfully', account: AccountSerializer.serialize(accountDTO) };

    logResponse(200, "Account updated successfully", response); // Log response

    res.status(200).json(response);
  } catch (error) {
    console.error(`Error updating account with ID ${id}:`, error);
    logResponse(500, "Server error", error); // Log error response
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

const putAccount = async (req, res) => {
  const { id } = req.params;
  const { accountType, balance, accountStatus } = req.body;

  try {
    const query = `
      UPDATE accounts 
      SET account_type = $1, available_balance = $2, account_status = $3, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4 AND user_id = $5
      RETURNING *;
    `;
    const values = [accountType, balance, accountStatus, id, req.user.id];
    const { rows } = await pool.query(query, values);
    const account = rows[0];

    if (!account) {
      const response = { success: false, message: 'Account not found' };
      logResponse(404, "Account not found", response); // Log response
      return res.status(404).json(response);
    }

    const userQuery = 'SELECT * FROM users WHERE id = $1';
    const { rows: userRows } = await pool.query(userQuery, [req.user.id]);
    const user = userRows[0];

    const accountDTO = new AccountDTO({
      ...account,
      user,
    });

    const response = { success: true, message: 'Account updated successfully', account: AccountSerializer.serialize(accountDTO) };

    logResponse(200, "Account updated successfully", response); // Log response

    res.status(200).json(response);
  } catch (error) {
    console.error(`Error updating account with ID ${id}:`, error);
    logResponse(500, "Server error", error); // Log error response
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

const patchAccount = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const queryParts = [];
    const values = [];
    let index = 1;

    for (const [key, value] of Object.entries(updates)) {
      queryParts.push(`${key} = $${index++}`);
      values.push(value);
    }

    if (queryParts.length === 0) {
      const response = { success: false, message: 'No fields to update' };
      logResponse(400, "No fields to update", response); // Log response
      return res.status(400).json(response);
    }

    values.push(id, req.user.id);

    const query = `
      UPDATE accounts
      SET ${queryParts.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${index++} AND user_id = $${index}
      RETURNING *;
    `;

    const { rows } = await pool.query(query, values);
    const account = rows[0];

    if (!account) {
      const response = { success: false, message: 'Account not found' };
      logResponse(404, "Account not found", response); // Log response
      return res.status(404).json(response);
    }

    const userQuery = 'SELECT * FROM users WHERE id = $1';
    const { rows: userRows } = await pool.query(userQuery, [req.user.id]);
    const user = userRows[0];

    const accountDTO = new AccountDTO({
      ...account,
      user,
    });

    const response = { success: true, message: 'Account updated successfully', account: AccountSerializer.serialize(accountDTO) };

    logResponse(200, "Account updated successfully", response); // Log response

    res.status(200).json(response);
  } catch (error) {
    console.error(`Error updating account with ID ${id}:`, error);
    logResponse(500, "Server error", error); // Log error response
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

const deleteAccount = async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM accounts WHERE id = $1 AND user_id = $2 RETURNING *';
    const { rows } = await pool.query(query, [id, req.user.id]);
    const account = rows[0];

    if (!account) {
      const response = { success: false, message: 'Account not found' };
      logResponse(404, "Account not found", response); // Log response
      return res.status(404).json(response);
    }

    const response = { success: true, message: 'Account deleted successfully' };

    logResponse(200, "Account deleted successfully", response); // Log response

    res.status(200).json(response);
  } catch (error) {
    console.error(`Error deleting account with ID ${id}:`, error);
    logResponse(500, "Server error", error); // Log error response
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

module.exports = {
  createAccount,
  getAccounts,
  getAccount,
  updateAccount,
  patchAccount,
  putAccount,
  deleteAccount,
};
