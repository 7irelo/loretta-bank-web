const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Account = require('./Account');

const CreditCard = sequelize.define("CreditCard", {
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
  cardNumber: {
    type: DataTypes.STRING,
    unique: true,
  },
  expiryDate: {
    type: DataTypes.DATE,
  },
  cvv: {
    type: DataTypes.STRING,
  },
  creditLimit: {
    type: DataTypes.DOUBLE,
  },
  balance: {
    type: DataTypes.DOUBLE,
  },
}, {
  timestamps: true,
});

module.exports = CreditCard;
