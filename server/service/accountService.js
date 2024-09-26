const { pool } = require("../config/database");
const redisClient = require("../config/redis.config");
const AccountMapper = require("../mappers/AccountMapper");

const createAccount = async (userId, accountType) => {
  try {
    // Insert new account into the database
    const insertQuery = `
      INSERT INTO accounts (user_id, account_type)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const insertValues = [userId, accountType];
    const { rows: accountRows } = await pool.query(insertQuery, insertValues);
    const account = accountRows[0];

    // Check if account details are cached
    const cacheKey = `account:${account.id}`;
    const cachedAccountData = await redisClient.get(cacheKey);

    if (cachedAccountData) {
      console.log("Serving from cache");
      return JSON.parse(cachedAccountData);
    }

    // Fetch account details, including related data
    const query = `
      SELECT 
        a.*, u.*, 
        c.id AS card_id, c.card_number, c.expiry_date, c.cvv, c.credit_limit, c.balance AS card_balance, 
        t.id AS transaction_id, t.transaction_type, t.amount, t.date, t.description, t.journal_type,
        l.id AS loan_id, l.loan_type, l.amount AS loan_amount, l.interest_rate, l.term, l.start_date, l.end_date
      FROM accounts a
      JOIN users u ON a.user_id = u.id
      LEFT JOIN cards c ON c.account_id = a.id
      LEFT JOIN transactions t ON t.account_id = a.id
      LEFT JOIN loans l ON l.account_id = a.id
      WHERE a.id = $1
      ORDER BY t.date DESC
      LIMIT 5;
    `;
    const values = [account.id];
    const { rows } = await pool.query(query, values);

    // Use AccountMapper to structure the response
    const accountData = AccountMapper.mapAccountData(rows);

    // Cache the account data in Redis (1 hour expiration)
    await redisClient.set(cacheKey, JSON.stringify(accountData), "EX", 60 * 60);

    return accountData;
  } catch (error) {
    console.error("Service Layer Error:", error);
    throw error;
  }
};

const getAccounts = async (userId) => {
  try {
    const cacheKey = `accounts:user:${userId}`;

    // Check if the accounts for the user are cached
    const cachedAccountsData = await redisClient.get(cacheKey);

    if (cachedAccountsData) {
      console.log("Serving accounts from cache");
      return JSON.parse(cachedAccountsData);
    }

    // Fetch accounts from the database
    const query = `
        SELECT a.*, u.id as user_id, u.first_name, u.last_name, u.email, u.date_of_birth, u.address, u.occupation, u.phone, u.username,
          c.id AS card_id, c.card_number, c.expiry_date, c.cvv, c.credit_limit, c.balance AS card_balance, 
          t.id AS transaction_id, t.transaction_type, t.amount, t.date, t.description, t.journal_type,
          l.id AS loan_id, l.loan_type, l.amount AS loan_amount, l.interest_rate, l.term, l.start_date, l.end_date
        FROM accounts a
        JOIN users u ON a.user_id = u.id
        LEFT JOIN cards c ON c.account_id = a.id
        LEFT JOIN transactions t ON t.account_id = a.id
        LEFT JOIN loans l ON l.account_id = a.id
        WHERE a.user_id = $1
        ORDER BY t.date DESC;
      `;
    const { rows } = await pool.query(query, [userId]);

    const accountsData =
      rows.length > 0 ? AccountMapper.mapAccountData(rows) : [];

    // Cache the accounts data in Redis (1 hour expiration)
    await redisClient.set(
      cacheKey,
      JSON.stringify(accountsData),
      "EX",
      60 * 60
    );

    return accountsData;
  } catch (error) {
    console.error("Error in AccountService.getAccounts:", error);
    throw error;
  }
};

const getAccount = async (accountId, userId) => {
  try {
    const cacheKey = `account:${accountId}`;

    // Check if account data is cached
    const cachedAccountData = await redisClient.get(cacheKey);
    if (cachedAccountData) {
      console.log("Serving from cache");
      return JSON.parse(cachedAccountData);
    }

    // Query the database to fetch account and related data
    const query = `
        SELECT 
          a.*, u.*, 
          c.id AS card_id, c.card_number, c.expiry_date, c.cvv, c.credit_limit, c.balance AS card_balance, 
          t.id AS transaction_id, t.transaction_type, t.amount, t.date, t.description, t.journal_type,
          l.id AS loan_id, l.loan_type, l.amount AS loan_amount, l.interest_rate, l.term, l.start_date, l.end_date
        FROM accounts a
        JOIN users u ON a.user_id = u.id
        LEFT JOIN cards c ON c.account_id = a.id
        LEFT JOIN transactions t ON t.account_id = a.id
        LEFT JOIN loans l ON l.account_id = a.id
        WHERE a.id = $1 AND a.user_id = $2
        ORDER BY t.date DESC
        LIMIT 5;
      `;
    const values = [accountId, userId];
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return null; // Account not found
    }

    const accountData = AccountMapper.mapAccountData(rows);

    // Cache the account data in Redis for 1 hour
    await redisClient.set(cacheKey, JSON.stringify(accountData), "EX", 60 * 60);

    return accountData;
  } catch (error) {
    console.error(
      `Error in AccountService.getAccount with ID ${accountId}:`,
      error
    );
    throw error;
  }
};

const updateAccount = async (
  accountId,
  userId,
  accountType,
  balance,
  accountStatus
) => {
  try {
    const updateQuery = `
        UPDATE accounts 
        SET account_type = $1, available_balance = $2, account_status = $3, updated_at = CURRENT_TIMESTAMP
        WHERE id = $4 AND user_id = $5
        RETURNING *;
      `;
    const updateValues = [
      accountType,
      balance,
      accountStatus,
      accountId,
      userId,
    ];
    const { rows: updatedRows } = await pool.query(updateQuery, updateValues);

    if (!updatedRows[0]) {
      return null; // Account not found
    }

    const accountData = await getAccount(accountId, userId);

    // Cache the updated account data in Redis for 1 hour
    const cacheKey = `account:${accountId}`;
    await redisClient.set(cacheKey, JSON.stringify(accountData), "EX", 60 * 60);

    return accountData;
  } catch (error) {
    console.error(`Error updating account with ID ${accountId}:`, error);
    throw error;
  }
};

const patchAccount = async (accountId, userId, updates) => {
  try {
    const queryParts = [];
    const values = [];
    let index = 1;

    for (const [key, value] of Object.entries(updates)) {
      queryParts.push(`${key} = $${index++}`);
      values.push(value);
    }

    values.push(accountId, userId);

    const query = `
        UPDATE accounts
        SET ${queryParts.join(", ")}, updated_at = CURRENT_TIMESTAMP
        WHERE id = $${index++} AND user_id = $${index}
        RETURNING *;
      `;

    const { rows: updatedRows } = await pool.query(query, values);

    if (!updatedRows[0]) {
      return null; // Account not found
    }

    const accountData = await getAccount(accountId, userId);

    // Cache the updated account data in Redis for 1 hour
    const cacheKey = `account:${accountId}`;
    await redisClient.set(cacheKey, JSON.stringify(accountData), "EX", 60 * 60);

    return accountData;
  } catch (error) {
    console.error(`Error patching account with ID ${accountId}:`, error);
    throw error;
  }
};

const deleteAccount = async (accountId, userId) => {
  try {
    const deleteQuery = `
        DELETE FROM accounts 
        WHERE id = $1 AND user_id = $2 
        RETURNING *;
      `;
    const { rows } = await pool.query(deleteQuery, [accountId, userId]);

    if (!rows[0]) {
      return null; // Account not found
    }

    // Invalidate the cache for the deleted account
    const cacheKey = `account:${accountId}`;
    await redisClient.del(cacheKey);

    return true;
  } catch (error) {
    console.error(`Error deleting account with ID ${accountId}:`, error);
    throw error;
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
