const express = require('express');
const paypal = require('../config/paypal');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PayPalPayment:
 *       type: object
 *       required:
 *         - amount
 *         - description
 *       properties:
 *         amount:
 *           type: string
 *           description: The total amount to be paid
 *         description:
 *           type: string
 *           description: Description of the payment
 *       example:
 *         amount: '1.00'
 *         description: 'This is the payment description.'
 */

/**
 * @swagger
 * /api/paypal/pay:
 *   post:
 *     summary: Initiate a payment via PayPal
 *     tags: [PayPal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PayPalPayment'
 *     responses:
 *       302:
 *         description: Redirects to PayPal payment page
 *       500:
 *         description: Server error
 */
router.post('/pay', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://return.url",
      "cancel_url": "http://cancel.url"
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": "item",
          "sku": "item",
          "price": "1.00",
          "currency": "USD",
          "quantity": 1
        }]
      },
      "amount": {
        "currency": "USD",
        "total": "1.00"
      },
      "description": "This is the payment description."
    }]
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

/**
 * @swagger
 * /api/paypal/success:
 *   get:
 *     summary: Handle successful PayPal payment
 *     tags: [PayPal]
 *     parameters:
 *       - in: query
 *         name: PayerID
 *         required: true
 *         description: PayPal payer ID
 *         schema:
 *           type: string
 *       - in: query
 *         name: paymentId
 *         required: true
 *         description: PayPal payment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment executed successfully
 *       500:
 *         description: Server error
 */
router.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": "1.00"
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      res.send('Success');
    }
  });
});

/**
 * @swagger
 * /api/paypal/cancel:
 *   get:
 *     summary: Handle PayPal payment cancellation
 *     tags: [PayPal]
 *     responses:
 *       200:
 *         description: Payment cancelled
 */
router.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router;
