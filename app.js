import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import routes from './routers/routes.js';
import { fileURLToPath } from 'url';
import path from 'path';
import cookieParser from 'cookie-parser';

dotenv.config();

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
connectDB();

const app = express();
app.use(cookieParser());
const PORT = 3200;

// 1. CORS
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, // Allow cookies and other credentials
}));


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
});
