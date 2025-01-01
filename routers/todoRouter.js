import express from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todoController.js';
import { verifyAccessToken } from '../middlewares/AuthMiddleware.js';

const todoRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Manage Todos
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *         - startDate
 *         - endDate
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the Todo
 *         title:
 *           type: string
 *           description: Title of the Todo
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: Start date of the Todo
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: End date of the Todo
 *         status:
 *           type: string
 *           description: Status of the Todo
 *         userId:
 *           type: string
 *           description: ID of the user who owns the Todo
 */

/**
 * @swagger
 * /todo:
 *   get:
 *     summary: Get all Todos for the authenticated user
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Server error
 */
todoRouter.get('/', verifyAccessToken, getTodos);

/**
 * @swagger
 * /todo/create:
 *   post:
 *     summary: Create a new Todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       500:
 *         description: Server error
 */
todoRouter.post('/create', verifyAccessToken, createTodo);

/**
 * @swagger
 * /todo/{id}:
 *   put:
 *     summary: Update an existing Todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the Todo to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */
todoRouter.put('/:id', verifyAccessToken, updateTodo);

/**
 * @swagger
 * /todo/{id}:
 *   delete:
 *     summary: Delete a Todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the Todo to delete
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */
todoRouter.delete('/:id', verifyAccessToken, deleteTodo);

export default todoRouter;
