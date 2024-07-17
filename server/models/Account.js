const { pool } = require('../config/database');

const createAccountTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS accounts (
      id SERIAL PRIMARY KEY,
      userId VARCHAR REFERENCES users(idNumber) NOT NULL,
      accountType VARCHAR NOT NULL CHECK (accountType IN ('Savings', 'Checking', 'Credit')),
      balance DOUBLE PRECISION NOT NULL DEFAULT 0.0,
      accountStatus VARCHAR NOT NULL DEFAULT 'Active' CHECK (accountStatus IN ('Active', 'Inactive', 'Closed')),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

createAccountTable().catch(err => console.error('Error creating account table:', err));

module.exports = { createAccountTable };
