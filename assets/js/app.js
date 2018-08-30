const emittor = require('./modules/emittor');
const Storage = require('./modules/storage');
const DOMActions = require('./modules/domactions');
const Projects = require('./modules/projects');
const Project = require('./modules/project');
const eventActions = require('./modules/eventActions');
const projectsComponent = require('./modules/components/component-projects');
const projectComponent = require('./modules/components/component-project');
const newProjectComponent = require('./modules/components/component-new-project');


document.addEventListener('DOMContentLoaded', () => {
  const initialState = {
    1: {
      id: 1,
      name: 'Home',
      description: 'All todos about home',
      priority: 1,
      todos: [1],
    },
    2: {
      id: 2,
      name: 'Work',
      description: 'All todos about work',
      priority: 2,
      todos: [],
    },
    3: {
      id: 3,
      name: 'Others',
      description: 'All others todos',
      priority: 3,
      todos: [],
    },
  };
  const allProjects = Projects(initialState);
  const projectsElement = projectsComponent(allProjects.state());
  DOMActions.render('body', projectsElement);

  const newProject = Project(
    'School',
    'School works',
    3,
  );


  const newProjectElement = projectComponent(newProject);

  eventActions.addEvent('#btn-new-project', () => {
    const newProjectContainer = newProjectComponent();
    DOMActions.render('body', newProjectContainer);
  });
});
