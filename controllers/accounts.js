
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

const getBalance = (req, res) => {
  const query = "SELECT balance FROM users WHERE id = ?";
  db.execute(query, [req.userId], (err, results) => {
    if (err) {
      return res.status(500).send("Server error");
    }
    res.status(200).send({ balance: results[0].balance });
  });
};

const makeDeposit = (req, res) => {
  const { amount } = req.body;

  const updateBalance = "UPDATE users SET balance = balance + ? WHERE id = ?";
  const addTransaction =
    'INSERT INTO transactions (user_id, amount, type) VALUES (?, ?, "credit")';

  db.execute(updateBalance, [amount, req.userId], (err) => {
    if (err) {
      return res.status(500).send("Server error");
    }

    db.execute(addTransaction, [req.userId, amount], (err) => {
      if (err) {
        return res.status(500).send("Server error");
      }
      res.status(200).send("Deposit successful");
    });
  });
};

const makeWithdrawal = (req, res) => {
  const { amount } = req.body;

  const updateBalance =
    "UPDATE users SET balance = balance - ? WHERE id = ? AND balance >= ?";
  const addTransaction =
    'INSERT INTO transactions (user_id, amount, type) VALUES (?, ?, "debit")';

  db.execute(updateBalance, [amount, req.userId, amount], (err, results) => {
    if (err || results.affectedRows === 0) {
      return res.status(400).send("Insufficient funds");
    }

    db.execute(addTransaction, [req.userId, amount], (err) => {
      if (err) {
        return res.status(500).send("Server error");
      }
      res.status(200).send("Withdrawal successful");
    });
  });
};

module.exports = {
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
  queryAccounts,
  getBalance,
  makeDeposit,
  makeWithdrawal,
};
