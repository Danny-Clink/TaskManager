const express = require('express');
const router = express.Router();

const developerController = require('../controllers/developerController');

router.get('/', developerController.developer);

module.exports = router;