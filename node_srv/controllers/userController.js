const connectToDB = require('../models/db');

exports.addNewUser = async (req, res) => {
    try {
        const db = await connectToDB();
        const { username, password } = req.body;

        // Example query to add a new user
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'User added successfully', userId: results.insertId });
        });
    } catch (err) {
        res.status(500).json({ error: 'Database connection failed' });
    }
};
