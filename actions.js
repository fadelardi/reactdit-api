var pg = require('pg');
var config = require('./config.js');
var pool = new pg.Pool(config.db);

var actions = {
  getThread : function(response, id) {
    var query = 'SELECT * FROM threads WHERE id = $1';
    this.get(response, query, [id]);
  },

  getUser : function(response, username) {
    var query = 'SELECT * FROM users where username = "$1"';
    this.get(response, query, [username]);
  },


  getForum : function(response, forum) {
    var params = [];
    var query = 'SELECT * FROM threads';
    if (typeof forum != 'undefined') {
      query += ' WHERE pk_forum_id = $1';
      params.push(forum);
    }
    this.get(response, query, params);
  },

  get : function(response, query, params) {
    pool.connect(function(err, client, done) {
      done();
      if (err) {
         response.send(JSON.stringify(err));
      }

      var q = client.query(query, params)
      .then(function(rs) {
        response.send(JSON.stringify(rs.rows));
      });
    });
  }
}

module.exports = actions;
