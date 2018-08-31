function Storage() {
  /**
   *
   * @param {object} allProjects Projects object
   */
  function save(key, allProjects) {
    const data = JSON.stringify(allProjects);
    window.localStorage.setItem(key, data);
  }

  function load(key) {
    const data = window.localStorage.getItem(key);
    return JSON.parse(data);
  }

  return {
    save,
    load,
  };
}

module.exports = Storage();
