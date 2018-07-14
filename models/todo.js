const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todo = new Schema(
  {
    todo: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()}
  }
)

const Todo = mongoose.model('Todo', todo);
module.exports = Todo;