const express = require('express');
const router = express.Router();
const vacationCalcController = require('../controllers/vacationCalcController');

// create new vacation 
router.post('/createVacationName', vacationCalcController.createName);

// fetch vacations using userID
router.post('/fetchVacations', vacationCalcController.fetchVacations);

// import/update vacation start/end and from/to
router.post('/insertToFromAndDates', vacationCalcController.insertToFromAndDates);

// loading previous vacation
router.post('/loadPreviousVacation', vacationCalcController.loadPreviousVacation);

// getting all vacation info for main screen
router.post('/retrieveVacation', vacationCalcController.retrieveVacation);

module.exports = router;
