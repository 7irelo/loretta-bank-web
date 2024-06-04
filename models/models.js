const Sequelize = require("sequelize");
const sequelize = new Sequelize("lorettabank", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  dateOfBirth: {
    type: Sequelize.DATEONLY,
  },
  idNumber: {
    type: Sequelize.STRING,
    unique: true,
  },
  creditScore: {
    type: Sequelize.FLOAT,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  email: {
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
  accountType: {
    type: Sequelize.STRING,
  },
  balance: {
    type: Sequelize.DOUBLE,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

// User.hasMany(Account, {foriegnKey: "userId"})
// Account.belongsTo(User, {foriegnKey: "userId"})

sequelize.sync().then(() => {
  console.log("tables created");
});

(module.exports = User), Account;
