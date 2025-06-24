const express   = require('express');
const swaggerUi = require('swagger-ui-express');

const app  = express();
const PORT = 3000;


// List of microservice Swagger JSON endpoints
const services = [
    {
        name: 'Auth Service',
        url: '/api/v1/auth/docs/swagger.json',
    },
    {
        name: 'Gateway Service',
        url: '/api/v1/gateway/docs/swagger.json',
    },
    {
        name: 'User Service',
        url: '/api/v1/users/docs/swagger.json',
    },
    {
        name: 'Post Service',
        url: '/api/v1/posts/docs/swagger.json',
    },
];

const swaggerOptions = {
    explorer: true,
    swaggerOptions: {
        urls: services
    },
    customSiteTitle: 'Breezy API Docs',
};

app.use(
    '/',
    swaggerUi.serveFiles(null, swaggerOptions),
    swaggerUi.setup(null, swaggerOptions)
);

app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}`);
});