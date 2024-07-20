const { pool } = require('../config/database');

const createAccountTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS accounts (
      id SERIAL PRIMARY KEY,
      name VARCHAR NOT NULL,
      user_id VARCHAR REFERENCES users(id) NOT NULL,
      account_type VARCHAR NOT NULL CHECK (account_type IN ('Savings', 'Cheque', 'Credit')),
      available_balance DOUBLE PRECISION NOT NULL DEFAULT 0.0,
      latest_balance DOUBLE PRECISION NOT NULL DEFAULT 0.0,
      account_status VARCHAR NOT NULL DEFAULT 'Active' CHECK (account_status IN ('Active', 'Inactive', 'Closed')),
      image_url VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

createAccountTable().catch(err => console.error('Error creating account table:', err));

module.exports = { createAccountTable };
