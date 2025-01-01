import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import connectDB from './config/db.js';
import routes from './routers/routes.js';
import { adminJs, adminRouter } from './admin/admin.js';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
connectDB();

const app = express();
const PORT = 3200;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the application',
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api/v1`,
      },
    ],
  },
  apis: ['./routers/*.js'], // Path to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middleware and routes in proper order

// 1. CORS
app.use(cors());

// 2. AdminJS middleware
app.use(adminJs.options.rootPath, adminRouter);

// 3. Swagger middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 4. BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 5. API routes
app.use('/api/v1', routes);

// Home route
app.get('/', (req, res) =>
  res.send(`Server is running on port ${PORT}`)
);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});
