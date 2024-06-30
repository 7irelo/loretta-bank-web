const { User, Account, Transaction } = require('../models/associations');

const getRoot = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user is set by verifyToken middleware

    // Fetch user data
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch account data
    const accounts = await Account.findAll({ where: { userId: userId } });

    // Fetch transaction data
    const transactions = await Transaction.findAll({
      include: {
        model: Account,
        where: { userId: userId }
      }
    });

    res.status(200).json({
      user: user.toJSON(),
      accounts: accounts.map(account => account.toJSON()),
      transactions: transactions.map(transaction => transaction.toJSON())
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const notFound = (req, res) => {
  res.status(404).json({ error: 'Not Found' });
};

module.exports = {
  getRoot,
  notFound,
};
