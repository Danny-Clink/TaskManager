const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');

router.get('/', mainController.main);
router.post('/register', registerController.register);
router.post('/login', loginController.checkAuth);

module.exports = router;
