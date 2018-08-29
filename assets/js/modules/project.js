/**
 *
 * @param {string} name project's name
 * @param {string} description project's description
 * @param {number} priority project's priority 1 = high, 2 = medium, 3 = low
 */
const Project = function(name, description, priority) {
  return {
    id: null,
    name,
    description,
    priority
  }
}

module.exports = Project