function eventActions() {
  /**
   *
   * @param {string} selector
   * @param {function} callback
   */
  function addBatchEvent(selector, callback) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        callback(button);
      });
    });
  }

  function addEvent(selector, callback) {
    const button = document.querySelector(selector);
    button.addEventListener('click', (event) => {
      callback(button);
    });
  }

  return {
    addBatchEvent,
    addEvent,
  };
}

module.exports = eventActions();
