const connectToDB = require('../models/db');

exports.addNewUser = async (req, res) => {
    try {
        const db = await connectToDB();
        const { registerName, registerEmail, registerPassword } = req.body;

        db.query('CALL Register(?, ?, ?)', [registerName, registerEmail, registerPassword], (err, results) => {
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
