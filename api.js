var app = require('express')();

app
  .get('/', function(req, res) {
    res.send('Deliver threads from all subforums');
  })
  .get('/f/:title', function(req, res) {
    res.send('Delivering threads from subforum: ' + req.params.title)
  })
  .get('/u/:username', function(req, res) {
    res.send('User detail for username: ' + req.params.username)
  })
  .get('/t/:title', function(req, res) {
    res.send('Thread detail for thread: ' + req.params.title)
  })

app.listen(3000, function() {
  console.log('Reactdit API started on *:3000')
});
