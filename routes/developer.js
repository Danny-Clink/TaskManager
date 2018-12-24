const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const developerController = require('../controllers/developerController');
const developer = new developerController();

router.get('/', checkAuth,  (req, res) => {developer.developer(req, res);});
router.post('/completed', checkAuth, (req, res) => {developer.doneTask(req, res);});
router.post('/logout', checkAuth, (req, res) => {developer.logout(req, res);});

module.exports = router;