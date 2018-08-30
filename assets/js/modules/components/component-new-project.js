function newProjectComponent() {
  const wrapper = document.createElement('div');
  wrapper.id = 'new-project-wrapper';
  const element = document.createElement('div');
  element.id = 'new-project';
  element.classList.add('container');
  element.innerHTML = `
  <form id="new-pj-form" action="#">

  <header>
    <h1>New Project</h1>
    <button id='btn-create-project'> Create </button>
  </header>

  <ul>
    <li>
      <input name="project-name" type="text" placeholder="Enter Project name">
    </li>
    <li>
      <Input name="project-description" type="text" placeholder="Project description">
    </li>
    <li class="priority ">
      <p>Priority</p>
      <div class="flex">
        <div class="field-group">
          <input type="radio" name="project-priority" id="high-priority" value="1">
          <label for="high-priority"> High</label>
        </div>

        <div class="field-group">
          <input type="radio" name="project-priority" id="medium-priority" value="2">
          <label for="medium-priority">Medium</label>
        </div>

        <div class="field-group">
          <input type="radio" name="project-priority" id="low-priority" value="3">
          <label for="low-priority">Low</label>
        </div>
      </div>
    </li>
  </ul>
  </form>
  `;
  wrapper.appendChild(element);
  return wrapper;
}

module.exports = newProjectComponent;
