import swaggerJsdoc from 'swagger-jsdoc';
import { sync } from 'glob'

const routeFiles = sync('./src/docs/**/*.yaml');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'API',
      version: '1.0.0',
      description: 'Documentación de la API',
    },
  },
  apis: routeFiles,
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;