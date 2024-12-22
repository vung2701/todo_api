import express from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/TodoController.js';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';

const todoRouter = express.Router();

todoRouter.get('/', authMiddleware, getTodos);

todoRouter.post('/', authMiddleware, createTodo);

todoRouter.put('/:id', authMiddleware, updateTodo);

todoRouter.delete('/:id', authMiddleware, deleteTodo);

export default todoRouter;

