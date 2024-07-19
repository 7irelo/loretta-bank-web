const express = require('express');
const router = express.Router();
const { createCardHandler, getCardHandler, updateCardHandler, deleteCardHandler } = require('../controllers/cardController');
const verifyToken = require('../middlewares/verifyToken');

router.use(verifyToken);

router.post('/', createCardHandler);
router.get('/:id', getCardHandler);
router.put('/:id', updateCardHandler);
router.delete('/:id', deleteCardHandler);

module.exports = router;
