const dotenv = require("dotenv");
const Sequelize = require("sequelize");

dotenv.config();

const sequelize = new Sequelize("lorettabank", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define("User", {
  idNumber: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING(50),
  },
  lastName: {
    type: Sequelize.STRING(50),
  },
  address: {
    type: Sequelize.STRING,
  },
  dateOfBirth: {
    type: Sequelize.DATEONLY,
  },
  occupation: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    isEmail: true,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
});

const Account = sequelize.define("Account", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: Sequelize.STRING,
    references: {
      model: User,
      key: "idNumber",
    },
  },
  accountType: {
    type: Sequelize.STRING,
  },
  balance: {
    type: Sequelize.DOUBLE,
  },
});

// User.hasMany(Account, {foriegnKey: "userId"})
// Account.belongsTo(User, {foriegnKey: "userId"})

sequelize.sync().then(() => {
  console.log("tables created");
});

module.exports = { User, Account };
