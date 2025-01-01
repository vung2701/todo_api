import express from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todoController.js';
import { verifyAccessToken } from '../middlewares/AuthMiddleware.js';

const todoRouter = express.Router();

todoRouter.get('/', verifyAccessToken, getTodos);
todoRouter.post('/create', verifyAccessToken, createTodo);
todoRouter.put('/:id', verifyAccessToken, updateTodo);
todoRouter.delete('/:id', verifyAccessToken, deleteTodo);


export default todoRouter;
