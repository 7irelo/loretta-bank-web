const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - account_id
 *         - type
 *         - amount
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated transaction id
 *         account_id:
 *           type: integer
 *           description: The account ID related to this transaction
 *         type:
 *           type: string
 *           description: Transaction type (Deposit, Withdrawal, Transfer)
 *         amount:
 *           type: number
 *           format: double
 *           description: Transaction amount
 *         date:
 *           type: string
 *           format: date-time
 *           description: Transaction date
 *         description:
 *           type: string
 *           description: Additional details about the transaction
 *         journal_type:
 *           type: string
 *           description: Journal entry type
 *       example:
 *         id: 1
 *         account_id: 1
 *         type: Deposit
 *         amount: 500.00
 *         date: 2024-07-21T10:00:00Z
 *         description: Initial deposit
 *         journal_type: Credit
 */

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       500:
 *         description: Server error
 */
router.post('/', transactionController.createTransaction);

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transaction]
 *     responses:
 *       200:
 *         description: List of transactions
 *       500:
 *         description: Server error
 */
router.get('/', transactionController.getTransactions);

/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Get a transaction by ID
 *     tags: [Transaction]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The transaction ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transaction details
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Server error
 */
router.get('/:id', transactionController.getTransaction);

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     tags: [Transaction]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The transaction ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
