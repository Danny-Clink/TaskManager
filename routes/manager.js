const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const managerController = require('../controllers/managerController');
const projects = new managerController();

router.get('/', checkAuth, (req, res) => {return projects.manager(req, res);});
router.post('/create', checkAuth, (req, res) => {return projects.create(req, res);});
router.post('/update', checkAuth, (req, res) => {return projects.update(req, res);});
router.post('/delete', checkAuth, (req, res) => {return projects.delete(req, res);});

module.exports = router;