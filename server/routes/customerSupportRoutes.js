const express = require('express');
const router = express.Router();
const { createSupport, getSupport, updateSupport, deleteSupport } = require('../controllers/customerSupportController');
const verifyToken = require('../middlewares/verifyToken');

router.use(verifyToken);

router.post('/', createSupport);
router.get('/:id', getSupport);
router.put('/:id', updateSupport);
router.delete('/:id', deleteSupport);

module.exports = router;
