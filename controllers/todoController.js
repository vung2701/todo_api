import Todo from '../models/Todo.js';
import { formatDateToISO } from '../helpers/format.js';

// Lấy danh sách Todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error });
  }
};

export const createTodo = async (req, res) => {
  const { title, startDate, endDate, status } = req.body;

  try {
    // Chuyển đổi startDate và endDate từ dd/mm/yyyy sang dạng ISO
    const formattedStartDate = formatDateToISO(startDate);
    const formattedEndDate = formatDateToISO(endDate);

    if (!formattedStartDate || !formattedEndDate) {
      return res.status(400).json({ message: 'Invalid date format (dd/mm/yyyy required)' });
    }

    const todo = new Todo({
      title,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      status: status || Todo.schema.path('status').options.default,
      userId: req.userId,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo', error });
  }
};

// Cập nhật Todo
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed, startDate, endDate, status } = req.body;

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, completed, startDate, endDate, status },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error });
  }
};

// Xóa Todo
export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.userId });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error });
  }
};
