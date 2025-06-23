const { generateJWTKeys } = require('./utils/env');
generateJWTKeys();
require('dotenv').config();

const app      = require('./app');
const mongoose = require('./utils/db');

const port = 3000;


app.listen(port, () => {
    console.info(`Server started on port ${port}`);
});