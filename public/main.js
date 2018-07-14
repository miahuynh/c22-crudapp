window.onload = getList;

console.log('it worked!');

const todoInput = document.getElementById('input');
const addTodo = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');

addTodo.addEventListener('click', makeTodo);

function makeTodo() {
  fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ todo: todoInput.value })
  })
  .then(() => window.location.reload());
  console.log(todoInput.value)
}

function getList() {
  fetch('http://localhost:3000/todos')
  .then(response => response.json())
  .then(data => {
    data.todosArray.forEach((todo) => {
      const html = `<li>
          <input id="text${todo._id}" type="text" value="${todo.todo}">
          <button id="${todo._id}">Edit</button>
          <button id="delete${todo._id}">Delete</button>
        </li>`
      todoList.insertAdjacentHTML('beforeend', html)
      document.getElementById(todo._id).onclick = () => {
        patchTodo(todo._id)
      }
      document.getElementById(`delete${todo._id}`).onclick = () => {
        deleteTodo(todo._id)
      }
    })
  });
}

function patchTodo(_id) {
  const todo = document.getElementById(`text${_id}`).value;
  fetch('http://localhost:3000/todos', {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ _id, todo })
  })
}

function deleteTodo(_id) {
  fetch('http://localhost:3000/todos', {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ _id })
  })
  .then(() => window.location.reload())
}