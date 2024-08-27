require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

app.use('/node/auth', authRoutes);
app.use('/node/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
