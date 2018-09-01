function formHandler() {
  function getProjectData(formSelector) {
    const form = document.querySelector(formSelector);
    const name = form.elements['project-name'].value;
    const description = form.elements['project-description'].value;
    const priority = form.elements['project-priority'].value;
    return {
      name,
      description,
      priority,
    };
  }

  function getTodoData(formSelector) {
    const form = document.querySelector(formSelector);
    const name = form.elements['todo-name'].value;
    const description = form.elements['todo-description'].value;
    const priority = form.elements['todo-priority'].value;
    return {
      name,
      description,
      priority,
    };
  }

  return {
    getProjectData,
    getTodoData,
  };
}

module.exports = formHandler();
