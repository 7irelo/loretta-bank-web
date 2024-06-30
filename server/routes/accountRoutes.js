const express = require('express');
const accountController = require('../controllers/accountController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();
router.use(verifyToken);

router.get('/', accountController.getAccounts);
router.get('/:accountID', accountController.getAccount);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);
router.get('/query', accountController.queryAccounts);
router.get('/transactions/cpj', accountController.getCPJTransactions);
router.get('/transactions/crj', accountController.getCRJTransactions);

module.exports = router;
