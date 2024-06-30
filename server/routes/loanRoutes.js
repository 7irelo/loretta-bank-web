const express = require('express');
const loanController = require('../controllers/loanController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();
router.use(verifyToken);

router.post('/', loanController.createLoan);
router.get('/:id', loanController.getLoan);
router.put('/:id', loanController.updateLoan);
router.delete('/:id', loanController.deleteLoan);

module.exports = router;
