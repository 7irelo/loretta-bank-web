const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/:idNumber', userController.getUser);
router.put('/:idNumber', userController.updateUser);
router.delete('/:idNumber', userController.deleteUser);

module.exports = router;
