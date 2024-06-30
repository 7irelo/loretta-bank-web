const express = require('express');
const { getRoot, notFound } = require('../controllers/rootController');

const router = express.Router();

router.get('/', getRoot);
router.all('*', notFound );

module.exports = router;
