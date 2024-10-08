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

// adding traveler
router.post('/addTraveler', vacationCalcController.addTraveler);

// saving travelers
router.post('/saveTravelers', vacationCalcController.saveTravelers);

// editing vacation name
router.post('/editVacationName', vacationCalcController.editVacationName);

//editing vacation dates and to/from
router.post('/updateVacationToFrom', vacationCalcController.updateVacationToFrom);

//saving day summary
router.post('/saveDaySummary', vacationCalcController.saveDaySummary);

router.post('/getVacationDaySummary', vacationCalcController.getVacationDaySummary);

router.post('/saveVacationDayActivities', vacationCalcController.saveVacationDayActivities);

router.post('/getVacationDateActivities', vacationCalcController.getVacationDateActivities);

module.exports = router;
