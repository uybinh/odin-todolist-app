const EventEmitter = require('events');
const myEmittor = () => Object.assign({}, EventEmitter.prototype)
const emittor = myEmittor()




// const project = {
//   id,
//   priority,
//   name,
//   items: [],
//   dueDate
// }

// const todoItem = {
//   id,
//   priority,
//   content,
//   projectId
// }

// console.log('Hello there')

document.addEventListener('DOMContentLoaded', function(){

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

    return {
      selectElement,
      removeElement
    }
  })()

  DOMActions.removeElement('project', 1)
})
