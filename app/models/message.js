// Example model


function Message (message) {
  if(!message) message = {};
  this.content = message.content || '';
  this.user = message.user || '';
  this.time = message.time || '';
  this.color = message.color || '';
}

module.exports = Message;

