var api = require('./routes.js');

api.listen(3000, function() {
  console.log('Reactdit API started on *:3000')
});
