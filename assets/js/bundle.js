(function(){
var _$componentNewProject_2=function(){const wrapper=document.createElement("div");wrapper.id="new-project-wrapper";const element=document.createElement("div");return element.id="new-project",element.classList.add("container"),element.innerHTML='\n  <form id="new-project-form" action="#">\n\n  <header>\n    <h1>New Project</h1>\n  </header>\n\n  <ul>\n    <li>\n      <input name="project-name" type="text" placeholder="Enter Project name">\n    </li>\n    <li>\n      <Input name="project-description" type="text" placeholder="Project description">\n    </li>\n    <li class="priority ">\n      <p>Priority</p>\n      <div class="flex">\n        <div class="field-group">\n          <input type="radio" name="project-priority" id="high-priority" value="1">\n          <label for="high-priority"> High</label>\n        </div>\n\n        <div class="field-group">\n          <input type="radio" name="project-priority" id="medium-priority" value="2">\n          <label for="medium-priority">Medium</label>\n        </div>\n\n        <div class="field-group">\n          <input type="radio" name="project-priority" id="low-priority" value="3">\n          <label for="low-priority">Low</label>\n        </div>\n      </div>\n    </li>\n  </ul>\n\n  <footer>\n    <button id=\'btn-close\' class=\'btn-close\'>Close</button>\n    <button id=\'btn-create-project\'> Create </button>\n  </footer>\n  </form>\n  ',wrapper.appendChild(element),wrapper};

var _$componentNewTodo_3=function(){const wrapper=document.createElement("div");wrapper.id="new-todo-wrapper";const element=document.createElement("div");return element.id="new-todo",element.classList.add("container"),element.innerHTML='\n  <form id="new-todo-form" action="#">\n\n  <header>\n    <h1>New Todo</h1>\n  </header>\n\n  <ul>\n    <li>\n      <input name="todo-name" type="text" placeholder="Enter Todo name">\n    </li>\n    <li>\n      <Input name="todo-description" type="text" placeholder="Todo description">\n    </li>\n    <li class="priority ">\n      <p>Priority</p>\n      <div class="flex">\n        <div class="field-group">\n          <input type="radio" name="todo-priority" id="high-priority" value="1">\n          <label for="high-priority"> High</label>\n        </div>\n\n        <div class="field-group">\n          <input type="radio" name="todo-priority" id="medium-priority" value="2">\n          <label for="medium-priority">Medium</label>\n        </div>\n\n        <div class="field-group">\n          <input type="radio" name="todo-priority" id="low-priority" value="3">\n          <label for="low-priority">Low</label>\n        </div>\n      </div>\n    </li>\n  </ul>\n\n  <footer>\n    <button id=\'btn-close\' class=\'btn-close\'>Close</button>\n    <button id=\'btn-create-todo\'> Create </button>\n  </footer>\n  </form>\n  ',wrapper.appendChild(element),wrapper};

var _$componentProject_4=function(project){return function(project){const li=document.createElement("li");return li.dataset.id=project.id,li.dataset.type="project",li.dataset.priority=project.priority,li.textContent=project.name,li.innerHTML+=`\n    <span class='btn-delete-project' data-type='project' data-id='${project.id}'>\n      <i class="fa fa-trash" aria-hidden="true"></i>\n    </span>`,li}(project)};

/* removed: const _$componentProject_4=require("./component-project"); */;var _$componentProjects_5=function(projects){const projectsElement=document.createElement("div");return projectsElement.id="projects",projectsElement.classList.add("container","projects"),projectsElement.innerHTML+="\n    <header>\n      <h1>Projects</h1>\n      <button id='btn-new-project'> Add </button>\n    </header>\n  ",projectsElement.appendChild(function(projects){const ul=document.createElement("ul");ul.id="projects-list",ul.classList.add("list");for(const id in projects){const projectElement=_$componentProject_4(projects[id]);ul.appendChild(projectElement)}return ul}(projects)),projectsElement};

var _$componentTodo_6=function(item){return function(todo){const li=document.createElement("li");return li.dataset.id=todo.id,li.dataset.type="todo",li.dataset.priority=todo.priority,li.dataset.project=todo.project,li.textContent=todo.name,li.innerHTML+=`\n    <span class='btn-delete-todo' data-type='todo' data-id='${todo.id}'>\n      <i class="fa fa-trash" aria-hidden="true"></i>\n    </span>`,li}(item)};

/* removed: const _$componentTodo_6=require("./component-todo"); */;var _$componentTodos_7=function(todos){const todosElement=document.createElement("div");return todosElement.id="todos",todosElement.classList.add("container","todos"),todosElement.innerHTML+="\n    <header>\n      <h1>Todos</h1>\n      <button id='btn-new-todo'> Add </button>\n    </header>\n  ",todosElement.appendChild(function(todos){const ul=document.createElement("ul");ul.id="todos-list",ul.classList.add("list");for(const id in todos){const todoElement=_$componentTodo_6(todos[id]);ul.appendChild(todoElement)}return ul}(todos)),todosElement};

var _$domactions_8=function(){function selectWithParams(elementType,type,id){return document.querySelector(`[data-type='${type}'][data-id='${+id}']`)}return{selectWithParams:selectWithParams,removeWithParams:(elementType,type,id)=>{const element=selectWithParams(0,type,id);element.parentElement.removeChild(element)},removeWithSelector:function(selector){const element=document.querySelector(selector);element.parentElement.removeChild(element)},render:function(parentElement,element){document.querySelector(parentElement).appendChild(element)}}}();

var _$events_18 = {};
var objectCreate=Object.create||function(proto){var F=function(){};return F.prototype=proto,new F},objectKeys=Object.keys||function(obj){var keys=[];for(var k in obj)Object.prototype.hasOwnProperty.call(obj,k)&&keys.push(k);return k},bind=Function.prototype.bind||function(context){var fn=this;return function(){return fn.apply(context,arguments)}};function EventEmitter(){this._events&&Object.prototype.hasOwnProperty.call(this,"_events")||(this._events=objectCreate(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0}_$events_18=EventEmitter,EventEmitter.EventEmitter=EventEmitter,EventEmitter.prototype._events=void 0,EventEmitter.prototype._maxListeners=void 0;var hasDefineProperty,defaultMaxListeners=10;try{var o={};Object.defineProperty&&Object.defineProperty(o,"x",{value:0}),hasDefineProperty=0===o.x}catch(err){hasDefineProperty=!1}function $getMaxListeners(that){return void 0===that._maxListeners?EventEmitter.defaultMaxListeners:that._maxListeners}function _addListener(target,type,listener,prepend){var m,events,existing;if("function"!=typeof listener)throw new TypeError('"listener" argument must be a function');if((events=target._events)?(events.newListener&&(target.emit("newListener",type,listener.listener?listener.listener:listener),events=target._events),existing=events[type]):(events=target._events=objectCreate(null),target._eventsCount=0),existing){if("function"==typeof existing?existing=events[type]=prepend?[listener,existing]:[existing,listener]:prepend?existing.unshift(listener):existing.push(listener),!existing.warned&&(m=$getMaxListeners(target))&&m>0&&existing.length>m){existing.warned=!0;var w=new Error("Possible EventEmitter memory leak detected. "+existing.length+' "'+String(type)+'" listeners added. Use emitter.setMaxListeners() to increase limit.');w.name="MaxListenersExceededWarning",w.emitter=target,w.type=type,w.count=existing.length,"object"==typeof console&&console.warn&&console.warn("%s: %s",w.name,w.message)}}else existing=events[type]=listener,++target._eventsCount;return target}function onceWrapper(){if(!this.fired)switch(this.target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length){case 0:return this.listener.call(this.target);case 1:return this.listener.call(this.target,arguments[0]);case 2:return this.listener.call(this.target,arguments[0],arguments[1]);case 3:return this.listener.call(this.target,arguments[0],arguments[1],arguments[2]);default:for(var args=new Array(arguments.length),i=0;i<args.length;++i)args[i]=arguments[i];this.listener.apply(this.target,args)}}function _onceWrap(target,type,listener){var state={fired:!1,wrapFn:void 0,target:target,type:type,listener:listener},wrapped=bind.call(onceWrapper,state);return wrapped.listener=listener,state.wrapFn=wrapped,wrapped}function _listeners(target,type,unwrap){var events=target._events;if(!events)return[];var evlistener=events[type];return evlistener?"function"==typeof evlistener?unwrap?[evlistener.listener||evlistener]:[evlistener]:unwrap?function(arr){for(var ret=new Array(arr.length),i=0;i<ret.length;++i)ret[i]=arr[i].listener||arr[i];return ret}(evlistener):arrayClone(evlistener,evlistener.length):[]}function listenerCount(type){var events=this._events;if(events){var evlistener=events[type];if("function"==typeof evlistener)return 1;if(evlistener)return evlistener.length}return 0}function arrayClone(arr,n){for(var copy=new Array(n),i=0;i<n;++i)copy[i]=arr[i];return copy}hasDefineProperty?Object.defineProperty(EventEmitter,"defaultMaxListeners",{enumerable:!0,get:function(){return defaultMaxListeners},set:function(arg){if("number"!=typeof arg||arg<0||arg!=arg)throw new TypeError('"defaultMaxListeners" must be a positive number');defaultMaxListeners=arg}}):EventEmitter.defaultMaxListeners=defaultMaxListeners,EventEmitter.prototype.setMaxListeners=function(n){if("number"!=typeof n||n<0||isNaN(n))throw new TypeError('"n" argument must be a positive number');return this._maxListeners=n,this},EventEmitter.prototype.getMaxListeners=function(){return $getMaxListeners(this)},EventEmitter.prototype.emit=function(type){var er,handler,len,args,i,events,doError="error"===type;if(events=this._events)doError=doError&&null==events.error;else if(!doError)return!1;if(doError){if(arguments.length>1&&(er=arguments[1]),er instanceof Error)throw er;var err=new Error('Unhandled "error" event. ('+er+")");throw err.context=er,err}if(!(handler=events[type]))return!1;var isFn="function"==typeof handler;switch(len=arguments.length){case 1:!function(handler,isFn,self){if(isFn)handler.call(self);else for(var len=handler.length,listeners=arrayClone(handler,len),i=0;i<len;++i)listeners[i].call(self)}(handler,isFn,this);break;case 2:!function(handler,isFn,self,arg1){if(isFn)handler.call(self,arg1);else for(var len=handler.length,listeners=arrayClone(handler,len),i=0;i<len;++i)listeners[i].call(self,arg1)}(handler,isFn,this,arguments[1]);break;case 3:!function(handler,isFn,self,arg1,arg2){if(isFn)handler.call(self,arg1,arg2);else for(var len=handler.length,listeners=arrayClone(handler,len),i=0;i<len;++i)listeners[i].call(self,arg1,arg2)}(handler,isFn,this,arguments[1],arguments[2]);break;case 4:!function(handler,isFn,self,arg1,arg2,arg3){if(isFn)handler.call(self,arg1,arg2,arg3);else for(var len=handler.length,listeners=arrayClone(handler,len),i=0;i<len;++i)listeners[i].call(self,arg1,arg2,arg3)}(handler,isFn,this,arguments[1],arguments[2],arguments[3]);break;default:for(args=new Array(len-1),i=1;i<len;i++)args[i-1]=arguments[i];!function(handler,isFn,self,args){if(isFn)handler.apply(self,args);else for(var len=handler.length,listeners=arrayClone(handler,len),i=0;i<len;++i)listeners[i].apply(self,args)}(handler,isFn,this,args)}return!0},EventEmitter.prototype.addListener=function(type,listener){return _addListener(this,type,listener,!1)},EventEmitter.prototype.on=EventEmitter.prototype.addListener,EventEmitter.prototype.prependListener=function(type,listener){return _addListener(this,type,listener,!0)},EventEmitter.prototype.once=function(type,listener){if("function"!=typeof listener)throw new TypeError('"listener" argument must be a function');return this.on(type,_onceWrap(this,type,listener)),this},EventEmitter.prototype.prependOnceListener=function(type,listener){if("function"!=typeof listener)throw new TypeError('"listener" argument must be a function');return this.prependListener(type,_onceWrap(this,type,listener)),this},EventEmitter.prototype.removeListener=function(type,listener){var list,events,position,i,originalListener;if("function"!=typeof listener)throw new TypeError('"listener" argument must be a function');if(!(events=this._events))return this;if(!(list=events[type]))return this;if(list===listener||list.listener===listener)0==--this._eventsCount?this._events=objectCreate(null):(delete events[type],events.removeListener&&this.emit("removeListener",type,list.listener||listener));else if("function"!=typeof list){for(position=-1,i=list.length-1;i>=0;i--)if(list[i]===listener||list[i].listener===listener){originalListener=list[i].listener,position=i;break}if(position<0)return this;0===position?list.shift():function(list,index){for(var i=index,k=i+1,n=list.length;k<n;i+=1,k+=1)list[i]=list[k];list.pop()}(list,position),1===list.length&&(events[type]=list[0]),events.removeListener&&this.emit("removeListener",type,originalListener||listener)}return this},EventEmitter.prototype.removeAllListeners=function(type){var listeners,events,i;if(!(events=this._events))return this;if(!events.removeListener)return 0===arguments.length?(this._events=objectCreate(null),this._eventsCount=0):events[type]&&(0==--this._eventsCount?this._events=objectCreate(null):delete events[type]),this;if(0===arguments.length){var key,keys=objectKeys(events);for(i=0;i<keys.length;++i)"removeListener"!==(key=keys[i])&&this.removeAllListeners(key);return this.removeAllListeners("removeListener"),this._events=objectCreate(null),this._eventsCount=0,this}if("function"==typeof(listeners=events[type]))this.removeListener(type,listeners);else if(listeners)for(i=listeners.length-1;i>=0;i--)this.removeListener(type,listeners[i]);return this},EventEmitter.prototype.listeners=function(type){return _listeners(this,type,!0)},EventEmitter.prototype.rawListeners=function(type){return _listeners(this,type,!1)},EventEmitter.listenerCount=function(emitter,type){return"function"==typeof emitter.listenerCount?emitter.listenerCount(type):listenerCount.call(emitter,type)},EventEmitter.prototype.listenerCount=listenerCount,EventEmitter.prototype.eventNames=function(){return this._eventsCount>0?Reflect.ownKeys(this._events):[]};

/* removed: const _$events_18=require("events"); */;var _$emittor_9=(()=>Object.assign({},_$events_18.prototype))();

var _$eventActions_10={addBatchEvent:function(selector,callback){document.querySelectorAll(selector).forEach(button=>{button.addEventListener("click",event=>{event.preventDefault(),callback(button)})})},addClickEventTo:function(selector,callback){const button=document.querySelector(selector);button.addEventListener("click",event=>{event.preventDefault(),callback(button)})}};

var _$formHandler_11={getProjectData:function(formSelector){const form=document.querySelector(formSelector);return{name:form.elements["project-name"].value,description:form.elements["project-description"].value,priority:form.elements["project-priority"].value}},getTodoData:function(formSelector){const form=document.querySelector(formSelector);return{name:form.elements["todo-name"].value,description:form.elements["todo-description"].value,priority:form.elements["todo-priority"].value}}};

var _$initialData_12={projects:{1:{id:1,name:"Home",description:"All todos about home",priority:1,todos:[1]},2:{id:2,name:"Work",description:"All todos about work",priority:2,todos:[]},3:{id:3,name:"Others",description:"All others todos",priority:3,todos:[]}},todos:{1:{id:1,name:"Go to school",description:"",priority:1,project:1},2:{id:2,name:"Go to cinema",description:"",priority:2,project:2}}};

var _$project_13=function(name,description,priority){return{id:null,name:name,description:description,priority:priority}};

var _$projects_14=function(initialState){const allProject=initialState||{};function count(){return Object.keys(allProject).length}return{state:function(){return allProject},add:function(project){const ID=count()+1;return project.id=ID,allProject[ID]=project,!0},remove:function(id){delete allProject[id]},count:count}};

var _$storage_15={save:function(key,allProjects){const data=JSON.stringify(allProjects);window.localStorage.setItem(key,data)},load:function(key){const data=window.localStorage.getItem(key);return JSON.parse(data)}};

var _$todo_16=function(name,description,priority,project){return{id:null,name:name,description:description,priority:priority,project:project}};

var _$todos_17=function(initialState){const allTodos=initialState||{};function count(){return Object.keys(allTodos).length}return{state:function(){return allTodos},add:function(item){const ID=count()+1;return item.id=ID,allTodos[ID]=item,!0},remove:function(id){delete allTodos[id]},count:count,fromProject:function(id){return Object.entries(allTodos).filter(entry=>entry[1].project===id).reduce((obj,entry)=>{const[key,value]=entry;return Object.assign(obj,{[key]:value})},{})}}};

var _$app_1 = {};
const __dummy_1$0 = 0,__dummy_1$1 = 0,__dummy_1$2 = 0,__dummy_1$3 = 0,__dummy_1$4 = 0,__dummy_1$5 = 0,__dummy_1$6 = 0,__dummy_1$7 = 0,__dummy_1$8 = 0,__dummy_1$9 = 0,__dummy_1$10 = 0,__dummy_1$11 = 0,__dummy_1$12 = 0,__dummy_1$13 = 0,__dummy_1$14 = 0,__dummy_1$15 = 0;document.addEventListener("DOMContentLoaded",()=>{(()=>{let initialProjects=_$initialData_12.projects,initialTodos=_$initialData_12.todos;window.localStorage.getItem("projects")&&(initialProjects=_$storage_15.load("projects")),window.localStorage.getItem("todos")&&(initialTodos=_$storage_15.load("todos"));const allProjects=_$projects_14(initialProjects),allTodos=_$todos_17(initialTodos),projectsElement=_$componentProjects_5(allProjects.state()),todosElement=_$componentTodos_7(allTodos.fromProject(1));_$domactions_8.render("body",projectsElement),_$domactions_8.render("body",todosElement),_$eventActions_10.addBatchEvent(".btn-delete-project",button=>{_$emittor_9.emit("delete project",button.dataset.id)}),_$eventActions_10.addBatchEvent(".btn-delete-todo",button=>{_$emittor_9.emit("delete todo",button.dataset.id)}),_$eventActions_10.addClickEventTo("#btn-new-project",()=>{_$emittor_9.emit("add new project")}),_$emittor_9.on("delete project",id=>{allProjects.remove(id),_$storage_15.save("projects",allProjects.state()),_$domactions_8.removeWithParams("li","project",id)}),_$emittor_9.on("delete todo",id=>{allTodos.remove(id),_$storage_15.save("todos",allTodos.state()),_$domactions_8.removeWithParams("li","todo",id)}),_$emittor_9.on("add new project",()=>{const newProjectContainer=_$componentNewProject_2();_$domactions_8.render("body",newProjectContainer),_$eventActions_10.addClickEventTo("#btn-create-project",()=>{const{name:name,description:description,priority:priority}=_$formHandler_11.getProjectData("#new-project-form"),newProject=_$project_13(name,description,priority);allProjects.add(newProject);const newProjectElement=_$componentProject_4(newProject);newProjectElement.children[0].onclick=(()=>{_$emittor_9.emit("delete project",newProject.id)}),_$domactions_8.render("#projects-list",newProjectElement),_$storage_15.save("projects",allProjects.state()),_$domactions_8.removeWithSelector("#new-project-wrapper")}),_$eventActions_10.addClickEventTo("#btn-close",()=>{_$domactions_8.removeWithSelector("#new-project-wrapper")})}),_$eventActions_10.addClickEventTo("#btn-new-todo",()=>{_$emittor_9.emit("add new todo")}),_$emittor_9.on("add new todo",()=>{const newTodoContainer=_$componentNewTodo_3();_$domactions_8.render("body",newTodoContainer),_$eventActions_10.addClickEventTo("#btn-create-todo",()=>{const{name:name,description:description,priority:priority}=_$formHandler_11.getTodoData("#new-todo-form"),newTodo=_$todo_16(name,description,priority,1);allTodos.add(newTodo);const newTodoElement=_$componentTodo_6(newTodo);newTodoElement.onclick=(()=>{_$domactions_8.removeWithParams("li","todo",newTodo.id)}),_$domactions_8.render("#todos-list",newTodoElement),_$storage_15.save("todos",allTodos.state()),_$domactions_8.removeWithSelector("#new-todo-wrapper")}),_$eventActions_10.addClickEventTo("#btn-close",()=>{_$domactions_8.removeWithSelector("#new-todo-wrapper")})})})()});

}());
