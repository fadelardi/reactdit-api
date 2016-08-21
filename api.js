var app = require('express')();

//mock data to be replaced by db
var data = require('./mock_data.js');

function getCommments(threads, title) {
  for (var i = 0; i < threads.length; i++) {
    if (title == threads[i].title) {
      return JSON.stringify(threads[i].comments);
    }
  }
}

app
  .get('/', function(req, res) {
    res.send(JSON.stringify(data.threads));
  })
  .get('/f/:title', function(req, res) {
    res.send('Delivering threads from subforum: ' + req.params.title);
  })
  .get('/u/:username', function(req, res) {
    res.send('User detail for username: ' + req.params.username);
  })
  .get('/t/:title', function(req, res) {
    res.send(getCommments(data.threads, req.params.title));
  })

app.listen(3000, function() {
  console.log('Reactdit API started on *:3000')
});
