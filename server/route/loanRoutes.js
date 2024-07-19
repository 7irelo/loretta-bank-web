const express = require('express');
const router = express.Router();
const loanController = require('../controller/loanController');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);

router.post('/', loanController.createLoanHandler);
router.get('/:id', loanController.getLoanHandler);
router.put('/:id', loanController.updateLoanHandler);
router.delete('/:id', loanController.deleteLoanHandler);

module.exports = router;