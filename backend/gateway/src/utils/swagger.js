const swaggerJSDoc = require('swagger-jsdoc');


const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Gateway Service API',
        version: '1.0.0',
        description: 'Gateway service',
    },
    servers: [
        {
            url: 'http://localhost:8080/api/v1/gateway',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: [
        './src/routes/*.js',
    ],
};

const swaggerSpec = swaggerJSDoc(options);


module.exports.setupSwagger = (app) => {
    app.get('/docs/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}