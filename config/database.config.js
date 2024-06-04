const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "lorettabank",
});

const db = require("./config/database");
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected...");
});
