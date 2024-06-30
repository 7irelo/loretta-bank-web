const express = require('express');
const creditCardController = require('../controllers/creditCardController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();
router.use(verifyToken);

router.post('/', creditCardController.createCreditCard);
router.get('/:id', creditCardController.getCreditCard);
router.put('/:id', creditCardController.updateCreditCard);
router.delete('/:id', creditCardController.deleteCreditCard);

module.exports = router;
