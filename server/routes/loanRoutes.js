const express = require('express');
const {
  createLoan,
  getLoan,
  updateLoan,
  deleteLoan
} = require('../controllers/loanController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();
router.use(verifyToken);

router.post('/', createLoan);
router.get('/:id', getLoan);
router.put('/:id', updateLoan);
router.delete('/:id', deleteLoan);

module.exports = router;
