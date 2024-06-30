const dotenv = require("dotenv");
const Sequelize = require("sequelize");
const sequelize = require("../sequelize");

dotenv.config();

const User = sequelize.define("User", {
  idNumber: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  firstName: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  occupation: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isNumeric: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['email', 'username', 'idNumber'],
    },
  ],
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
    allowNull: false,
  },
  accountType: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['Savings', 'Checking', 'Credit']],
    },
  },
  balance: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0.0,
    validate: {
      min: 0,
    },
  },
  accountStatus: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Active',
    validate: {
      isIn: [['Active', 'Inactive', 'Closed']],
    },
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  indexes: [
    {
      fields: ['userId', 'accountType'],
    },
  ],
});

User.hasMany(Account, { foreignKey: "userId" });
Account.belongsTo(User, { foreignKey: "userId" });

sequelize.sync({ alter: true }).then(() => {
  console.log("Tables created and synchronized");
}).catch((error) => {
  console.error("Error creating tables:", error);
});

module.exports = { User, Account };
