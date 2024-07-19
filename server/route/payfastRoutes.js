const express = require('express');
const pf = require('../config/payfast');
const router = express.Router();

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
