const { accounts, cards } = require("../data");

const getAccounts = (req, res) => {
  res.json(accounts);
};

const getAccount = (req, res) => {
  const { accountID } = req.params;
  const singleAccount = accounts.find(
    (account) => account.id === Number(accountID)
  );
  res.json(singleAccount);
};

const updateAccount = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const account = accounts.find((account) => account.id === Number(id));

  if (!account) {
    return res.status(404).json({ success: false, msg: "Account not found" });
  }
  const newAccounts = accounts.map((account) => {
    if (account.id === Number(id)) {
      account.name = name;
    }
  });
  res.status(200).json(newAccounts);
};

const deleteAccount = (req, res) => {
  const account = accounts.find(
    (account) => account.id === Number(req.params.id)
  );

  if (!account) {
    return res.status(404).json({ success: false, msg: "Account not found" });
  }
  const newAccounts = accounts.filter(
    (account) => account.id === Number(req.params.id)
  );
  res.status(200).json(newAccounts);
};

const queryAccounts = (req, res) => {
  console.log(req.query);

  let sortedAccounts = [...accounts];
  const { search, limit } = req.query;

  if (search) {
    sortedAccounts = sortedAccounts.filter((account) => {
      return account.name.startsWith(search);
    });
  }
  if (limit) {
    sortedAccounts = sortedAccounts.slice(0, Number(limit));
  }
  if (sortedAccounts.length < 1) {
    return res.status(200).send("No accounts found");
  }
  res.status(200).json(sortedAccounts);
};

module.exports = {
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
  queryAccounts,
};
