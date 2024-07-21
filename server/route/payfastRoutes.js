const express = require('express');
const pf = require('../config/payfast');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PayFastPayment:
 *       type: object
 *       required:
 *         - amount
 *         - item_name
 *         - item_description
 *       properties:
 *         amount:
 *           type: string
 *           description: The amount to be paid
 *         item_name:
 *           type: string
 *           description: Name of the item
 *         item_description:
 *           type: string
 *           description: Description of the item
 *       example:
 *         amount: '1.00'
 *         item_name: 'Test Item'
 *         item_description: 'This is a test payment'
 */

/**
 * @swagger
 * /api/payfast/pay:
 *   post:
 *     summary: Initiate a payment via PayFast
 *     tags: [PayFast]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PayFastPayment'
 *     responses:
 *       302:
 *         description: Redirects to PayFast payment page
 *       500:
 *         description: Server error
 */
router.post('/pay', (req, res) => {
  const payment = pf.createPayment({
    amount: '1.00',
    item_name: 'Test Item',
    item_description: 'This is a test payment'
  });

  payment
    .then((response) => {
      res.redirect(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

/**
 * @swagger
 * /api/payfast/notify:
 *   post:
 *     summary: Handle PayFast payment notifications
 *     tags: [PayFast]
 *     responses:
 *       200:
 *         description: Payment notification received and handled
 *       500:
 *         description: Server error
 */
router.post('/notify', (req, res) => {
  pf.validate(req.body)
    .then((result) => {
      if (result) {
        // Handle successful payment
        res.send('Payment successful');
      } else {
        // Handle invalid payment
        res.send('Payment invalid');
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
