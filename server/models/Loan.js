const { pool } = require('../config/database');

const createLoanTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS loans (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR REFERENCES users(idNumber) NOT NULL,
      account_id INTEGER REFERENCES accounts(id) NOT NULL,
      loan_type VARCHAR NOT NULL CHECK (loan_type IN ('Personal', 'Mortgage', 'Auto', 'Student')),
      amount DOUBLE PRECISION NOT NULL,
      interest_rate DOUBLE PRECISION NOT NULL,
      term INTEGER NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

createLoanTable().catch(err => console.error('Error creating loan table:', err));

module.exports = { createLoanTable };
