const express      = require('express');
const cors         = require('cors');
const cookieParser = require('cookie-parser');
const swagger      = require('./utils/swagger');

const authRoutes   = require('./routes/auth.route');

const app  = express();


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Swagger docs
swagger.setupSwagger(app);

// Routes
authRoutes.register(app);
authRoutes.login(app);
authRoutes.verify(app);
authRoutes.renew(app);


module.exports = app;