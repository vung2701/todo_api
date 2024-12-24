import express from 'express';
import { check } from 'express-validator';
import { registerUser,loginUser, refreshToken, logoutUser } from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], registerUser);

// Đăng nhập
userRouter.post('/login', [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password is required').exists()
], loginUser);

userRouter.post('/logout', [
], logoutUser);

userRouter.post('/refresh_token', [
], refreshToken);



export default userRouter;
