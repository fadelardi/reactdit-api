var app = require('express')();

//mock data to be replaced by db
var data = require('./mock_data.js');
var threads = data.threads;
var users = data.users;

function getThread(id) {
  for (var i = 0; i < threads.length; i++) {
    if (id == threads[i].id) {
      return JSON.stringify([threads[i]]);
    }
  }
  return JSON.stringify([]);
}

function getUser(username) {
  for (var i = 0; i < users.length; i++) {
    if (username == users[i].username) {
      return JSON.stringify(users[i]);
    }
  }
}

function getThreads(forum) {
  if (typeof forum != 'undefined') {
    var foundThreads = [];
    for (var i = 0; i < threads.length; i++) {
      if (forum == threads[i].forum) {
        foundThreads.push(threads[i]);
      }
    }
    return JSON.stringify(foundThreads);
  }

  return JSON.stringify(threads);
}

app
  .get('/', function(req, res) {
    res.set({'Access-Control-Allow-Origin': '*'});
    res.send(getThreads());
  })
  .get('/f/:forum', function(req, res) {
    res.set({'Access-Control-Allow-Origin': '*'});
    res.send(getThreads(req.params.forum));
  })
  .get('/u/:username', function(req, res) {
    res.set({'Access-Control-Allow-Origin': '*'});
    res.send(getUser(req.params.username));
  })
  .get('/t/:id', function(req, res) {
    res.set({'Access-Control-Allow-Origin': '*'});
    res.send(getThread(req.params.id));
  })

app.listen(3000, function() {
  console.log('Reactdit API started on *:3000')
});
