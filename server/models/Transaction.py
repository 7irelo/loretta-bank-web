// models/Transaction.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Account = require("./Account");

const Transaction = sequelize.define("Transaction", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  accountId: {
    type: DataTypes.INTEGER,
    references: {
      model: Account,
      key: "id",
    },
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("credit", "debit"),
    allowNull: false,
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
});

module.exports = Transaction;
