const express      = require('express');
const cors         = require('cors');
const cookieParser = require('cookie-parser');
const swagger      = require('./utils/swagger');

const authRoutes   = require('./routes/auth.route');


const app = express();


// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true 
};
app.use(cors(corsOptions));


// Swagger docs
swagger.setupSwagger(app);


// Routes
app.use('/', authRoutes);


module.exports = app;