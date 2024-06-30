const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Account = sequelize.define("Account", {
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
    allowNull: false,
  },
  accountType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Savings', 'Checking', 'Credit']],
    },
  },
  balance: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0.0,
  },
  accountStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Active',
    validate: {
      isIn: [['Active', 'Inactive', 'Closed']],
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  indexes: [
    {
      fields: ['userId', 'accountType'],
    },
  ],
});

module.exports = Account;
