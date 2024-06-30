const User = require("./User");
const Account = require("./Account");
const Transaction = require("./Transaction");
const Loan = require("./Loan");
const CreditCard = require("./CreditCard");


User.hasMany(Account, { foreignKey: 'userId' });
Account.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

Account.hasMany(Transaction, { foreignKey: 'accountId' });
Transaction.belongsTo(Account, { foreignKey: 'accountId' });

User.hasMany(Loan, { foreignKey: 'userId' });
Loan.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(CreditCard, { foreignKey: 'userId' });
CreditCard.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Account, Transaction, Loan, CreditCard };
