import express from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/TodoController.js';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';

const todoRouter = express.Router();

router.get('/', authMiddleware, getTodos);

router.post('/', authMiddleware, createTodo);

router.put('/:id', authMiddleware, updateTodo);

router.delete('/:id', authMiddleware, deleteTodo);

export default todoRouter;

