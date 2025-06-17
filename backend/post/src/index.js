const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log('MongoDB connected for Post Service'))
    .catch(err => console.error(err));

app.use('/api/v1/post', require('./routes/postRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Post service running on port ${PORT}`);
});
