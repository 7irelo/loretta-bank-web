const express = require('express');
const { createCreditCard, getCreditCard, updateCreditCard,  deleteCreditCard } = require('../controllers/creditCardController');

const router = express.Router();

router.post('/', createCreditCard);
router.get('/:id', getCreditCard);
router.put('/:id', updateCreditCard);
router.delete('/:id', deleteCreditCard);

module.exports = router;
