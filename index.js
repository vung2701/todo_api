import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './routers/userRouter.js';
import todoRouter from './routers/todoRouter.js';

dotenv.config();

const app = express();
app.use(express.json());

// Kết nối đến MongoDB
connectDB();

// Routes
app.use('/api/todos', todoRouter);
app.use('/api/users', userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
