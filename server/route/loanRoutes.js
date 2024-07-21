const express = require('express');
const router = express.Router();
const loanController = require('../controller/loanController');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);

/**
 * @swagger
 * components:
 *   schemas:
 *     Loan:
 *       type: object
 *       required:
 *         - user_id
 *         - account_id
 *         - loan_type
 *         - amount
 *         - interest_rate
 *         - term
 *         - start_date
 *         - end_date
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated loan id
 *         user_id:
 *           type: string
 *           description: The user ID who took the loan
 *         account_id:
 *           type: integer
 *           description: The account ID related to the loan
 *         loan_type:
 *           type: string
 *           description: Type of loan (Personal, Mortgage, Auto, Student)
 *         amount:
 *           type: number
 *           format: double
 *           description: Loan amount
 *         interest_rate:
 *           type: number
 *           format: double
 *           description: Interest rate of the loan
 *         term:
 *           type: integer
 *           description: Loan term in months
 *         start_date:
 *           type: string
 *           format: date
 *           description: Loan start date
 *         end_date:
 *           type: string
 *           format: date
 *           description: Loan end date
 *       example:
 *         id: 1
 *         user_id: 0107096245082
 *         account_id: 1
 *         loan_type: Personal
 *         amount: 5000.00
 *         interest_rate: 5.5
 *         term: 24
 *         start_date: 2024-07-01
 *         end_date: 2026-07-01
 */

/**
 * @swagger
 * /api/loans:
 *   post:
 *     summary: Create a new loan
 *     tags: [Loan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Loan'
 *     responses:
 *       201:
 *         description: Loan created successfully
 *       500:
 *         description: Server error
 */
router.post('/', loanController.createLoanHandler);

/**
 * @swagger
 * /api/loans:
 *   get:
 *     summary: Get all loans
 *     tags: [Loan]
 *     responses:
 *       200:
 *         description: List of loans
 *       500:
 *         description: Server error
 */
// router.get('/', loanController.getLoans);

/**
 * @swagger
 * /api/loans/{id}:
 *   get:
 *     summary: Get a loan by ID
 *     tags: [Loan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The loan ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Loan details
 *       404:
 *         description: Loan not found
 *       500:
 *         description: Server error
 */
router.get('/:id', loanController.getLoanHandler);

/**
 * @swagger
 * /api/loans/{id}:
 *   delete:
 *     summary: Delete a loan by ID
 *     tags: [Loan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The loan ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Loan deleted successfully
 *       404:
 *         description: Loan not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', loanController.deleteLoanHandler);

module.exports = router;
