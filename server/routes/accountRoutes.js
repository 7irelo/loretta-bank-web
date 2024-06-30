const express = require('express');
const { 
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
  queryAccounts,
  getCPJTransactions,
  getCRJTransactions } = require('../controllers/accountController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();
router.use(verifyToken);

router.get('/', getAccounts);
router.get('/:accountID', getAccount);
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount);
router.get('/query', queryAccounts);
router.get('/transactions/cpj', getCPJTransactions);
router.get('/transactions/crj', getCRJTransactions);

module.exports = router;
