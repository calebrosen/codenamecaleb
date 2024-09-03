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
