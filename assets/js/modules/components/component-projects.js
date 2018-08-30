const projectComponent = require('./component-project');


function projectsComponent(projects) {
  function createUl(projects) {
    const ul = document.createElement('ul');
    ul.id = 'projects-list';
    ul.classList.add('list');
    for (const id in projects) {
      console.log(projects);
      const projectElement = projectComponent(projects[id]);
      ul.appendChild(projectElement);
    }
    return ul;
  }

  const projectsElement = document.createElement('div');
  projectsElement.id = 'projects';
  projectsElement.classList.add('container', 'projects');
  projectsElement.innerHTML += `
    <header>
      <h1>Projects</h1>
      <button id='btn-new-project'> Add </button>
    </header>
  `;
  projectsElement.appendChild(createUl(projects));

  return projectsElement;
}

module.exports = projectsComponent;
