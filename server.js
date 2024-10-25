// server.js
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Kết nối cơ sở dữ liệu
connectDB();

// Middleware để parse JSON
app.use(express.json());

app.get('/', (req, res) => res.send('API is running...'));

// Routes
app.use('/api/auth', require('./routers/AuthRouter'));
app.use('/api/todos', require('./routers/TodoRouter'));

// Cổng khởi động
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
