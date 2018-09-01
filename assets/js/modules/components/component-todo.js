function todoComponent(item) {
  function createLi(todo) {
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.dataset.type = 'todo';
    li.dataset.priority = todo.priority;
    li.dataset.project = todo.project;
    li.textContent = todo.name;
    li.innerHTML += `
    <span class='btn-delete-todo' data-type='todo' data-id='${todo.id}'>
      <i class="fa fa-trash" aria-hidden="true"></i>
    </span>`;
    return li;
  }

  return createLi(item);
}

module.exports = todoComponent;
