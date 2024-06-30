const express = require('express');
const loanController = require('../controllers/loanController');

const router = express.Router();

router.post('/', loanController.createLoan);
router.get('/:id', loanController.getLoan);
router.put('/:id', loanController.updateLoan);
router.delete('/:id', loanController.deleteLoan);

module.exports = router;
