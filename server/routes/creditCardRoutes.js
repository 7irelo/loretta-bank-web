const express = require('express');
const creditCardController = require('../controllers/creditCardController');

const router = express.Router();

router.post('/', creditCardController.createCreditCard);
router.get('/:id', creditCardController.getCreditCard);
router.put('/:id', creditCardController.updateCreditCard);
router.delete('/:id', creditCardController.deleteCreditCard);

module.exports = router;
