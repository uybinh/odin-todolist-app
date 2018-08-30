function Projects(initialState) {
  let ID = 3;
  const allProject = initialState || {};


  function state() {
    return allProject;
  }

  function add(project) {
    ID += 1;
    project.id = ID;
    allProject[ID] = project;
    return true;
  }

  /**
   *
   * @param {number} id project's id
   */
  function remove(id) {
    delete allProject[id];
  }

  return {
    state,
    add,
    remove,
  };
}

module.exports = Projects;
