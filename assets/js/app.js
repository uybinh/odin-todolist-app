const emittor = require('./modules/emittor');
const Storage = require('./modules/storage');
const DOMActions = require('./modules/domactions');
const Projects = require('./modules/projects');
const Project = require('./modules/project');
const Todos = require('./modules/todos');
// const Todo = require('./modules/todo');
const eventActions = require('./modules/eventActions');
const componentProjects = require('./modules/components/component-projects');
const componentProject = require('./modules/components/component-project');
const componentNewProject = require('./modules/components/component-new-project');
const componentTodos = require('./modules/components/component-todos');
const formHandler = require('./modules/form-handler');
const initialData = require('./modules/initial-data');

const todoApp = () => {
  let initialProjects = initialData.projects;
  let initialTodos = initialData.todos;

  if (window.localStorage.getItem('projects')) {
    initialProjects = Storage.load('projects');
  }

  if (window.localStorage.getItem('todos')) {
    initialTodos = Storage.load('todos');
  }

  const allProjects = Projects(initialProjects);
  const allTodos = Todos(initialTodos);
  const projectsElement = componentProjects(allProjects.state());
  const todosElement = componentTodos(allTodos.state());
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
    DOMActions.removeWithParams('li', 'project', id);
  });

  emittor.on('add new project', () => {
    const newProjectContainer = componentNewProject();
    DOMActions.render('body', newProjectContainer);

    eventActions.addClickEventTo('#btn-create-project', () => {
      const { name, description, priority } = formHandler.getProjectData('#new-pj-form');
      const newProject = Project(name, description, priority);
      allProjects.add(newProject);
      const newProjectElement = componentProject(newProject);

      newProjectElement.onclick = () => {
        DOMActions.removeWithParams('li', 'project', newProject.id);
      };

      DOMActions.render('#projects-list', newProjectElement);
      Storage.save('projects', allProjects.state());
      DOMActions.removeWithSelector('#new-project-wrapper');
    });

    eventActions.addClickEventTo('#btn-close', () => {
      DOMActions.removeWithSelector('#new-project-wrapper');
    });
  });

  DOMActions.render('body', todosElement);
};

document.addEventListener('DOMContentLoaded', () => {
  todoApp();
});
