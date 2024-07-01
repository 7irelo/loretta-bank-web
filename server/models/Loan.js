const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Account = require('./Account');

const Loan = sequelize.define("Loan", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: "idNumber",
    },
  },
  accountId: {
    type: DataTypes.INTEGER,
    references: {
      model: Account,
      key: 'id',
    },
  },
  loanType: {
    type: DataTypes.STRING, // e.g., personal, mortgage
  },
  amount: {
    type: DataTypes.DOUBLE,
  },
  interestRate: {
    type: DataTypes.FLOAT,
  },
  term: {
    type: DataTypes.INTEGER,
    allowNull: false, // In months
  },
  startDate: {
    type: DataTypes.DATE,
  },
  endDate: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: true,
});

module.exports = Loan;
