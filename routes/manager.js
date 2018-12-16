const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const managerController = require('../controllers/managerController');

router.get('/', checkAuth,  managerController.manager);
router.post('/create', checkAuth, managerController.projectCreate);
router.post('/update', checkAuth, managerController.projectUpdate);
router.post('/delete', checkAuth, managerController.projectDelete);

module.exports = router;