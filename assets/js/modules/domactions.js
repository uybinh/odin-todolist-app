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
    return document.querySelector(`[data-type='${type}'][data-id='${+id}']`);
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

  return {
    selectWithParams,
    removeWithParams,
    removeWithSelector,
    render,
  };
}

module.exports = DOMActions();
