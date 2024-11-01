const express = require('express');
const accountController = require('../controller/accountController');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

// Apply authentication middleware for all routes                                           
router.use(verifyToken);

/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       required:
 *         - account_number
 *         - name
 *         - user_id
 *         - account_type
 *         - available_balance
 *         - latest_balance
 *         - account_status
 *         - image_url
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated account ID
 *         account_number:
 *           type: string
 *           description: Unique 13-character account number
 *         name:
 *           type: string
 *           description: Account name or label
 *         user_id:
 *           type: string
 *           description: ID of the user who owns the account
 *         account_type:
 *           type: string
 *           description: Type of the account (Savings, Cheque, Credit)
 *           enum: [Savings, Cheque, Credit]
 *         available_balance:
 *           type: number
 *           format: double
 *           description: The current available balance
 *           default: 0.0
 *         latest_balance:
 *           type: number
 *           format: double
 *           description: The most recent balance
 *           default: 0.0
 *         account_status:
 *           type: string
 *           description: Status of the account (Active, Inactive, Closed)
 *           enum: [Active, Inactive, Closed]
 *           default: Active
 *         image_url:
 *           type: string
 *           description: URL to the account's associated image
 *           maxLength: 50
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the account was created
 *           default: 'CURRENT_TIMESTAMP'
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the account was last updated
 *           default: 'CURRENT_TIMESTAMP'
 *       example:
 *         id: 1
 *         account_number: "1234567890123"
 *         name: "Personal Savings"
 *         user_id: "0107096245082"
 *         account_type: "Savings"
 *         available_balance: 7554.56
 *         latest_balance: 6508.88
 *         account_status: "Active"
 *         image_url: "https://example.com/image.png"
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
 *         description: Account successfully created
 *       500:
 *         description: Internal server error
 */
router.post('/', accountController.createAccount);

/**
 * @swagger
 * /api/accounts:
 *   get:
 *     summary: Retrieve all accounts
 *     tags: [Account]
 *     responses:
 *       200:
 *         description: List of all accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 *       500:
 *         description: Internal server error
 */
router.get('/', accountController.getAccounts);

/**
 * @swagger
 * /api/accounts/{id}:
 *   get:
 *     summary: Get account details by ID
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique account ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Account details fetched successfully
 *       404:
 *         description: Account not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', accountController.getAccount);

/**
 * @swagger
 * /api/accounts/{id}:
 *   put:
 *     summary: Fully update account by ID
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique account ID
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
 *         description: Internal server error
 */
router.put('/:id', accountController.updateAccount);

/**
 * @swagger
 * /api/accounts/{id}:
 *   patch:
 *     summary: Partially update account by ID
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique account ID
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
 *         description: Account partially updated successfully
 *       400:
 *         description: No fields to update
 *       404:
 *         description: Account not found
 *       500:
 *         description: Internal server error
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
 *         description: Unique account ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       404:
 *         description: Account not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', accountController.deleteAccount);

module.exports = router;