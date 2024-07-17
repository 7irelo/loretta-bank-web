const express = require('express');
const router = express.Router();
const { createTransaction, getTransaction, getTransactions, deleteTransaction } = require('../controllers/transactionController');

router.post('/', createTransaction);
router.get('/', getTransactions);
router.get('/:id', getTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;
