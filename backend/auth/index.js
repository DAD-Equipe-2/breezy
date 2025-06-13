require("dotenv").config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');


const app  = express();
const port = 3000;


// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());


// MongoDB connection (MOVE to a separate file in production)
mongoose.connect(process.env.DB_CONNECTION)
.then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});


// Routes
app.get('/', (req, res) => {
    res.send('Hello World !')
});

require('./src/routes/auth.route')(app);


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


//  Generates a JWT key (ACCESS_JWT_KEY) and a refresh JWT key (REFRESH_JWT_KEY)
//  and set them in your .env file

// Add middleware to ensure parameters are present in requests

// Add refresh token functionality

// Add swagger documentation