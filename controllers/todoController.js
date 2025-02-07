import Todo from '../models/Todo.js';
import { formatDateToISO } from '../helpers/format.js';
import { paginate } from '../helpers/utils.js';

// Lấy danh sách Todos có phân trang
export const getTodos = async (req, res) => {
  try {
    const { page = 1, per_page = 10, sort } = req.query; 
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(per_page, 10);

    const todos = await Todo.find({ userId: req.userId }).lean(); 

    const paginatedData = paginate(todos, pageSize, pageNumber, sort);

    res.json(paginatedData);
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
    const formattedStartDate = startDate ? formatDateToISO(startDate) : undefined;
    const formattedEndDate = endDate ? formatDateToISO(endDate) : undefined;

    // Kiểm tra định dạng ngày hợp lệ
    if ((startDate && !formattedStartDate) || (endDate && !formattedEndDate)) {
      return res.status(400).json({ message: 'Invalid date format (dd/mm/yyyy required)' });
    }

    // Tạo object cập nhật
    const updateFields = {
      ...(title && { title }),
      ...(completed !== undefined && { completed }),
      ...(formattedStartDate && { startDate: formattedStartDate }),
      ...(formattedEndDate && { endDate: formattedEndDate }),
      ...(status !== undefined && { status }),
    };

    // Cập nhật Todo
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.userId },
      updateFields,
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
