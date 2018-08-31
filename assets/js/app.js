const emittor = require('./modules/emittor');
const Storage = require('./modules/storage');
const DOMActions = require('./modules/domactions');
const Projects = require('./modules/projects');
const Project = require('./modules/project');
const eventActions = require('./modules/eventActions');
const projectsComponent = require('./modules/components/component-projects');
const projectComponent = require('./modules/components/component-project');
const newProjectComponent = require('./modules/components/component-new-project');
const formHandler = require('./modules/form-handler');
const initialData = require('./modules/initial-data');

const todoApp = () => {
  let initialState = initialData;

  if (window.localStorage.getItem('projects')) {
    initialState = Storage.load('projects');
  }


  const allProjects = Projects(initialState);
  const projectsElement = projectsComponent(allProjects.state());
  DOMActions.render('body', projectsElement);

  eventActions.addBatchEvent('.btn-delete', (button) => {
    emittor.emit('delete project', button.dataset.id);
  });

  eventActions.addClickEventTo('#btn-new-project', () => {
    emittor.emit('add new project');
  });

  emittor.on('delete project', (id) => {
    allProjects.remove(id);
    Storage.save('projects', allProjects.state());
    DOMActions.removeWithParams('li',
      'project', id);
  });

  emittor.on('add new project', () => {
    const newProjectContainer = newProjectComponent();
    DOMActions.render('body', newProjectContainer);
    eventActions.addClickEventTo('#btn-create-project', () => {
      const { name, description, priority } = formHandler
        .getProjectData('#new-pj-form');
      const newProject = Project(name, description, priority);
      const newProjectElement = projectComponent(newProject);
      DOMActions.render('#projects-list', newProjectElement);
      allProjects.add(newProject);
      Storage.save('projects', allProjects.state());
      DOMActions.removeWithSelector('#new-project-wrapper');
    });

    eventActions.addClickEventTo('#btn-close', () => {
      DOMActions.removeWithSelector('#new-project-wrapper');
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  todoApp();
});
