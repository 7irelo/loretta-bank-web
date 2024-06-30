const User = require("./User");
const Account = require("./Account");
const Transaction = require("./Transaction");
const Loan = require("./Loan");
const CreditCard = require("./CreditCard");
const SavingsAccount = require("./SavingsAccount");
const FixedDeposit = require("./FixedDeposit");
const CustomerSupport = require("./CustomerSupport");

User.hasMany(Account, { foreignKey: 'userId' });
Account.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

Account.hasMany(Transaction, { foreignKey: 'accountId' });
Transaction.belongsTo(Account, { foreignKey: 'accountId' });

User.hasMany(Loan, { foreignKey: 'userId' });
Account.hasMany(Loan, { foreignKey: 'accountId' });
Loan.belongsTo(User, { foreignKey: 'userId' });
Loan.belongsTo(Account, { foreignKey: 'accountId' });

User.hasMany(CreditCard, { foreignKey: 'userId' });
Account.hasMany(CreditCard, { foreignKey: 'accountId' });
CreditCard.belongsTo(User, { foreignKey: 'userId' });
CreditCard.belongsTo(Account, { foreignKey: 'accountId' });

User.hasMany(SavingsAccount, { foreignKey: 'userId' });
SavingsAccount.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(FixedDeposit, { foreignKey: 'userId' });
FixedDeposit.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(CustomerSupport, { foreignKey: 'userId' });
CustomerSupport.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, 
                  Account, 
                  Transaction, 
                  Loan, 
                  CreditCard, 
                  SavingsAccount, 
                  FixedDeposit, 
                  CustomerSupport };
