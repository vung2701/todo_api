import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';

// Dùng để xác định __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation for all APIs in the project',
    },
  },
  apis: [path.join(__dirname, '../routers/*.js')], // Đường dẫn tới các file định nghĩa API
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

export { swaggerUi, swaggerSpecs };
