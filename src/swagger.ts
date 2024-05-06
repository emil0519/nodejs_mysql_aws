import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mock Finmindtrade API',
      version: '1.0.0',
      description: 'API documentation for Mock Finmindtrade API using Node.js. Only recongized domain can fetch this api',
    },
  },
  apis: ['./src/route/*.ts'],
};
export const swaggerSpec = swaggerJSDoc(options);

