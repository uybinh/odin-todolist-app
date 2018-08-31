function Projects(initialState) {
  const allProject = initialState || {};

  function count() {
    return Object.keys(allProject).length;
  }

  function state() {
    return allProject;
  }

  function add(project) {
    const ID = count() + 1;
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
    count,
  };
}

module.exports = Projects;
