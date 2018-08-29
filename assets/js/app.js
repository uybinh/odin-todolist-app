const EventEmitter = require('events');
const myEmittor = () => Object.assign({}, EventEmitter.prototype)
const emittor = myEmittor()
const DOMActions = require('./modules/domactions')


const allProject = [
  {
    id: 1,
    name: 'Home',
    description: "All todos about home",
    priority: 1,
    todos: [1]
  },
  {
    id: 2,
    name: 'Work',
    description: "All todos about work",
    priority: 2,
    todos: []
  },
  {
    id: 3,
    name: 'Others',
    description: "All others todos",
    priority: 3,
    todos: []
  }
]

const allTodos = [
  {
    id: 1,
    description: "Go to school",
    projectId: 1,
    priority: 2
  }
]

const Project = function(name, description, priority) {
  return {
    name,
    description,
    priority
  }
}

const Projects = function(){
  const allProject = []


  const state = function() {
    return allProject
  }



  return {
    getFromStorage,
    saveToStorage,
    state
  }
}

document.addEventListener('DOMContentLoaded', function(){
  DOMActions.renderProjects()
  DOMActions.renderTodos()
  DOMActions.renderNewProject()
})
