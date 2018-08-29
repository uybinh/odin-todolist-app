const Projects = function(){
  let ID = 3
  const allProject = {
    1: {
      id: 1,
      name: 'Home',
      description: "All todos about home",
      priority: 1,
      todos: [1]
    },
    2: {
      id: 2,
      name: 'Work',
      description: "All todos about work",
      priority: 2,
      todos: []
    },
    3: {
      id: 3,
      name: 'Others',
      description: "All others todos",
      priority: 3,
      todos: []
    }
  }


  const state = function() {
    return allProject
  }

  const add = function(project) {
    project.id = ++ID
    allProject[ID] = project
    return true
  }

  const remove = function(id) {
    delete allProject[id]
  }

  return {
    state,
    add,
  }
}

module.exports = Projects