const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const FixedDeposit = sequelize.define('FixedDeposit', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'idNumber',
    },
  },
  amount: {
    type: DataTypes.DOUBLE,
  },
  interestRate: {
    type: DataTypes.FLOAT,
  },
  maturityDate: {
    type: DataTypes.DATE,
  },
});

module.exports = FixedDeposit;
