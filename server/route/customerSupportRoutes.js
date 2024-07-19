const express = require('express');
const router = express.Router();
const customerSupportController = require('../controller/customerSupportController');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);

router.post('/', customerSupportController.createSupport);
router.get('/:id', customerSupportController.getSupport);
router.put('/:id', customerSupportController.updateSupport);
router.delete('/:id', customerSupportController.deleteSupport);

module.exports = router;
