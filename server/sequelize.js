const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("lorettabank", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
