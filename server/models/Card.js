const { pool } = require('../config/database');

const createCardTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS cards (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR REFERENCES users(id) NOT NULL,
      account_id INTEGER REFERENCES accounts(id) NOT NULL,
      card_number VARCHAR(16) NOT NULL,
      expiry_date DATE NOT NULL,
      cvv VARCHAR(3) NOT NULL,
      credit_limit DOUBLE PRECISION NOT NULL,
      balance DOUBLE PRECISION NOT NULL DEFAULT 0.0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

createCardTable().catch(err => console.error('Error creating card table:', err));

module.exports = { createCardTable };
