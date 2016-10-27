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
    actions.getThreads(res);
  })
  .post('/', function(req, res) {
    actions.addThread(res, req.body);
  })
  .get('/f/:forum', function(req, res) {
    actions.getThreads(res, req.params.forum);
  })
  .get('/forums', function(req, res) {
    actions.getForums(res);
  })
  .post('/f/:forum', function(req, res) {
    req.body.fid = req.params.forum;
    actions.addThread(res, req.body);
  })
  .get('/u/:username', function(req, res) {
    actions.getUser(res, req.params.username);
  })
  .get('/t/:id', function(req, res) {
    actions.getThread(res, req.params.id);
  })
  .get('/t/:id/comments', function(req, res) {
    actions.getComments(res, req.params.id);
  })
  .post('/t/:id', function(req, res) {
    actions.addComment(res, req.body);
  });

module.exports = app;
