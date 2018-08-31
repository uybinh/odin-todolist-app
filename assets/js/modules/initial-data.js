function initialData() {
  return {
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
}

module.exports = initialData();
