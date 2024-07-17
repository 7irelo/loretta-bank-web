const express = require('express');
const router = express.Router();
const { createLoanHandler, getLoanHandler, updateLoanHandler, deleteLoanHandler } = require('../controllers/loanController');

router.post('/', createLoanHandler);
router.get('/:id', getLoanHandler);
router.put('/:id', updateLoanHandler);
router.delete('/:id', deleteLoanHandler);

module.exports = router;
