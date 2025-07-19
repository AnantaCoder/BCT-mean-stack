const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const todoController = require('../controllers/todoControllers');

router.post('/', verifyToken, todoController.createTodo);
router.get('/', verifyToken, todoController.getUserTodos);
router.put('/:id', verifyToken, todoController.updateTodo);
router.delete('/:id', verifyToken, todoController.deleteTodo);

module.exports = router;