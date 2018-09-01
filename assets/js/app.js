const emittor = require('./modules/emittor');
const Storage = require('./modules/storage');
const DOMActions = require('./modules/domactions');
const Projects = require('./modules/projects');
const Project = require('./modules/project');
const Todos = require('./modules/todos');
const Todo = require('./modules/todo');
// const Todo = require('./modules/todo');
const eventActions = require('./modules/eventActions');
const componentProjects = require('./modules/components/component-projects');
const componentProject = require('./modules/components/component-project');
const componentNewProject = require('./modules/components/component-new-project');
const componentTodos = require('./modules/components/component-todos');

const componentTodo = require('./modules/components/component-todo');
const componentNewTodo = require('./modules/components/component-new-todo');
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
  const todosElement = componentTodos(allTodos.fromProject(1));
  DOMActions.render('body', projectsElement);
  DOMActions.render('body', todosElement);

  eventActions.addBatchEvent('.btn-delete-project', (button) => {
    emittor.emit('delete project', button.dataset.id);
  });

  eventActions.addBatchEvent('.btn-delete-todo', (button) => {
    emittor.emit('delete todo', button.dataset.id);
  });

  eventActions.addClickEventTo('#btn-new-project', () => {
    emittor.emit('add new project');
  });

  emittor.on('delete project', (id) => {
    allProjects.remove(id);
    Storage.save('projects', allProjects.state());
    DOMActions.removeWithParams('li', 'project', id);
  });

  emittor.on('delete todo', (id) => {
    allTodos.remove(id);
    Storage.save('todos', allTodos.state());
    DOMActions.removeWithParams('li', 'todo', id);
  });

  emittor.on('add new project', () => {
    const newProjectContainer = componentNewProject();
    DOMActions.render('body', newProjectContainer);

    eventActions.addClickEventTo('#btn-create-project', () => {
      const { name, description, priority } = formHandler.getProjectData('#new-project-form');
      const newProject = Project(name, description, priority);
      allProjects.add(newProject);
      const newProjectElement = componentProject(newProject);

      newProjectElement.children[0].onclick = () => {
        emittor.emit('delete project', newProject.id);
      };

      DOMActions.render('#projects-list', newProjectElement);
      Storage.save('projects', allProjects.state());
      DOMActions.removeWithSelector('#new-project-wrapper');
    });

    eventActions.addClickEventTo('#btn-close', () => {
      DOMActions.removeWithSelector('#new-project-wrapper');
    });
  });

  eventActions.addClickEventTo('#btn-new-todo', () => {
    emittor.emit('add new todo');
  });

  emittor.on('add new todo', () => {
    const newTodoContainer = componentNewTodo();
    DOMActions.render('body', newTodoContainer);

    eventActions.addClickEventTo('#btn-create-todo', () => {
      const { name, description, priority } = formHandler.getTodoData('#new-todo-form');
      const projectID = 1;
      const newTodo = Todo(name, description, priority, projectID);
      allTodos.add(newTodo);
      const newTodoElement = componentTodo(newTodo);

      newTodoElement.onclick = () => {
        DOMActions.removeWithParams('li', 'todo', newTodo.id);
      };

      DOMActions.render('#todos-list', newTodoElement);
      Storage.save('todos', allTodos.state());
      DOMActions.removeWithSelector('#new-todo-wrapper');
    });

    eventActions.addClickEventTo('#btn-close', () => {
      DOMActions.removeWithSelector('#new-todo-wrapper');
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  todoApp();
});
