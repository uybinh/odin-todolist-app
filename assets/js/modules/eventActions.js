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
        event.preventDefault();
        callback(button);
      });
    });
  }

  function addClickEventTo(selector, callback) {
    const button = document.querySelector(selector);
    button.addEventListener('click', (event) => {
      event.preventDefault();
      callback(button);
    });
  }

  return {
    addBatchEvent,
    addClickEventTo,
  };
}

module.exports = eventActions();
