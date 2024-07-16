const { Sequelize } = require('sequelize');
const mysql = require('mysql2');
const { Pool } = require('pg')
const dotenv = require('dotenv');
const { database } = require('pg/lib/defaults');

dotenv.config();

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "root",
  password: "password",
  database: "lorettaexpress"
});


const sequelize = new Sequelize(process.env.MYSQL_URL, {
  dialect: process.env.DATABASE_DIALECT,
  operationsAliases: false,
  logging: false,
  pool : {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
}
});

// const pool = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE
// }).promise();

// async function getAll() {
//   const [rows] = await pool.query("SELECT * FROM users")
//   console.log(rows)
// }
// getAll();

module.exports = { sequelize, pool };