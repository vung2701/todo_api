// routes/authRoutes.js
const express = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/AuthController');

const router = express.Router();

// Đăng ký
router.post('/register', [
    check('name', 'Tên là bắt buộc').not().isEmpty(),
    check('email', 'Email không hợp lệ').isEmail(),
    check('password', 'Mật khẩu phải có ít nhất 6 ký tự').isLength({ min: 6 })
], registerUser);

// Đăng nhập
router.post('/login', [
    check('email', 'Email không hợp lệ').isEmail(),
    check('password', 'Mật khẩu là bắt buộc').exists()
], loginUser);

module.exports = router;
