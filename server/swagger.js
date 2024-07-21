const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Loretta Bank API",
      version: "1.0.0",
      description: "API documentation for Loretta Bank",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ["./route/*.js"], // Ensure this path correctly points to your route files
};

const specs = swaggerJsDoc(options);

module.exports = {
  swaggerUi,
  specs,
};
