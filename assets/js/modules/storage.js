function Storage() {
  /**
   *
   * @param {object} allProjects Projects object
   */
  function save(allProjects) {
    const data = JSON.stringify(allProjects);
    window.localStorage.setItem('projects', data);
  }

  function load() {

  }

  return {
    save,
    load,
  };
}

module.exports = Storage();
