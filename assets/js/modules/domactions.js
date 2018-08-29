const projectComponent = require('./components/component-projects')

/**
 * * Functions for DOM manipulation
 */
const DOMActions = (function() {

  /**
   * * Select element base on data-type and data-id
   * @param {string} elementType type of element ( 'div', 'span', ...)
   * @param {string} type data-type attribute of element
   * @param {number} id data-id attribute of elemtn
   */
  const selectElement = (elementType, type, id) => {
    if (!typeof id == 'string') {
      id = id.toString()
    }
    return document.querySelector(`[data-type='${type}'][data-id='${id}']`)
  }

  /**
   * * Remove element base on data-type and data-id
   * @param {string} elementType type of element ( 'div', 'span', ...)
   * @param {string} type data-type attribute of element
   * @param {number} id data-id attribute of elemtn
   */
  const removeElement = (elementType, type, id) => {
    const element = selectElement(elementType, type, id)
    element.parentElement.removeChild(element)
  }

  const renderProjects = function(projects) {
    document.body.appendChild(projectComponent(projects))
  }

  const renderTodos = function() {
    const content = `
    <div class="container todos">
    <header>
      <h1>To-Do</h1>
      <button> Add </button>
    </header>

    <ul class="list">
      <li><span><i class="fa fa-trash" aria-hidden="true"></i></span>Go to School</li>
      <li><span><i class="fa fa-trash" aria-hidden="true"></i></span>Buy eggs</li>
      <li><span><i class="fa fa-trash" aria-hidden="true"></i></span>Visit Grandma</li>
    </ul>

  </div>
    `

    document.body.innerHTML += content
  }

  const renderNewProject = function() {
    const content = `
    <div class="container">
    <form id="new-pj-form" action="#">

    <header>
      <h1>New Project</h1>
      <button> Create </button>
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
            <input type="radio" name="priority-level" id="high-priority" value="1">
            <label for="high-priority"> High</label>
          </div>

          <div class="field-group">
            <input type="radio" name="priority-level" id="medium-priority" value="2">
            <label for="medium-priority">Medium</label>
          </div>

          <div class="field-group">
            <input type="radio" name="priority-level" id="low-priority" value="3">
            <label for="low-priority">Low</label>
          </div>
        </div>
      </li>
    </ul>

    </form>
  </div>
    `
    document.body.innerHTML += content
  }

  return {
    selectElement,
    removeElement,
    renderProjects,
    renderTodos,
    renderNewProject
  }
})()

module.exports = DOMActions