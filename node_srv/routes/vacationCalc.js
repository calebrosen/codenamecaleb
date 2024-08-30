const express = require('express');
const router = express.Router();
const vacationCalcController = require('../controllers/vacationCalcController');

// create new vacation 
router.post('/createVacationName', vacationCalcController.createName);

// fetch vacations using userID
router.post('/fetchVacations', vacationCalcController.fetchVacations);

module.exports = router;
