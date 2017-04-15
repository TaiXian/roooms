// Example model


function Message (message) {
  if(!message) message = {};
  this.content = message.Content || '';
  this.user = message.UserName || '';
  this.time = message.InsertTime || '';
  this.color = message.color || '';
}

module.exports = Message;

