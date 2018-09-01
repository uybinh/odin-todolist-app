function newTodoComponent() {
  const wrapper = document.createElement('div');
  wrapper.id = 'new-todo-wrapper';
  const element = document.createElement('div');
  element.id = 'new-todo';
  element.classList.add('container');
  element.innerHTML = `
  <form id="new-todo-form" action="#">

  <header>
    <h1>New Todo</h1>
  </header>

  <ul>
    <li>
      <input name="todo-name" type="text" placeholder="Enter Todo name">
    </li>
    <li>
      <Input name="todo-description" type="text" placeholder="Todo description">
    </li>
    <li class="priority ">
      <p>Priority</p>
      <div class="flex">
        <div class="field-group">
          <input type="radio" name="todo-priority" id="high-priority" value="1">
          <label for="high-priority"> High</label>
        </div>

        <div class="field-group">
          <input type="radio" name="todo-priority" id="medium-priority" value="2">
          <label for="medium-priority">Medium</label>
        </div>

        <div class="field-group">
          <input type="radio" name="todo-priority" id="low-priority" value="3">
          <label for="low-priority">Low</label>
        </div>
      </div>
    </li>
  </ul>

  <footer>
    <button id='btn-close' class='btn-close'>Close</button>
    <button id='btn-create-todo'> Create </button>
  </footer>
  </form>
  `;
  wrapper.appendChild(element);
  return wrapper;
}

module.exports = newTodoComponent;
