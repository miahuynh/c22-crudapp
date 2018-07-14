const Todo = require('../models/todo.js');

const todoController = {
  makeTodo: function(req, res) {
    console.log(req.body);
    if(!req.body.todo) {
      return res.status(400).send({message: 'error'});
    } else {
      const todo = new Todo ({todo: req.body.todo});
      todo.save((err) => {
        if(err) return res.status(400).send(err);
        res.status(200).send({message: 'success!'});
      })
    }
  },

  displayTodos: function(req, res) {
    Todo.find({}, null, {sort: {createdAt: 'asc'}}, (err, results) => {
      if(err) return res.status(400).send(err);
      res.status(200).send({todosArray: results})
    })
  },

  updateTodo: function(req, res) {
    Todo.findByIdAndUpdate(req.body._id, { todo: req.body.todo }, {new: true}, (err, result) => {
      // database could flip out on its own
      if(err) return res.status(400).send(err);
      // we actually didn't find anything
      if(!result) return res.status(418).send({message: 'no id found'});
      res.status(200).send(result);
    })
  },

  deleteTodo: function(req, res) {
    Todo.findByIdAndRemove(req.body._id, (err, result) => {
      // database could flip out on its own
      if(err) return res.status(400).send(err);
      // we actually didn't find the id to delete
      if(!result) return res.status(418).send({message: 'no id found'});
      res.status(200).send({message: 'item was deleted'});
    })
  }
}

module.exports = todoController