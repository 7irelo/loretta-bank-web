const { dropTablesAndSequences } = require("../models/DropTables");
const { createUserTable } = require("../models/User");
const { createAccountTable } = require("../models/Account");
const { createTransactionTable } = require("../models/Transaction");
const { createCardTable } = require("../models/Card");
const { createLoanTable } = require("../models/Loan");
const { createCustomerSupportTable } = require("../models/CustomerSupport");

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