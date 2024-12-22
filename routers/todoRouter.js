import express from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/TodoController.js';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';

const router = express.Router();

// Lấy danh sách Todo
router.get('/', authMiddleware, getTodos);

// Tạo mới Todo
router.post('/', authMiddleware, createTodo);

// Cập nhật Todo
router.put('/:id', authMiddleware, updateTodo);

// Xóa Todo
router.delete('/:id', authMiddleware, deleteTodo);

export default todoRouter;

