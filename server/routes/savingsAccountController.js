const express = require('express');
const savingsAccountController = require('../controllers/savingsAccountController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, savingsAccountController.getSavingsAccounts);
router.get('/:accountID', verifyToken, savingsAccountController.getSavingsAccount);
router.post('/', verifyToken, savingsAccountController.createSavingsAccount);
router.put('/:accountID', verifyToken, savingsAccountController.updateSavingsAccount);
router.delete('/:accountID', verifyToken, savingsAccountController.deleteSavingsAccount);

module.exports = router;
