const express = require('express');
const router = express.Router();
const vacationCalcController = require('../controllers/vacationCalcController');

// create new vacation 
router.post('/createVacationName', vacationCalcController.createName);

// fetch vacations using userID
router.post('/fetchVacations', vacationCalcController.fetchVacations);

// import/update vacation start/end and from/to
router.post('/insertToFromAndDates', vacationCalcController.insertToFromAndDates);

module.exports = router;
