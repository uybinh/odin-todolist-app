function initialData() {
  const projects = {
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
  const todos = {
    1: {
      id: 1,
      name: 'Go to school',
      description: '',
      priority: 1,
      project: 1,
    },
    2: {
      id: 2,
      name: 'Go to cinema',
      description: '',
      priority: 2,
      project: 2,
    },
  };

  return { projects, todos };
}

module.exports = initialData();
