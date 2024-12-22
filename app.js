import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import routes from './routers/routes.js'; // Đường dẫn đúng tới file routes.js

import { fileURLToPath } from 'url';
import path from 'path';
import userRouter from './routers/userRouter.js';

// Định nghĩa __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3200;

app.disable('x-powered-by');

// Middleware
app.use(bodyParser.json());

// Kết nối tới MongoDB
connectDB();


app.use('/api/v1', routes);

// Home route
app.get('/', (req, res) =>
  res.send(`Server is running on port ${PORT}`)
);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
