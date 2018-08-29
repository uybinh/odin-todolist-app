const emittor = require("./modules/emittor")
const Storage = require("./modules/storage")
const DOMActions = require('./modules/domactions')
const Projects = require("./modules/projects")
const Project = require("./modules/project")
const eventActions = require("./modules/eventActions")



document.addEventListener('DOMContentLoaded', function(){
  // DOMActions.renderProjects(allProjects.state()
  emittor.on('save project', function(allProjects){
    DOMActions.renderProjects(allProjects.state())
    eventActions.addBatchEvent(`span.btn-delete[data-type='projects']`,
      function(target){
        console.log(target)
        DOMActions.removeElement('span','project', target.dataset.id)
      }
    )
    Storage.save(allProjects.state())
  })

  const schoolProject = Project(
    "School",
    "School todos",
    2
  )
  const allProjects = Projects()
  allProjects.add(schoolProject)
  emittor.emit('save project', allProjects)
})
