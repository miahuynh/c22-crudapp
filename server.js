const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const url = 'mongodb://steph:password123@ds137651.mlab.com:37651/crud_practice';
const todoController = require('./controllers/todo-controller');
const userController = require('./controllers/usercontroller');
const cookieParser = require('cookie-parser');

// app config
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(cookieParser());

//static route
app.use('/', express.static(path.join(__dirname, 'public')));

// home route
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

// Todo Routes
const verifySession = userController.verify;
app.post('/todos', verifySession, todoController.makeTodo);
app.get('/todos', verifySession, todoController.displayTodos);
app.patch('/todos', verifySession, todoController.updateTodo);
app.delete('/todos', verifySession, todoController.deleteTodo);

//Auth
app.post('/login', 
  userController.login,
  userController.startSession
);
app.post('/signup',
  userController.signup,
  userController.startSession
);


// connect to mongoose
mongoose.connect(url, () => console.log('connected to mongoose'));

app.listen(PORT, () => console.log('listening on port 3000'))