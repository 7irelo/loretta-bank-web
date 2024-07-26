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
 *         - account_type
 *         - available_balance
 *         - latest_balance
 *         - account_status
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated account ID
 *         name:
 *           type: string
 *           description: Account's name
 *         user_id:
 *           type: string
 *           description: Account holder's ID
 *         account_type:
 *           type: string
 *           description: Account type (Cheque, Savings, Credit)
 *         available_balance:
 *           type: number
 *           format: double
 *           description: Account's available balance
 *         latest_balance:
 *           type: number
 *           format: double
 *           description: Account's latest balance
 *         account_status:
 *           type: string
 *           description: Account status (Active, Inactive, Suspended)
 *         image_url:
 *           type: string
 *           description: URL for the account's image
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Account creation date
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Last account update date
 *       example:
 *         id: 1
 *         name: mymomoacc
 *         user_id: 0107096245082
 *         account_type: Cheque
 *         available_balance: 7554.56
 *         latest_balance: 6508.88
 *         account_status: Active
 */

/**
 * @swagger
 * /api/accounts:
 *   post:
 *     summary: Create a new account
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       201:
 *         description: Account created successfully
 *       500:
 *         description: Server error
 */
router.post('/', accountController.createAccount);

/**
 * @swagger
 * /api/accounts:
 *   get:
 *     summary: Get all accounts
 *     tags: [Account]
 *     responses:
 *       200:
 *         description: List of accounts
 *       500:
 *         description: Server error
 */
router.get('/', accountController.getAccounts);

/**
 * @swagger
 * /api/accounts/{id}:
 *   get:
 *     summary: Get an account by ID
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The account ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Account details
 *       404:
 *         description: Account not found
 *       500:
 *         description: Server error
 */
router.get('/:id', accountController.getAccount);

/**
 * @swagger
 * /api/accounts/{id}:
 *   put:
 *     summary: Update an account by ID
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The account ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       200:
 *         description: Account updated successfully
 *       404:
 *         description: Account not found
 *       500:
 *         description: Server error
 */
router.put('/:id', accountController.updateAccount);

/**
 * @swagger
 * /api/accounts/{id}:
 *   patch:
 *     summary: Partially update an account by ID
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The account ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account_type:
 *                 type: string
 *                 description: Updated account type
 *               available_balance:
 *                 type: number
 *                 format: double
 *                 description: Updated available balance
 *               account_status:
 *                 type: string
 *                 description: Updated account status
 *     responses:
 *       200:
 *         description: Account updated successfully
 *       400:
 *         description: No fields to update
 *       404:
 *         description: Account not found
 *       500:
 *         description: Server error
 */
router.patch('/:id', accountController.patchAccount);

/**
 * @swagger
 * /api/accounts/{id}:
 *   delete:
 *     summary: Delete an account by ID
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The account ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       404:
 *         description: Account not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', accountController.deleteAccount);

module.exports = router;