var app = require('express')();
var actions = require('./actions.js');

app.use(function(req, res, next) {
  res.set({'Access-Control-Allow-Origin': '*'});
  next();
});

app
  .get('/', function(req, res) {
    res.send(actions.getThreads());
  })
  .get('/f/:forum', function(req, res) {
    res.send(actions.getThreads(req.params.forum));
  })
  .get('/u/:username', function(req, res) {
    res.send(actions.getUser(req.params.username));
  })
  .get('/t/:id', function(req, res) {
    res.send(actions.getThread(req.params.id));
  });

module.exports = app;
