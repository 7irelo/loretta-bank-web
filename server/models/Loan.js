const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
  loanType: {
    type: DataTypes.STRING, // e.g., personal, mortgage
  },
  amount: {
    type: DataTypes.DOUBLE,
  },
  interestRate: {
    type: DataTypes.FLOAT,
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
