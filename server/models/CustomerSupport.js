const { pool } = require('../config/database');

const createCustomerSupportTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS customer_support (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR REFERENCES users(idNumber) NOT NULL,
      query TEXT NOT NULL,
      response TEXT,
      status VARCHAR NOT NULL CHECK (status IN ('Open', 'Pending', 'Resolved', 'Closed')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

createCustomerSupportTable().catch(err => console.error('Error creating customer support table:', err));

module.exports = { createCustomerSupportTable };
