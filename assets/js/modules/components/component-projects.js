const projectComponent = function(projects) {

  const createLi = (project) => {
    const li = document.createElement('li')
    li.dataset.id = project.id
    li.dataset.type = 'project'
    li.textContent = project.name
    li.innerHTML += `
    <span class='btn-delete' data-type='projects' data-id='${project.id}'>
      <i class="fa fa-trash" aria-hidden="true"></i>
    </span>`
    return li
  }

  const createUl = (projects) => {
    const ul = document.createElement('ul')
    ul.classList.add('list')
    for (let id in projects) {
      ul.appendChild(createLi(projects[id]))
    }
    return ul
  }

  const projectsElement = document.createElement('div')
  projectsElement.id = 'projects'
  projectsElement.classList.add('container', 'projects')
  projectsElement.innerHTML += `
    <header>
      <h1>Projects</h1>
      <button> Add </button>
    </header>
  `
  projectsElement.appendChild(createUl(projects))

  return projectsElement

}

module.exports = projectComponent