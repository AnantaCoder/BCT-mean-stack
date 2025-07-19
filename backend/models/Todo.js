const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    task: { type: String, required: true },
    status: { type: Boolean, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
});

module.exports = mongoose.model('Todo', ToDoSchema);
