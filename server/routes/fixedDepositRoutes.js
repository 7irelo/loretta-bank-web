const express = require('express');
const fixedDepositController = require('../controllers/fixedDepositController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, fixedDepositController.getFixedDeposits);
router.get('/:depositID', verifyToken, fixedDepositController.getFixedDeposit);
router.post('/', verifyToken, fixedDepositController.createFixedDeposit);
router.put('/:depositID', verifyToken, fixedDepositController.updateFixedDeposit);
router.delete('/:depositID', verifyToken, fixedDepositController.deleteFixedDeposit);

module.exports = router;
