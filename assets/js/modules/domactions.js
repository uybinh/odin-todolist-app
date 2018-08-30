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
  function selectWithParams(elementType, type, id) {
    return document.querySelector(`[data-type='${type}'][data-id='${id}']`);
  }

  /**
   * * Remove element base on data-type and data-id
   * @param {string} elementType type of element ( 'div', 'span', ...)
   * @param {string} type data-type attribute of element
   * @param {number} id data-id attribute of elemtn
   */
  const removeWithParams = (elementType, type, id) => {
    const element = selectWithParams(elementType, type, id);
    element.parentElement.removeChild(element);
  };

  /**
   *
   * @param {string} parentElement pattern to select parent element
   * @param {object} element project element
   */
  function render(parentElement, element) {
    const parent = document.querySelector(parentElement);
    parent.appendChild(element);
  }

  /**
   *
   * @param {string} selector pattern to select element
   */
  function removeWithSelector(selector) {
    const element = document.querySelector(selector);
    element.parentElement.removeChild(element);
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
    selectWithParams,
    removeWithParams,
    removeWithSelector,
    render,
    renderTodos,
  };
}

module.exports = DOMActions();
