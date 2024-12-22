import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './routers/userRouter.js';
import todoRouter from './routers/todoRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Kết nối tới MongoDB
connectDB(); // Gọi hàm connectDB để kết nối cơ sở dữ liệu

// Middleware
app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/todo', todoRouter);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
