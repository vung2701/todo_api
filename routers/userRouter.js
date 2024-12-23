import express from 'express';
import { check } from 'express-validator';
import { registerUser,loginUser } from '../controllers/userController.js';
const userRouter = express.Router();

/**
 * @route POST /api/v1/user/register
 * @group User - Operations about user
 * @param {string} name.body.required - The user's name
 * @param {string} email.body.required - The user's email
 * @param {string} password.body.required - The user's password
 * @returns {object} 201 - User successfully created
 * @returns {Error} 400 - Invalid request
 */
userRouter.post('/register', [
    check('name', 'Tên là bắt buộc').not().isEmpty(),
    check('email', 'Email không hợp lệ').isEmail(),
    check('password', 'Mật khẩu phải có ít nhất 6 ký tự').isLength({ min: 6 })
], registerUser);

// Đăng nhập
userRouter.post('/login', [
    check('email', 'Email không hợp lệ').isEmail(),
    check('password', 'Mật khẩu là bắt buộc').exists()
], loginUser);

export default userRouter;
