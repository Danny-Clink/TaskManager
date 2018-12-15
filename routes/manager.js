const express = require('express');
const router = express.Router();

const managerController = require('../controllers/managerController');

router.get('/', managerController.manager);

module.exports = router;