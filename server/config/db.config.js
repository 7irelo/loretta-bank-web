const { dropTablesAndSequences } = require("../model/DropTables");
const { createUserTable } = require("../model/User");
const { createAccountTable } = require("../model/Account");
const { createTransactionTable } = require("../model/Transaction");
const { createCardTable } = require("../model/Card");
const { createLoanTable } = require("../model/Loan");
const { createCustomerSupportTable } = require("../model/CustomerSupport");

const createDatabase = async () => {
  try {
    await dropTablesAndSequences(); // Drop tables, sequences, and types first
    await createUserTable();
    await createAccountTable();
    await createTransactionTable();
    await createCardTable();
    await createLoanTable();
    await createCustomerSupportTable();
    console.log('All tables created successfully.');
  } catch (err) {
    console.error('Error creating tables:', err);
  }
};

module.exports = { createDatabase };