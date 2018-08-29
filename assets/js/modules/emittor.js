const EventEmitter = require('events');
const myEmittor = () => Object.assign({}, EventEmitter.prototype)

module.exports = myEmittor()