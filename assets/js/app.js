const emittor = require("./modules/emittor")
const Storage = require("./modules/storage")
const DOMActions = require('./modules/domactions')
const Projects = require("./modules/projects")

emittor.on('save project', function(allProjects){
  console.log('Hello there')
  Storage.save(allProjects)
})

const Project = function(name, description, priority) {
  return {
    name,
    description,
    priority
  }
}

const schoolProject = Project(
  "School",
  "School todos",
  2
)

const allProjects = Projects()

allProjects.add(schoolProject)
emittor.emit('save project', allProjects)

document.addEventListener('DOMContentLoaded', function(){
  DOMActions.renderProjects()
  DOMActions.renderTodos()
  DOMActions.renderNewProject()
})
