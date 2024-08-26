const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { username, password } = req.body;

    // temp fake info
    if (username === 'admin' && password === 'password123') {
        const token = jwt.sign({ username: 'admin', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
};
