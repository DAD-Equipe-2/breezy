const { generateJWTKeys } = require('./utils/env');
generateJWTKeys();
require('dotenv').config();

const app      = require('./app');
const mongoose = require('./utils/db');

const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.info(`Auth service running on port ${port}`);
});