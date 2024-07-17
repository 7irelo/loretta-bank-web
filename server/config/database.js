const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  host: process.env.PG_HOST || "localhost",
  port: process.env.PG_PORT || 5432,
  user: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD || "password",
  database: process.env.PG_DATABASE || "lorettaexpress"
});

module.exports = { pool };
