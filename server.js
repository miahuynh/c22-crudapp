const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const url = 'mongodb://steph:password123@ds137651.mlab.com:37651/crud_practice';
const todoController = require('./controllers/todo-controller')

// app config
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'public')));

// home route
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

// make post requests
app.post('/todos', todoController.makeTodo);

// get all todos
app.get('/todos', todoController.displayTodos);

// update
app.patch('/todos', todoController.updateTodo);

// delete
app.delete('/todos', todoController.deleteTodo);

// connect to mongoose
mongoose.connect(url, () => console.log('connected to mongoose'));

app.listen(PORT, () => console.log('listening on port 3000'))