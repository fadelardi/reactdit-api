var app = require('express')();
var actions = require('./actions.js');

app.use(function(req, res, next) {
  res.set({'Access-Control-Allow-Origin': '*'});
  next();
});

app
  .get('/', function(req, res) {
    actions.getForum(res);
  })
  .get('/f/:forum', function(req, res) {
    actions.getForum(res, req.params.forum);
  })
  .get('/u/:username', function(req, res) {
    actions.getUser(res, req.params.username);
  })
  .get('/t/:id', function(req, res) {
    actions.getThread(res, req.params.id);
  });

module.exports = app;
