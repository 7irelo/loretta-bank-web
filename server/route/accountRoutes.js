const express = require('express');
const accountController = require('../controller/accountController');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.use(verifyToken);

/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       required:
 *         - name
 *         - user_id
 *         - account_type
 *         - available_balance
 *         - latest_balance
 *         - account_status
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated account id
 *         name:
 *           type: string
 *           description: Account's name
 *         user_id:
 *           type: string
 *           description: Account holder's id
 *         account_type:
 *           type: string
 *           description: Account type (Cheque, Savings, Credit)
 *         available_balance:
 *           type: double
 *           description: Account's available balance
 *         latest_balance:
 *           type: double
 *           description: Account's latest balance
 *       example:
 *         id: 1
 *         name: mymomoacc
 *         user_id: 0107096245082
 *         account_type: Cheque
 *         available_balance: 7554.56
 *         latest_balance: 6508.88
 */

router.post('/', accountController.createAccount)
router.get('/', accountController.getAccounts);
router.get('/:id', accountController.getAccount);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

module.exports = router;
