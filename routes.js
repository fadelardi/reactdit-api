var app = require('express')();
var actions = require('./actions.js');
var bodyParser = require('body-parser');
var corsMiddleware = function(req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  next();
};

app.use(corsMiddleware);
app.use(bodyParser.json());

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
  })
  .post('/t/:id', function(req, res) {
    actions.addComment(res, req.body);
  });

module.exports = app;
