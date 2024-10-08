require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const vacationCalcRoutes = require('./routes/vacationCalc');

app.use('/node/auth', authRoutes);
app.use('/node/users', userRoutes);
app.use('/node/vacationCalc', vacationCalcRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
