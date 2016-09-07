var data = require('./mock_data.js');
var threads = data.threads;
var users = data.users;

module.exports.getThread = function(id) {
  for (var i = 0; i < threads.length; i++) {
    if (id == threads[i].id) {
      return JSON.stringify([threads[i]]);
    }
  }
  return JSON.stringify([]);
}

module.exports.getUser = function(username) {
  for (var i = 0; i < users.length; i++) {
    if (username == users[i].username) {
      return JSON.stringify(users[i]);
    }
  }
}

module.exports.getThreads = function(forum) {
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
