// routes/todoRoutes.js
import express from 'express';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/TodoController';

const router = express.Router();

// Lấy danh sách Todo
router.get('/', authMiddleware, getTodos);

// Tạo mới Todo
router.post('/', authMiddleware, createTodo);

// Cập nhật Todo
router.put('/:id', authMiddleware, updateTodo);

// Xóa Todo
router.delete('/:id', authMiddleware, deleteTodo);

export default router;
