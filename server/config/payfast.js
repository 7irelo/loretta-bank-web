const payfast = require('payfast-nodejs');

const pf = new payfast({
  merchant_id: process.env.PAYFAST_MERCHANT_ID,
  merchant_key: process.env.PAYFAST_MERCHANT_KEY,
  passphrase: process.env.PAYFAST_PASSPHRASE,
  sandbox: true // or false for live environment
});

module.exports = pf;
