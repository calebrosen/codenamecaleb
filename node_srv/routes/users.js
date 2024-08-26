const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

// protected route
router.post('/addNew', authenticateToken, userController.addNewUser);

module.exports = router;
