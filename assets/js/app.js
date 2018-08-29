const emittor = require("./modules/emittor")
const Storage = require("./modules/storage")
const DOMActions = require('./modules/domactions')
const Projects = require("./modules/projects")

emittor.on('save project', function(allProjects){
  DOMActions.renderProjects(allProjects.state())
  Storage.save(allProjects.state())
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



document.addEventListener('DOMContentLoaded', function(){
  // DOMActions.renderProjects(allProjects.state()
  const allProjects = Projects()
  allProjects.add(schoolProject)
  emittor.emit('save project', allProjects)
})
