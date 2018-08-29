/**
 * * Functions for DOM manipulation
 */
const DOMActions = (function() {

  /**
   * * Select element base on data-type and data-id
   * @param {string} type data-type attribute of element
   * @param {number} id data-id attribute of elemtn
   */
  const selectElement = (type, id) => {
    id = id.toString()
    return document.querySelector(`[data-type='${type}'][data-id='${id}']`)
  }

  /**
   * * Remove element base on data-type and data-id
   * @param {string} type data-type attribute of element
   * @param {number} id data-id attribute of elemtn
   */
  const removeElement = (type, id) => {
    const element = selectElement(type, id)
    element.parentElement.removeChild(element)
  }

  const renderProjects = function() {
    const content = `
    <div id="projects" class="container projects">
      <header>
        <h1>Projects</h1>
        <button> Add </button>
      </header>

      <ul class="list">
        <li data-id='1' data-type='project'>Home<span><i class="fa fa-trash" aria-hidden="true"></i></span></li>
        <li data-id='2' data-type='project'>Work<span><i class="fa fa-trash" aria-hidden="true"></i></span></li>
        <li data-id='3' data-type='project'>Others<span><i class="fa fa-trash" aria-hidden="true"></i></span></li>
      </ul>
    </div>
    `
    document.body.innerHTML += content
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