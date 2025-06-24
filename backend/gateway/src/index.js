const express       = require('express');
const gatewayRouter = require('./routes/gateway.route');
const swagger       = require('./utils/swagger');

const app = express();
const port = process.env.PORT || 3000;


// Middlewares
app.use(express.json());

// Swagger docs
swagger.setupSwagger(app);

// Routes
app.use('/', gatewayRouter);


app.listen(port, () => {
    console.log(`Gateway service running on port ${port}`);
});