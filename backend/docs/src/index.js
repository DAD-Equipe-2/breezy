const express   = require('express');
const swaggerUi = require('swagger-ui-express');

const app  = express();
const PORT = 3000;


// List of microservice Swagger JSON endpoints
const services = [
    {
        name: 'Auth Service',
        url: '/api/v1/auth/docs/swagger.json',
        description: 'Authentication service for user management, including registration and login.',

        
    },
];

app.use(
    '/',
    swaggerUi.serve,
    swaggerUi.setup(null, {
            swaggerOptions: {
            urls: services,
        },
        customSiteTitle: 'Breezy API Docs',
    })
);

app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}`);
});
