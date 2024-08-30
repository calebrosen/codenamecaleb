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
              const successMsg = results[0][0];
        
              if (successMsg) {
                return res.json({  successMsg });
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
