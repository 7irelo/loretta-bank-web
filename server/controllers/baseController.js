const getRoot = (req, res) => {
  res.status(200).json({ message: 'Welcome to the Bank API' });
};

const notFound = (req, res) => {
  res.status(404).json({ error: 'Not Found' });
};

module.exports = {
  getRoot,
  notFound,
};
