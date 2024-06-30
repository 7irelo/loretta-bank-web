const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Account = require('./Account');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  accountId: {
    type: DataTypes.INTEGER,
    references: {
      model: Account,
      key: 'id',
    },
  },
  type: {
    type: DataTypes.STRING, // 'credit' or 'debit'
    allowNull: false,
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  description: {
    type: DataTypes.STRING,
  },
  journalType: {
    type: DataTypes.STRING, // 'CPJ', 'CRJ', 'DJ', etc.
  },
});

module.exports = Transaction;
