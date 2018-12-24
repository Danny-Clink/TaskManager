const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const managerController = require('../controllers/managerController');
const projects = new managerController();

router.get('/', checkAuth, (req, res) => {return projects.manager(req, res);});
router.post('/create', checkAuth, (req, res) => {return projects.createProject(req, res);});
router.post('/update', checkAuth, (req, res) => {return projects.updateData(req, res);});
router.post('/delete', checkAuth, (req, res) => {return projects.deleteData(req, res);});
router.post('/logout', checkAuth, (req, res) => {return projects.logout(req, res);});

module.exports = router;