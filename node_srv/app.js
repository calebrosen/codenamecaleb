const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});


app.get('/test', (req, res) => {
    return res.json("Backend response");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
