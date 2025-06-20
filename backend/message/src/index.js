const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log('MongoDB connected for Message Service'))
    .catch(err => console.error(err));

app.use('/api/v1/message', require('./routes/messageRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Message service running on port ${PORT}`);
});
