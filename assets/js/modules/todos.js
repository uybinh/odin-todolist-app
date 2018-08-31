function Todos(initialState) {
  const allTodos = initialState || {};

  /**
   * Return how many todos
   */
  function count() {
    return Object.keys(allTodos).length;
  }

  function state() {
    return allTodos;
  }

  function add(item) {
    const ID = count() + 1;
    item.id = ID;
    allTodos[ID] = item;
    return true;
  }

  /**
   *
   * @param {number} id project's id
   */
  function remove(id) {
    delete allTodos[id];
  }

  return {
    state,
    add,
    remove,
    count,
  };
}

module.exports = Todos;
