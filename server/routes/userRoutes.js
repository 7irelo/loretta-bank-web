const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();
router.use(verifyToken);

router.post('/', userController.createUser);
router.get('/:idNumber', userController.getUser);
router.put('/:idNumber', userController.updateUser);
router.delete('/:idNumber', userController.deleteUser);

module.exports = router;
