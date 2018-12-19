const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const projectController = require('../controllers/projectController');
const tasksController = require('../controllers/tasksController');
const tasks = new tasksController();

router.get('/', checkAuth, projectController.project);
router.post('/create', checkAuth, (req, res) => {tasks.create(req, res);});
router.post('/update', checkAuth, (req, res) => {tasks.update(req, res);});
router.post('/delete', checkAuth, (req, res) => {tasks.delete(req, res);});
router.post('/assign', checkAuth, (req, res) => {tasks.assign(req, res);});

module.exports = router;