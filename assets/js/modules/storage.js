const Storage = (function() {

  const save = function(allProjects) {
    data = JSON.stringify(allProjects)
    window.localStorage.setItem('projects', data)
  }

  const load = function() {

  }

  return {
    save,
    load
  }
})()

module.exports = Storage