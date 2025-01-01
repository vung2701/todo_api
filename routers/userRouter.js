import express from 'express';
import { check } from 'express-validator';
import { registerUser, loginUser, refreshToken, logoutUser } from '../controllers/userController.js';

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
userRouter.post('/register', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Invalid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], registerUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */
userRouter.post('/login', [
  check('email', 'Invalid email').isEmail(),
  check('password', 'Password is required').exists()
], loginUser);

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Refresh token missing
 *       403:
 *         description: Invalid refresh token
 *       500:
 *         description: Server error
 */
userRouter.post('/logout', [], logoutUser);

/**
 * @swagger
 * /user/refresh_token:
 *   post:
 *     summary: Refresh the access token
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *       401:
 *         description: Refresh token missing
 *       403:
 *         description: Invalid or expired refresh token
 *       500:
 *         description: Server error
 */
userRouter.post('/refresh_token', [], refreshToken);

export default userRouter;
