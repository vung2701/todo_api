// routes/todoRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/TodoController');

const router = express.Router();

// Lấy danh sách Todo
router.get('/', authMiddleware, getTodos);

// Tạo mới Todo
router.post('/', authMiddleware, createTodo);

// Cập nhật Todo
router.put('/:id', authMiddleware, updateTodo);

// Xóa Todo
router.delete('/:id', authMiddleware, deleteTodo);

module.exports = router;
