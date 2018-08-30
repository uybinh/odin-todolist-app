function projectComponent(project) {
  function createLi(project) {
    const li = document.createElement('li');
    li.dataset.id = project.id;
    li.dataset.type = 'project';
    li.textContent = project.name;
    li.innerHTML += `
    <span class='btn-delete' data-type='projects' data-id='${project.id}'>
      <i class="fa fa-trash" aria-hidden="true"></i>
    </span>`;
    return li;
  }

  return createLi(project);
}

module.exports = projectComponent;
