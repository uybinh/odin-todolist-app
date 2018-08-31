(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
      allProjects.add(newProject);
      const newProjectElement = projectComponent(newProject);

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
};

document.addEventListener('DOMContentLoaded', () => {
  todoApp();
});

},{"./modules/components/component-new-project":2,"./modules/components/component-project":3,"./modules/components/component-projects":4,"./modules/domactions":5,"./modules/emittor":6,"./modules/eventActions":7,"./modules/form-handler":8,"./modules/initial-data":9,"./modules/project":10,"./modules/projects":11,"./modules/storage":12}],2:[function(require,module,exports){
function newProjectComponent() {
  const wrapper = document.createElement('div');
  wrapper.id = 'new-project-wrapper';
  const element = document.createElement('div');
  element.id = 'new-project';
  element.classList.add('container');
  element.innerHTML = `
  <form id="new-pj-form" action="#">

  <header>
    <h1>New Project</h1>
  </header>

  <ul>
    <li>
      <input name="project-name" type="text" placeholder="Enter Project name">
    </li>
    <li>
      <Input name="project-description" type="text" placeholder="Project description">
    </li>
    <li class="priority ">
      <p>Priority</p>
      <div class="flex">
        <div class="field-group">
          <input type="radio" name="project-priority" id="high-priority" value="1">
          <label for="high-priority"> High</label>
        </div>

        <div class="field-group">
          <input type="radio" name="project-priority" id="medium-priority" value="2">
          <label for="medium-priority">Medium</label>
        </div>

        <div class="field-group">
          <input type="radio" name="project-priority" id="low-priority" value="3">
          <label for="low-priority">Low</label>
        </div>
      </div>
    </li>
  </ul>

  <footer>
    <button id='btn-close' class='btn-close'>Close</button>
    <button id='btn-create-project'> Create </button>
  </footer>
  </form>
  `;
  wrapper.appendChild(element);
  return wrapper;
}

module.exports = newProjectComponent;

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
const projectComponent = require('./component-project');


function projectsComponent(projects) {
  function createUl(projects) {
    const ul = document.createElement('ul');
    ul.id = 'projects-list';
    ul.classList.add('list');
    for (const id in projects) {
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

},{"./component-project":3}],5:[function(require,module,exports){
const projectComponent = require('./components/component-projects');

/**
 * * Functions for DOM manipulation
 */
function DOMActions() {
  /**
   * * Select element base on data-type and data-id
   * @param {string} elementType type of element ( 'div', 'span', ...)
   * @param {string} type data-type attribute of element
   * @param {number} id data-id attribute of elemtn
   */
  function selectWithParams(elementType, type, id) {
    return document.querySelector(`[data-type='${type}'][data-id='${+id}']`);
  }

  /**
   * * Remove element base on data-type and data-id
   * @param {string} elementType type of element ( 'div', 'span', ...)
   * @param {string} type data-type attribute of element
   * @param {number} id data-id attribute of elemtn
   */
  const removeWithParams = (elementType, type, id) => {
    const element = selectWithParams(elementType, type, id);
    element.parentElement.removeChild(element);
  };

  /**
   *
   * @param {string} parentElement pattern to select parent element
   * @param {object} element project element
   */
  function render(parentElement, element) {
    const parent = document.querySelector(parentElement);
    parent.appendChild(element);
  }

  /**
   *
   * @param {string} selector pattern to select element
   */
  function removeWithSelector(selector) {
    const element = document.querySelector(selector);
    element.parentElement.removeChild(element);
  }

  function renderTodos() {
    const content = `
    <div class="container todos">
    <header>
      <h1>To-Do</h1>
      <button> Add </button>
    </header>

    <ul class="list">
      <li><span><i class="fa fa-trash" aria-hidden="true"></i></span>Go to School</li>
      <li><span><i class="fa fa-trash" aria-hidden="true"></i></span>Buy eggs</li>
      <li><span><i class="fa fa-trash" aria-hidden="true"></i></span>Visit Grandma</li>
    </ul>

  </div>
    `;

    document.body.innerHTML += content;
  }


  return {
    selectWithParams,
    removeWithParams,
    removeWithSelector,
    render,
    renderTodos,
  };
}

module.exports = DOMActions();

},{"./components/component-projects":4}],6:[function(require,module,exports){
const EventEmitter = require('events');
const myEmittor = () => Object.assign({}, EventEmitter.prototype)

module.exports = myEmittor()
},{"events":13}],7:[function(require,module,exports){
function eventActions() {
  /**
   *
   * @param {string} selector
   * @param {function} callback
   */
  function addBatchEvent(selector, callback) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        callback(button);
      });
    });
  }

  function addClickEventTo(selector, callback) {
    const button = document.querySelector(selector);
    button.addEventListener('click', (event) => {
      event.preventDefault();
      callback(button);
    });
  }

  return {
    addBatchEvent,
    addClickEventTo,
  };
}

module.exports = eventActions();

},{}],8:[function(require,module,exports){
function formHandler() {
  function getProjectData(formSelector) {
    const form = document.querySelector(formSelector);
    const name = form.elements['project-name'].value;
    const description = form.elements['project-description'].value;
    const priority = form.elements['project-priority'].value;
    return {
      name,
      description,
      priority,
    };
  }

  return {
    getProjectData,
  };
}

module.exports = formHandler();

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
/**
 *
 * @param {string} name project's name
 * @param {string} description project's description
 * @param {number} priority project's priority 1 = high, 2 = medium, 3 = low
 */
function Project(name, description, priority) {
  return {
    id: null,
    name,
    description,
    priority,
  };
}

module.exports = Project;

},{}],11:[function(require,module,exports){
function Projects(initialState) {
  const allProject = initialState || {};

  /**
   * Return how many projects
   */
  function count() {
    return Object.keys(allProject).length;
  }

  function state() {
    return allProject;
  }

  function add(project) {
    const ID = count() + 1;
    project.id = ID;
    allProject[ID] = project;
    return true;
  }

  /**
   *
   * @param {number} id project's id
   */
  function remove(id) {
    delete allProject[id];
  }

  return {
    state,
    add,
    remove,
    count,
  };
}

module.exports = Projects;

},{}],12:[function(require,module,exports){
function Storage() {
  /**
   *
   * @param {object} allProjects Projects object
   */
  function save(key, allProjects) {
    const data = JSON.stringify(allProjects);
    window.localStorage.setItem(key, data);
  }

  function load(key) {
    const data = window.localStorage.getItem(key);
    return JSON.parse(data);
  }

  return {
    save,
    load,
  };
}

module.exports = Storage();

},{}],13:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}]},{},[1]);
