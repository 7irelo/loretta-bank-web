const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);

router.post('/', transactionController.createTransaction);
router.get('/', transactionController.getTransactions);
router.get('/:id', transactionController.getTransaction);
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
