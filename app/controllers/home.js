var express = require('express'),
  router = express.Router(),
  Message = require('../models/message');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  var a = {"time" : "12:25", "user" : "me", "content" : "hello"}
  var b = {"time" : "12:35", "user" : "me", "content" : "hi"}
  var c = {"time" : "12:37", "user" : "me", "content" : "you all sound like reasonable people"}
  var messages = [new Message(a), new Message(b), new Message(c)];
    res.render('index', {
      roomNumber: 4,
      userName: 'bandje',
      messages: messages
    });
});
router.get('/room/:number', function (req, res, next) {
  var a = {"time" : "12:25", "user" : "me", "content" : "hello"}
  var b = {"time" : "12:35", "user" : "me", "content" : "hi"}
  var c = {"time" : "12:37", "user" : "me", "content" : "you all sound like reasonable people"}
  var messages = [new Message(a), new Message(b), new Message(c)];
    res.render('index', {
      roomNumber: req.params.number,
      userName: 'bandje',
      messages: messages
    });
});

router.post('/room/:number', function (req, res, next) {
  var a = {"time" : "12:25", "user" : "me", "content" : "hello"}
  var b = {"time" : "12:35", "user" : "me", "content" : "hi"}
  var c = {"time" : "12:37", "user" : "me", "content" : "you all sound like reasonable people"}
  var d = {"time" : "12:50", "user" : req.body.userName, "content" : req.body.content}
  var messages = [new Message(a), new Message(b), new Message(c), new Message(d)];
    res.render('index', {
      roomNumber: req.params.number,
      userName: req.body.userName,
      messages: messages
    });
});
