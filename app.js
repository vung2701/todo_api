import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import routes from './routers/routes.js'; // Đường dẫn đúng tới file routes.js
import { adminJs, adminRouter } from './admin/admin.js';
import { fileURLToPath } from 'url';
import path from 'path';

// Định nghĩa __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Kết nối tới MongoDB
connectDB();

const app = express();
const PORT = 3200;

// Đặt middleware và routes theo thứ tự hợp lý

// 1. CORS (cho phép truy cập từ các nguồn khác)
app.use(cors());

// 2. Đặt middleware của AdminJS trước bodyParser
app.use(adminJs.options.rootPath, adminRouter);

// 3. Middleware bodyParser (phải đặt sau AdminJS)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 4. Routes của API
app.use('/api/v1', routes);

// Home route
app.get('/', (req, res) =>
  res.send(`Server is running on port ${PORT}`)
);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
