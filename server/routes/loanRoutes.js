const express = require('express');
const router = express.Router();
const { createLoanHandler, getLoanHandler, updateLoanHandler, deleteLoanHandler } = require('../controllers/loanController');
const verifyToken = require('../middlewares/verifyToken');

router.use(verifyToken);

router.post('/', createLoanHandler);
router.get('/:id', getLoanHandler);
router.put('/:id', updateLoanHandler);
router.delete('/:id', deleteLoanHandler);

module.exports = router;