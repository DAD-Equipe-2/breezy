const swaggerJSDoc = require('swagger-jsdoc');


const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Auth Service API',
        version: '1.0.0',
        description: 'Authentication service',
    },
    servers: [
        {
            url: `${process.env.GATEWAY_ORIGIN || 'http://localhost:8080'}/api/v1/auth`,
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