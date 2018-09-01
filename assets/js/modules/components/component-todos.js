const componentTodo = require('./component-todo');

function componentTodos(todos) {
  function createUl(todos) {
    const ul = document.createElement('ul');
    ul.id = 'todos-list';
    ul.classList.add('list');
    for (const id in todos) {
      const todoElement = componentTodo(todos[id]);
      ul.appendChild(todoElement);
    }
    return ul;
  }

  const todosElement = document.createElement('div');
  todosElement.id = 'todos';
  todosElement.classList.add('container', 'todos');
  todosElement.innerHTML += `
    <header>
      <h1>Todos</h1>
      <button id='btn-new-todo'> Add </button>
    </header>
  `;
  todosElement.appendChild(createUl(todos));

  return todosElement;
}

module.exports = componentTodos;
