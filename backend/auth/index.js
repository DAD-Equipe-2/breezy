require('dotenv').config();
const express       = require('express');
const cors          = require('cors');
const { connectDB } = require('./src/utils/db');


connectDB();

const app  = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Routes
app.get('/', (req, res) => {
    res.send('Hello World !')
});

require('./src/routes/auth.route')(app);


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


//  Generates a JWT key (ACCESS_JWT_KEY) and a refresh JWT key (REFRESH_JWT_KEY) and set them in your .env file

// Add refresh token functionality

// Add swagger documentation