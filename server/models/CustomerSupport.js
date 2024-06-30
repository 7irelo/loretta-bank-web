const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const CustomerSupport = sequelize.define('CustomerSupport', {
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
  query: {
    type: DataTypes.TEXT,
  },
  response: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.STRING(50), // "open", "resolved", "closed"
  },
}, {
  timestamps: true,
});

User.hasMany(CustomerSupport, { foreignKey: 'userId' });
CustomerSupport.belongsTo(User, { foreignKey: 'userId' });

module.exports = CustomerSupport;
