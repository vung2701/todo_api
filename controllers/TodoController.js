// controllers/todoController.js
const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.json(todos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createTodo = async (req, res) => {
    const { title } = req.body;

    try {
        const newTodo = new Todo({
            title,
            user: req.user.id
        });

        const todo = await newTodo.save();
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateTodo = async (req, res) => {
    const { title, completed } = req.body;

    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ msg: 'Todo không tồn tại' });
        }

        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Không có quyền' });
        }

        todo.title = title || todo.title;
        todo.completed = completed !== undefined ? completed : todo.completed;

        await todo.save();
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ msg: 'Todo không tồn tại' });
        }

        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Không có quyền' });
        }

        await todo.remove();
        res.json({ msg: 'Todo đã bị xóa' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
