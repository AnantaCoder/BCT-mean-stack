const Todo = require('../models/Todo');
exports.createTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      task: req.body.task,
      status: false,
      user: req.user ? req.user.id : req.body.user
    });
    const saved = await newTodo.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error in createTodo:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getUserTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (err) {
    console.error('Error in getUserTodos:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, status } = req.body;
    const updated = await Todo.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { task, status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Todo not found' });
    res.json(updated);
  } catch (err) {
    console.error('Error in updateTodo:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.findOneAndDelete({ _id: id, user: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error('Error in deleteTodo:', err);
    res.status(500).json({ error: err.message });
  }
};
