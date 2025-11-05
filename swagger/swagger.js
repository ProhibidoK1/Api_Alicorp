const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Azure Blob CSV',
            version: '1.0.0',
            description: 'API para acceder a archivos CSV en Azure Blob Storage con autenticación',
        },
        servers: [{ url: 'https://api-alicorp.onrender.com' }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);
