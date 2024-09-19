const connectToDB = require('../models/db');

exports.createName = async (req, res) => {
    try {
        const db = await connectToDB();
        const { userID, vacationName } = req.body;

        db.query('CALL CreateVacationCalcName(?, ?)', [userID, vacationName], (err, results) => {
            if (err) {
                return res
                  .status(500)
                  .json({ message: "Database error", error: err.message });
              }
              const result = results[0][0];

              if (result) {
                const vacationID = result.vacationID;

                return res.json({  vacationID });
              }
        });

    } catch (err) {
        res.status(500).json({ error: 'Database connection failed' });
    }
};

exports.fetchVacations = async (req, res) => {
    try {
        const db = await connectToDB();
        const { userID } = req.body;

        db.query('CALL FetchVacationsByUserID(?)', [userID], (err, results) => {
            if (err) {
                return res
                  .status(500)
                  .json({ message: "Database error", error: err.message });
              }
              const vacations = results[0];
        
              if (vacations) {
                return res.json({  vacations });
              }
        });

    } catch (err) {
        res.status(500).json({ error: 'Database connection failed' });
    }
};

exports.insertToFromAndDates = async (req, res) => {
    try {
        const db = await connectToDB();
        const { vacationID, departDate, returnDate, from, to } = req.body;
        db.query('CALL InsertUpdateVacationsInfo(?, ?, ?, ?, ?)', [vacationID, departDate, returnDate, from, to], (err, results) => {
            if (err) {
                return res
                  .status(500)
                  .json({ message: "Database error", error: err.message });
              }
              const result = results[0];
        
              if (result) {
                return res.json({  result });
              }
        });

    } catch (err) {
        res.status(500).json({ error: 'Database connection failed' });
    }
};

exports.loadPreviousVacation = async (req, res) => {
    try {
        const db = await connectToDB();
        const { vacationID } = req.body;
        db.query('Call GetVacationState(?)', [vacationID], (err,results) => {
            if (err) {
                return res
                  .status(500)
                  .json({ message: "Database error", error: err.message });
              }
              
              const result = results[0][0].state;
        
              if (result) {
                return res.json({  result });
              }
        });
    } catch (err) {
        res.status(500).json({ error: 'Database connection failed' });
    }
};

exports.retrieveVacation = async (req, res) => {
    try {
        const db = await connectToDB();
        const { vacationID } = req.body;
        db.query('Call RetrieveVacation(?)', [vacationID], (err,results) => {
            if (err) {
                return res
                  .status(500)
                  .json({ message: "Database error", error: err.message });
              }
              const result = results[0];
        
              if (result) {
                return res.json({  result });
              }
        });
    } catch (err) {
        res.status(500).json({ error: 'Database connection failed' });
    }
};

exports.addTraveler = async (req, res) => {
    try {
        const db = await connectToDB();
        const { vacationID, travelersArray } = req.body;
        db.query('Call AddTravelerToVacation(?, ?)', [vacationID, travelersArray], (err,results) => {
            if (err) {
                return res
                  .status(500)
                  .json({ message: "Database error", error: err.message });
              }
              const result = results[0];
        
              if (result) {
                return res.json({  result });
              }
        });
    } catch (err) {
        res.status(500).json({ error: 'Database connection failed' });
    }
};

exports.saveTravelers = async (req, res) => {
    try {
        const db = await connectToDB();
        const { vacationID, tempTravelersArr } = req.body;
        db.query('Call SaveTravelers(?, ?)', [vacationID, tempTravelersArr], (err,results) => {
            if (err) {
                return res
                  .status(500)
                  .json({ message: "Database error", error: err.message });
              }
              const result = results[0];
        
              if (result) {
                return res.json({  result });
              }
        });
    } catch (err) {
        res.status(500).json({ error: 'Database connection failed' });
    }
};

exports.editVacationName = async (req, res) => {
    try {
        const db = await connectToDB();
        const { vacationID, newVacationName } = req.body;
        db.query('Call EditVacationName(?, ?)', [vacationID, newVacationName], (err,results) => {
            if (err) {
                return res
                  .status(500)
                  .json({ message: "Database error", error: err.message });
              }
              const result = results[0];
        
              if (result) {
                return res.json({  result });
              }
        });
    } catch (err) {
        res.status(500).json({ error: 'Database connection failed' });
    }
};

exports.updateVacationToFrom = async (req, res) => {
    try {
        const db = await connectToDB();
        const { vacationID, fromLocationUpdate, fromDateUpdate, toLocationUpdate, toDateUpdate } = req.body;
        db.query('Call UpdateVacationToFrom(?, ?, ?, ?, ?)', [vacationID, fromLocationUpdate, fromDateUpdate, toLocationUpdate, toDateUpdate], (err,results) => {
            if (err) {
                return res
                  .status(500)
                  .json({ message: "Database error", error: err.message });
              }
              const result = results[0];
        
              if (result) {
                return res.json({  result });
              }
        });
    } catch (err) {
        res.status(500).json({ error: 'Database connection failed' });
    }
};


exports.saveDaySummary = async (req, res) => {
    try {
        const db = await connectToDB();
        const { vacationID, tempDateObj, summary } = req.body;
        console.log(vacationID, tempDateObj, summary);
        db.query('Call SaveVacationDaySummary(?, ?, ?)', [vacationID, tempDateObj, summary], (err,results) => {
            if (err) {
                return res
                  .status(500)
                  .json({ message: "Database error", error: err.message });
              }
              const result = results[0];
        
              if (result) {
                return res.json({  result });
              }
        });
    } catch (err) {
        res.status(500).json({ error: 'Database connection failed' });
    }
};

exports.getVacationDaySummary = async (req, res) => {
    try {
        const db = await connectToDB();
        const { vacationID, tempDateForFetchingSummary } = req.body;
        db.query('Call GetVacationDateSummary(?, ?)', [vacationID, tempDateForFetchingSummary], (err,results) => {
            if (err) {
                return res
                  .status(500)
                  .json({ message: "Database error", error: err.message });
              }
              const result = results[0];
        
              if (result) {
                return res.json({  result });
              }
        });
    } catch (err) {
        res.status(500).json({ error: 'Database connection failed' });
    }
};