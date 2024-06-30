const express = require('express');
const { getRoot, notFound } = require('../controllers/rootController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, getRoot);
router.all('*', notFound);

module.exports = router;
