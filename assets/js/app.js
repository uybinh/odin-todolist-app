const EventEmitter = require('events');

const emittor = new EventEmitter()

emittor.on('hello', (data)=>{
  console.log(`hello ${data}`)
})

emittor.emit('hello', "binh")

console.log('1')
// const project = {
//   id,
//   priority,
//   name,
//   items: [],
//   dueDate
// }

// const todoItem = {
//   id,
//   priority,
//   content,
//   projectId
// }

// console.log('Hello there')

// document.addEventListener('DOMContentLoaded', function(){




// })
