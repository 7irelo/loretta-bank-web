const { pool } = require('../config/database');

const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR PRIMARY KEY,
      firstName VARCHAR(50) NOT NULL,
      lastName VARCHAR(50) NOT NULL,
      address VARCHAR NOT NULL,
      dateOfBirth DATE NOT NULL,
      occupation VARCHAR,
      phone VARCHAR NOT NULL,
      email VARCHAR UNIQUE NOT NULL,
      username VARCHAR UNIQUE NOT NULL,
      password VARCHAR NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

createUserTable().catch(err => console.error('Error creating user table:', err));

module.exports = { createUserTable };
