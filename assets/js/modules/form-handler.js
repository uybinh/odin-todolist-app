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

  return {
    getProjectData,
  };
}

module.exports = formHandler();
