require('dotenv').config();

const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');
const swagger  = require('./utils/swagger');

const port = process.env.PORT || 3000;
const app = express();


// Middlewares
var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true 
};
app.use(cors(corsOptions));
app.use(express.json());


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
});


// Swagger docs
swagger.setupSwagger(app);


// Routes
app.use('/', require('./routes/user.route'));


app.listen(port, () => {
    console.log(`User service running on port ${port}`);
});
