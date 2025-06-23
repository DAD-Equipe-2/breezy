const express      = require('express');
const cors         = require('cors');
const cookieParser = require('cookie-parser');

const app  = express();


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
    origin: true,
    credentials: true 
};
app.use(cors(corsOptions));


// Routes
require('./routes/auth.route')(app);


module.exports = app;