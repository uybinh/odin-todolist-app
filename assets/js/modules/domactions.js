const projectComponent = require('./components/component-projects');

/**
 * * Functions for DOM manipulation
 */
function DOMActions() {
  /**
   * * Select element base on data-type and data-id
   * @param {string} elementType type of element ( 'div', 'span', ...)
   * @param {string} type data-type attribute of element
   * @param {number} id data-id attribute of elemtn
   */
  function selectElement(elementType, type, id) {
    return document.querySelector(`[data-type='${type}'][data-id='${id}']`);
  }

  /**
   * * Remove element base on data-type and data-id
   * @param {string} elementType type of element ( 'div', 'span', ...)
   * @param {string} type data-type attribute of element
   * @param {number} id data-id attribute of elemtn
   */
  const removeElement = (elementType, type, id) => {
    const element = selectElement(elementType, type, id);
    element.parentElement.removeChild(element);
  };

  /**
   *
   * @param {object} projects Projects object
   */
  function render(parentElement, element) {
    const parent = document.querySelector(parentElement);
    parent.appendChild(element);
  }

  function renderTodos() {
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
    `;

    document.body.innerHTML += content;
  }


  return {
    selectElement,
    removeElement,
    render,
    renderTodos,
  };
}

module.exports = DOMActions();
