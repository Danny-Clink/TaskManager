const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');

const main = new mainController();
const register = new registerController();
const login = new loginController();

router.get('/', (req, res) => {main.main(req, res);});
router.post('/register', (req, res) => {register.register(req, res);});
router.post('/login', (req, res) => {login.checkAuth(req, res);});

module.exports = router;