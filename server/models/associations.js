const Account = require("./User");
const Account = require("./Account");
const Transaction = require("./Transaction");

User.hasMany(Account, { foreignKey: "userId" });
Account.belongsTo(User, { foreignKey: "userId" });

Account.hasMany(Transaction, { foreignKey: "accountId" });
Transaction.belongsTo(Account, { foreignKey: "accountId" });

module.exports = { User, Account, Transaction };
