/**
 *
 * @param {string} name todo's name
 * @param {string} description todo's description
 * @param {number} priority todo's priority 1 = high, 2 = medium, 3 = low
 */
function Todo(name, description, priority, project) {
  return {
    id: null,
    name,
    description,
    priority,
    project,
  };
}

module.exports = Todo;
