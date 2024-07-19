const { pool } = require('../config/database');

const createTransactionTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      account_id INTEGER REFERENCES accounts(id),
      type VARCHAR NOT NULL,
      amount DOUBLE PRECISION NOT NULL,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      description VARCHAR,
      journal_type VARCHAR
    );
  `;
  await pool.query(query);
};

createTransactionTable().catch(err => console.error('Error creating transaction table:', err));

module.exports = { createTransactionTable };
