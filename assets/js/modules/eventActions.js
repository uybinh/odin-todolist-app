const eventActions = (function() {
  /**
   *
   * @param {string} selector
   * @param {function} callback
   */
  const addBatchEvent = function(selector, callback) {
    const deleteButtons = document.querySelectorAll(selector)
    console.log(deleteButtons)
    deleteButtons.forEach( button => {
      button.addEventListener('click', (event) => {
        callback(button)
      })
    })

  }

  return {
    addBatchEvent
  }
})()

module.exports = eventActions