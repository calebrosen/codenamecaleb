const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// protected route
router.post('/addNew', userController.addNewUser);

module.exports = router;
