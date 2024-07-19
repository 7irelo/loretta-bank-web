const express = require('express');
const accountController = require('../controllers/accountController');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.use(verifyToken);

router.post('/', accountController.createAccount)
router.get('/', accountController.getAccounts);
router.get('/:id', accountController.getAccount);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

module.exports = router;
