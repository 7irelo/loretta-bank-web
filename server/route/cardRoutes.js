const express = require('express');
const router = express.Router();
const cardController = require('../controller/cardController');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);

router.post('/', cardController.createCardHandler);
router.get('/:id', cardController.getCardHandler);
router.put('/:id', cardController.updateCardHandler);
router.delete('/:id', cardController.deleteCardHandler);

module.exports = router;
