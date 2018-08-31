function projectComponent(project) {
  function createLi(project) {
    const li = document.createElement('li');
    li.dataset.id = project.id;
    li.dataset.type = 'project';
    li.dataset.priority = project.priority;
    li.textContent = project.name;
    li.innerHTML += `
    <span class='btn-delete' data-type='project' data-id='${project.id}'>
      <i class="fa fa-trash" aria-hidden="true"></i>
    </span>`;
    return li;
  }

  return createLi(project);
}

module.exports = projectComponent;
