var pg = require('pg');
var config = require('./config.js');
var pool = new pg.Pool(config.db);

var actions = {
  getThread : function(response, id) {
    var query = 'SELECT c.*, u.username AS author, t.title FROM threads t '
              + 'JOIN comments c ON t.id = c.pk_threads_id '
              + 'JOIN users u ON u.id = c.pk_users_id '
              + 'WHERE t.id = $1';
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

  addComment: function(response, data) {
    pool.connect(function(err, client, done) {
      done();
      if (err) {
         response.send(JSON.stringify(err));
      }

      client.query('INSERT INTO comments (id, body, created, pk_threads_id, pk_users_id) VALUES (DEFAULT, $1, $2, $3, $4)', [data.comment, new Date(), data.id, data.uid])
      .then(function(rs) {
        response.send(JSON.stringify('ok'));
      })
      .catch(function(err) {
        response.send(JSON.stringify('ko'));
      });
    });
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
