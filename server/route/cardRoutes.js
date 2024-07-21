const express = require('express');
const router = express.Router();
const cardController = require('../controller/cardController');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);

/**
 * @swagger
 * components:
 *   schemas:
 *     Card:
 *       type: object
 *       required:
 *         - user_id
 *         - account_id
 *         - card_number
 *         - expiry_date
 *         - cvv
 *         - credit_limit
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated card id
 *         user_id:
 *           type: string
 *           description: The user ID associated with this card
 *         account_id:
 *           type: integer
 *           description: The account ID associated with this card
 *         card_number:
 *           type: string
 *           description: Card number
 *         expiry_date:
 *           type: string
 *           format: date
 *           description: Card expiry date
 *         cvv:
 *           type: string
 *           description: Card CVV
 *         credit_limit:
 *           type: number
 *           format: double
 *           description: Card credit limit
 *         balance:
 *           type: number
 *           format: double
 *           description: Current card balance
 *       example:
 *         id: 1
 *         user_id: 0107096245082
 *         account_id: 1
 *         card_number: 1234567812345678
 *         expiry_date: 2025-12-31
 *         cvv: 123
 *         credit_limit: 5000.00
 *         balance: 1000.00
 */

/**
 * @swagger
 * /api/cards:
 *   post:
 *     summary: Create a new card
 *     tags: [Card]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Card'
 *     responses:
 *       201:
 *         description: Card created successfully
 *       500:
 *         description: Server error
 */
router.post('/', cardController.createCardHandler);

/**
 * @swagger
 * /api/cards:
 *   get:
 *     summary: Get all cards
 *     tags: [Card]
 *     responses:
 *       200:
 *         description: List of cards
 *       500:
 *         description: Server error
 */
router.get('/', cardController.getCardsHandler);

/**
 * @swagger
 * /api/cards/{id}:
 *   get:
 *     summary: Get a card by ID
 *     tags: [Card]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The card ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Card details
 *       404:
 *         description: Card not found
 *       500:
 *         description: Server error
 */
router.get('/:id', cardController.getCardHandler);

/**
 * @swagger
 * /api/cards/{id}:
 *   delete:
 *     summary: Delete a card by ID
 *     tags: [Card]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The card ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Card deleted successfully
 *       404:
 *         description: Card not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', cardController.deleteCardHandler);

module.exports = router;
